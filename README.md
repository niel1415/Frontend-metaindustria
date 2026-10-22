# Metaindústria - Sprint 4 | Entrega Final

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript**, integrado à API REST em **Spring Boot** do projeto Metaindústria.

O objetivo desta entrega é demonstrar o fluxo completo **Frontend → Service → API → Banco H2**, sem dados mockados no fluxo principal. Quando o backend está desligado, o aplicativo exibe um erro visível em vez de mostrar dados falsos.

## Integrantes

| Integrante | RM |
|---|---:|
| Victor Augusto | 558338 |
| Milena Queiroz | 55825 |
| Pedro Henrique | 558867 |
| Gabriel Yeshua | 558273 |
| Nicolas Alvares | 557271 |

> Confira os RMs antes da entrega final e ajuste caso a turma utilize outra formatação oficial.

## Repositórios

- **Backend Spring Boot:** `COLE_AQUI_O_LINK_DO_REPOSITORIO_BACKEND`
- **Frontend Expo:** `COLE_AQUI_O_LINK_DO_REPOSITORIO_FRONTEND`

> Antes de entregar, substitua os dois textos acima pelos links públicos dos repositórios finais.

## Vídeo da entrega

- **YouTube - Não listado (até 5 minutos):** `COLE_AQUI_O_LINK_DO_VIDEO`

> O vídeo deve estar como **Não listado**, nunca como Privado.

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
git clone COLE_AQUI_O_LINK_DO_REPOSITORIO_BACKEND
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

## Roteiro do vídeo - até 5 minutos

### 0:00 - 0:35 | README e repositórios

Mostrar o README no GitHub e dizer:

> "Este é o projeto Metaindústria da Sprint 4. A entrega final é composta por uma API Spring Boot e um aplicativo Expo integrados. No README estão os integrantes e RMs, os links dos dois repositórios, os pré-requisitos, instruções de execução, configuração da BASE_URL e os endpoints utilizados."

### 0:35 - 1:15 | Backend no ar + GET em JSON

Mostrar o terminal executando `mvn spring-boot:run`. Em seguida abrir `http://localhost:8080/sensores`.

> "O backend está executando na porta 8080. A aplicação utiliza Spring Boot com Controller, Service e Repository, além de banco H2 persistido em arquivo e CORS habilitado. Aqui podemos verificar o GET dos sensores retornando JSON diretamente da API."

### 1:15 - 2:05 | Aplicativo listando a API

Mostrar a tela inicial do app.

> "No frontend utilizamos React Native com Expo e TypeScript. A comunicação está concentrada na pasta src/services. A tela inicial chama o serviço de listagem, que executa GET em /sensores e apresenta os registros retornados pelo backend. Não existem dados mockados nesse fluxo."

### 2:05 - 3:05 | Cadastro no frontend e dado no backend

Abrir **+ Novo**, preencher e salvar.

> "Agora vou cadastrar um novo sensor diretamente pelo aplicativo. Ao salvar, o frontend executa um POST em /sensores. Depois do cadastro, a listagem é atualizada com os dados reais da API."

Voltar ao navegador em `/sensores` e atualizar.

> "Atualizando o endpoint diretamente no backend, o novo registro aparece no JSON. Isso comprova a integração entre o frontend, a API e o banco H2."

### 3:05 - 3:35 | Detalhe

Abrir um sensor no app.

> "Ao selecionar um sensor, o aplicativo executa GET /sensores/{id} e exibe os dados retornados pela API na tela de detalhes."

### 3:35 - 4:35 | Backend parado

No terminal do Spring, pressionar `Ctrl + C`. Depois voltar ao app e atualizar.

> "Para comprovar que o aplicativo não utiliza mock, vou desligar o backend. Agora, ao tentar recarregar os dados, a requisição não consegue acessar a API e o aplicativo apresenta uma mensagem de erro visível. Nenhum dado artificial substitui o backend."

### 4:35 - 4:55 | Encerramento

> "Com isso demonstramos a versão final integrada da Sprint 4: backend Spring Boot com CRUD, H2 file e CORS; frontend Expo com lista, cadastro e detalhe via API; tratamento de indisponibilidade; e documentação completa para reprodução do projeto."

## Checklist antes da entrega

- [ ] Backend está em um repositório acessível ao professor.
- [ ] Frontend está em um repositório acessível ao professor.
- [ ] Links dos dois repositórios foram colocados neste README.
- [ ] Link do vídeo foi colocado neste README.
- [ ] Vídeo está como **Não listado** no YouTube.
- [ ] Vídeo tem no máximo 5 minutos.
- [ ] Java 17 está informado.
- [ ] Maven, Node e Expo estão informados.
- [ ] Backend sobe na porta 8080.
- [ ] `GET /sensores` retorna JSON.
- [ ] O app lista registros vindos da API.
- [ ] Cadastro no app aparece no backend.
- [ ] Detalhe consulta a API por ID.
- [ ] H2 está configurado em arquivo.
- [ ] CORS está habilitado.
- [ ] Não existe mock no fluxo principal.
- [ ] Com backend desligado, o erro fica visível.

---

**Sprint 4 - Metaindústria | Entrega Final**
