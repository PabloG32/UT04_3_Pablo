import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
} from './exceptions.js';

import {
    Dish, Category, Allergen, Menu, Restaurant
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
        this.className = className;
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
        #allergenes = new Map(); //Colección de tipos a alérgenos. Los platos pueden tener asociado más de un alérgeno.
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
                            for (const dish of values) {
                                yield dish;
                            }
                        },
                    };
                },
            });

            Object.defineProperty(this, 'allergenes', {
                enumerable: true,
                get() {
                    const values = this.#allergenes.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const allergen of values) {
                                yield allergen;
                            }
                        },
                    };
                },
            });

            Object.defineProperty(this, 'menus', {
                enumerable: true,
                get() {
                    const values = this.#menus.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const menu of values) {
                                yield menu;
                            }
                        },
                    };
                },
            });

            // Object.defineProperty(this, 'restaurants', {
            //     enumerable: true,
            //     get() {
            //         const values = this.restaurants.values();
            //         return {
            //             *[Symbol.iterator]() {
            //                 for (const restaurante of values) {
            //                     yield restaurante;
            //                 }
            //             },
            //         };
            //     },
            // });
        }

        //Getter allergen
        getAllergens() {
            return [...this.#allergenes.values()].map(entry => entry.allergen);
        }

        getMenus() {
            return [...this.#menus.values()].map(entry => entry.menu);
        }

        //Añade una nueva categoría.
        addCategory(...categories) {
            for (const category of categories) {
                if (!(category instanceof Category)) throw new ObjecManagerException('category', 'Category');
                if (!this.#categories.has(category.name)) {
                    this.#categories.set(category.name, {
                        category,
                        dishes: new Map()
                    });
                } else {
                    throw new CategoryExistsException(category);
                }
            }
            return this;
        }

        //Elimina una categoría. Los platos quedarán desasignados de la categoría.
        removeCategory(...categories) {
            for (const category of categories) {
                if (!(category instanceof Category)) throw new ObjecManagerException('category', 'Category');

                if (this.#categories.has(category.name)) {
                    this.#categories.delete(category.name);
                } else {
                    throw new CategoryNotExistException(category);
                }
            }
            return this;
        }

        //Añade un nuevo menú.
        addMenu(...menus) {
            for (const menu of menus) {
                if (!(menu instanceof Menu)) throw new ObjecManagerException('menus', 'Menu');

                if (!this.#menus.has(menu.name)) {
                    this.#menus.set(menu.name, {
                        menu,
                        dishes: new Map()
                    });
                } else {
                    throw new ProductExistsException(menu);
                }
            }
            return this;
        }

        //Elimina un menú.
        removeMenu(...menus) {
            for (const menu of menus) {
                if (!(menu instanceof Menu)) throw new ObjecManagerException('menu', 'Menu');

                if (this.#menus.has(menu.name)) {
                    this.#menus.delete(menu.name);
                } else {
                    throw new CategoryNotExistException(menu);
                }
            }
            return this;
        }

        //Añade un nuevo alérgeno.
        addAllergen(...allergenes) {
            for (const allergen of allergenes) {
                if (!(allergen instanceof Allergen)) throw new ObjecManagerException('allergen', 'Allergen');

                if (!this.#allergenes.has(allergen.name)) {
                    this.#allergenes.set(allergen.name, {
                        name: allergen.name,
                        allergen,
                        dishes: new Map()
                    });
                } else {
                    throw new ProductExistsException(allergen);
                }
            }
            return this;
        }

        //Elimina un alérgeno.
        removeAllergen(...allergenes) {
            for (const allergen of allergenes) {
                if (!(allergen instanceof Allergen)) throw new ObjecManagerException('allergen', 'Allergen');

                if (this.#allergenes.has(allergen.name)) {
                    this.#allergenes.delete(allergen.name);
                } else {
                    throw new CategoryNotExistException(allergen);
                }
            }
            return this;
        }

        //Añade un nuevo plato.
        addDish(...dishes) {
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) throw new ObjecManagerException('dishes', 'Dish');

                if (!this.#dishes.has(dish.name)) {
                    this.#dishes.set(dish.name, dish);
                } else {
                    throw new ProductExistsException(dish);
                }
            }
            return this;
        }

        //Elimina un plato y todas sus asignaciones a categorías, alérgenos y menús.
        removeDish(...dishes) {
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) throw new ObjecManagerException('dish', 'dish');

                if (this.#dishes.has(dish.name)) {
                    for (const category of this.#categories.values()) {
                        if (category.dishes.has(dish.name)) {
                            category.dishes.delete(dish.name);
                        }
                    }
                    this.#dishes.delete(dish.name);
                } else {
                    throw new ProductNotExistInManagerException(dish);
                }
            }
            return this;
        }

        //Asigna un plato a una categoría. Si el objeto Category o Dish no existen se añaden al sistema.
        assignCategoryToDish(category, ...dishes) {
            if (!(category instanceof Category)) throw new ObjecManagerException('category', 'Category');

            if (!this.#categories.has(category.name)) {
                this.addCategory(category);
            }
            const storedCategory = this.#categories.get(category.name);
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) throw new ObjecManagerException('dish', 'dish');

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

        //Asigna un alérgeno a un plato. Si algún argumento no existe se añade al sistema.
        assignAllergenToDish(dish, ...allergenes) {
            if (!(dish instanceof Dish)) throw new ObjecManagerException('dish', 'Dish');

            if (!this.#dishes.has(dish.name)) {
                this.addDish(dish);
            }
            const storedDish = this.#dishes.get(dish.name);
            for (const allergen of allergenes) {
                if (!(allergen instanceof Allergen)) throw new ObjecManagerException('allergen', 'Allergen');
                if (!this.#allergenes.has(allergen.name)) {
                    this.addAllergen(allergen);
                }
                const storedAllergen = this.#allergenes.get(allergen.name);
                if (!storedDish.allergenes.has(allergen.name)) {
                    storedDish.allergenes.set(allergen.name, storedAllergen);
                } else {
                    throw new ProductExistInCategoryException(allergen, dish);
                }
            }
            return this;
        }

        //Obtiene un iterador con la relación de los platos a una categoría.
        * getDishesInCategory(category) {
            if (!(category instanceof Category)) throw new ObjecManagerException('category', 'Category');

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

        * getDishesWithAllergen(allergen) {
            if (!(allergen instanceof Allergen)) throw new ObjecManagerException('allergen', 'Allergen');

            if (this.#allergenes.has(allergen.name)) {
                const storedAllergen = this.#allergenes.get(allergen.name);
                const values = storedAllergen.dishes.values();
                for (const dish of values) {
                    yield dish;
                }
            } else {
                throw new CategoryNotExistException(allergen);
            }
        }

        toString(separator = '\n') {
            let str = '';
            for (const category of this.categories) {
                str += category.name + separator;
                for (const dish of this.getDishesInCategory(category)) {
                    str += dish.toString() + separator;
                }
            }
            return str;
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