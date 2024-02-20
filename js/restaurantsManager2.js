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

class ProductExistInCategoryException extends ManagerException {
    constructor(product, category, fileName, lineNumber) {
        super(`Error: The ${product.name} already exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.product = product;
        this.name = 'DishExistInCategoryException';
    }
}

class CategoryNotExistException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The ${category.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryNotExistException';
    }
}

class ProductNotExistInCategoryException extends ManagerException {
    constructor(product, category, fileName, lineNumber) {
        super(`Error: The ${product.name} doesn't exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.product = product;
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
            //Excepciones
            if (!new.target) throw new InvalidAccessConstructorException();
            // if (!systemName) throw new EmptyValueException("systemName");


            Object.defineProperty(this, 'categories', {
                enumerable: true,
                get() {
                    const array = this.#categories;
                    return {
                        *[Symbol.iterator]() {
                            for (const arrayCat of array) {
                                yield arrayCat.category;
                            }
                        },
                    };
                },
            });

            Object.defineProperty(this, 'dishes', {
                enumerable: true,
                get() {
                    const array = this.#dishes;
                    return {
                        *[Symbol.iterator]() {
                            for (const dish of array) {
                                yield dish;
                            }
                        },
                    };
                },
            });
        }

        //Añade una nueva categoría.
        addCategory(...categories) {
            for (const category of categories) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }
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

        toString(separador = '\n') {
            let str = '';
            for (const category of this.categories) {
                str += category.name + separador;
                for (const dish of this.getDichesInCategory(category)) {
                    str += dish.toString() + separador;
                }
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