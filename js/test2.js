
import { Dish, Category, Allergen, Menu, Restaurant, Coordinate, } from './entities/restaurante.js';
import RestaurantsManager from './restaurantsManager.js';

const manager = RestaurantsManager.getInstance();

//Funciones

function showDish() { //Recorremos los platos.
    console.log("Recorremos los platos:");
    for (let dish of manager.dishes) {
        console.log("   -Dish: " + dish.name);
    }
}

function showCategory() { //Recorremos las categorias.
    console.log("Recorremos las categorias:");
    for (let cat of manager.categories) {
        console.log("   -Category: " + cat.name);
    }
}

function showMenus() { //Recorremos los menus.
    console.log("Recorremos los menus:");
    for (let m of manager.menus) {
        console.log("   -Menu: " + m.name);
    }
}

function showAllergenos() { //Recorremos los alergenos.
    console.log("Recorremos los alergenos:");
    for (let allergen of manager.allergenes) {
        console.log("   -Alergenos: " + allergen.name);
    }
}

function showRestaurant() { //Recorremos los menus.
    console.log("Recorremos los restaurantes:");
    for (let restaurant of manager.restaurants) {
        console.log("   -Restaurant: " + restaurant.name);
    }
}


console.log("------------------------------Dish--------------------------------------------------");

// // Añadir platos
const plato1 = new Dish("Plato 1");
const plato2 = new Dish("Plato 2");

try {
    manager.addDish(plato1, plato2);
    console.log("Platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// // Intentar añadir el mismo plato nuevamente debería lanzar un error
try {
    manager.addDish(plato1);
} catch (error) {
    console.error(error.message);
}

showDish();

console.log("------------------------------Categoria--------------------------------------------------");
//Añadir cat
const cat1 = new Category("Carne");
const cat2 = new Category("Pescado");

//Añadir categoria
try {
    manager.addCategory(cat1, cat2);
    console.log("Categorias añadidas correctamente");
} catch (error) {
    console.error(error.message);
}
showCategory();

//Borrar categoria
try {
    manager.removeCategory(cat1);
    console.log("Categorias borrada correctamente");
} catch (error) {
    console.error(error.message);
}
showCategory();


console.log("-----------------------------Menu---------------------------------------------------");
const menu1 = new Menu("Las gambitas");
const menu2 = new Menu("Los tallarines");

try {
    manager.addMenu(menu1, menu2);
    console.log("Menus añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

console.log(menu1);
showMenus();


try {
    manager.removeMenu(menu2);
    console.log("Menu borrado correctamente");
} catch (error) {
    console.error(error.message);
}
showMenus();


console.log("------------------------------Allergen--------------------------------------------------");

const allergen1 = new Allergen("lacteos");
const allergen2 = new Allergen("cacahuete");

try {
    manager.addAllergen(allergen1, allergen2);
    console.log("Alergenos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}
showAllergenos();

//Borrar alergeno
try {
    manager.removeAllergen(allergen1);
    console.log("Alergeno borrado correctamente");
} catch (error) {
    console.error(error.message);
}
showAllergenos()


console.log("------------------------------Restaurant--------------------------------------------------");

const rest1 = new Restaurant("La casa");
const rest2 = new Restaurant("portalon");

try {
    manager.addRestaurant(rest1, rest2);
    console.log("Restaurantes añadidos correctamente");
} catch (error) {
    console.error(error.message);
}
showRestaurant();