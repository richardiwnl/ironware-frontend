import { SchemaModel, StringType } from 'schema-typed';

const CategoryRegister = SchemaModel({
  categoria: StringType().isRequired('A categoria é obrigatória'),
});

export default CategoryRegister;
