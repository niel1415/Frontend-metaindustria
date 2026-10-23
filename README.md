# Metaindústria - Sprint 4 | Entrega Final

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript**, integrado à API REST em **Spring Boot** do projeto Metaindústria.

O objetivo desta entrega é demonstrar o fluxo completo **Frontend → Service → API → Banco H2**, sem dados mockados no fluxo principal. Quando o backend está desligado, o aplicativo exibe um erro visível em vez de mostrar dados falsos.

## Integrantes

| Integrante | RM |
|---|---:|
| Victor Augusto | 558338 |
| Milena Queiroz | 558825 |
| Pedro Henrique | 558867 |
| Gabriel Yeshua | 558273 |
| Nicolas Alvares | 557271 |

## Repositórios

- **Backend Spring Boot:** `https://github.com/niel1415/backend-metaindustria`
- **Frontend Expo:** `https://github.com/niel1415/Frontend-metaindustria`

## Vídeo da entrega

- **YouTube - Não listado (até 5 minutos):** `https://youtu.be/buLz3d2Uz1M`

## Problema e solução

O projeto Metaindústria representa o monitoramento de sensores de um ambiente industrial. A entidade principal desta entrega é **Sensor**. Cada sensor possui:

- `id`
- `nome`
- `tipo`
- `localizacao`
- `status`

O aplicativo permite consultar os sensores registrados no backend, cadastrar um novo sensor e abrir os detalhes de um registro específico.

## Arquitetura

```text
Tela do app
   ↓
src/services/sensorService.ts
   ↓
src/services/api.ts (Axios)
   ↓
API Spring Boot :8080
   ↓
Controller → Service → Repository
   ↓
H2 em arquivo
```

### Fluxo das telas

| Tela/Ação | Serviço | Endpoint |
|---|---|---|
| Lista de sensores | `listar()` | `GET /sensores` |
| Cadastro | `criar(sensor)` | `POST /sensores` |
| Detalhe | `buscarPorId(id)` | `GET /sensores/{id}` |

O backend também disponibiliza o CRUD completo com `PUT /sensores/{id}` e `DELETE /sensores/{id}`.

## Pré-requisitos

Instale antes de executar:

- Java 17
- Maven
- Node.js
- npm
- Expo

Verifique no terminal:

```bash
java -version
mvn -version
node -v
npm -v
```

## 1. Subindo o backend

Clone o repositório do backend e entre na pasta:

```bash
git clone (https://github.com/niel1415/backend-metaindustria)
cd backend-metaindustria
```

Execute:

```bash
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

Teste a listagem diretamente no navegador, Postman ou Insomnia:

```text
GET http://localhost:8080/sensores
```

O retorno inicial pode ser um array vazio:

```json
[]
```

Isso significa que a API está funcionando e ainda não existem sensores cadastrados.

### Banco H2

O backend usa **H2 em arquivo**, portanto os registros permanecem após reiniciar a aplicação.

URL configurada:

```text
jdbc:h2:file:./data/sprint-db
```

Console H2:

```text
http://localhost:8080/h2-console
```

Configuração:

```text
JDBC URL: jdbc:h2:file:./data/sprint-db
User Name: sa
Password: (vazio)
```

## 2. Configurando a BASE_URL

A configuração está em:

```text
src/services/api.ts
```

### Web ou simulador iOS

```text
http://localhost:8080
```

### Emulador Android

```text
http://10.0.2.2:8080
```

### Celular físico com Expo Go

Use o IP local do computador conectado à mesma rede Wi-Fi, por exemplo:

```text
http://192.168.0.10:8080
```

Nesse caso, edite `src/services/api.ts` e use o IP correto da máquina.

## 3. Subindo o frontend

Clone o repositório do frontend:

```bash
git clone COLE_AQUI_O_LINK_DO_REPOSITORIO_FRONTEND
cd Mobile-Sprint4
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Para abrir na web, pressione `w`. Para celular físico, leia o QR Code usando o Expo Go.

## 4. Teste completo da integração

### Listar sensores

Com backend e frontend ligados, abra o app. A tela inicial executa:

```text
GET /sensores
```

Os registros recebidos da API são apresentados na lista.

### Cadastrar pelo aplicativo

Clique em **+ Novo** e preencha, por exemplo:

```text
Nome: Sensor Temperatura 01
Tipo: Temperatura
Localização: Linha de Produção 1
Status: Normal
```

Clique em **Salvar no backend**.

O app executará:

```text
POST /sensores
```

Depois do cadastro, a lista é carregada novamente.

### Conferir diretamente na API

Abra:

```text
http://localhost:8080/sensores
```

O sensor cadastrado pelo aplicativo deverá aparecer no JSON, comprovando a integração Frontend → Backend → H2.

### Consultar detalhes

Clique em um item da lista. O aplicativo executa:

```text
GET /sensores/{id}
```

A tela apresenta ID, nome, tipo, localização e status retornados pela API.

## 5. Teste obrigatório: backend desligado

Com o aplicativo aberto, volte ao terminal onde o Spring Boot está rodando e pressione:

```text
Ctrl + C
```

Depois, no aplicativo, atualize a lista ou pressione **Tentar novamente**.

O aplicativo não usa mock. Como a API está indisponível, será apresentada uma mensagem informando que não foi possível acessar o backend.

Esse comportamento comprova o requisito da Sprint 4:

```text
Backend parado → dados não chegam → erro visível no aplicativo.
```

## Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/sensores` | Lista sensores |
| GET | `/sensores/{id}` | Busca sensor por ID |
| POST | `/sensores` | Cadastra sensor |
| PUT | `/sensores/{id}` | Atualiza sensor |
| DELETE | `/sensores/{id}` | Exclui sensor |

## Estrutura principal do frontend

```text
Mobile-Sprint4/
├── src/
│   ├── components/
│   │   └── SensorCard.tsx
│   ├── screens/
│   │   ├── ListaScreen.tsx
│   │   ├── CadastroScreen.tsx
│   │   └── DetalheScreen.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── sensorService.ts
│   └── types/
│       └── Sensor.ts
├── App.tsx
└── package.json
```

## Tratamento de estados

O frontend possui estados visíveis para:

- carregamento da lista;
- carregamento de detalhe;
- cadastro em andamento;
- sucesso no cadastro;
- lista vazia;
- erro de conexão com o backend.

Nenhum mock é utilizado no fluxo principal.

**Sprint 4 - Metaindústria | Entrega Final**
