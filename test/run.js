const path    = require('path')
const babel   = require('babel-core')
const plugin  = require('../src')


const withOptionOutput = babel.transformFileSync(path.resolve(process.cwd(), 'test/example.js'), {
  plugins: [ [ plugin, { messages: true } ] ],
})

const withOptionExpected = `import { defineMessages } from 'react-intl';

export default defineMessages({
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
      id: 'test.withChildren.title'
    },
    description: {
      en: 'Nested description',
      es: 'Descripción anidada',
      id: 'test.withChildren.description'
    },
    withChildren: {
      title: {
        en: 'Nested nested title',
        es: 'Título anidado anidado',
        id: 'test.withChildren.withChildren.title'
      }
    }
  },
  template: {
    en: \`
      Template
      with
      rows
    \`,
    es: \`
      Modelo
      con
      filas
    \`,
    id: 'test.template'
  },
  string: {
    en: 'String',
    es: 'Cuerda',
    id: 'test.string'
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


const withoutOptionOutput = babel.transformFileSync(path.resolve(process.cwd(), 'test/example.js'), {
  plugins: [ plugin ],
})

const withoutOptionExpected = `import { defineMessages } from 'react-intl';

export default defineMessages({
  withChildren: {
    title: {
      id: 'test.withChildren.title'
    },
    description: {
      id: 'test.withChildren.description'
    },
    withChildren: {
      title: {
        id: 'test.withChildren.withChildren.title'
      }
    }
  },
  template: {
    id: 'test.template'
  },
  string: {
    id: 'test.string'
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
