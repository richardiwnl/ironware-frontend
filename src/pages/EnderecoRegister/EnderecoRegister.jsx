import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Container,
  Content,
  FlexboxGrid,
  Form,
  InputGroup,
  InputNumber,
  MaskedInput,
  Message,
  Panel,
  useToaster,
} from 'rsuite';

import axiosLocal from '../../services/axios';
import CustomLoader from '../../components/CustomLoader';
import IHeader from '../../components/Header';
import EnderecoRegisterModel from '../AdminEnderecoRegister/enderecoRegister';

export default function EnderecoRegister() {
  const style = {
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
  };

  const helperStyle = {
    marginTop: '5px',
    textAlign: 'center',
  };

  const toaster = useToaster();

  const [cepValido, setCepValido] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');

  useEffect(() => {
    document.title = 'Ironware | Cadastro de Endereço';

    const fetch = async () => {
      if (cep.match(/^([\d]{2})\.?([\d]{3})-?([\d]{3})/)) {
        setIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        const responseData = get(response, 'data', {});
        if (responseData.erro) {
          toaster.push(
            <Message showIcon type="error">
              CEP inválido!
            </Message>
          );
          setIsLoading(false);
          setCepValido(false);
          return;
        }

        setCepValido(true);
        setLogradouro(responseData.logradouro);
        setCidade(responseData.localidade);
        setBairro(responseData.bairro);

        setIsLoading(false);
      }
    };

    fetch();
  }, [cep]);

  const handleFormSubmit = async e => {
    if (!e) {
      toaster.push(
        <Message showIcon type="error">
          Há erros no formulário!
        </Message>
      );
      return;
    }

    if (!cepValido) {
      toaster.push(
        <Message showIcon type="error">
          CEP inválido!
        </Message>
      );
      return;
    }

    if (!logradouro) {
      toaster.push(
        <Message showIcon type="error">
          O logradouro é obrigatório!
        </Message>
      );
      return;
    }

    if (!bairro) {
      toaster.push(
        <Message showIcon type="error">
          O bairro é obrigatório!
        </Message>
      );
      return;
    }

    if (!cidade) {
      toaster.push(
        <Message showIcon type="error">
          A cidade é obrigatório!
        </Message>
      );
      return;
    }

    setIsLoading(true);

    try {
      await axiosLocal.post('enderecos/', {
        logradouro,
        bairro,
        cidade,
        complemento,
        numero,
        cep: cep.replace('-', ''),
      });

      toaster.push(
        <Message showIcon type="success" duration={3000}>
          Endereço cadastrado com sucesso!
        </Message>
      );
    } catch (err) {
      console.log('err', err);
      const errors = get(err, 'response.data.errors', []);

      errors.forEach(error => {
        toaster.push(
          <Message showIcon duration={3000} type="error">
            {error}
          </Message>
        );
      });
    } finally {
      setIsLoading(false);
    }

    console.log('kekw');
  };

  return (
    <>
      <IHeader dashboard />
      <Container style={style}>
        <CustomLoader isLoading={isLoading} />
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Panel header={<h3>Cadastro de Endereço</h3>} bordered>
                <Form
                  autoComplete="off"
                  autoCorrect="off"
                  model={EnderecoRegisterModel}
                  onSubmit={handleFormSubmit}
                >
                  <div className="parent">
                    <div className="firstChild">
                      <Form.Group>
                        <Form.ControlLabel>CEP</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            accepter={MaskedInput}
                            showMask={false}
                            keepCharPositions={false}
                            guide
                            mask={[
                              /[0-9]/,
                              /[0-9]/,
                              /[0-9]/,
                              /[0-9]/,
                              /[0-9]/,
                              '-',
                              /[0-9]/,
                              /[0-9]/,
                              /[0-9]/,
                            ]}
                            value={cep}
                            onChange={setCep}
                            placeholderChar="_"
                            size="lg"
                            name="cep"
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <div className="secondChild">
                      <Form.Group>
                        <Form.ControlLabel>Logradouro</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="logradouro"
                            value={logradouro}
                            onChange={setLogradouro}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="parent">
                    <div className="firstChild">
                      <Form.Group>
                        <Form.ControlLabel>Bairro</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="bairro"
                            value={bairro}
                            onChange={setBairro}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <div className="secondChild">
                      <Form.Group>
                        <Form.ControlLabel>Cidade</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="cidade"
                            value={cidade}
                            onChange={setCidade}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="parent">
                    <div className="firstChild">
                      <Form.Group>
                        <Form.ControlLabel>Complemento</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="complemento"
                            value={complemento}
                            onChange={setComplemento}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <div className="secondChild">
                      <Form.Group>
                        <Form.ControlLabel>Número</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            accepter={InputNumber}
                            size="lg"
                            name="numero"
                            value={numero}
                            onChange={setNumero}
                            min={1}
                            defaultValue=""
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group style={helperStyle}>
                    <ButtonToolbar>
                      <Button
                        className="form-submit"
                        type="submit"
                        appearance="primary"
                        size="lg"
                      >
                        Enviar
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
}
