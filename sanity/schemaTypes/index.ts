import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import employee from './employee' // هادا السطر اللي زدنا الفوق

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, employee], // وهنا زدنا الموظف باش يتعرف عليه Sanity
}