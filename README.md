# Letmeask - Next Level Week da Rockeseat (trilha de ReactJS)

<p align="center">
  <img alt="Happy" src="" width="100%">
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Vite.js](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/?hl=pt-br)

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/QnKeZXOWXmRfeuUbh2PF3Y/Letmeask-(Community)?node-id=45%3A3279). 

## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `npm i`
- Inicie o servidor com `npm dev`

Agora você pode acessar [`localhost:3000`](http://localhost:3000) do seu navegador.

Ou acesse o projeto hospedado no [Firebase](https://letmeask-c49ed.web.app/).

## Configurações 
---

Inicialmente usei o **create-react-app** mas demorava muito para atualizar as modificações e para realizar instações então me desafiei a fazer com [Vitejs](https://vitejs.dev/). 

![Vite logo](https://vitejs.dev/logo.svg)

O [Vite](https://dev.to/lixeletto/vite-js-o-build-tool-que-vai-facilitar-a-sua-vida-15ho) é um bundler alternativo ao Gulp e Webpack, sendo assim ele possui um starter-template próprio para ReactJS que é muito mais rápido que o *create-react-app* mantido pelo Facebook.

![meme](https://pbs.twimg.com/media/E0UavdEVIAQfc-B.jpg)

1. Ele ja vai ter um template de ReactJS + TypeScript. 
2. A pasta index.html fica na raiz do projeto no Vite, além do arquivo .tsx principal não ser o index mas o main (coisas que você pode mudar facilmente renomeando, eu manti como main). 
3. A coisa mais complicada foi aquela configuração de variáveis de ambiente, mas você pode ver minhas configrações no arquivo de firebase.ts (um agradecimento ao Lucas Teixeira e ao Sampaio Leal dentro da comunidade no Discord da Rocketseat que me ajudaram com estas configurações) e nas variáveis de ambiente propriamente dito dentro do arquivo .env.local basta trocar REACT_APP_ por VITE__.