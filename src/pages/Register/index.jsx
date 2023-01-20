/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Container,
  Content,
  DatePicker,
  FlexboxGrid,
  Form,
  Input,
  InputGroup,
  Panel,
} from 'rsuite';

import EmailFillIcon from '@rsuite/icons/EmailFill';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import MemberIcon from '@rsuite/icons/Member';
import PhoneFillIcon from '@rsuite/icons/PhoneFill';

import usuario from './usuarioRegister';

export default function Register() {
  const style = {
    marginTop: '50px',
    padding: '10px',
  };

  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  const [nome, setNome] = useState('');

  return (
    <Container style={style}>
      <Content>
        <FlexboxGrid justify="center">
          <Panel header={<h3>Crie sua conta</h3>} bordered>
            <Form model={usuario} autoComplete="off">
              <div className="parent">
                <div className="firstChild">
                  <Form.Group tabIndex="1">
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
                  <Form.Group tabIndex="3">
                    <DatePicker
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
                      limitEndYear={1900}
                      block
                      size="lg"
                      placeholder="Data de nascimento*"
                    />
                  </Form.Group>
                </div>

                <div className="secondChild">
                  <Form.Group tabIndex="2">
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <MemberIcon />
                      </InputGroup.Addon>
                      <Input placeholder="CPF*" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group tabIndex="4">
                    <InputGroup size="lg">
                      <InputGroup.Addon>
                        <PhoneFillIcon />
                      </InputGroup.Addon>
                      <Input placeholder="Telefone*" size="lg" />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <InputGroup size="lg" tabIndex="5">
                <InputGroup.Addon>
                  <EmailFillIcon />
                </InputGroup.Addon>
                <Input placeholder="E-mail*" size="lg" />
              </InputGroup>

              <div className="parent">
                <div className="firstChild">
                  <InputGroup inside size="lg">
                    <Input
                      placeholder="Sua senha*"
                      tabIndex="6"
                      type={visible ? 'text' : 'password'}
                      size="lg"
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </div>

                <div className="secondChild">
                  <InputGroup inside size="lg">
                    <Input
                      placeholder="Confirme sua senha*"
                      tabIndex="7"
                      type={visible ? 'text' : 'password'}
                      size="lg"
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <EyeIcon /> : <EyeSlashIcon />}
                    </InputGroup.Button>
                  </InputGroup>
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
