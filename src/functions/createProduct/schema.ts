import {Product} from '../../entities/Product';
export default {
  type: Product,
  properties: {
    id: { type: "string" },
    name: { type: 'string' },
    price: { type: 'number'}
  },
  required: ['name']
} as const;
