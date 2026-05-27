# 🧠 TryviaTech — Mini-Game de Trivia

Projeto desenvolvido como parte do **Desafio de Estágio uTech**. Consiste em um backend Node.js/Express com cache inteligente e banco SQLite, e um aplicativo mobile React Native (Expo) com gerenciamento de estado global via Zustand.

---

## 📁 Estrutura do Projeto

```
Teste_utech/
├── backend/          # API REST — Node.js + Express + TypeScript
└── mobile/           # App mobile — React Native + Expo + Zustand
```

---

## ⚙️ Backend

### Tecnologias
- Node.js 20 + TypeScript
- Express 5
- SQLite (via `sqlite` + `sqlite3`)
- Cache em memória com validade de 10 minutos

### Rotas da API

| Método | Rota            | Descrição                                                    |
|--------|-----------------|--------------------------------------------------------------|
| GET    | `/quiz`         | Retorna 6 perguntas (3 fáceis, 2 médias, 1 difícil)         |
| POST   | `/quiz/submit`  | Envia respostas, calcula pontuação no servidor e salva       |
| GET    | `/ranking`      | Retorna o Top 5 jogadores                                    |
| DELETE | `/ranking`      | Zera o ranking (ponto extra)                                 |

> ℹ️ Existe uma rota de verificação de integridade não documentada.

### Variáveis de Ambiente

Copie `.env.example` para `.env` e ajuste se necessário:

```bash
cp backend/.env.example backend/.env
```

```env
PORT=3333
EXTERNAL_API_URL=https://raw.githubusercontent.com/peterfritz/tryvia-api/master/quiz.json
```

---

## 🐳 Rodando com Docker (Recomendado)

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Passos

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd Teste_utech/backend

# 2. Suba o backend
docker compose up --build
```

O backend estará disponível em `http://localhost:3333`.

---

## 🐧 Rodando Manualmente no Linux

### Pré-requisitos

```bash
# Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Confirme as versões
node -v   # v20.x.x
npm -v    # 10.x.x
```

### Backend

```bash
cd backend

# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env

# 3. Compile o TypeScript
npm run build

# 4. Inicie o servidor
node dist/server.js
```

Para desenvolvimento com hot-reload:
```bash
npm run dev
```

O backend estará disponível em `http://localhost:3333`.

---

## 📱 Rodando o Mobile (Expo)

### Pré-requisitos

```bash
# Node.js 20+ (mesmo do backend)
# Para rodar em dispositivo físico: instale o app "Expo Go" (Play Store / App Store)
```

### Passos

```bash
cd mobile

# 1. Instale as dependências
npm install

# 2. Configure a URL do backend em src/config/api.ts:
#   - Emulador Android:   export const API_URL = 'http://10.0.2.2:3333'
#   - Emulador iOS:       export const API_URL = 'http://localhost:3333'
#   - Dispositivo físico: export const API_URL = 'http://<SEU_IP_LOCAL>:3333'

# 3. Inicie o Expo
npx expo start
```

Escaneie o QR Code com o app **Expo Go** ou pressione:
- `a` para abrir no emulador Android
- `i` para abrir no emulador iOS

### Descobrindo o IP no Linux (para dispositivo físico)

```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
# Exemplo de saída: inet 192.168.1.42/24 — use 'http://192.168.1.42:3333'
```

---

## 🎮 Fluxo do Jogo

1. **Tela Inicial** — jogador digita seu nome e clica em "Iniciar Desafio"
2. **Tela de Quiz** — 6 perguntas exibidas uma por vez (3 fáceis → 2 médias → 1 difícil)
3. **Tela de Resultado** — exibe pontuação final e o Top 5 do ranking
4. Botão **"Jogar Novamente"** reinicia a partida mantendo o nome
5. Botão **"Zerar Placar Geral"** reseta todo o ranking

---

## 📦 Scripts Disponíveis

### Backend
| Comando         | Descrição                          |
|-----------------|------------------------------------|
| `npm run dev`   | Inicia em modo desenvolvimento     |
| `npm run build` | Compila TypeScript para `dist/`    |

### Mobile
| Comando                    | Descrição                     |
|----------------------------|-------------------------------|
| `npx expo start`           | Inicia o servidor Expo        |
| `npx expo start --android` | Abre no emulador Android      |
| `npx expo start --ios`     | Abre no emulador iOS          |
