# babel-plugin-rintlmg
Babel plugin for transforming compact messages to `react-intl` (https://github.com/yahoo/react-intl) format


### Usage

`.babelrc`

```
"plugins": [
  [ "babel-plugin-rintlmg", { messages: true, indexedIds: true } ]
]
```


### How it works

Plugin transforms following code:

```javascript
import { defineMessages } from 'react-intl'

export default defineMessages({
  string: {
    en: 'String',
    es: 'Cuerda',
  },
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
    }
  }
})
```

with plugin option `{ messages: true }` to

```javascript
import { defineMessages } from 'react-intl';

export default defineMessages({
  string: {
    en: 'String',
    es: 'Cuerda',
    id: 'test.string'
  },
  withChildren: {
    title: {
      en: 'Nested title',
      es: 'Título anidado',
      id: 'test.withChildren.title'
    }
  }
});
```

and without options to

```
import { defineMessages } from 'react-intl';

export default defineMessages({
  string: {
    id: 'test.string'
  },
  withChildren: {
    title: {
      id: 'test.withChildren.title'
    }
  }
});
```
