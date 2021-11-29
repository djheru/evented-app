import Ajv from 'ajv';
import { Account, Schema } from '@di-proto/event-catalog';

const schema = Schema.jsonSchema;

const ajv = new Ajv({ 
  allErrors: true,
  inlineRefs: false,
});

ajv.addSchema(schema);

const updateAddressDataSchema =schema.definitions.UpdateAddressData;

// Good data
const goodUpdateAddressData: Account.Address.UpdateAddressData = {
  address1: '111 main st',
  address2: 'Box 123',
  city: 'Springfield',
  state: 'IL',
  postalCode: '11122',
  postalCodePlus4: '8888'
};

const isValid  = ajv.validate(updateAddressDataSchema, goodUpdateAddressData);
console.log(isValid ? 'Is valid' : 'Is not valid');
console.log(ajv.errors)

// Bad Data
const badUpdateAddressData = {
  address1: '111 main main main main main main main main main main main main main main main main main main main main main main main main main main main main main st.',
  address2: 'Box 123',
  city: 'Springfield',
  state: 'I',
  postalCode: '11122',
  postalCodePlus4: 8888
};

const isNotValid  = ajv.validate(updateAddressDataSchema, badUpdateAddressData);
console.log(isNotValid ? 'Is valid' : 'Is not valid');
console.log(ajv.errors)
