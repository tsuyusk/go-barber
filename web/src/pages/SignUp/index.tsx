import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const handleSubmitSignUp = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        setLoading(true);
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

        await api.post('/users', data);

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um problema no cadastro, tente novamente.',
          });
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber" />
          <Form ref={formRef} onSubmit={handleSubmitSignUp}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
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
              Sign up
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para o logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
