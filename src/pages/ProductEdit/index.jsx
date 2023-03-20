import { get } from 'lodash';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Container,
  Content,
  FlexboxGrid,
  Form,
  InputGroup,
  InputNumber,
  InputPicker,
  Message,
  Panel,
  Uploader,
  useToaster,
} from 'rsuite';

import CustomLoader from '../../components/CustomLoader';
import IHeader from '../../components/Header';
import axios from '../../services/axios';

export default function ProductEdit() {
  const history = useHistory();
  const { id } = useParams();

  const checkProduct = async () => {
    try {
      await axios.get(`produtos/${id}`);
    } catch (err) {
      history.goBack();
    }
  };

  checkProduct();

  const toaster = useToaster();
  const [photos, setPhotos] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState();
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState('');

  // eslint-disable-next-line prefer-const
  let [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    document.title = 'Ironware | Edição de Produto';

    const getData = async () => {
      const response = await axios.get('categoria/');
      data = get(response, 'data.categorias', []);
      setData(data.map(obj => ({ label: obj.nome, value: obj.id })));
      if (data.length >= 1) setDisabled(false);
    };

    const fillForm = async () => {
      const response = await axios.get(`produtos/${id}`);
      const produto = get(response, 'data.produto', {});
      setNome(produto.nome);
      setValor(produto.valor);
      setQuantidade(produto.quantidade);
    };

    setIsLoading(false);
    getData();
    fillForm();
  }, []);

  if (isLoading) {
    return (
      <>
        <IHeader dashboard />
        <CustomLoader isLoading={isLoading} />
      </>
    );
  }

  const style = {
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
  };

  const helperStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  const handleFormSubmit = async e => {
    if (!e) {
      toaster.push(
        <Message showIcon type="error">
          Há erros no formulário
        </Message>
      );
      return;
    }

    if (!categoria) {
      toaster.push(
        <Message showIcon type="error">
          Categoria é obrigatória
        </Message>
      );
      return;
    }

    if (!valor) {
      toaster.push(
        <Message showIcon type="error">
          Valor é obrigatório
        </Message>
      );
      return;
    }

    if (!nome) {
      toaster.push(
        <Message showIcon type="error">
          Nome é obrigatório
        </Message>
      );
      return;
    }

    if (!quantidade) {
      toaster.push(
        <Message showIcon type="error">
          Quantidade é obrigatória
        </Message>
      );
      return;
    }

    const requestData = {
      nome,
      id_categoria: categoria,
      quantidade,
      valor,
    };

    try {
      document.body.style.cursor = 'wait';
      const response = await axios.put(`produtos/${id}`, requestData);
      const productId = get(response, 'data.produto.id', null);

      await axios.delete(`fotos/${id}`);

      const form = new FormData();
      form.append('id_produto', productId);

      for (let i = 0; i < photos.length; i += 1) {
        form.append('fotos', photos[i].blobFile);
      }

      await axios.post('fotos/', form, {
        headers: 'Content-Type: multipart/form-data',
      });

      toaster.push(
        <Message showIcon type="success" duration={3000}>
          Produto atualizado com sucesso!
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
              <Panel header={<h3>Edição de Produto</h3>} bordered>
                <Form
                  autoComplete="off"
                  autoCorrect="off"
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
                        <Form.ControlLabel>
                          Categoria do Produto
                        </Form.ControlLabel>
                        <InputPicker
                          size="lg"
                          data={data}
                          value={categoria}
                          onChange={setCategoria}
                          disabled={disabled}
                          menuMaxHeight={300}
                          placeholder="Selecione"
                          block
                        />
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
                      listType="picture-text"
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
                        Editar
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
