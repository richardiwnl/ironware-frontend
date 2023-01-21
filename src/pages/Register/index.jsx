/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  AutoComplete,
  Button,
  ButtonToolbar,
  Container,
  Content,
  DatePicker,
  FlexboxGrid,
  Form,
  InputGroup,
  MaskedInput,
  Message,
  Panel,
  useToaster,
} from 'rsuite';

import CalendarIcon from '@rsuite/icons/Calendar';
import EmailFillIcon from '@rsuite/icons/EmailFill';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import Lock from '@rsuite/icons/legacy/Lock';
import MemberIcon from '@rsuite/icons/Member';
import PhoneFillIcon from '@rsuite/icons/PhoneFill';

import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import CustomLoader from '../../components/CustomLoader';
import usuario from './usuarioRegister';
import axios from '../../services/axios';

export default function Register() {
  const style = {
    marginTop: '50px',
    padding: '10px',
  };

  const toaster = useToaster();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNasc, setDataNasc] = useState();
  const [data, setData] = useState([]);
  const [senha1, setSenha1] = useState('');
  const [, setSenha2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = 'Ironware | Cadastro de Usuário ';
  }, []);

  const handleFormSubmit = async e => {
    if (!e) {
      toaster.push(
        <Message showIcon type="error">
          Há erros no formulário!
        </Message>
      );
      return;
    }

    const requestData = {
      nome,
      cpf: cpf.replace(/[^\w\s]/g, ''),
      telefone: telefone.replace(/[^\w\s+]|\s/g, ''),
      data_nasc: dataNasc,
      email: data.at(0),
      senha: senha1,
    };

    try {
      setIsLoading(true);
      await axios.post('usuarios/', requestData);

      toaster.push(
        <Message showIcon type="success" duration={3000}>
          Conta criada com sucesso
        </Message>
      );
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.forEach(error =>
        toaster.push(
          <Message showIcon duration={3000} type="error">
            {error}
          </Message>
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = () => {
    setVisible(!visible);
  };

  const emailHandleChange = value => {
    const suffixes = ['@gmail.com', '@outlook.com', '@hotmail.com'];
    const at = value.match(/@[\S]*/);
    const nextData = at
      ? suffixes
          .filter(item => item.indexOf(at[0]) >= 0)
          .map(item => `${value}${item.replace(at[0], '')}`)
      : suffixes.map(item => `${value}${item}`);

    setData(nextData);
  };

  return (
    <Container style={style}>
      <CustomLoader isLoading={isLoading} />
      <Content>
        <FlexboxGrid justify="center">
          <Panel header={<h3>Crie sua conta</h3>} bordered>
            <Form
              model={usuario}
              onSubmit={handleFormSubmit}
              autoComplete="off"
            >
              <div className="parent">
                <div className="firstChild">
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <AvatarIcon />
                      </InputGroup.Addon>
                      <Form.Control
                        value={nome}
                        type="text"
                        name="nome"
                        onChange={e => setNome(e)}
                        placeholder="Nome completo*"
                        autoFocus
                        size="lg"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <CalendarIcon />
                      </InputGroup.Addon>
                      <Form.Control
                        accepter={DatePicker}
                        locale={{
                          sunday: 'Dom',
                          monday: 'Seg',
                          tuesday: 'Ter',
                          wednesday: 'Qua',
                          thursday: 'Qui',
                          friday: 'Sex',
                          saturday: 'Sáb',
                          ok: 'OK',
                          today: 'Hoje',
                          yesterday: 'Ontem',
                          hours: 'Horas',
                          minutes: 'Minutos',
                          seconds: 'Segundos',
                        }}
                        format="dd/MM/yyyy"
                        limitEndYear={1900}
                        onChange={setDataNasc}
                        block
                        size="lg"
                        name="data"
                        placeholder="Data de nascimento*"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="secondChild">
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <MemberIcon />
                      </InputGroup.Addon>
                      <Form.Control
                        accepter={MaskedInput}
                        value={cpf}
                        guide
                        mask={[
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          '.',
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          '.',
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          '-',
                          /[0-9]/,
                          /[0-9]/,
                        ]}
                        showMask={false}
                        keepCharPositions={false}
                        onChange={setCpf}
                        name="cpf"
                        placeholder="CPF*"
                        placeholderChar="_"
                        size="lg"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <PhoneFillIcon />
                      </InputGroup.Addon>
                      <Form.Control
                        accepter={MaskedInput}
                        value={telefone}
                        mask={[
                          '(',
                          /[1-9]/,
                          /[0-9]/,
                          ')',
                          ' ',
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          '-',
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                        ]}
                        showMask={false}
                        keepCharPositions={false}
                        onChange={setTelefone}
                        name="telefone"
                        placeholder="Telefone*"
                        placeholderChar="_"
                        size="lg"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <Form.Group>
                <InputGroup size="lg">
                  <InputGroup.Addon>
                    <EmailFillIcon />
                  </InputGroup.Addon>
                  <Form.Control
                    accepter={AutoComplete}
                    data={data}
                    onChange={emailHandleChange}
                    name="email"
                    placeholder="E-mail*"
                    size="lg"
                  />
                </InputGroup>
              </Form.Group>

              <div className="parent">
                <div className="firstChild">
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <Lock />
                      </InputGroup.Addon>
                      <Form.Control
                        placeholder="Sua senha*"
                        name="senha1"
                        onChange={setSenha1}
                        type={visible ? 'text' : 'password'}
                        size="lg"
                      />
                      <InputGroup.Button onClick={handleChange}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="secondChild">
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <Lock />
                      </InputGroup.Addon>
                      <Form.Control
                        placeholder="Confirme sua senha*"
                        name="senha2"
                        onChange={setSenha2}
                        type={visible ? 'text' : 'password'}
                        size="lg"
                      />
                      <InputGroup.Button onClick={handleChange}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <Form.Group>
                <ButtonToolbar>
                  <Button
                    className="form-submit"
                    type="submit"
                    appearance="primary"
                    size="lg"
                  >
                    Criar sua conta
                  </Button>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </Panel>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}
