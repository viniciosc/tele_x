# Telex

Telex é um projeto de criação de APIs que monitoram o recebimento e envio de mensagens para um bot do Telegram. Ele fornece um painel de administração que permite aos usuários ver suas mensagens recebidas, enviar mensagens e acompanhar todas as mensagens enviadas para o bot. Essas funcionalidades são essenciais para a interação eficiente com a comunidade conectada ao bot.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes dependências instaladas:

- Node.js
- PostgreSQL
- TypeScript

## Configuração

Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis de ambiente:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
BOT_TOKEN=
PORT=
JWT_PASS=

Scripts

npm run build: Compila o código TypeScript.
npm run migration:generate: Gera uma migration usando TypeORM.
npm run migration:run: Executa migrations do banco de dados.
dev:server : inicia o projeto.

Tecnologias Utilizadas

Node.js
Express
PostgreSQL
TypeORM
JSON Web Tokens (JWT)