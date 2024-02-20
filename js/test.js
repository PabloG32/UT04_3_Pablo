
import { Dish, Category, Allergen, Menu, Restaurant, Coordinate, } from './entities/restaurante.js';
import RestaurantsManager from './restaurantsManager.js';

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

// Mostrar el toString
let result = manager.toString();
console.log("Mostrar el toString: ");
console.log(result);

try {
    manager.removeCategory(categoria1);
    console.log("Eliminado bien, despues de eliminar la Categoria 1:")
    result = manager.toString();
    console.log(result);

} catch (error) {
    console.error(error.message);
}

console.log('-----------------------------------------------------------------------------------------------------')

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

try {
    manager.assignCategoryToDish(categoria2, plato1, plato2);
    console.log("Categoría y platos asignados correctamente");
} catch (error) {
    console.error(error.message);
}

// // Obtener la lista de categorías y sus platos
result = manager.toString();
console.log("Lista de categoria con sus platos:");
console.log(result);

//Borrar dish
try {
    manager.removeDish(plato1);
    console.log('Despues de borrar el plato 1:');
} catch (error) {
    console.error(error.message);
}

// Añadir categoría y platos
const categoria3 = new Category("Categoria 3");
const plato3 = new Dish("Plato 3");
const plato4 = new Dish("Plato 4");

try {
    manager.assignCategoryToDish(categoria3, plato3, plato4);
    console.log("Categoría y platos asignados correctamente");
} catch (error) {
    console.error(error.message);
}

// // Intentar añadir el mismo plato en la misma categoría debería lanzar un error
try {
    manager.assignCategoryToDish(categoria3, plato3);
} catch (error) {
    console.error(error.message);
}

// // Obtener la lista de categorías y sus platos
result = manager.toString();
console.log("Lista de categoria con sus platos:");
console.log(result);

console.log("----------------------------------------------------------------------------------------------------");

// // Añadir alérgenos
const alergeno1 = new Allergen("Alergeno 1");
const alergeno2 = new Allergen("Alergeno 2");

try {
    manager.addAllergen(alergeno1, alergeno2);
    console.log("Alérgenos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar añadir el mismo alérgeno nuevamente debería lanzar un error
try {
    manager.addAllergen(alergeno1);
} catch (error) {
    console.error(error.message);
}

// // Obtener la lista de allergenos
console.log('Alergenos en el sistema:');
for (const allergen of manager.getAllergens()) {
    console.log(allergen.name);
}

// // Intentar eliminar un alérgeno existente
try {
    manager.removeAllergen(alergeno1);
    console.log("Alérgeno eliminado correctamente, despues de borrar el alergeno 1:");
    for (const allergen of manager.getAllergens()) {
        console.log(allergen.name);
    }
} catch (error) {
    console.error(error.message);
}

// // Intentar eliminar el mismo alérgeno nuevamente debería lanzar un error
try {
    manager.removeAllergen(alergeno1);
} catch (error) {
    console.error(error.message);
}

console.log("----------------------------------------------------------------------------------------------------");

// // Añadir menús
const menu1 = new Menu("Menu 1");
const menu2 = new Menu("Menu 2");
const menu3 = new Menu("Menu 3");
const menu4 = new Menu("Menu 4");

try {
    manager.addMenu(menu1, menu2, menu3, menu4);
    console.log("Menús añadidos correctamente:");
} catch (error) {
    console.error(error.message);
}

//Mostrar los menus
for (const menu of manager.getMenus()) {
    console.log(menu.name);
}

// // Intentar añadir el mismo menú nuevamente debería lanzar un error
try {
    manager.addMenu(menu1);
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar un menú existente
try {
    manager.removeMenu(menu3);
    console.log("Menú eliminado correctamente, despues de borrar el menu 3:");
    for (const menu of manager.getMenus()) {
        console.log(menu.name);
    }
} catch (error) {
    console.error(error.message);
}

// // Mostrar los menús restantes
// console.log("Menús existentes después de eliminar:");
// const menus1 = manager.menus;
// for (const menu of menus1) {
//     console.log(`Menú: ${menu.name}`);
// }

// // Añadir un plato y alérgenos
// const plato56 = new Dish("Plato56");
// const alergeno5 = new Allergen("Alergeno 5");
// const alergeno6 = new Allergen("Alergeno 6");

// try {
//     manager.assignCategoryToDish(categoria6, plato56);
//     console.log("Categoría y plato añadidos correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// try {
//     manager.assignAllergenToDish(plato56, alergeno5, alergeno6);
//     console.log("Plato y alérgenos asignados correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// // Intentar asignar los mismos alérgenos al mismo plato nuevamente debería lanzar un error
// try {
//     manager.assignAllergenToDish(plato56, alergeno5, alergeno6);
// } catch (error) {
//     console.error(error.message);
// }

// // Intentar asignar alérgenos a un plato que no existe debería lanzar un error
// try {
//     manager.assignAllergenToDish(new Dish("PlatoInexistente"), alergeno5, alergeno6);
// } catch (error) {
//     console.error(error.message);
// }

// // Mostrar los alérgenos asignados al plato
// // const allergenosAsignados = manager.getDishAllergens(plato);
// // console.log("Alérgenos asignados al plato:");
// // for (const allergen of allergenosAsignados) {
// //     console.log(`Alérgeno: ${allergen.name}`);
// // }
// result = manager.toString();
// console.log("Representación en cadena del manager:");
// console.log(result)
console.log(manager);