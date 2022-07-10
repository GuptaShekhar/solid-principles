const fs = require('fs')

class Journal {
    constructor() {
        this.entries = {}
    }
    addEntry(test) {
        let c = ++Journal.count
        const entry = `${c}: ${test}`
        this.entries[c] = entry
        return c
    }

    removeEntry(index) {
        delete this.entries[index]
    }

    toString() {
        return Object.values(this.entries).join('\n')
    }
    // save(filename) { // this tasks are different from journal, so make a different class
    //     fs.writeFileSync(filename, this.toString())
    // }

    // load(filename) {
    //     //
    // }

    // loadFromURL(filename) {
    //     //
    // }
}

Journal.count = 0

class PersistentManager {
    preProcessing() {
        // do preprocessing of data before saving
    }

    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString())
    }
}
let j = new Journal()
j.addEntry('Today was my first day of swimming.')
j.addEntry('I learnt flutter kicking.')
console.log(j.toString())

let p = new PersistentManager()
const filename = `${__dirname}/journal.txt`
p.saveToFile(j, filename)