import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

import * as yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles | null>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Insira um email válido.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoading(true);

        await api.post('/passwords/forgot', {
          email: data.email,
        });

        addToast({
          type: 'sucess',
          title: 'E-mail de recuperação enviado !',
          description:
            'Enviamos um E-mail para confirmar sua recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente ovamente',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input
              icon={FiMail}
              name="email"
              placeholder="Email"
              type="email"
            />
            <Button isLoading={isLoading} type="submit">
              Recuperar
            </Button>

            <Link to="/">Voltar para o logon</Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
