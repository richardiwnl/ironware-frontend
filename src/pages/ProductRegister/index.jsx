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
  Message,
  Panel,
  Uploader,
  useToaster,
} from 'rsuite';

import IHeader from '../../components/Header';
import axios from '../../services/axios';
import productRegister from './productRegister';

export default function ProductRegister() {
  const style = {
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
  };

  const helperStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  useEffect(() => {
    document.title = 'Ironware | Cadastro de Produto';
  }, []);

  const toaster = useToaster();

  const [photos, setPhotos] = useState([]);
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState();
  const [valor, setValor] = useState();

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
      nome,
      marca,
      quantidade,
      valor,
    };

    try {
      document.body.style.cursor = 'wait';

      const response = await axios.post('produtos/', requestData);
      const id = get(response, 'data.produto.id', null);

      const form = new FormData();
      form.append('id_produto', id);

      for (let i = 0; i < photos.length; i += 1) {
        form.append('fotos', photos[i].blobFile);
      }

      await axios.post('fotos/', form, {
        headers: 'Content-Type: multipart/form-data',
      });

      toaster.push(
        <Message showIcon type="success" duration={3000}>
          Produto cadastrado com sucesso!
        </Message>
      );

      setNome('');
      setMarca('');
      setQuantidade(1);
      setValor();
      setPhotos([]);
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
      document.body.style.cursor = 'default';
    }
  };

  return (
    <>
      <IHeader dashboard />
      <Container style={style}>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Panel header={<h3>Cadastro de Produto</h3>} bordered>
                <Form
                  autoComplete="off"
                  autoCorrect="off"
                  model={productRegister}
                  onSubmit={handleFormSubmit}
                >
                  <div className="parent">
                    <div className="firstChild">
                      <Form.Group>
                        <Form.ControlLabel>Nome do Produto</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="nome"
                            value={nome}
                            onChange={setNome}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <div className="secondChild">
                      <Form.Group>
                        <Form.ControlLabel>Marca do Produto</Form.ControlLabel>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            name="marca"
                            value={marca}
                            onChange={setMarca}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="parent">
                    <div className="firstChild">
                      <Form.Group>
                        <Form.ControlLabel>Quantidade</Form.ControlLabel>
                        <InputGroup size="lg">
                          <Form.Control
                            accepter={InputNumber}
                            size="lg"
                            name="quantidade"
                            value={quantidade}
                            onChange={setQuantidade}
                            defaultValue={1}
                            max={250}
                            min={1}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <div className="secondChild">
                      <Form.Group>
                        <Form.ControlLabel>Preço (R$)</Form.ControlLabel>
                        <InputGroup size="lg">
                          <Form.Control
                            accepter={InputNumber}
                            size="lg"
                            name="valor"
                            value={valor}
                            onChange={setValor}
                            placeholder="R$"
                            min={1}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group style={{ marginTop: 10 }}>
                    <Form.ControlLabel>Fotos</Form.ControlLabel>
                    <Uploader
                      action="https://jsonplaceholder.typicode.com/posts/"
                      accept="image/*"
                      draggable
                      fileList={photos}
                      onChange={setPhotos}
                      multiple
                      autoUpload={false}
                      shouldQueueUpdate={fileList => {
                        const fileName = fileList.at(-1).name;
                        if (fileName.length > 30) {
                          toaster.push(
                            <Message showIcon duration={3000} type="error">
                              O nome do arquivo deve conter menos que 30
                              caracteres
                            </Message>
                          );
                          return false;
                        }
                        return true;
                      }}
                    >
                      <div
                        style={{
                          height: 180,
                          minWidth: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span>
                          Clique ou arraste arquivos para essa área para enviar
                        </span>
                      </div>
                    </Uploader>
                  </Form.Group>

                  <Form.Group style={helperStyle}>
                    <ButtonToolbar>
                      <Button appearance="primary" block type="submit">
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
