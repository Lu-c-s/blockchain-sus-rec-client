## Guia de instalação
# Pré-requisitos
* Node.js
* Ganache
* MySQL
* MetaMask
* Editor de texto
# Instalação do node modules
# Instalação do node modules do projeto front-end
npm install <br/>

# Instalação do node modules projeto back-end
cd cadsus <br/>
npm install <br/>

# Deploy dos contratos na blockchain
Com o ganache rodando abrir o terminal na pasta do projeto e executar os comandos: <br/>

truffle compile <br/>
truffle deploy

## Rodando o projeto 
# Rodando o frontend
em outro terminal na pasta principal do projeto, executar os comandos: <br/>

npm start <br/>

# Rodando o backend
cd cadsus <br/>
npm run start:dev<br/>

# Rodando o Ganache
Basta abrir o programa e executar um quick start com as configurações padrões para a Blockchain Ethereum.<br/>

## Testando a funcionalidade de profissional da saúde
Escolher uma das contas pre criadas pelo Ganache. <br/>
Importar uma conta no MetaMask.<br/>
usar a rota http://localhost:3000/provider para acessar o formulário de cadastro de paciente. <br/>
Preencher o formulário. <br/>
Clicar no botão "Registar Novo Paciente".<br/>
Aceitar a transação no metamask.<br/>

## Testando a funcionalidade de paciente
Entrar com a chave privada fornecida após o cadastro.

# Rodando os testes do projeto
Na pasta principal rodar o comando:<br/>

npm run test
