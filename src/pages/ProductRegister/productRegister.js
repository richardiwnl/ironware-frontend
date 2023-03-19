import { SchemaModel, StringType, NumberType } from 'schema-typed';

const ProductRegister = SchemaModel({
  nome: StringType()
    .minLength(3, 'O nome do produto deve ter ao menos 3 caracteres')
    .isRequired('O nome do produto é obrigatório'),
  quantidade: NumberType()
    .min(1, 'A quantidade mínima é 1')
    .isRequired('A quantidade é obrigatória'),
  valor: NumberType()
    .min(0.01, 'O preço mínimo é R$ 0,01')
    .isRequired('O preço é obrigatório'),
});

export default ProductRegister;
