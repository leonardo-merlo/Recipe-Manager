# 🍳 Recipe Manager

Aplicação web completa para gerenciamento de receitas e lista de compras semanal.

🔗 **[Acessar aplicação](https://seu-link.netlify.app)** · [Repositório](https://github.com/leonardo-merlo/Recipe-Manager)

---

## ✨ Funcionalidades

- 📋 Criar, editar e deletar receitas personalizadas
- 🔍 Buscar receitas online via API externa (MealDB)
- 🛒 Montar lista de compras automaticamente a partir das receitas selecionadas
- ➕ Ajustar quantidade de porções por receita na lista
- 📲 Exportar lista de compras formatada para WhatsApp
- 🥕 Banco de ingredientes pré-cadastrados para facilitar a criação de receitas

---

## 🛠 Stack

| Camada          | Tecnologia                |
| --------------- | ------------------------- |
| Frontend        | React, React Router, Vite |
| Backend         | Node.js, Express          |
| Banco de dados  | PostgreSQL (Neon)         |
| ORM             | Prisma                    |
| Deploy Frontend | Netlify                   |
| Deploy Backend  | Render                    |

---

## 🏗 Arquitetura

```
frontend/          # React + Vite
├── src/
│   ├── pages/     # Home, Search, RecipeDetail, ShoppingList
│   ├── components/
│   └── services/  # Camada de comunicação com a API

backend/           # Node.js + Express
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── scripts/   # Seed de ingredientes
└── prisma/        # Schema e migrations
```

---

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL ou conta no [Neon](https://neon.tech)

### Backend

```bash
cd backend
npm install
```

Crie um `.env`:

```env
DATABASE_URL="sua_url_postgresql"
PORT=3000
```

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crie um `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

---

## 📌 Próximos passos

- [ ] Autenticação de usuários (Clerk) para receitas individuais por conta
- [ ] Filtro de receitas por categoria e tempo de preparo
- [ ] Modo escuro

---

## 👨‍💻 Autor

**Leonardo Merlo**
[LinkedIn](https://linkedin.com/in/seu-perfil) · [GitHub](https://github.com/leonardo-merlo)
