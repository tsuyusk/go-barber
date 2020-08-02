import React, { useCallback, useRef, useState, ChangeEvent } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles | null>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const handleSubmitSignUp = useCallback(
    async (data: ProfileFormData): Promise<void> => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('Email obrigatório')
            .email('Digite um Email valido'),
          old_password: yup.string(),
          password: yup.string().when('old_password', {
            is: (value) => !!value.password,
            then: yup.string().required(),
            otherwise: yup.string(),
          }),
          password_confirmation: yup
            .string()
            .when('old_password', {
              is: (value) => !!value.password,
              then: yup.string().required(),
              otherwise: yup.string(),
            })
            .oneOf([yup.ref('password')], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        addToast({
          type: 'sucess',
          title: 'Perfil atualizado!',
          description: 'Suas informações foram atualizadas com sucesso',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          console.log(err);
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description:
              'Ocorreu um problema na atualização do perfil, tente novamente.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, updateUser]
  );

  const handleAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'sucess',
          title: 'Avatar atualizado',
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmitSignUp}>
          <AvatarInput>
            <img
              src={
                user.avatar_url || 'https://myspace.com/common/images/user.png'
              }
              alt={user.name}
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
          <Input icon={FiMail} name="email" placeholder="Email" type="email" />
          <Input
            icon={FiLock}
            name="old_password"
            placeholder="Senha atual"
            type="password"
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Nova senha"
            type="password"
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            placeholder="Confirmar senha"
            type="password"
          />

          <Button isLoading={loading} type="submit">
            Confirmar mudanças
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
