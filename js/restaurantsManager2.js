"use strict";
import {
    BaseException,
    // InvalidAccessConstructorException,
    EmptyValueException,
    // InvalidValueException,
    // AbstractClassException
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

class DishExistsException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The ${dish.name} already exists in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'DishExistsException';
    }
}

class DishNotExistsException extends ManagerException {
    constructor(dish, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exists in the manager.`, fileName, lineNumber);
        this.dish = dish;
        this.name = 'DishNotExistsException';
    }
}

class MenuExistsException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The ${menu.name} already exists in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuExistsException';
    }
}

class MenuNotExistsException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The ${menu.name} doesn't exists in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'MenuNotExistsException';
    }
}

class AllergenExistsException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The ${allergen.name} already exists in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenExistsException';
    }
}

class AllergenNotExistsException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The ${allergen.name} doesn't exists in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenNotExistsException';
    }
}

class RestaurantExistsException extends ManagerException {
    constructor(restaurant, fileName, lineNumber) {
        super(`Error: The ${restaurant.name} already exists in the manager.`, fileName, lineNumber);
        this.restaurant = restaurant;
        this.name = 'RestaurantExistsException';
    }
}

class RestaurantNotExistsException extends ManagerException {
    constructor(restaurant, fileName, lineNumber) {
        super(`Error: The ${restaurant.name} doesn't exists in the manager.`, fileName, lineNumber);
        this.restaurant = restaurant;
        this.name = 'RestaurantNotExistsException';
    }
}

class DishExistInCategoryException extends ManagerException {
    constructor(dish, category, fileName, lineNumber) {
        super(`Error: The ${dish.name} already exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.dish = dish;
        this.name = 'DishExistInCategoryException';
    }
}

class DishNotExistInCategoryException extends ManagerException {
    constructor(dish, category, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exist in ${category.name}.`, fileName, lineNumber);
        this.category = category;
        this.dish = dish;
        this.name = 'DishNotExistInCategoryException';
    }
}

class DishNotExistInMenuException extends ManagerException {
    constructor(dish, menu, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exist in ${menu.name}.`, fileName, lineNumber);
        this.menu = menu;
        this.dish = dish;
        this.name = 'DishNotExistInMenuException';
    }
}

class DishExistInMenuException extends ManagerException {
    constructor(dish, menu, fileName, lineNumber) {
        super(`Error: The ${dish.name} doesn't exist in ${menu.name}.`, fileName, lineNumber);
        this.menu = menu;
        this.dish = dish;
        this.name = 'DishNotExistInMenuException';
    }
}

class CategoryNotExistException extends ManagerException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The ${category.name} doesn't exist in the manager.`, fileName, lineNumber);
        this.category = category;
        this.name = 'CategoryNotExistException';
    }
}

