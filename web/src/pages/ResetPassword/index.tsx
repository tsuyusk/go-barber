import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

import * as yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ResetFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const { addToast } = useToast();
  const location = useLocation();
  const formRef = useRef<FormHandles | null>(null);
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ResetFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          password: yup.string().required('Senha obrigatória'),
          password_confirmation: yup
            .string()
            .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/passwords/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'sucess',
          title: 'Senha atualizada com sucesso.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Altere sua senha</h1>
            <Input
              icon={FiLock}
              name="password"
              placeholder="Nova senha"
              type="password"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              placeholder="Confirmação da senha"
              type="password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
