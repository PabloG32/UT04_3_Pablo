
import { Dish, Category, Allergen, Menu, Restaurant, Coordinate, } from './entities/restaurante.js';
import RestaurantsManager from './restaurantsManager.js';



const miPlato = new Dish("Nombre del Plato", "Descripción del Plato", ["Ingrediente1", "Ingrediente2"], "/ruta/imagen.jpg");

console.log(miPlato.toString());


const miCategoria = new Category("Nombre de la Categoría", "Descripción de la Categoría");
console.log(miCategoria.toString());

const miRestaurante = new Restaurant("Nombre del Restaurante", "Descripción del Restaurante", new Coordinate(40.7128, -74.0060));
console.log(miRestaurante.toString());

const manager1 = RestaurantsManager.getInstance("MiSistema");

console.log(manager1);

console.log("---------------------------------------------")

// Asegúrate de proporcionar la ruta correcta

const manager = RestaurantsManager.getInstance();

// Añadir categorías
const categoria1 = new Category("Categoria 1");
const categoria2 = new Category("Categoria 2");

try {
    manager.addCategory(categoria1, categoria2);
    console.log("Categorías añadidas correctamente");
} catch (error) {
    console.error(error);
}

// Intentar añadir la misma categoría nuevamente debería lanzar un error
try {
    manager.addCategory(categoria1);
} catch (error) {
    console.error(error.message);
}

// Iterar sobre las categorías
console.log("Categorías existentes:");
for (const category of manager.categories) {
    console.log(category.name);
}


// Añadir platos
const plato1 = new Dish("Plato 1");
const plato2 = new Dish("Plato 2");

try {
    manager.addDish(plato1, plato2);
    console.log("Platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar añadir el mismo plato nuevamente debería lanzar un error
try {
    manager.addDish(plato1);
} catch (error) {
    console.error(error.message);
}

// Obtener la lista de platos
console.log("Platos existentes:");
const dishes = manager.dishes;
for (const dish of dishes) {
    console.log(dish.name);
}

// Añadir categoría y platos
const categoria = new Category("CategoriaA");
const plato3 = new Dish("Plato 3");
const plato4 = new Dish("Plato 4");

try {
    manager.assignCategoryToDish(categoria, plato3, plato4);
    console.log("Categoría y platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar añadir el mismo plato en la misma categoría debería lanzar un error
try {
    manager.assignCategoryToDish(categoria, plato3);
} catch (error) {
    console.error(error.message);
}

// Obtener la lista de categorías y sus platos
console.log("Categorías existentes:");
const categories = manager.categories;
for (const category of categories) {
    console.log(`Categoría: ${category.name}`);

    // Obtener los platos solo en su categoría
    const categoryDishes = manager.getCategoryDishes(category);

    for (const dish of categoryDishes) {
        console.log(`  - Plato: ${dish.name}`);
    }
}