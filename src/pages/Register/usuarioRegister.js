import { DateType, SchemaModel, StringType } from 'schema-typed';

const UsuarioRegister = SchemaModel({
  nome: StringType()
    .addRule(value => {
      if (value.split(' ').length < 3) {
        return false;
      }
      return true;
    }, 'Informe o nome completo')
    .minLength(8, 'O nome deve ter ao menos 8 caracteres')
    .isRequired('O nome completo é obrigatório'),
  cpf: StringType()
    .addRule(value => {
      const count = value.replace(/[^0-9]/g, '').length;

      return count === 11;
    }, 'O CPF deve ter 11 dígitos')
    .isRequired('O CPF é obrigatório'),
  data: DateType()
    .isRequired('A data de nascimento é obrigatória')
    .min(new Date(1900), 'Data de nascimento inválida')
    .max(new Date(), 'Data de nascimento inválida'),
  email: StringType()
    .isRequired('O e-mail é obrigatório')
    .isEmail('E-mail inválido'),
  telefone: StringType()
    .isRequired('O telefone é obrigatório')
    .addRule(value => {
      const count = value.replace(/[^0-9]/g, '').length;

      return count === 11;
    }, 'O telefone deve ter 11 dígitos'),
  senha1: StringType()
    .isRequired('A senha é obrigatória')
    .addRule((value, data) => {
      if (value !== data.senha2) {
        return false;
      }
      return true;
    }, 'As senhas não coincidem'),
  senha2: StringType()
    .isRequired('A senha é obrigatória')
    .addRule((value, data) => {
      if (value !== data.senha1) {
        return false;
      }
      return true;
    }, 'As senhas não coincidem'),
});

export default UsuarioRegister;
