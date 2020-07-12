import React from 'react';
import { View, Button } from 'react-native';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Button title="sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
