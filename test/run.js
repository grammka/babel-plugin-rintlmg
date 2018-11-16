const path                = require('path')
const transformFileSync   = require('@babel/core').transformFileSync
const plugin              = require('../src')


const withOptionOutput = transformFileSync(path.resolve(process.cwd(), 'test/example.js'), {
  plugins: [ [ plugin, { messages: true } ] ],
})

const withOptionExpected = `import { defineMessages } from 'react-intl';
export default defineMessages({
  string: {
    en: 'String',
    es: 'Cuerda',
    id: "test.string"
  },
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
      id: "test.withChildren.title"
    }
  }
});`

console.log(withOptionOutput.code)

if (JSON.stringify(withOptionOutput.code) === JSON.stringify(withOptionExpected)) {
  console.log('\nWith option success\n')
}
else {
  console.error('\nWith option error\n')
  process.exit(1)
}


console.log('\n================================================\n\n')


const withoutOptionOutput = transformFileSync(path.resolve(process.cwd(), 'test/example.js'), {
  plugins: [ plugin ],
})

const withoutOptionExpected = `import { defineMessages } from 'react-intl';
export default defineMessages({
  string: {
    id: "test.string"
  },
  withChildren: {
    title: {
      id: "test.withChildren.title"
    }
  }
});`

console.log(withoutOptionOutput.code)

if (JSON.stringify(withoutOptionOutput.code) === JSON.stringify(withoutOptionExpected)) {
  console.log('\n\nWithout option success\n')
}
else {
  console.error('\nWithout option error\n')
  process.exit(1)
}
