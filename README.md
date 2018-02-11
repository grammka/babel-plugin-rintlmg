# babel-plugin-rintlmg
Babel plugin for transforming compact messages to `react-intl` (https://github.com/yahoo/react-intl) format

Transforms


**`./app/components/Foo.js`**
```javascript
import { defineMessages } from 'react-intl'

export default defineMessages({
  object: {
    title: 'Title',
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
    title: {
      id: 'app.components.Foo.object.title',
      defaultMessage: 'Title',
    },
    description: {
      id: 'app.components.Foo.object.description',
      defaultMessage: 'Input on the left side of Header',
    },
  },
  template: {
    id: 'app.components.Foo.template',
    defaultMessage: `
      Template
      with
      rows
    `
  },
  string: {
    id: 'app.components.Foo.string',
    defaultMessage: 'String'
  }
});

```
