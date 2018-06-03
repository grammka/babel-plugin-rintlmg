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
