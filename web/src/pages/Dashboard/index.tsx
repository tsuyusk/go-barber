import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.svg';
import { Container, Header, HeaderContent, ProfileWrapper } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo" />

          <ProfileWrapper>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo!</span>
              <strong>{user.name}</strong>
            </div>
          </ProfileWrapper>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
