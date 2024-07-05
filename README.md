# Guia de Configuração e Execução desta Aplicação

Este guia fornece instruções passo a passo para configurar e executar está aplicação em Node.js em sua máquina local.

## Pré-requisitos

Antes de começar, verifique se sua máquina atende aos seguintes requisitos:

- Node.js *v20.9.0* e npm *10.1.0*: Instalados na versão informada.
- Git: Para clonar o repositório.

## 1. Clone o Repositório

Clone o repositório da aplicação para sua máquina local. Se você não tem o Git instalado, pode baixar o código como um arquivo ZIP diretamente do GitHub.

```bash
git clone https://github.com/rogermanica/gra-test.git
cd gra-test
```

## 2. Instale as Dependências

Navegue até o diretório do projeto e instale as dependências necessárias utilizando o npm.

```bash
npm install
```

## 3. Execute a Aplicação

Após a instalação das dependências e configuração do ambiente, você está pronto para iniciar a aplicação.

```bash
npm start
```
Aguarde até ver uma mensagem indicando que o servidor está rodando:
```bash
Server is running on port 3000
```

## 4. Acesse a Aplicação
Abra um navegador web e acesse a aplicação localmente através do endereço:

```bash
http://localhost:3000/api/producers
```

## 4. Testes
Para rodar os testes automatizados, utilize o seguinte comando:

```bash
npm test
```

## Problemas Comuns
### Erro ao Instalar Dependências

Se encontrar erros ao executar npm install, verifique sua conexão com a internet e certifique-se de que Node.js e npm estão corretamente instalados.