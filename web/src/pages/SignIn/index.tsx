import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import * as yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Insira um email válido.'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
        addToast({
          type: 'sucess',
          title: 'Autenticado com sucesso.',
        });
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer a validação, cheque as credenciais',
        });
      } finally {
        setLoading(false);
      }
    },
    [signIn, addToast, history]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input
              icon={FiMail}
              name="email"
              placeholder="Email"
              type="email"
            />
            <Input
              icon={FiLock}
              name="password"
              placeholder="senha"
              type="password"
            />

            <Button isLoading={loading} type="submit">
              Entrar
            </Button>

            <Link to="/forgot">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
