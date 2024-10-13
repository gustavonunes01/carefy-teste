--- 
# 🚀 Projeto Carefy

Bem-vindo ao projeto de teste para **Carefy**! Este repositório contém as instruções necessárias para configurar e executar o projeto localmente.

## 📋 Requisitos

Certifique-se de que você tem os seguintes requisitos instalados:

- **PHP**: `^8.2`
- **MySQL**
- **Terminal**
- **NPM** ou **Yarn**

## 🛠️ Instalação

### Passo 1: Configuração do Backend

1. **Acesse o diretório do backend:**
   ```bash
   cd backend
   ```

2. **Instale as dependências do Composer:**
   ```bash
   composer install
   ```

3. **Gere a chave da aplicação:**
   ```bash
   php artisan key:generate
   ```

4. **Configure o arquivo `.env`:**
   Abra o arquivo `.env` e altere os seguintes campos:
   ```dotenv
   DB_DATABASE=carefy
   DB_USERNAME=root
   DB_PASSWORD=senha_doBanco
   ```

5. **Migre o banco de dados e insira os dados iniciais:**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Inicie o servidor:**
   ```bash
   php artisan serve
   ```

### Passo 2: Configuração do Frontend

1. **Acesse o diretório do frontend:**
   ```bash
   cd ../frontend
   ```

2. **Instale as dependências do NPM:**
   ```bash
   npm install
   ```

3. **Inicie o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🌐 Acesso

Agora o frontend está funcionando! Você pode acessá-lo através do seguinte link:

- [http://localhost:3000/](http://localhost:3000/)

### Credenciais de Acesso

- **Email:** admin@admin.com
- **Senha:** admin

---
