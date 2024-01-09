"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException
} from "../js/exceptions";

export class Dish {
    //Propiedades
    #name; //Nombre del plato.
    #description; //Descripción
    #ingredients; //Array con los posibles ingredientes que componen el plato.
    #image; //String con la ruta donde está ubicada la imagen del plato.

    //Constructor
    constructor(name, description, ingredients, image) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (name === "undefined" || name === "") throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");
        if (typeof ingredients != "string") throw new InvalidValueException("ingredients", "String");
        if (typeof image != "string") throw new InvalidValueException("image", "String");

        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;

    }

    //Getters y Setters
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }
    get ingredients() {
        return this.#ingredients;
    }
    get image() {
        return this.#image;
    }

    set name(value) {
        return this.#name = value;
    }

    set description(value) {
        return this.#description = value;
    }

    set ingredients(value) {
        return this.#ingredients = value;
    }

    set image(value) {
        return this.#image = value;
    }

}

export class Category {
    //Propiedades
    #name; //Nombre de la categoría.
    #description; //Descripción de la categoría.

    //Constructor
    constructor(name, description) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (name === "undefined" || name === "") throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");

        this.#name = name;
        this.#description = description;

    }

    //Getters
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }

}

export class Allergen {
    //Propiedades
    #name; //Nombre del alérgeno.
    #description; //Descripción del alérgeno.

    //Constructor
    constructor(name, description) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (name === "undefined" || name === "") throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");


        this.#name = name;
        this.#description = description;

    }

    //Getters y Setters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    set name(value) {
        return this.#name = value;
    }

    set description(value) {
        return this.#description = value;
    }
}

export class Menu {
    //Propiedades
    #name; //Nombre del menú.
    #description; //Descripción del menú.

    //Constructor
    constructor(name, description) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (name === "undefined" || name === "") throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");


        this.#name = name;
        this.#description = description;

    }

    //Getters y Setters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    set name(value) {
        return this.#name = value;
    }

    set description(value) {
        return this.#description = value;
    }
}

export class Restaurant {
    //Propiedades
    #name; //Nombre del restaurante.
    #description; //Descripción del restaurante.
    #location; //Ubicación del restaurante en forma de coordenadas.

    //Constructor
    constructor(name, description, location) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (name === "undefined" || name === "") throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");
        if (typeof location != Coordinate) throw new InvalidValueException("location", Coordinate);


        this.#name = name;
        this.#description = description;
        this.#location = location;

    }

    //Getters y Setters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get location() {
        return this.#location;
    }

    set name(value) {
        return this.#name = value;
    }

    set description(value) {
        return this.#description = value;
    }

    set location(value) {
        return this.#location = value;
    }
}

export class Coordinate {
    //Propiedades
    #latitude; //Latitud de la ubicación.
    #longitude; //Longitud de la ubicación.

    //Constructor
    constructor(latitude, longitude) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (latitude === "undefined" || latitude === "") throw new EmptyValueException("latitude");
        if (longitude === "undefined" || longitude === "") throw new EmptyValueException("longitude");
        if (typeof latitude != "string") throw new InvalidValueException("latitude", "String");
        if (typeof longitude != "string") throw new InvalidValueException("longitude", "String");


        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    //Getters y Setters
    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set latitude(value) {
        return this.#latitude = value;
    }

    set longitude(value) {
        return this.#longitude = value;
    }

}