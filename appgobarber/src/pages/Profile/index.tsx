import React, { useCallback, useRef } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import * as yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { Container, Title, BackButton, UserAvatarButton, UserAvatar } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolha da galeria',
      },
      response => {
        if (response.didCancel) {
          return
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar')
          return
        }

        const data = new FormData()

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        })

        api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data)
        })

        Alert.alert('Sua foto de perfil foi alterada com sucesso!');
      },
    )
  }, [updateUser, user.id])

  const handleSubmitProfileChanges = useCallback(async (data: ProfileFormData): Promise<void> => {
    try {
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

      await updateUser(response.data);

      Alert.alert('Perfil atualizado com sucesso!', 'Suas informações já foram atualizadas!');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
      Alert.alert('Erro na atualização de perfil', 'Ocorreu um problema na atualização do seu perfil, tente novamente')
      } else {
        console.log(err)
      }
    }
  },
  []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation.goBack]);

  const handleSubmit = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  return (
    <>
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri: user.avatar_url}}/>
            </UserAvatarButton>
            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              onSubmit={handleSubmitProfileChanges}
              ref={formRef}
              initialData={user}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus()
                }}
              />


              <Input
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{marginTop: 16}}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                ref={oldPasswordInputRef}
              />

              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
                ref={passwordInputRef}
              />

              <Input
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmação da senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                ref={passwordConfirmationInputRef}
              />

              <Button onPress={handleSubmit}>Confirmar mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default SignUp;
