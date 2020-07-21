## Recuperação de senha

**RF**

- O User deve poder recuperar sua senha informando seu e-mail.
- O User deve receber um e-mail com instruç~eos de recperação de
  senha.
- O User deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em desenvolvimento.
- Utilizar amazon SES para enviar e-mails em produção.
- O Envio deve acontecer em segundo plano.

**RN**

- O link enviado por e-mail para poder enviar a senha deve expirar em duas horas.
- O User precisa confirmar a nova senha ao resetar.

## Atualização de perfil

**RF**

- O User deve poder atualizar seu nome, email e senha.
  **RNF**

**RN**

- O user não pode alterar seu e-mail para um e-mail já utilizado por outro usuário.
- Para atualizar sua senha, o user deve informar a senha antiga.
- Para atualizar sua senha, o user deve confirmar a nova senha.

## Agendamento de serviços

**RF**

- O User deve poder listar todos os prestadores de serviços cadastrados
- O User deve poder listar os dias que o prestador está livre.
- O User deve poder listar horarios disponiveis em um dia específico de um prestador.
- O User deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de prestadores devem ser amarzenadas em Cache.

**RN**

- Cada agendamento deve durar uma hora.
- Os aggendamentos devem estar disponíveis entre 8h às 18h ( Primeiro às 8, ultimos às 17 ).
- O usuario não pode agendar em um horário já ocupado.
- O usuario nao pode agendar em um horário que já passou.
- O usuario não pode agendar serviços consigo mesmo.

## Painel do prestador

**RF**

- O user deve poder listar seus agendamentos de um dia específico
- Prestador deve receber uma notificação quando fizer um agendamento
- Prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestados no dia devem ser armazenados em Cache.
- As notificações devem ser armazenadas no MongoDB.
- Notificações em tempo real com Socket IO.

**RN**

- A notificação deve ter um status de lida ou não lida.
