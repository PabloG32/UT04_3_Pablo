
import RestaurantsManager from './restaurantsManager2.js';

const manager = RestaurantsManager.getInstance();

//Funciones


console.log("------------------------------Dish--------------------------------------------------");

// // Añadir platos
const plato1 = manager.createDish("Plato 1");
const platoCambio2 = manager.createDish("plato Cambio 2");
const plato2 = manager.createDish("Plato 2");
const plato3 = manager.createDish("Plato 3");
const plato4 = manager.createDish("Plato 4");
const platoCambio1 = manager.createDish("plato Cambio 1");
const plato5 = manager.createDish("Plato 5");
const platoBorrar = manager.createDish("Plato borrar");
const platoNoExiste = manager.createDish("No existe");
const platoNoObjeto = "";

//Añade los platos
try {
    manager.addDish(plato1, platoCambio2, plato2, plato3, platoCambio1, plato4, platoBorrar);
    console.warn("Platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

//Intentar añadir el mismo plato nuevamente debería lanzar un error
try {
    manager.addDish(manager.createDish("Plato 1"));
} catch (error) {
    console.error(error.message);
}

//Intentar añadir un plato que no es un Dish
try {
    manager.addDish(platoNoObjeto);
} catch (error) {
    console.error(error.message);
}


console.log("------------------------------Categoria--------------------------------------------------");

const cat1 = manager.createCategory("Carne");
const cat2 = manager.createCategory("Pescado");
const cat3 = manager.createCategory("Verde");
const cat4 = manager.createCategory("Pollo");
const catBorrar = manager.createCategory("Borrar");

//Añadir las categorias
try {
    manager.addCategory(cat1, cat2, cat3, catBorrar);
    console.warn("Categorias añadidas correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar añadir la misma cat nuevamente debería lanzar un error
try {
    manager.addCategory(cat1);
} catch (error) {
    console.error(error.message);
}

//Mostrar las cat
for (let category of manager.categories) {
    console.log(category.toString());
}

//Asignar categorias a platos
try {
    manager.assignCategoryToDish(cat1, plato2, platoBorrar, plato1, plato3, plato4);
    console.warn("Asignado correctamente");
} catch (error) {
    console.error(error.message);

}

//Error por que ese plato ya esta en esa categoria
try {
    manager.assignCategoryToDish(cat1, plato3);
    console.warn("Asignado correctamente:");
} catch (error) {
    console.error(error.message);
}

// //Uso del getDishInCategory
try {
    let dishcat4 = manager.getDishesInCategory(cat1, (elemA, elemB) => {
        let order = elemA.name < elemB.name ? -1 : 1;
        return order;
    });
    console.log("Platos de la cat1:")
    for (const dish of dishcat4) {
        console.log(dish.toString())
    }
} catch (error) {
    console.error(error.message);
}

// //Uso del findDish
try {
    let foundDishes = manager.findDishes((dish) => dish.name === 'Plato 3' || dish.name === 'Plato 2');
    console.warn("Busando platos 2 y 3:")
    for (const dish of foundDishes) {
        console.log(dish.toString())
    }
} catch (error) {
    console.error(error.message);
}

// //Error por intentar desasignar un plato que no existe
try {
    manager.deassignCategoryToDish(cat1, plato5);
    console.warn("Desasignado correctamente:");
} catch (error) {
    console.error(error.message);
}

// //Borrar una categoria
try {
    manager.removeCategory(catBorrar);
    console.warn("Categoria borrada correctamente:");
} catch (error) {
    console.error(error.message);
}


console.log("-----------------------------Menu---------------------------------------------------");

const menu1 = manager.createMenu("Las gambitas");
const menu2 = manager.createMenu("Los tallarines");
const menu3 = manager.createMenu("Comida marina");
const menu4 = manager.createMenu("Tres delicias");
const menuBorrar = manager.createMenu("Borrar");

const menuCreado = manager.createMenu("Menu creado");
const platoCreado = manager.createDish("Plato creado");

//Añadir menus
try {
    manager.addMenu(menu1, menu2, menu3, menuBorrar);
    console.warn("Menus añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

//Asigna uno o varios platos al menu
try {
    manager.assignDishToMenu(menu1, plato1, platoCambio2, plato2, plato3, platoCambio1);
    console.warn("Plato/s añadidos al menu correctamente");
} catch (error) {
    console.error(error.message);
}

//Cambiar las posiciones de 2 platos en un menu
try {
    manager.changeDishesPositionsInMenu(menu1, platoCambio2, platoCambio1);
    console.warn("Posiciones cambiadas correctamente");
} catch (error) {
    console.error(error.message);
}

//Asigna uno o varios platos al menu, pero como no existen los crea
try {
    manager.assignDishToMenu(menuCreado, platoCreado);
    console.warn("Plato/s añadidos al menu correctamente");
} catch (error) {
    console.error(error.message);
}

// //Desasignar un plato
try {
    manager.deassignDishToMenu(menu1, plato2);
    console.warn("Plato/s desasignados correctamente del menu");
} catch (error) {
    console.error(error.message);
}

//Mostrar los menus
for (let menu of manager.menus) {
    console.log(menu.toString());
}

// //Borrar un menu
try {
    manager.removeMenu(menuBorrar);
    console.warn("Menu borrado correctamente");
} catch (error) {
    console.error(error.message);
}

//Mostrar los menus
for (let menu of manager.menus) {
    console.log(menu.toString());
}




console.log("------------------------------Allergen--------------------------------------------------");

const aler1 = manager.createAllergen("Huevo");
const aler2 = manager.createAllergen("Frutos secos");
const aler3 = manager.createAllergen("Lacteos");
const alerBorrar = manager.createAllergen("Borrar alergeno");
const aler4 = "";

try {
    manager.addAllergen(aler1, aler2, aler3, alerBorrar);
    console.warn("Alergeno añadido correctamnete");
} catch (error) {
    console.error(error.message);
}


//Borrar alergeno
try {
    manager.removeAllergen(alerBorrar);
    console.warn("Alergeno borrado correctamnete");
} catch (error) {
    console.error(error.message);
}

// //Error por que ese alergeno ya existe
try {
    manager.addAllergen(aler2);
    console.warn("Alergeno añadido correctamnete");
} catch (error) {
    console.error(error.message);
}

// //Asignar alergenos a un plato
try {
    manager.assignAllergenToDish(plato1, aler1, aler2, aler3);
    console.warn("Alergenos asiganados correctamente");
} catch (error) {
    console.error(error.message);
}


//Asignar alergenos a un plato
try {
    manager.deassignAllergenToDish(plato1, aler1);
    console.warn("Desasignado correctamente");
} catch (error) {
    console.error(error.message);
}


console.log("------------------------------Restaurants--------------------------------------------------");
const restaurant1 = manager.createRestaurant("La casona");
const restaurant2 = manager.createRestaurant("La Fresita");

//Añadir restaurantes
try {
    manager.addRestaurant(restaurant1, restaurant2);
    console.warn("Restaurantes añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

//Mostrar restaurantes
for (let restaurant of manager.restaurants) {
    console.log(restaurant.toString());
}

//Borrar restaurante
try {
    manager.removeRestaurant(restaurant2);
    console.warn("Restaurantes borrado correctamente");
} catch (error) {
    console.error(error.message);
}

//Mostrar restaurantes
for (let restaurant of manager.restaurants) {
    console.log(restaurant.toString());
}


console.log("------------------------------Borrar plato--------------------------------------------------");
//Mostrar los platos
for (let dish of manager.dishes) {
    console.log(dish.toString());
}
//Borrar plato y todas sus asignaciones
try {
    manager.removeDish(platoBorrar);
    console.warn("Plato borrado");
} catch (error) {
    console.error(error.message);
}

//Mostrar los platos
for (let dish of manager.dishes) {
    console.log(dish.toString());
}


// try {
//     let dishesWithAllergen = manager.getDishesWithAllergen(aler2, (dishA, dishB) => {
//         let order = dishA.name < dishB.name ? -1 : 1;
//         return order;
//     });
//     console.warn("Platos con alérgeno de Frutos secos:");
//     for (let dish of dishesWithAllergen) {
//         console.log(dish.toString());
//     }
// } catch (error) {
//     console.error(error.message);
// }

