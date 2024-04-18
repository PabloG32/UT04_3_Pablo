"use strict";
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException
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

class ManuExistsException extends ManagerException {
    constructor(menu, fileName, lineNumber) {
        super(`Error: The ${menu.name} already exists in the manager.`, fileName, lineNumber);
        this.menu = menu;
        this.name = 'ManuExistsException';
    }
}

class AllergenExistsException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The ${allergen.name} already exists in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenExistsException';
    }
}

class RestaurantExistsException extends ManagerException {
    constructor(restaurant, fileName, lineNumber) {
        super(`Error: The ${restaurant.name} already exists in the manager.`, fileName, lineNumber);
        this.restaurant = restaurant;
        this.name = 'RestaurantExistsException';
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

            //Dado un plato, devuelve su posición
            //Comparamos por contenido no por referencia.
            #getDishPosition(dish) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dish', 'Dish');
                }

                function compareElements(element) {
                    return (element.dish.name === dish.name)
                }

                return this.#dishes.findIndex(compareElements);
            }

            //Dado una categoría, devuelve su posición
            //Comparamos por contenido no por referencia.
            #getCategoryPosition(category) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }

                function compareElements(element) {
                    return (element.category.name === category.name)
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
            #getMenuPosition(menu) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }

                function compareElements(element) {
                    return (element.menu.name === menu.name);
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
            addDish(...dish) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dish', 'Dish');
                }
                let position = this.#getDishPosition(dish);
                if (position === -1) {
                    this.#dishes.push({
                        dish: dish
                    });
                } else {
                    throw new DishExistsException(dish);
                }

                return this;
            }


            //Añade una nueva categoria
            addCategory(...category) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }
                let position = this.#getCategoryPosition(category);
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las imágenes dentro de la categoría
                    this.#categories.push(
                        {
                            category: category,
                            dishes: []
                        }
                    );
                } else {
                    throw new CategoryExistsException();
                }

                return this;
            }

            //Elimina una categoría
            removeCategory(category) {
                if (!(category instanceof Category)) {
                    throw new CategoryImageManagerException();
                }
                let position = this.#getCategoryPosition(category);
                if (position !== -1) {
                    // Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
                    let restPositions = Array.from(Array(this.#categories.length), (el, i) => i);
                    restPositions.splice(position, 1);
                    restPositions.splice(0, 1);
                    // Recorremos todos los platos de la categoría que estamos borrando 
                    for (let dish of this.#categories[position].dishes) {
                        let insertInDefault = true;
                        for (let index of restPositions) { // Chequeamos si cada imagen pertenece a otra categoría que no sea la de por defecto
                            if (this.#getDishPosition(dish, this.#categories[index].dishes) > -1) {
                                insertInDefault = false;
                                break;
                            }
                        }
                        if (insertInDefault) this.#categories[0].dishes.push(dish);
                    }
                    this.#categories.splice(position, 1);
                } else {
                    throw new CategoryNotExistsImageManagerException();
                }
                return this;
            }


            //Añade un nuevo menu
            addMenu(...menu) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }
                let position = this.#getMenuPosition(menu);
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las imágenes dentro de la categoría
                    this.#menus.push(
                        {
                            menu: menu,
                            dishes: []
                        }
                    );
                } else {
                    throw new ManuExistsException();
                }

                return this;
            }

            //Elimina un menu
            removeMenu(menu) {
                if (!(menu instanceof Menu)) {
                    throw new ObjecManagerException('menu', 'Menu');
                }
                let position = this.#getMenuPosition(menu);
                if (position !== -1) {
                    // Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
                    let restPositions = Array.from(Array(this.#menus.length), (el, i) => i);
                    restPositions.splice(position, 1);
                    restPositions.splice(0, 1);
                    // Recorremos todos los platos de la categoría que estamos borrando 
                    for (let dish of this.#menus[position].dishes) {
                        let insertInDefault = true;
                        for (let index of restPositions) { // Chequeamos si cada imagen pertenece a otra categoría que no sea la de por defecto
                            if (this.#getDishPosition(dish, this.#menus[index].dishes) > -1) {
                                insertInDefault = false;
                                break;
                            }
                        }
                        if (insertInDefault) this.#menus[0].dishes.push(dish);
                    }
                    this.#menus.splice(position, 1);
                } else {
                    throw new CategoryNotExistsImageManagerException();
                }
                return this;
            }

            //Añade un nuevo alergeno
            addAllergen(...allergen) {
                if (!(allergen instanceof Allergen)) {
                    throw new ObjecManagerException('allergen', 'Allergen');
                }
                let position = this.#getCategoryPosition(allergen);
                if (position === -1) {
                    // Añade objeto literal con una propiedad para la categoría y un array para las imágenes dentro de la categoría
                    this.#allergenes.push(
                        {
                            allergen: allergen,
                            dishes: []
                        }
                    );
                } else {
                    throw new AllergenExistsException();
                }

                return this;
            }

            //Elimina un alergeno
            removeAllergen(allergen) {
                if (!(allergen instanceof Allergen)) {
                    throw new ObjecManagerException('allergen', 'Allergen');
                }
                let position = this.#getAllergenPosition(allergen);
                if (position !== -1) {
                    // Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
                    let restPositions = Array.from(Array(this.#allergenes.length), (el, i) => i);
                    restPositions.splice(position, 1);
                    restPositions.splice(0, 1);
                    // Recorremos todos los platos de la categoría que estamos borrando 
                    for (let dish of this.#allergenes[position].dishes) {
                        let insertInDefault = true;
                        for (let index of restPositions) { // Chequeamos si cada imagen pertenece a otra categoría que no sea la de por defecto
                            if (this.#getDishPosition(dish, this.#allergenes[index].dishes) > -1) {
                                insertInDefault = false;
                                break;
                            }
                        }
                        if (insertInDefault) this.#allergenes[0].dishes.push(dish);
                    }
                    this.#allergenes.splice(position, 1);

                } else {
                    throw new CategoryNotExistsImageManagerException();
                }
                return this;
            }

            //Añade un nuevo restaurante
            addRestaurant(...restaurant) {
                if (!(restaurant instanceof Restaurant)) {
                    throw new ObjecManagerException('restaurant', 'Restaurant');
                }
                let position = this.#getRestaurantPosition(restaurant);
                if (position === -1) {
                    this.#restaurants.push(
                        {
                            restaurant: restaurant
                        }
                    );
                } else {
                    throw new AllergenExistsException();
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