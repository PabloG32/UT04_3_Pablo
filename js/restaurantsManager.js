import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
} from './exceptions.js';

import {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate
} from './entities/restaurante.js';

//Excepciones
class ManagerException extends BaseException {
    constructor(message = 'Error: Manager Exception.', fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'ManagerException';
    }
}

class ObjecManagerException extends ManagerException {
    constructor(param, className, fileName, lineNumber) {
        super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
        this.param = param;
        this.param = className;
        this.name = 'ObjecManagerException';
    }
}

class CategoryExistsException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The ${category.name} already exists in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryExistsException';
    }
}

class ProductExistsException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The ${dish.name} already exists in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'ProductExistsException';
    }
}

class ProductExistInCategoryException extends ManagerException {
    constructor(dish, category, fileName, lineNumber) {
        super(`Error: The ${dish.name} already exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.dish = dish;
        this.name = 'ProductExistInCategoryException';
    }
}

class CategoryNotExistException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The ${category.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryNotExistException';
    }
}

class ProductNotExistInManagerException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'ProductNotExistInManagerException';
    }
}

class ProductNotExistInCategoryException extends ManagerException {
    constructor(dish, category, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.dish = dish;
        this.name = 'ProductNotExistInCategoryException';
    }
}

const RestaurantsManager = (function () {
    let instantiated;

    class RestaurantsManager {
        #systemName; //Nombre del sistema.
        #categories = new Map(); //Colección de categorías de platos. Los platos pueden pertenecer a más de una categoría.
        #allergenTypes = new Map(); //Colección de tipos a alérgenos. Los platos pueden tener asociado más de un alérgeno.
        #dishes = new Map(); //Colección de platos.
        #menus = new Map(); //Colección de menús. Se trata de una agregación de platos.
        #restaurants = new Map(); //Colección de restaurantes.

        constructor(systemName) {
            if (!new.target) throw new InvalidAccessConstructorException();
            // if (!systemName) throw new EmptyValueException("systemName");

            Object.defineProperty(this, 'categories', {
                enumerable: true,
                get() {
                    const values = this.#categories.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const storedCategory of values) {
                                yield storedCategory.category;
                            }
                        },
                    };
                },
            });

            Object.defineProperty(this, 'dishes', {
                enumerable: true,
                get() {
                    const values = this.#dishes.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const product of values) {
                                yield product;
                            }
                        },
                    };
                },
            });
        }


        addCategory(...categories) {
            for (const category of categories) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }
                if (!this.#categories.has(category.name)) {
                    this.#categories.set(category.name, {
                        category,
                        dishes: new Map(),
                    });
                } else {
                    throw new CategoryExistsException(category);
                }
            }
            return this;
        }

        addDish(...dishes) {
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dishes', 'Dish');
                }
                if (!this.#dishes.has(dish.name)) {
                    this.#dishes.set(dish.name, dish);
                } else {
                    throw new ProductExistsException(dish);
                }
            }
            return this;
        }

        assignCategoryToDish(category, ...dishes) {
            if (!(category instanceof Category)) {
                throw new ObjecManagerException('category', 'Category');
            }
            if (!this.#categories.has(category.name)) {
                this.addCategory(category);
            }
            const storedCategory = this.#categories.get(category.name);
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dish', 'dish');
                }
                if (!this.#dishes.has(dish.name)) {
                    this.addDish(dish);
                }
                const storedDish = this.#dishes.get(dish.name);
                if (!storedCategory.dishes.has(dish.name)) {
                    storedCategory.dishes.set(dish.name, storedDish);
                } else {
                    throw new ProductExistInCategoryException(dish, category);
                }
            }
            return this;
        }

        * getCategoryDishes(category) {
            if (!(category instanceof Category)) {
                throw new ObjecManagerException('category', 'Category');
            }
            if (this.#categories.has(category.name)) {
                const storedCategory = this.#categories.get(category.name);
                const values = storedCategory.dishes.values();
                for (const dish of values) {
                    yield dish;
                }
            } else {
                throw new CategoryNotExistException(category);
            }
        }
    }



    function init() {
        const manager = new RestaurantsManager();
        Object.freeze(manager);
        return manager;
    }

    return {
        getInstance() {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        },
    };
})();

export default RestaurantsManager;