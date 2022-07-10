class Rectangle {
    constructor(width, length) {
        this._length = length
        this._width = width
    }
    get length() {
        return this._length
    }
    get width() {
        return this._width
    }
    set length(length) {
        this._length = length
    }
    set width(width) {
        this._width = width
    }
    get area() {
        return this._width * this._length
    }
    toString() {
        return `${this._width} x ${this._length}`
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side)
    }
    /**
     * @param {number} length
     */
    set length(length) {
        this._length = this._width = length
    }
    /**
     * @param {number} width
     */
    set width(width) {
        this._width = this._length = width
    }
}

const useIt = (rc) => {
    let width = rc._width // Issue: private method should not be use outside class
    rc.length = 10
    console.log(
        `Expected area of ${10 * width}` +
        ` Got ${rc.area}`
    )
    // Wrong appproach
    // LSP =>  a function which takes a base class like rectangle, it should be able to take a derived class like
    // square without breaking the functionality in any way whatsoever.
}
const rc = new Rectangle(5, 7)
useIt(rc)
console.log(rc.toString())

const sq = new Square(12)
useIt(sq)
console.log(sq.toString())
sq.length = 9
console.log(sq.toString())
