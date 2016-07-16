# babel-plugin-rintlmg
Babel plugin for https://github.com/grammka/react-intl-messages-generator

Transforms

```javascript
defineMessages({
  ids: 'app.components.Header',
  title: {
    defaultMessage: 'Title',
  },
  search: {
    defaultMessage: 'Find smth...',
  },
})
```

to 

```javascript
import { defineMessages } from 'react-intl';

export default defineMessages({
  "title": {
    id: 'app.components.Header.title',
    defaultMessage: 'Title'
  },
  search: {
    id: 'app.components.Header.search',
    defaultMessage: 'Find smth...'
  }
});
```
