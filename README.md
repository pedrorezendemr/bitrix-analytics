# Bitrix Analytics

Sistema de análise de dados integrado com Bitrix24 CRM.

## 🚀 Funcionalidades

- **Dashboard**: Visão geral de KPIs e métricas
- **Leads**: Análise de funil de vendas e conversão
- **Deals**: Acompanhamento de negócios e receita
- **Atividades**: Métricas de produtividade da equipe
- **Contatos**: Análise de base de clientes
- **Relatórios**: Relatórios personalizados e exportação

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/pedrorezendemr/bitrix-analytics.git
cd bitrix-analytics

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais do Bitrix24

# Iniciar servidor de desenvolvimento
npm run dev
```

## ⚙️ Configuração do Bitrix24

### 1. Criar aplicação no Bitrix24

1. Acesse: `https://SEU_DOMINIO.bitrix24.com.br/devops/section/standard/`
2. Clique em "Adicionar aplicativo" > "Aplicativo local"
3. Configure:
   - **Nome**: Bitrix Analytics
   - **Permissões**: CRM, Usuários, Tarefas
   - **URL de instalação**: `http://localhost:3000/api/bitrix/install`
   - **URL de redirecionamento**: `http://localhost:3000/api/bitrix/callback`

### 2. Configurar variáveis de ambiente

```env
# Bitrix24 OAuth
BITRIX_DOMAIN=seu-dominio.bitrix24.com.br
BITRIX_CLIENT_ID=seu_client_id
BITRIX_CLIENT_SECRET=seu_client_secret

# App
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

## 🔌 API do Bitrix24

O sistema utiliza a REST API do Bitrix24. Principais endpoints:

- `crm.lead.*` - Leads
- `crm.deal.*` - Negócios
- `crm.contact.*` - Contatos
- `crm.company.*` - Empresas
- `crm.activity.*` - Atividades
- `user.*` - Usuários

## 📊 Módulos

### Dashboard
- KPIs em tempo real
- Gráficos de tendência
- Comparativo de períodos

### Leads
- Funil de conversão
- Taxa de conversão por fonte
- Tempo médio no funil

### Deals (Negócios)
- Pipeline de vendas
- Forecast de receita
- Win rate por vendedor

### Atividades
- Volume de atividades por tipo
- Produtividade por usuário
- SLA de atendimento

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **Axios** - HTTP client

## 📝 Licença

MIT
