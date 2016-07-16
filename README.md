# babel-plugin-rintlmg
Babel plugin for https://github.com/grammka/react-intl-messages-generator

Transforms

```javascript
defineMessages({
  ids: 'app.components.Header',
  title: {
    defaultMessage: 'Title',
  },
  description: 'Description',
  search: {
    defaultMessage: 'Find smth...',
    description: 'Input on the left side of Header'
  },
})
```

to 

```javascript
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.components.Header.title',
    defaultMessage: 'Title'
  },
  description: {
    id: 'app.components.Header.description',
    defaultMessage: 'Description'
  },
  search: {
    id: 'app.components.Header.search',
    defaultMessage: 'Find smth...',
    description: 'Input on the left side of Header'
  }
});
```
