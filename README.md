# Backend do Moodle da AGES

O backend foi desenvolvido utilizando NestJS, utilizando TypeScritp, com o intuito de fornecer gerenciar os processos do Moodle.

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pacotes](#pacotes)
- [Iniciando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Rodando o Backend](#rodando-o-backend)
- [Documentação](documentação)
- [Database](#database)
- [Autenticação](#autenticação)
- [Contribuição](#contribuição---backend)
## Visão Geral
O projeto foi desenvolvido para haver calendário, login, sprints, usuários e uma área de administrador.

- O calendário serve para colocar datas importantes.
- O login tem uma rota de autenticar(fazer login) e uma opção para redefinir a senha no primeiro acesso.
- As sprints são separada por semestre do grupoo de estudo, tendo um título e uma breve descrição. A descrição principal da tarefa é dada por um arquivo readme.md para facilitar a formatação e existe um espaço para compartilhar informações(Material).
- Os usuário são compostos por nome(username), email, senha(password), matrícula(registration), cargo(role), semestre da ages(semester), link do github(githubLink) e imagem(imgPath).


## Tecnologias

- **Backend:**
    - NestJS
    - Node.js
    - [Bibliotecas](bibliotecas)
- **Banco de Dados:**
    - Prisma com PostgreSQL
- **Documentação da API:**
    - [Documentação](#documentação)
## Bibliotecas

Durante o desenvolvimento do projeto foi utilizado algumas bibliotecas npm, aqui está alista para o que servem e quais são os nomes:
- Arquivos: multer;
- Authenticação: @nestjs/jwt, @nestjs/passport, passport-jwt;
- Bases do NestJs: @nestjs/common, @nestjs/config, @nestjs/core, @nestjs/platform-express, @nestjs/mapped-types, express, reflect-metadata, rxjs;
- Criptografia: bcrypt;
- Database: @prisma/client, @prisma/extension-accelerate;
- Documentação: @nestjs/swagger;
- Verificação de dados: class-transformer, class-validator;
## Iniciando

### Pré-requisitos
- Ter o Docker instalado
- Ter o PostgreSQL

### Instalação
- Criar um arquivo .env e copiar o que está em .env.example;

- Copiar o repositório
```bash
$ git clone https://github.com/Grupo-de-Estudos-AGES-Creatus/projeto-final-backend.git
```
- Iniciar a database
``` bash
$ docker compose up -d
```

- Instalar as bibliotecas npm
``` bash
$ npm i --force
```

- Criar a database no prisma
``` bash
$ npx prisma generate

$ npx prisma migrate dev
```

### Rodando o Backend
Inciar o backend
```bash
$ npm start
```


## Documentação da API

A API é gerenciada pelo swagger, isso possibilita ser atualizada automaticamente cada vez que iniciar o programa. Para acessar ela, rode o backend e acesse pelo navegador com o url: https://localhost:3000/api.




## Database

A database pode ser acessado o arquivo schema.prisma(/prisma/schema.prisma).
## Autenticação

A autenticação é feita utilizando tokens JWT, possui um sistema de cargos(roles) para diferenciar adiministradores de estudantes e um sistema para verificar se é a própria pessoa realizando a ação.
## Contribuição - Backend

- [Aline Ibaldo Gonçalves](https://github.com/alineibaldo)
- [Eduardo Spies Acauan](https://github.com/eduardoacauan)
- [Fernando Spies Acauan](https://github.com/fernandoacauan)
- [Henrique Pereira da Silva Collatto](https://github.com/HenriqueCollatto)
- [Henrique Vitor Mairesse](https://github.com/henriquemairesse)
- [Lucas Lourenço Jacchetti](https://github.com/Lucas-Jacchetti)