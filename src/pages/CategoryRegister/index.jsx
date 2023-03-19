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
  Message,
  Panel,
  useToaster,
} from 'rsuite';

import CustomLoader from '../../components/CustomLoader';
import IHeader from '../../components/Header';
import categoryRegister from './categoryRegister';
import axios from '../../services/axios';

export default function CategoryRegister() {
  const style = {
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
  };

  const helperStyle = {
    marginTop: '25px',
    textAlign: 'center',
  };

  useEffect(() => {
    document.title = 'Ironware | Cadastro de Categoria';
  }, []);

  const toaster = useToaster();

  const [categoria, setCategoria] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async e => {
    if (!e) {
      toaster.push(
        <Message showIcon type="error">
          Há erros no formulário
        </Message>
      );
      return;
    }

    try {
      setIsLoading(true);

      await axios.post('categoria/', {
        nome: categoria,
      });

      toaster.push(
        <Message showIcon type="success" duration={3000}>
          Categoria cadastrada com sucesso!
        </Message>
      );

      setCategoria('');
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
  };
  return (
    <>
      <IHeader dashboard />
      <Container style={style}>
        <CustomLoader isLoading={isLoading} />
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Panel header={<h3>Cadastro de Categoria</h3>} bordered>
                <Form
                  autoComplete="off"
                  autoCorrect="off"
                  model={categoryRegister}
                  onSubmit={handleFormSubmit}
                >
                  <Form.Group>
                    <Form.ControlLabel>Nome da Categoria</Form.ControlLabel>
                    <InputGroup>
                      <Form.Control
                        size="lg"
                        name="categoria"
                        value={categoria}
                        onChange={setCategoria}
                      />
                    </InputGroup>
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
