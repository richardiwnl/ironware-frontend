import { SchemaModel, StringType } from 'schema-typed';

const EnderecoRegister = SchemaModel({
  cep: StringType().isRequired('O CEP é obrigatório'),
  complemento: StringType().isRequired('O complemento é obrigatório'),
  numero: StringType().isRequired('O número é obrigatório'),
});

export default EnderecoRegister;
