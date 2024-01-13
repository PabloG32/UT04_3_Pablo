
import { Dish, Category, Allergen, Restaurant, Coordinate } from './entities/restaurante.js';
import RestaurantsManager from './restaurantsManager.js';



const miPlato = new Dish("Nombre del Plato", "Descripción del Plato", ["Ingrediente1", "Ingrediente2"], "/ruta/imagen.jpg");

console.log(miPlato.toString());


const miCategoria = new Category("Nombre de la Categoría", "Descripción de la Categoría");
console.log(miCategoria.toString());

const miRestaurante = new Restaurant("Nombre del Restaurante", "Descripción del Restaurante", new Coordinate(40.7128, -74.0060));
console.log(miRestaurante.toString());

const manager1 = RestaurantsManager.getInstance("MiSistema");

console.log(manager1);

console.log("----------------------------------------------------------------------------")
// Ejemplo de uso
// Ejemplo de uso
const manager = RestaurantsManager.getInstance("MiSistema");

const category1 = new Category("Categoria1", "Descripción de la categoría 1");
const category2 = new Category("Categoria2", "Descripción de la categoría 2");

manager.addCategory(category1).addCategory(category2);

const dish1 = new Dish("Plato1", "Descripción del plato 1");
const dish2 = new Dish("Plato2", "Descripción del plato 2");

manager.addDish(dish1).addDish(dish2);

manager.assignCategoryToDish("Plato1", "Categoria1").assignCategoryToDish("Plato2", "Categoria2");

console.log(manager.getCategories()); // Mostrar las categorías antes de la eliminación

manager.removeCategory("Categoria1").removeCategory("CategoriaNoRegistrada");

console.log(manager.getCategories()); 