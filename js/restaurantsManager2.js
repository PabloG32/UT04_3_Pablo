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

class AllergenNotExistException extends ManagerException {
    constructor(allergen, fileName, lineNumber) {
        super(`Error: The ${allergen.name} doesn't exists in the manager.`, fileName, lineNumber);
        this.allergen = allergen;
        this.name = 'AllergenNotExistException';
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

class AllergenExistInDishException extends ManagerException {
    constructor(allergen, dish, fileName, lineNumber) {
        super(`Error: The ${allergen.name} already exist in ${dish.name}.`, fileName, lineNumber);
        this.allergen = allergen;
        this.dish = dish;
        this.name = 'AllergenExistInDishException';
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

class AllergenNotExistInDishException extends ManagerException {
    constructor(dish, allergen, fileName, lineNumber) {
        super(`Error: The ${allergen.name} doesn't exist in ${dish.name}.`, fileName, lineNumber);
        this.allergen = allergen;
        this.dish = dish;
        this.name = 'AllergenNotExistInDishException';
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

                Object.defineProperty(this, 'allergenes', {
                    enumerable: true,
                    get() {
                        const array = this.#allergenes;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayAllergen of array) {
                                    yield arrayAllergen.allergen;
                                }
                            },
                        };
                    },
                });

                Object.defineProperty(this, 'restaurants', {
                    enumerable: true,
                    get() {
                        const array = this.#restaurants;
                        return {
                            *[Symbol.iterator]() {
                                for (const restaurant of array) {
                                    yield restaurant;
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
            #getAllergenPosition(name) {
                function compareElements(element) {
                    return (element.allergen.name === name)
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
            #getRestaurantPosition(name) {
                function compareElements(element) {
                    return (element.name === name);
                }
                return this.#restaurants.findIndex(compareElements);
            }

            //Obtiene un iterador con la relación de los platos a una categoría. El iterador puede estar ordenado.
            *getDishesInCategory(category, ordered) {
                if (!(category instanceof Category)) {
                    throw new ObjecManagerException('category', 'Category');
                }

                let positionCat = this.#getCategoryPosition(category.name);
                if (positionCat === -1) {
                    throw new CategoryNotExistException(category);
                }
                let dishes;
                if (ordered) {
                    dishes = [...this.#categories[positionCat].dishes];
                    dishes.sort(ordered);
                } else {
                    dishes = this.#categories[positionCat].dishes;
                }

                for (let dish of dishes) {
                    yield dish;
                }

            }

            // Obtiene un iterador con los platos que tienen un determinado alérgeno.
            // El iterador puede estar ordenado.
            *getDishesWithAllergen(allergen, ordered) {
                if (!(allergen instanceof Allergen)) {
                    throw new ObjecManagerException('allergen', 'Allergen');
                }

                let positionAllergen = this.#getAllergenPosition(allergen.name);
                if (positionAllergen === -1) {
                    throw new AllergenNotExistException(allergen);
                }

                let dishes = [];
                for (let dish of this.#dishes) {
                    if (dish.allergenes.includes(this.#allergenes[positionAllergen])) {
                        dishes.push(dish);
                    }
                }

                if (ordered) {
                    dishes.sort(ordered);
                }

                return {
                    [Symbol.iterator]: function* () {
                        for (let dish of dishes) {
                            yield dish;
                        }
                    }
                };
            }


            //Obtiene un iterador que cumpla un criterio concreto en base a una función de callback. El iterador puede estar ordenado.
            *findDishes(filter, ordered) {
                let dishes;
                if (ordered) {
                    dishes = [...this.#dishes];
                    dishes.sort(ordered);
                } else {
                    dishes = this.#dishes;
                }

                for (let dish of dishes) {
                    if (filter(dish)) {
                        yield dish
                    }

                }
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


            //*****************************************************************DISH***********************************************************************************

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


            //**************************************************CATEGORY*********************************************************************************************************

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

                let positionCat = this.#getCategoryPosition(category.name);
                if (positionCat === -1) {
                    this.addCategory(category);
                    positionCat = this.#getCategoryPosition(category.name);
                }

                for (let dish of dishes) {
                    let positionDish = this.#getDishPosition(dish.name);
                    if (positionDish === -1) {
                        this.addDish(dish);
                        positionDish = this.#getCategoryPosition(dish.name);
                    }

                    // Verificar si el plato ya existe en la categoría
                    if (this.#categories[positionCat].dishes.includes(this.#dishes[positionDish])) {
                        throw new DishExistInCategoryException(dish, category);
                    }

                    this.#categories[positionCat].dishes.push(this.#dishes[positionDish]);
                }
                return this;
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
                return this;
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


            //***************************************************MENU****************************************************************************************************


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
                        throw new ObjecManagerException('dish', 'Dish');
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
                        this.addDish(dish);
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

            // Añade el método changeDishesPositionsInMenu a la clase RestaurantsManager
            changeDishesPositionsInMenu(menu, dish1, dish2) {
                let positionMenu = this.#getMenuPosition(menu.name);
                if (positionMenu === -1) {
                    throw new MenuNotExistsException(menu);
                }
                // Verificar que ambos platos no sean nulos y estén registrados
                if (!dish1 || !this.#dishes.find(d => d === dish1) || !dish2 || !this.#dishes.find(d => d === dish2)) {
                    throw new DishNotExistsException(!dish1 ? dish1 : dish2);
                }

                // Obtener el menú y las posiciones de los platos
                const menuIndex = this.#getMenuPosition(menu.name);
                const dish1Index = this.#getDishPosition(dish1.name);
                const dish2Index = this.#getDishPosition(dish2.name);

                // Intercambiar las posiciones de los platos en el menú
                const temp = this.#menus[menuIndex].dishes[dish1Index];
                this.#menus[menuIndex].dishes[dish1Index] = this.#menus[menuIndex].dishes[dish2Index];
                this.#menus[menuIndex].dishes[dish2Index] = temp;

                return this;
            }




            //********************************************************************ALERGENOS****************************************************************************************

            //Añade un nuevo alérgeno.
            addAllergen(...allergens) {
                for (let allergen of allergens) {
                    if (!(allergen instanceof Allergen)) {
                        throw new ObjecManagerException('allergen', 'Allergen');
                    }
                    let position = this.#getAllergenPosition(allergen.name);
                    if (position === -1) {
                        this.#allergenes.push(
                            {
                                allergen: allergen,
                                dishes: []
                            }
                        );
                    } else {
                        throw new AllergenExistsException(allergen);
                    }
                }
                return this;
            }



            //Devuelve un objeto Allergen si está registrado, o crea un nuevo.
            createAllergen(name, description = "") {
                let position = this.#getAllergenPosition(name);
                if (position != -1) return this.#allergenes[position];
                return new Allergen(name, description);
            }

            assignAllergenToDish(dish, ...allergens) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dish', 'Dish');
                }

                for (let allergen of allergens) {
                    if (!(allergen instanceof Allergen)) {
                        throw new ObjecManagerException('allergen', 'Allergen');
                    }
                }

                let positionDish = this.#getDishPosition(dish.name);
                if (positionDish === -1) {
                    this.addDish(dish);
                    positionDish = this.#getDishPosition(dish.name);
                }

                for (let allergen of allergens) {
                    let positionAllergen = this.#getAllergenPosition(allergen.name);
                    if (positionAllergen === -1) {
                        this.addAllergen(allergen);
                        positionAllergen = this.#getAllergenPosition(allergen.name);
                    }

                    // Verificar si el alérgeno ya existe en el plato
                    if (this.#dishes[positionDish].allergenes.includes(this.#allergenes[positionAllergen])) {
                        throw new AllergenExistInDishException(allergen);
                    }

                    this.#dishes[positionDish].allergenes.push(this.#allergenes[positionAllergen]);
                }

                return this;
            }





            //Desasigna un alérgeno.
            deassignAllergenToDish(dish, ...allergenes) {
                if (!(dish instanceof Dish)) {
                    throw new ObjecManagerException('dish', 'Dish');
                }

                for (let allergen of allergenes) {
                    if (!(allergen instanceof Allergen)) {
                        throw new ObjecManagerException('allergen', 'Allergen');
                    }
                }

                let positionDish = this.#getDishPosition(dish.name);
                if (positionDish === -1) {
                    throw new DishNotExistsException(dish);
                }

                for (let allergen of allergenes) {
                    let positionAllergen = this.#getCategoryPosition(allergen.name);
                    if (positionAllergen === -1) {
                        throw new AllergenNotExistException(allergen);
                    }

                    // Verificar si el allergeno existe en el plato
                    let dishIndex = this.#dishes[positionDish].allergenes.findIndex(item => item === this.#allergenes[positionAllergen]);
                    if (dishIndex === -1) {
                        throw new AllergenNotExistInDishException(dish, allergen);
                    }

                    this.#dishes[positionDish].allergenes.splice(dishIndex, 1);
                }
                return this;
            }



            //*****************************************************RESTAURANT**********************************************************************************************


            //Añade un nuevo restaurante.
            addRestaurant(...restaurants) {
                for (let restaurant of restaurants) {
                    if (!(restaurant instanceof Restaurant)) {
                        throw new ObjecManagerException('restaurant', 'Restaurant');
                    }
                    let position = this.#getRestaurantPosition(restaurant.name);
                    if (position === -1) {
                        this.#restaurants.push(restaurant);
                    } else {
                        throw new RestaurantExistsException(restaurant);
                    }
                }
                return this;
            }

            //Devuelve un objeto Restaurant si está registrado, o crea un nuevo.
            createRestaurant(name, description = "", location = "") {
                let position = this.#getRestaurantPosition(name);
                if (position != -1) return this.#restaurants[position];
                return new Restaurant(name, description, location);
            }

            //Elimina un restaurante.
            removeRestaurant(...restaurants) {
                for (let restaurant of restaurants) {
                    if (!(restaurant instanceof Restaurant)) {
                        throw new ObjecManagerException('restaurant', 'Restaurant');
                    }
                    let position = this.#getRestaurantPosition(restaurant.name);
                    if (position !== -1) {
                        this.#restaurants.splice(position, 1);
                    } else {
                        throw new RestaurantNotExistsException(restaurant);
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