/* eslint-disable no-unused-vars */
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AutoComplete,
  ButtonToolbar,
  Container,
  Content,
  FlexboxGrid,
  Form,
  IconButton,
  InputGroup,
  Message,
  Panel,
  useToaster,
} from 'rsuite';

import EmailFillIcon from '@rsuite/icons/EmailFill';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import Lock from '@rsuite/icons/legacy/Lock';
import SignIn from '@rsuite/icons/legacy/SignIn';

import CustomLoader from '../../components/CustomLoader';
import * as actions from '../../store/modules/auth/actions';
import usuarioLogin from '../Login/usuarioLogin';

import IHeader from '../../components/Header';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Login() {
  const style = {
    marginTop: '50px',
    padding: '10px',
  };

  const helperStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  useEffect(() => {
    document.title = 'Ironware | Login Admin';
  }, []);

  const toaster = useToaster();
  const dispatch = useDispatch();

  const [senha, setSenha] = useState('');
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleFormSubmit = async e => {
    if (!e) {
      toaster.push(
        <Message showIcon type="error">
          Há erros no formulário
        </Message>
      );
      return;
    }

    const requestData = {
      email: data.at(0),
      senha,
    };

    try {
      dispatch(actions.loginRequest());

      const responseData = await axios.post('/auxtokens/', requestData);
      const { token } = responseData.data;

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const res = await axios.get('/auxiliares/');

      dispatch(
        actions.adminLoginSuccess({
          token,
          admin: { nome: res.data.nome, email: res.data.email },
        })
      );

      toaster.push(
        <Message showIcon type="success">
          Você fez login
        </Message>
      );

      history.push('/administrativo/dashboard');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.forEach(error =>
        toaster.push(
          <Message showIcon type="error">
            {error}
          </Message>
        )
      );

      dispatch(actions.loginFailure());
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
    <>
      <IHeader />
      <Container style={style}>
        <CustomLoader isLoading={isLoading} />
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Panel header={<h3>Faça login</h3>} bordered>
                <Form
                  onSubmit={handleFormSubmit}
                  model={usuarioLogin}
                  autoComplete="off"
                >
                  <Form.Group>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <EmailFillIcon />
                      </InputGroup.Addon>
                      <Form.Control
                        accepter={AutoComplete}
                        autoFocus
                        data={data}
                        onChange={emailHandleChange}
                        name="email"
                        placeholder="Seu e-mail"
                        size="lg"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group style={{ margin: '30px 0' }}>
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <Lock />
                      </InputGroup.Addon>
                      <Form.Control
                        placeholder="Sua senha"
                        name="senha"
                        onChange={setSenha}
                        type={visible ? 'text' : 'password'}
                        size="lg"
                      />
                      <InputGroup.Button
                        appearance="subtle"
                        onClick={handleChange}
                      >
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ButtonToolbar>
                      <IconButton
                        style={{ minWidth: '250px' }}
                        icon={<SignIn />}
                        type="submit"
                        appearance="primary"
                        size="lg"
                      >
                        Fazer login
                      </IconButton>
                    </ButtonToolbar>
                  </Form.Group>
                  <div style={helperStyle}>
                    Não possui cadastro?{' '}
                    <a href="/administrativo/cadastro">Registre-se</a>
                  </div>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
}
