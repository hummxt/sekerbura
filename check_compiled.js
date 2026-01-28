const { TEMPLATES } = require('./dist/templates');
console.log('Available components in compiled templates:');
console.log(Object.keys(TEMPLATES).join(', '));
console.log('Total components:', Object.keys(TEMPLATES).length);
