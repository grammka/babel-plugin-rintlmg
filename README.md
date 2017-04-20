# babel-plugin-rintlmg
Babel plugin for transforming compact messages to `react-intl` (https://github.com/yahoo/react-intl) format

Transforms

```javascript
import { defineMessages } from 'react-intl'

export default defineMessages({
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
  string: 'String',
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
