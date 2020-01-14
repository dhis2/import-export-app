const fs = require('fs')

const tests = fs
    .readdirSync('./src/components/Inputs/__test__')
    .filter(name => name.match(/\.js$/))
const components = fs
    .readdirSync('./src/components/Inputs')
    .filter(name => name.match(/\.js$/))

const missing = components.filter(
    component => !tests.includes(component.replace('.js', '.test.js'))
)

console.log('MISSING:')
console.log(JSON.stringify(missing, null, 2))
