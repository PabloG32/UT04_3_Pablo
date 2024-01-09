//Excepción base.
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

//Excepción valores vacios.
class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepciones para validar los parámetros
class ParameterValidationException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "ParameterValidationException";
    }
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`Error: The paramenter ${param} has an invalid value. (${param}: ${value})`, fileName, lineNumber);
        this.param = param;
        this.name = "InvalidValueException";
    }
}

export {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException
};
