
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
// Mostrar la representación en cadena del manager
let result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result);


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
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)

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
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)



// Añadir categoría y platos
const categoria5 = new Category("Categoria5");
const plato5 = new Dish("Plato 5");
const plato6 = new Dish("Plato 6");

try {
    manager.assignCategoryToDish(categoria5, plato5, plato6);
    console.log("Categoría y platos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Obtener la lista de categorías y sus platos
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)

// Intentar eliminar una categoría existente
try {
    manager.removeCategory(categoria5);
    console.log("Categoría eliminada correctamente");
} catch (error) {
    console.error(`Error al eliminar categoría: ${error.message}`);
}

// Intentar eliminar una categoría que no existe debería lanzar un error
try {
    manager.removeCategory(new Category("CategoriaInexistente"));
} catch (error) {
    console.error(error.message);
}

// Mostrar las categorías restantes
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)


// Añadir categoría y plato
const categoria6 = new Category("Categoria6");
const plato7 = new Dish("Plato7");

try {
    manager.assignCategoryToDish(categoria6, plato7);
    console.log("Categoría y plato añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Mostrar las categorías restantes
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)

// Intentar eliminar el plato agregado
try {
    manager.removeDish(plato7);
    console.log("Plato eliminado correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar el mismo plato nuevamente debería lanzar un error
try {
    manager.removeDish(plato7);
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar un plato que no existe debería lanzar un error
try {
    manager.removeDish(new Dish("PlatoInexistente"));
} catch (error) {
    console.error(error.message);
}

// Mostrar las categorías restantes
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)

console.log("-------------------------");

// Añadir alérgenos
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

// Mostrar los alérgenos existentes
console.log("Alérgenos existentes:");
const allergenes = manager.allergenes;
for (const allergen of allergenes) {
    console.log(`Alérgeno: ${allergen.name}`);
}

// Añadir alérgenos
const alergeno3 = new Allergen("Alergeno 3");
const alergeno4 = new Allergen("Alergeno 4");

try {
    manager.addAllergen(alergeno3, alergeno4);
    console.log("Alérgenos añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Mostrar los alérgenos restantes
console.log("Alérgenos existentes después de eliminar:");
const allergenos1 = manager.allergenes;
for (const allergen of allergenos1) {
    console.log(`Alérgeno: ${allergen.name}`);
}

// Intentar eliminar un alérgeno existente
try {
    manager.removeAllergen(alergeno3);
    console.log("Alérgeno eliminado correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar el mismo alérgeno nuevamente debería lanzar un error
try {
    manager.removeAllergen(alergeno3);
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar un alérgeno que no existe debería lanzar un error
try {
    manager.removeAllergen(new Allergen("AlergenoInexistente"));
} catch (error) {
    console.error(error.message);
}

// Mostrar los alérgenos restantes
console.log("Alérgenos existentes después de eliminar:");
const allergenos = manager.allergenes;
for (const allergen of allergenos) {
    console.log(`Alérgeno: ${allergen.name}`);
}

// Añadir menús
const menu1 = new Menu("Menu 1");
const menu2 = new Menu("Menu 2");

try {
    manager.addMenu(menu1, menu2);
    console.log("Menús añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar añadir el mismo menú nuevamente debería lanzar un error
try {
    manager.addMenu(menu1);
} catch (error) {
    console.error(error.message);
}

// Mostrar los menús existentes
console.log("Menús existentes:");
let menus = manager.menus;
for (const menu of menus) {
    console.log(`Menú: ${menu.name}`);
}

// Añadir menús
const menu3 = new Menu("Menu 3");
const menu4 = new Menu("Menu 4");

try {
    manager.addMenu(menu3, menu4);
    console.log("Menús añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar un menú existente
try {
    manager.removeMenu(menu3);
    console.log("Menú eliminado correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar el mismo menú nuevamente debería lanzar un error
try {
    manager.removeMenu(menu3);
} catch (error) {
    console.error(error.message);
}

// Intentar eliminar un menú que no existe debería lanzar un error
try {
    manager.removeMenu(new Menu("MenuInexistente"));
} catch (error) {
    console.error(error.message);
}

// Mostrar los menús restantes
console.log("Menús existentes después de eliminar:");
const menus1 = manager.menus;
for (const menu of menus1) {
    console.log(`Menú: ${menu.name}`);
}

// Añadir un plato y alérgenos
const plato56 = new Dish("Plato56");
const alergeno5 = new Allergen("Alergeno 5");
const alergeno6 = new Allergen("Alergeno 6");

try {
    manager.assignCategoryToDish(categoria6, plato56);
    console.log("Categoría y plato añadidos correctamente");
} catch (error) {
    console.error(error.message);
}

try {
    manager.assignAllergenToDish(plato56, alergeno5, alergeno6);
    console.log("Plato y alérgenos asignados correctamente");
} catch (error) {
    console.error(error.message);
}

// Intentar asignar los mismos alérgenos al mismo plato nuevamente debería lanzar un error
try {
    manager.assignAllergenToDish(plato56, alergeno5, alergeno6);
} catch (error) {
    console.error(error.message);
}

// Intentar asignar alérgenos a un plato que no existe debería lanzar un error
try {
    manager.assignAllergenToDish(new Dish("PlatoInexistente"), alergeno5, alergeno6);
} catch (error) {
    console.error(error.message);
}

// Mostrar los alérgenos asignados al plato
// const allergenosAsignados = manager.getDishAllergens(plato);
// console.log("Alérgenos asignados al plato:");
// for (const allergen of allergenosAsignados) {
//     console.log(`Alérgeno: ${allergen.name}`);
// }
result = manager.toString();
console.log("Representación en cadena del manager:");
console.log(result)
console.log(manager);