const Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
})

const Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
})

class Product {
    constructor(name, color, size) {
        this.name = name
        this.color = color
        this.size = size
    }
}

class ProductFilter {
    filterByColor(products, color) {
        return products.filter(p => p.color === color)
    }

    filterBySize(products, size) { // should be open for extension and closed for modification
        return products.filter(p => p.size === size)
    }

    filterBySizeAndColor(products, size, color) {
        return products.filter(p => p.size === size && p.color === color)
    }

    // State space explosion
    // 3 criteria = 7methods
}

// Specification
class ColorSpecification {
    constructor(color) {
        this.color = color
    }
    isSatisfied(item) {
        return item.color == this.color
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size
    }
    isSatisfied(item) {
        return item.size == this.size
    }
}
// Note: there is no abstract class in Javascript

class AndSpecification {
    constructor(...specs) {
        this.specs = specs
    }

    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item))
    }
}
const apple = new Product('Apple', Color.green, Size.small)
const tree = new Product('Tree', Color.green, Size.large)
const house = new Product('House', Color.blue, Size.large)

const products = [apple, tree, house]
let pf = new ProductFilter()
console.log(`Green products (old method):`)

for (const p of pf.filterByColor(products, Color.green)) {
    console.log(` * ${p.name} is ${p.color}`)
}

class BetterFilter {
    filter(items, specs) {
        return items.filter(x => specs.isSatisfied(x))
    }
}
const bf = new BetterFilter()
console.log(`Green Products (new method):`)
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`)
}

console.log('Large and Green products')
const specs = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
)
for (let p of bf.filter(products, specs)) {
    console.log(` * ${p.name} is large and green`)
}

