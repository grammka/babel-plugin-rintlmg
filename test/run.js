const path                = require('path')
const transformFileSync   = require('@babel/core').transformFileSync
const plugin              = require('../src')


const file = path.resolve(process.cwd(), 'test/example.js')

const test = (options, expected) => {
  const output = transformFileSync(file, {
    plugins: [ [ plugin, options ] ],
  })

  console.log(output.code)

  if (JSON.stringify(output.code) === JSON.stringify(expected)) {
    console.log(`\nSUCCESS with ${JSON.stringify(options)}\n`)
  }
  else {
    console.log(`\nERROR with ${JSON.stringify(options)}\n`)
    process.exit(1)
  }

  console.log('================================================\n')
}


console.log('================================================\n')

test({}, `import { defineMessages } from 'react-intl';
export default defineMessages({
  string: {
    id: "test.string"
  },
  withChildren: {
    title: {
      id: "test.withChildren.title"
    }
  }
});`)

test({ messages: true }, `import { defineMessages } from 'react-intl';
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
});`)

test({ indexedIds: true }, `import { defineMessages } from 'react-intl';
export default defineMessages({
  string: {
    id: "0"
  },
  withChildren: {
    title: {
      id: "1"
    }
  }
});`)

test({ messages: true, indexedIds: true }, `import { defineMessages } from 'react-intl';
export default defineMessages({
  string: {
    en: 'String',
    es: 'Cuerda',
    id: "0"
  },
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
      id: "1"
    }
  }
});`)
