import { SchemaModel, StringType } from 'schema-typed';

const UsuarioRegister = SchemaModel({
  nome: StringType().isRequired('É necessário informar seu nome completo').addRule((value) => {
    
  }),
});

export default UsuarioRegister;
