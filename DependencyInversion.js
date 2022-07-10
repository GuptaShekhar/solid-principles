const Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
})

class Person {
    constructor(name) {
        this.name = name
    }
}

// LOW LEVEL MODULE -> related to storage 
class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser') {
            throw new Error('RelationshipBrowser is abstract!')
        }
    }

    findAllChildrenOf(name) { }
}

class Relationships extends RelationshipBrowser {
    constructor() {
        super()
        this.data = []
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        })
    }

    findAllChildrenOf(name) {
        return this.data.filter(r =>
            r.from.name === name &&
            r.type === Relationship.parent
        ).map(r => r.to)
    }
}

// HIGH LEVEL MODULE 
class Research { // abstract classes/ interfaces
    // constructor(relationships) {
    //     // find all childred of john
    //     const relations = relationships.data
    //     for (let rel of relations.filter(r =>
    //         r.from.name === 'John' &&
    //         r.type === Relationship.parent
    //     )) {
    //         console.log(`John has child named ${rel.to.name}`)
    //     }
    // }
    constructor(browser) {
        for (let p of browser.findAllChildrenOf('John')) {
            console.log(`John has child named ${p.name}`)
        }
    }
}
const parent = new Person('John')
const child1 = new Person('Chris')
const child2 = new Person('Matt')
const child3 = new Person('Maria')

const rels = new Relationships()
rels.addParentAndChild(parent, child1)
rels.addParentAndChild(parent, child2)
rels.addParentAndChild(parent, child3)
const research = new Research(rels)
// Dependency inversion principle-> High level module should not depend on low level module instead depend on abstract