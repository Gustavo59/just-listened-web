export class InternalExcept extends Error {
    constructor() {
        super();
        this.name = "InternalError";
    }
}

export class NetworkExcept extends Error {
    constructor() {
        super();
        this.name = "NetworkError";
    }
}

export class UnauthorizedExcept extends Error {
    constructor() {
        super();
        this.name = "UnauthorizedError";
    }
}

export class MissingTokenException extends Error {
    constructor() {
        super();
        this.name = "MissingTokenError";
        this.message = this.message || "Missing user token";
    }
}
