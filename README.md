# CRUD com Django rest framework e React

## Instalação

Clone o projeto:

```bash
  git clone https://github.com/klebersonfialhobaleeiro/CRUD-DjangoRF-React.git
```

Abra um terminal e
crie um ambiente virtual e ativar:

```bash
  python3 -m venv .venv
  source .venv/bin/activate
```
Instalar requirements.txt e rodar:

```bash
  pip install -r requirements.txt
  cd backend/
  python3 manage.py makemigrations
  python3 manage.py migrate
  python3 manage.py runserver 
  OBS: tem que tá na porta 8000
```

Abra outro terminal e:
```bash
  cd frontend/
  npm install
  npm start 
  OBS: também tem que tá na porta 3000, caso não esteja defina a porta lá no CORS_ORIGIN_WHITELIST que fica no settings.py
```
