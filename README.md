# babel-plugin-rintlmg
Babel plugin for transforming compact messages to `react-intl` (https://github.com/yahoo/react-intl) format

Transforms

**`./app/components/Foo.js`**
```javascript
import { defineMessages } from 'react-intl'

export default defineMessages({
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
    },
    description: {
      en: 'Nested description',
      es: 'Descripción anidada',
    },
    withChildren: {
      title: {
        en: 'Nested nested title',
        es: 'Título anidado anidado',
      }
    },
  },
  template: {
    en: `
      Template
      with
      rows
    `,
    es: `
      Modelo
      con
      filas
    `,
  },
  string: {
    en: 'String',
    es: 'Cuerda',
  },
})
```

with plugin option `{ messages: true }` to

```javascript
import { defineMessages } from 'react-intl';

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
    en: `
      Template
      with
      rows
    `,
    es: `
      Modelo
      con
      filas
    `,
    id: 'test.template'
  },
  string: {
    en: 'String',
    es: 'Cuerda',
    id: 'test.string'
  }
});
```

and without options to

```
import { defineMessages } from 'react-intl';

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
});
```
