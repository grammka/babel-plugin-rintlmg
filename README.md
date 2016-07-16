# babel-plugin-rintlmg
Babel plugin for https://github.com/grammka/react-intl-messages-generator

Transforms

```javascript
defineMessages({
  ids: 'app.components.Header',
  object: {
    defaultMessage: 'Object',
    description: 'Input on the left side of Header',
  },
  template: `
    Template
    with
    rows
  `,
  string: 'String'
})
```

to 

```javascript
import { defineMessages } from 'react-intl';

export default defineMessages({
  object: {
    id: 'app.components.Header.object',
    defaultMessage: 'Object',
    description: 'Input on the left side of Header'
  },
  template: {
    id: 'app.components.Header.template',
    defaultMessage: `
      Template
      with
      rows
    `
  },
  string: {
    id: 'app.components.Header.string',
    defaultMessage: 'String'
  }
});

```
