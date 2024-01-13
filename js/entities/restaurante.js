"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
} from "../exceptions.js";

class Dish {
    //Propiedades
    #name; //Nombre del plato.
    #description; //Descripción
    #ingredients; //Array con los posibles ingredientes que componen el plato.
    #image; //String con la ruta donde está ubicada la imagen del plato.

    //Constructor
    constructor(name, description = "", ingredients = [], image = "") {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");
        if (!Array.isArray(ingredients)) throw new InvalidValueException("ingredients", "Array");
        if (typeof image != "string") throw new InvalidValueException("image", "String");

        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });

        Object.defineProperty(this, 'ingredients', {
            enumerable: true,
            get() {
                return this.#ingredients;
            },
            set(value) {
                if (!value) throw new EmptyValueException('ingredients');
                this.#ingredients = value;
            },
        });

        Object.defineProperty(this, 'image', {
            enumerable: true,
            get() {
                return this.#image;
            },
            set(value) {
                if (!value) throw new EmptyValueException('image');
                this.#image = value;
            },
        });
    }

    toString() {
        return `Dish: ${this.#name} Descripción: ${this.#description} Ingredientes: ${this.#ingredients.join(", ")} Imagen: ${this.#image}`;
    }
}

class Category {
    //Propiedades
    #name; //Nombre de la categoría.
    #description; //Descripción de la categoría.

    //Constructor
    constructor(name, description = "") {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");

        this.#name = name;
        this.#description = description;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });

    }

    toString() {
        return `Category: ${this.#name} Descripción: ${this.#description}`;
    }

}

class Allergen {
    //Propiedades
    #name; //Nombre del alérgeno.
    #description; //Descripción del alérgeno.

    //Constructor
    constructor(name, description = "") {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");


        this.#name = name;
        this.#description = description;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });

    }

    toString() {
        return `Allergen: ${this.#name} Descripción: ${this.#description}`;
    }
}

class Menu extends Dish {
    //Propiedades
    #name; //Nombre del menú.
    #description; //Descripción del menú.

    //Constructor
    constructor(name, description) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");


        this.#name = name;
        this.#description = description;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });

    }
}

class Restaurant {
    //Propiedades
    #name; //Nombre del restaurante.
    #description; //Descripción del restaurante.
    #location; //Ubicación del restaurante en forma de coordenadas.

    //Constructor
    constructor(name, description, location) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (typeof name != "string") throw new InvalidValueException("name", "String");
        if (typeof description != "string") throw new InvalidValueException("description", "String");
        if (!(location instanceof Coordinate)) throw new InvalidValueException("location", Coordinate);


        this.#name = name;
        this.#description = description;
        this.#location = location;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });

        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });

        Object.defineProperty(this, 'location', {
            enumerable: true,
            get() {
                return this.#location;
            },
            set(value) {
                if (!value) throw new EmptyValueException('location');
                this.#location = value;
            },
        });

    }

    toString() {
        const locationInfo = this.#location ? ` Ubicación: ${this.#location.latitude}, ${this.#location.longitude}` : '';
        return `Restaurante: ${this.#name} Descripción: ${this.#description}${locationInfo}`;
    }
}

class Coordinate {
    //Propiedades
    #latitude; //Latitud de la ubicación.
    #longitude; //Longitud de la ubicación.

    //Constructor
    constructor(latitude, longitude) {
        //Excepciones
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!latitude) throw new EmptyValueException("latitude");
        if (!longitude) throw new EmptyValueException("longitude");
        if (typeof latitude != "number") throw new InvalidValueException("latitude", "Number");
        if (typeof longitude != "number") throw new InvalidValueException("longitude", "Number");


        this.#latitude = latitude;
        this.#longitude = longitude;

        // Propiedades de acceso a los atributos privados enumerables.
        Object.defineProperty(this, 'latitude', {
            enumerable: true,
            get() {
                return this.#latitude;
            },
            set(value) {
                if (!value) throw new EmptyValueException('latitude');
                this.#latitude = value;
            },
        });

        Object.defineProperty(this, 'longitude', {
            enumerable: true,
            get() {
                return this.#longitude;
            },
            set(value) {
                if (!value) throw new EmptyValueException('longitude');
                this.#longitude = value;
            },
        });

    }

    toString() {
        return `Coordenadas: Latitud ${this.#latitude}, Longitud ${this.#longitude}`;
    }

}

export {
    Dish, Category, Allergen, Menu, Restaurant, Coordinate,
};