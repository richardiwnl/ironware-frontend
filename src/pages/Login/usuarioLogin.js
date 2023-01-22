import { SchemaModel, StringType } from 'schema-typed';

const UsuarioRegister = SchemaModel({
  email: StringType()
    .isRequired('O e-mail é obrigatório')
    .isEmail('E-mail inválido'),
  senha: StringType().isRequired('A senha é obrigatória'),
});

export default UsuarioRegister;
