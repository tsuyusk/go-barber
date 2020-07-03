import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);
  const handleSubmitSignUp = useCallback(async (data: object): Promise<
    void
  > => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        name: yup.string().required('Nome obrigatório'),
        email: yup
          .string()
          .required('Email obrigatório')
          .email('Digite um Email valido'),
        password: yup.string().min(6, 'No mínmo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="Go Barber" />
        <Form ref={formRef} onSubmit={handleSubmitSignUp}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
          <Input icon={FiMail} name="email" placeholder="Email" type="email" />
          <Input
            icon={FiLock}
            name="password"
            placeholder="senha"
            type="password"
          />

          <Button type="submit">Sign up</Button>
        </Form>
        <a href="/">
          <FiArrowLeft />
          Voltar para o logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
