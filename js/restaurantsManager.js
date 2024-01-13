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

const RestaurantsManager = (function () {
    let instantiated;

    class RestaurantsManager {
        #systemName;
        #categories;
        #allergenTypes;
        #dishes;
        #menus;
        #restaurants;

        constructor(systemName) {
            // Verificación de parámetros
            if (!systemName) throw new Error("El nombre del sistema es obligatorio.");

            this.#systemName = systemName;
            this.#categories = new Map();
            this.#allergenTypes = [];
            this.#dishes = [];
            this.#menus = [];
            this.#restaurants = [];

            instantiated = this;
        }

        // Métodos para agregar objetos a las colecciones
        addCategory(category) {
            if (!(category instanceof Category)) {
                throw new Error("La categoría debe ser un objeto de tipo Category.");
            }

            const existingCategory = this.#categories.get(category.name);
            if (existingCategory) {
                throw new Error("La categoría ya existe.");
            }

            this.#categories.set(category.name, category);

            // Permitir encadenamiento
            return this;
        }

        // Métodos para borrar objetos de las colecciones
        removeCategory(categoryName) {
            if (!this.#categories.has(categoryName)) {
                throw new Error("La categoría no está registrada.");
            }
            // Desasignar platos de la categoría antes de eliminarla
            this.#dishes.forEach((dish) => {
                const categoryIndex = dish.categories.indexOf(categoryName);
                if (categoryIndex !== -1) {
                    dish.categories.splice(categoryIndex, 1);
                }
            });

            // Eliminar la categoría del mapa
            this.#categories.delete(categoryName);

            // Permitir encadenamiento
            return this;
        }

        // Método para añadir un nuevo menú
        addMenu(menu) {
            if (!(menu instanceof Menu)) {
                throw new Error("El menú debe ser un objeto de tipo Menu.");
            }

            const existingMenu = this.#menus.find((existingMenu) => existingMenu.name === menu.name);
            if (existingMenu) {
                throw new Error("El menú ya existe.");
            }

            this.#menus.push(menu);

            // Permitir encadenamiento
            return this;
        }

        // Método para eliminar un menú
        removeMenu(menuName) {
            const index = this.#menus.findIndex((menu) => menu.name === menuName);

            if (index === -1) {
                throw new Error("El menú no está registrado.");
            }

            // Eliminar el menú del array
            this.#menus.splice(index, 1);

            // Permitir encadenamiento
            return this;
        }

        // Método para añadir un nuevo alérgeno
        addAllergen(allergen) {
            if (!(allergen instanceof Allergen)) {
                throw new Error("El alérgeno debe ser un objeto de tipo Allergen.");
            }

            const existingAllergen = this.#allergenTypes.find((existingAllergen) => existingAllergen.name === allergen.name);
            if (existingAllergen) {
                throw new Error("El alérgeno ya existe.");
            }

            this.#allergenTypes.push(allergen);

            // Permitir encadenamiento
            return this;
        }

        // Método para eliminar un alérgeno
        removeAllergen(allergenName) {
            const index = this.#allergenTypes.findIndex((allergen) => allergen.name === allergenName);

            if (index === -1) {
                throw new Error("El alérgeno no está registrado.");
            }

            // Eliminar el alérgeno del array
            this.#allergenTypes.splice(index, 1);

            // Permitir encadenamiento
            return this;
        }



        // Método para añadir un nuevo restaurante
        addRestaurant(restaurant) {
            if (!(restaurant instanceof Restaurant)) {
                throw new Error("El restaurante debe ser un objeto de tipo Restaurant.");
            }

            const existingRestaurant = this.#restaurants.find((existingRestaurant) => existingRestaurant.name === restaurant.name);
            if (existingRestaurant) {
                throw new Error("El restaurante ya existe.");
            }

            this.#restaurants.push(restaurant);

            // Permitir encadenamiento
            return this;
        }

        // Método para eliminar un restaurante
        removeRestaurant(restaurantName) {
            const index = this.#restaurants.findIndex((restaurant) => restaurant.name === restaurantName);

            if (index === -1) {
                throw new Error("El restaurante no está registrado.");
            }

            // Eliminar el restaurante del array
            this.#restaurants.splice(index, 1);

            // Permitir encadenamiento
            return this;
        }

        // Método para añadir un nuevo plato
        addDish(dish) {
            if (!(dish instanceof Dish)) {
                throw new Error("El plato debe ser un objeto de tipo Dish.");
            }

            const existingDish = this.#dishes.find((existingDish) => existingDish.name === dish.name);
            if (existingDish) {
                throw new Error("El plato ya existe.");
            }

            this.#dishes.push(dish);

            // Permitir encadenamiento
            return this;
        }

        // Método para asignar un plato a una categoría
        assignCategoryToDish(dishName, categoryName) {
            if (categoryName === null || dishName === null) {
                throw new Error("Category y Dish no pueden ser null.");
            }

            let category = this.#categories.get(categoryName);
            let dish = this.#dishes.find((existingDish) => existingDish.name === dishName);

            // Si la categoría no existe, la añadimos al sistema
            if (!category) {
                category = new Category(categoryName, `Descripción de ${categoryName}`);
                this.addCategory(category);
            }

            // Si el plato no existe, lo añadimos al sistema
            if (!dish) {
                dish = new Dish(dishName, `Descripción de ${dishName}`);
                this.addDish(dish);
            }

            // Asignamos el plato a la categoría
            category.assignDish(dish);

            // Permitir encadenamiento
            return this;
        }

        // Método para desasignar un plato de una categoría
        deassignCategoryToDish(dishName, categoryName) {
            if (categoryName === null || dishName === null) {
                throw new Error("Category y Dish no pueden ser null.");
            }

            const category = this.#categories.get(categoryName);
            const dish = this.#dishes.find((existingDish) => existingDish.name === dishName);

            // Verificar si la categoría y el plato están registrados
            if (!category) {
                throw new Error("La categoría no está registrada.");
            }

            if (!dish) {
                throw new Error("El plato no está registrado.");
            }

            // Desasignar el plato de la categoría
            category.deassignDish(dish);

            // Permitir encadenamiento
            return this;
        }
    }





    return {
        getInstance(systemName) {
            if (!instantiated) {
                instantiated = new RestaurantsManager(systemName);
            }

            return instantiated;
        }
    };
})();

export default RestaurantsManager;