
import RestaurantsManager from './restaurantsManager2.js';

const manager = RestaurantsManager.getInstance();

//Funciones


console.log("------------------------------Dish--------------------------------------------------");

// // Añadir platos
const plato1 = manager.createDish("Plato 1");
const plato2 = manager.createDish("Plato 2");
const plato3 = manager.createDish("Plato 3");
const plato4 = manager.createDish("Plato 4");
const plato5 = manager.createDish("Plato 5");

try {
    manager.addDish(plato1, plato2, plato3, plato4);
    console.warn("Platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// // // Intentar añadir el mismo plato nuevamente debería lanzar un error
// try {
//     manager.addDish(manager.createDish("Plato 1"));
// } catch (error) {
//     console.error(error.message);
// }


// for (let dish of manager.dishes) {
//     console.log(dish.toString());
// }



console.log("------------------------------Categoria--------------------------------------------------");

const cat1 = manager.createCategory("Carne");
const cat2 = manager.createCategory("Pescado");
const cat3 = manager.createCategory("Verde");
const cat4 = manager.createCategory("Pollo");

try {
    manager.addCategory(cat1, cat2, cat3);
    console.warn("Categorias añadidas correctamente");
} catch (error) {
    console.error(error.message);
}

// // // Intentar añadir la misma cat nuevamente debería lanzar un error
// try {
//     manager.addCategory(cat1);
// } catch (error) {
//     console.error(error.message);
// }

// for (let category of manager.categories) {
//     console.log(category.toString());
// }

// //Asignar categorias a platos
try {
    manager.assignCategoryToDish(cat1, plato2, plato1);
    manager.assignCategoryToDish(cat1, plato3, plato4);
    console.warn("Asignado correctamente");
} catch (error) {
    console.error(error.message);

}

// //Error por que ese plato ya esta en esa categoria
// try {
//     manager.assignCategoryToDish(cat1, plato1);
//     console.warn("Asignado correctamente:");
// } catch (error) {
//     console.error(error.message);

// }

// //Uso del getDishInCategory
// try {
//     let dishcat4 = manager.getDishesInCategory(cat1, (elemA, elemB) => {
//         let order = elemA.name < elemB.name ? -1 : 1;
//         return order;
//     });
//     console.warn("Platos de la categoria 1:")
//     for (const dish of dishcat4) {
//         console.log(dish.toString())
//     }
// } catch (error) {
//     console.error(error.message);
// }

// //Uso del findDish
// try {
//     let foundDishes = manager.findDishes((dish) => dish.name === 'Plato 3' || dish.name === 'Plato 2');
//     console.warn("Busando platos 2 y 3:")
//     for (const dish of foundDishes) {
//         console.log(dish.toString())
//     }
// } catch (error) {
//     console.error(error.message);
// }


// //Error por intentar desasignar un plato que no existe
// try {
//     manager.deassignCategoryToDish(cat1, plato5);
//     console.warn("Desasignado correctamente:");
// } catch (error) {
//     console.error(error.message);

// }

// //Borrar una categoria
// try {
//     manager.removeCategory(cat4);
//     console.warn("Categoria borrada correctamente:");
// } catch (error) {
//     console.error(error.message);

// }

// try {
//     let dishcat4 = manager.getDishesInCategory(cat1, (elemA, elemB) => {
//         let order = elemA.name < elemB.name ? -1 : 1;
//         return order;
//     });
//     console.log("Platos de la cat1:")
//     for (const dish of dishcat4) {
//         console.log(dish.toString())
//     }
// } catch (error) {
//     console.error(error.message);
// }




console.log("-----------------------------Menu---------------------------------------------------");

const menu1 = manager.createMenu("Las gambitas");
const menu2 = manager.createMenu("Los tallarines");
const menu3 = manager.createMenu("Comida marina");
const menu4 = manager.createMenu("Tres delicias");

try {
    manager.addMenu(menu1, menu2, menu3);
    console.warn("Menus añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// // //Añade un o varios platos al menu
try {
    manager.assignDishToMenu(menu1, plato1, plato2, plato3);
    console.warn("Plato/s añadidos al menu correctamente");
} catch (error) {
    console.error(error.message);
}

// console.log(manager);

// try {
//     manager.changeDishesPositionsInMenu(menu1, plato1, plato3);
//     console.warn("Posiciones cambiadas correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// console.log(manager);

// //Error por añadir un plato que no existe
// try {
//     manager.assignDishToMenu(menu1, plato4);
//     console.warn("Plato/s añadidos al menu correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// //Desasignar un plato
// try {
//     manager.deassignDishToMenu(menu1, plato2);
//     console.warn("Plato/s desasignados correctamente del menu");
// } catch (error) {
//     console.error(error.message);
// }

// for (let menu of manager.menus) {
//     console.log(menu.toString());
// }

// //Borrar un menu
// try {
//     manager.removeMenu(menu1);
//     console.warn("Menu borrado correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// for (let menu of manager.menus) {
//     console.log(menu.toString());
// }




console.log("------------------------------Allergen--------------------------------------------------");

const aler1 = manager.createAllergen("Huevo");
const aler2 = manager.createAllergen("Frutos secos");
const aler3 = manager.createAllergen("Lacteos");
const aler4 = "";

try {
    manager.addAllergen(aler1, aler2, aler3);
    console.warn("Alergeno añadido correctamnete");
} catch (error) {
    console.error(error.message);
}


//Borrar alergeno
// try {
//     manager.removeAllergen(aler2);
//     console.warn("Alergeno borrado correctamnete");
// } catch (error) {
//     console.error(error.message);
// }


// //Error por que ese alergeno ya existe
// try {
//     manager.addAllergen(aler2);
//     console.warn("Alergeno añadido correctamnete");
// } catch (error) {
//     console.error(error.message);
// }


// //Asignar alergenos a un plato
try {
    manager.assignAllergenToDish(plato1, aler1, aler2, aler3);
    console.warn("Alergenos asiganados correctamente");
} catch (error) {
    console.error(error.message);
}

// console.log(manager);


// //Asignar alergenos a un plato
// try {
//     manager.deassignAllergenToDish(plato1, aler1);
//     console.warn("Desasignado correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// console.log(manager);

console.log("------------------------------Restaurants--------------------------------------------------");
const restaurant1 = manager.createRestaurant("La casona");
const restaurant2 = manager.createRestaurant("La Fresita");

try {
    manager.addRestaurant(restaurant1, restaurant2);
    console.warn("Restaurantes añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// for (let restaurant of manager.restaurants) {
//     console.log(restaurant.toString());
// }

// try {
//     manager.removeRestaurant(restaurant2);
//     console.warn("Restaurantes borrado correctamente");
// } catch (error) {
//     console.error(error.message);
// }

// for (let restaurant of manager.restaurants) {
//     console.log(restaurant.toString());
// }


try {
    manager.removeDish(plato1);
    console.warn("Plato borrado");
} catch (error) {
    console.error(error.message);
}

console.log(manager);