let RestaurantsManager = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única RestaurantsManager

    function init() { //Inicialización del Singleton

        //Declaración de la clase RestaurantsManager
        class RestaurantsManager {
            #systemName = ""; //Nombre del sistema.
            #categories = []; //Colección de categorías de platos. Los platos pueden pertenecer a más de una categoría.
            #allergenes = []; //Colección de tipos a alérgenos. Los platos pueden tener asociado más de un alérgeno.
            #dishes = []; //Colección de platos.
            #menus = []; //Colección de menús. Se trata de una agregación de platos.
            #restaurants = []; //Colección de restaurantes.

            constructor() {
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

                Object.defineProperty(this, 'categories', {
                    enumerable: true,
                    get() {
                        const array = this.#categories;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayCategory of array) {
                                    yield arrayCategory.category;
                                }
                            },
                        };
                    },
                });

                Object.defineProperty(this, 'menus', {
                    enumerable: true,
                    get() {
                        const array = this.#menus;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayMenu of array) {
                                    yield arrayMenu.menu;
                                }
                            },
                        };
                    },
                });

            }

            //Dado un plato, devuelve su posición
            //Comparamos por contenido no por referencia.
            #getDishPosition(name) {
                function compareElements(element) {
                    return (element.name === name)
                }

                return this.#dishes.findIndex(compareElements);
            }

            //Dado una categoría, devuelve su posición
            //Comparamos por contenido no por referencia.
            #getCategoryPosition(name) {
                function compareElements(element) {
                    return (element.category.name === name)
                }

                return this.#categories.findIndex(compareElements);
            }

            //Dado un allergeno, devuelve su posición 
            //Comparamos por contenido no por referencia.
            #getAllergenPosition(allergen) {
                if (!(allergen instanceof Allergen)) {
                    throw new ObjecManagerException('allergen', 'Allergen');
                }

                function compareElements(element) {
                    return (element.allergen.name === allergen.name)
                }

                return this.#allergenes.findIndex(compareElements);
            }

            //Dado un menu, devuelve su posicion
            //Comparamos por contenido no por referencia.
            #getMenuPosition(name) {
                function compareElements(element) {
                    return (element.menu.name === name);
                }

                return this.#menus.findIndex(compareElements);
            }

            //Dado un restaurante, devuelve su posicion
            //Comparamos por contenido no por referencia.
            #getRestaurantPosition(restaurant) {
                if (!(restaurant instanceof Restaurant)) {
                    throw new ObjecManagerException('restaurant', 'Restaurant');
                }

                function compareElements(element) {
                    return (element.restaurant.name === restaurant.name);
                }

                return this.#restaurants.findIndex(compareElements);
            }

            // Definición del atributo systemName
            get systemName() {
                return this.#systemName;
            }
            set systemName(systemName) {
                systemName = systemName.trim();
                if (systemName === 'undefined' || systemName === '') throw new EmptyValueException("systemName");
                this.#systemName = systemName;
            }

            //Añade un nuevo plato
            addDish(...dishes) {
                for (let dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                    let position = this.#getDishPosition(dish.name);
                    if (position === -1) {
                        this.#dishes.push(dish);
                    } else {
                        throw new DishExistsException(dish);
                    }
                }
                return this;
            }

            //Devuelve un objeto Dish si está registrado, o crea un nuevo
            createDish(name, description = "", ingredients = [], image = "") {
                let position = this.#getDishPosition(name);
                if (position != -1) return this.#dishes[position];
                return new Dish(name, description, ingredients, image);
            }

            //Añade una nueva categoria
            addCategory(...categories) {
                for (let category of categories) {
                    if (!(category instanceof Category)) {
                        throw new ObjecManagerException('category', 'Category');
                    }
                    let position = this.#getCategoryPosition(category.name);
                    if (position === -1) {
                        this.#categories.push(
                            {
                                category: category,
                                dishes: []
                            }
                        );
                    } else {
                        throw new CategoryExistsException(category);
                    }
                }
                return this;
            }

            //Devuelve un objeto Category si está registrado, o crea un nuevo.
            createCategory(name, description = "") {
                let position = this.#getCategoryPosition(name);
                if (position != -1) return this.#categories[position];
                return new Category(name, description);
            }

            //Asigna un plato a una categoría. Si el objeto Category o Dish no existen se añaden al sistema.
            assignCategoryToDish(category, ...dishes) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }

                for (let dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                }

                for (let dish of dishes) {
                    let positionDish = this.#getDishPosition(dish.name);
                    if (positionDish === -1) {
                        this.addDish(dish);
                        positionDish = this.#getCategoryPosition(dish.name);
                    }

                    let positionCat = this.#getCategoryPosition(category.name);
                    if (positionCat === -1) {
                        this.addCategory(category);
                        positionCat = this.#getCategoryPosition(category.name);
                    }

                    // Verificar si el plato ya existe en la categoría
                    if (this.#categories[positionCat].dishes.includes(this.#dishes[positionDish])) {
                        throw new DishExistInCategoryException(dish, category);
                    }

                    this.#categories[positionCat].dishes.push(this.#dishes[positionDish]);
                }

            }

            //Desasigna un plato de una categoría
            deassignCategoryToDish(category, ...dishes) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }

                for (let dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                }

                for (let dish of dishes) {
                    let positionDish = this.#getDishPosition(dish.name);
                    if (positionDish === -1) {
                        throw new DishExistsException(dish);
                    }

                    let positionCat = this.#getCategoryPosition(category.name);
                    if (positionCat === -1) {
                        throw new CategoryNotExistException(category);
                    }

                    // Verificar si el plato existe en la categoría
                    let dishIndex = this.#categories[positionCat].dishes.findIndex(item => item === this.#dishes[positionDish]);
                    if (dishIndex === -1) {
                        throw new DishNotExistInCategoryException(dish, category);
                    }

                    this.#categories[positionCat].dishes.splice(dishIndex, 1);
                }
            }

            //Elimina una categoría. Los platos quedarán desasignados de la categoría.
            removeCategory(category) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }

                let position = this.#getCategoryPosition(category.name);
                if (position !== -1) {
                    // Desasignar todos los platos de la categoría
                    let categoryDishes = this.#categories[position].dishes;
                    for (let dish of categoryDishes) {
                        this.deassignCategoryToDish(category, dish);
                    }
                    // Elimina la categoría
                    this.#categories.splice(position, 1);
                    return this;
                } else {
                    throw new CategoryNotExistException(category);
                }
            }

            //Añade un nuevo menú.
            addMenu(...menus) {
                for (let menu of menus) {
                    if (!(menu instanceof Menu)) {
                        throw new ObjecManagerException('menu', 'Menu');
                    }
                    let position = this.#getMenuPosition(menu.name);
                    if (position === -1) {
                        this.#menus.push(
                            {
                                menu: menu,
                                dishes: []
                            }
                        );
                    } else {
                        throw new MenuExistsException(menu);
                    }
                }
                return this;
            }

            //Devuelve un objeto Menu si está registrado, o crea un nuevo.
            createMenu(name, description = "") {
                let position = this.#getMenuPosition(name);
                if (position != -1) return this.#menus[position];
                return new Menu(name, description);
            }

            //Asigna un plato a un menú. Si algún argumento no existe se añade al sistema.
            assignDishToMenu(menu, ...dishes) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }

                for (let dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        // Si el plato no existe, se añade al sistema
                        this.addDish(dish);
                    }
                }

                let positionMenu = this.#getMenuPosition(menu.name);
                if (positionMenu === -1) {
                    // Si el menú no existe, se añade al sistema
                    this.addMenu(menu);
                    positionMenu = this.#getMenuPosition(menu.name);
                }

                for (let dish of dishes) {
                    let positionDish = this.#getDishPosition(dish.name);
                    if (positionDish === -1) {
                        throw new DishNotExistsException(dish);
                    }

                    // Verificar si el plato ya existe en el menú
                    if (this.#menus[positionMenu].dishes.includes(this.#dishes[positionDish])) {
                        throw new DishExistInMenuException(dish, menu);
                    }

                    this.#menus[positionMenu].dishes.push(this.#dishes[positionDish]);
                }
            }

            //Desasigna un plato de un menú.
            deassignDishToMenu(menu, ...dishes) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }

                for (let dish of dishes) {
                    if (!(dish instanceof Dish)) {
                        throw new ObjecManagerException('dish', 'Dish');
                    }
                }

                let positionMenu = this.#getMenuPosition(menu.name);
                if (positionMenu === -1) {
                    throw new MenuNotExistsException(menu);
                }

                for (let dish of dishes) {
                    let positionDish = this.#getDishPosition(dish.name);
                    if (positionDish === -1) {
                        throw new DishNotExistsException(dish);
                    }

                    let dishIndex = this.#menus[positionMenu].dishes.indexOf(this.#dishes[positionDish]);
                    if (dishIndex === -1) {
                        throw new DishNotExistInMenuException(dish, menu);
                    }

                    this.#menus[positionMenu].dishes.splice(dishIndex, 1);
                }
            }

            //Elimina un menú.
            removeMenu(...menus) {
                for (let menu of menus) {
                    if (!(menu instanceof Menu)) {
                        throw new ObjecManagerException('menu', 'Menu');
                    }
                    let position = this.#getMenuPosition(menu.name);
                    if (position !== -1) {
                        this.#menus.splice(position, 1);
                    } else {
                        throw new MenuExistsException(menu);
                    }
                }
                return this;
            }


        }
        let instance = new RestaurantsManager();//Devolvemos el objeto RestaurantsManager para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } //Fin del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();
export default RestaurantsManager;