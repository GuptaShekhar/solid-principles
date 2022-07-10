class Document {

}

class Machine {
    constructor() {
        if (this.constructor.name === 'Machine') {
            throw new Error('Machine is abstract')
        }
    }
    print(doc) { }
    fax(doc) { }
    scan(doc) { }
}

class MultiFunctionPrinter extends Machine {
    print(doc) {
        //
    }
    fax(doc) {
        //
    }
    scan(doc) {
        //
    }
}

class OldFashionPrinter extends Machine {
    print(doc) {
        //
    }
    fax(doc) {
        // do nothing -> violates principle of least surprise
    }
    scan(doc) {
        throw new NotImplementedError('OldFashionPrinter.scan')
    }
}

class NotImplementedError extends Error {
    constructor(name) {
        const msg = `${name} is not implemented!`
        super(msg)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError)
        }
    }
}

// ISP -> segregate (split up)
class Printer {
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer is abstract')
        }
    }
    print() { }
}
class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error('Scanner is abstract')
        }
    }
    scan() { }
}

class PhotoCopier { // cannot inherit from multiple class

}
const printer = new OldFashionPrinter()
printer.scan()