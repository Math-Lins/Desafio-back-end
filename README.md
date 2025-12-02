# 🚀 To Do List API – NestJS + Sequelize + PostgreSQL

![NestJS](https://nestjs.com/img/logo_text.svg)
![PostgreSQL](https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg)
![Sequelize](https://sequelize.org/img/logo.svg)

API desenvolvida como parte de um processo seletivo para vaga **Back-end Júnior**.  
O projeto implementa um sistema completo de tarefas (**Tasks**) com etiquetas (**Tags**), relacionamento **N:N**, validações e filtros avançados.

Este README foi aprimorado para facilitar a instalação, execução e teste.

---

# 🏷️ Badges

![GitHub repo size](https://img.shields.io/github/repo-size/Math-Lins/Desafio-back-end?color=3A7AFE)
![GitHub last commit](https://img.shields.io/github/last-commit/Math-Lins/Desafio-back-end?color=blue)
![GitHub top language](https://img.shields.io/github/languages/top/Math-Lins/Desafio-back-end?color=yellow)
![GitHub contributors](https://img.shields.io/github/contributors/Math-Lins/Desafio-back-end)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)

---

# 📚 Sumário

- Visão Geral
- Tecnologias Utilizadas
- Requisitos
- Instalação e Execução (Quick Start)
- Configuração `.env`
- Modelagem do Banco
- Endpoints (Tasks e Tags)
- Exemplos rápidos (cURL)
- Diferenciais Implementados
- Autor e Licença

---

# 📘 Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **Typescript**
- **Sequelize-Typescript**
- **PostgreSQL**
- **Class-Validator**
- **API Dog** (para testes)

---

# ✅ Requisitos

- Node.js 18+ (recomendado 20+)
- PostgreSQL 13+
- NPM 9+ (ou PNPM/Yarn se preferir)

---

# 📦 Instalação e Execução (Quick Start)

## 1️⃣ Clone o repositório
```bash
git clone https://github.com/Math-Lins/Desafio-back-end.git
cd Desafio-back-end
```

## 2️⃣ Instale as dependências
```bash
npm install
```

## 3️⃣ Configure o `.env`

Crie um arquivo `.env` na raiz do projeto:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

## 4️⃣ Execute a aplicação (ambiente de desenvolvimento)
```bash
npm run start:dev
```

### Scripts úteis
- `npm run start` – inicia em modo produção (necessário build)
- `npm run build` – transpila TypeScript para `dist`
- `npm run lint` – verifica estilo e padrões

---

---

# 🗃 Modelagem do Banco de Dados

## 📝 Task

| Campo       | Tipo    | Obrigatório | Descrição             |
|-------------|---------|-------------|-----------------------|
| id          | integer | sim         | PK                    |
| title       | string  | sim         | Título da tarefa      |
| description | text    | não         | Descrição da tarefa   |
| status      | enum    | não         | Status da tarefa      |
| priority    | integer | sim         | Prioridade (1–10)     |

---

## 🏷 Tag

| Campo | Tipo    | Obrigatório | Descrição        |
|-------|---------|-------------|------------------|
| id    | integer | sim         | PK               |
| name  | string  | sim         | Nome da tag      |
| color | string  | sim         | Cor da tag       |

---

## 🔗 TaskTag (N:N)

| Campo  | Tipo    | Descrição       |
|--------|---------|-----------------|
| taskId | integer | FK para Task    |
| tagId  | integer | FK para Tag     |

---

# 🔗 Relacionamentos

- Uma **Task** pode conter várias **Tags**
- Uma **Tag** pode estar em várias **Tasks**
- Relacionamento via tabela pivot **task_tags**, usando `@BelongsToMany`

---

# 🛠 Endpoints

## 📌 TASKS

### ➕ Criar Task
```
POST /tasks
```

Exemplo:
```json
{
  "title": "Estudar NestJS",
  "description": "Curso e prática",
  "priority": 1,
  "tagIds": [1, 2]
}
```

Resposta esperada (201):
```json
{
  "id": 1,
  "title": "Estudar NestJS",
  "description": "Curso e prática",
  "status": "EM_ANDAMENTO",
  "priority": 1,
  "tags": [
    { "id": 1, "name": "Estudo" },
    { "id": 2, "name": "Física" }
  ],
  "createdAt": "2025-12-02T12:00:00.000Z",
  "updatedAt": "2025-12-02T12:00:00.000Z"
}
```

---

### 📄 Listar Tasks
```
GET /tasks
```

Query params suportados:
- `tags` – filtra por nomes de tags separados por vírgula
- `status` – filtra por status (ex.: `EM_ANDAMENTO`, `FINALIZADO`)
- `page`, `limit` – paginação básica

---

### 🔎 Filtrar por Tags
```
GET /tasks?tags=Estudo
```

Ou múltiplas:
```
GET /tasks?tags=Estudo,Física
```

---

### 🔍 Buscar Task por ID
```
GET /tasks/:id
```

---

### ✏️ Atualizar Task
```
PATCH /tasks/:id
```

Corpo (parcial):
```json
{
  "title": "Estudar NestJS (Atualizado)",
  "status": "FINALIZADO",
  "tagIds": [1]
}
```

---

### 🗑 Deletar Task
```
DELETE /tasks/:id
```

---

## 🏷 TAGS

### ➕ Criar Tag
```
POST /tags
```

Exemplo:
```json
{
  "name": "Estudo",
  "color": "#3A7AFE"
}
```

---

### 📄 Listar Tags
```
GET /tags
```

---

### 🔍 Buscar Tag por ID
```
GET /tags/:id
```

---

### ✏️ Atualizar Tag
```
PATCH /tags/:id
```

---

### 🗑 Deletar Tag
```
DELETE /tags/:id
```

---

# ⚡ Exemplos rápidos (cURL)

Criação de Task com tags:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar NestJS",
    "description": "Curso e prática",
    "priority": 1,
    "tagIds": [1, 2]
  }'
```

Listagem filtrando por múltiplas tags:
```bash
curl "http://localhost:3000/tasks?tags=Estudo,Física"
```

Atualização parcial de Task:
```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{ "status": "FINALIZADO" }'
```

---

# 🌟 Diferenciais Implementados

- Estrutura modular seguindo boas práticas do NestJS  
- DTOs com validação (**class-validator**)  
- Relacionamento **Many-to-Many** completo  
- Filtro inteligente de Tasks por múltiplas Tags  
- Versionamento organizado (`master`, `dev`, `feature`)  
- Testes realizados no **API Dog**  
- Código limpo, organizado e escalável  
 - Pensado para ESM (`moduleResolution: nodenext`), com imports compatíveis

---

# 🧪 Dicas de Teste

- Utilize ferramentas como **API Dog**, **Postman** ou **cURL**.
- Valide cenários de erro (ex.: validação de DTOs com `class-validator`).
- Em Windows PowerShell, prefira comandos isolados em linhas separadas.

---

# 👨‍💻 Autor

**Matheus Lins**  
Desenvolvedor Back-End | Desafio Técnico

---

# 📄 Licença

Projeto livre para estudo e avaliação técnica.

---

