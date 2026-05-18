# 🚀 Flutter AI Specification — Emergência 60+

## 🎯 Objetivo

Gerar automaticamente as páginas Flutter do projeto **Emergência 60+**, utilizando arquitetura modular com **Bloc/Cubit**, integração com backend NestJS e foco em acessibilidade para idosos.

---

## 🏗️ Arquitetura

O projeto deve seguir a estrutura:

lib/
core/
modules/
shared/

Cada módulo deve conter:

* data/
* presentation/

  * cubit/
  * pages/

---

## 🔌 Backend

Base URL:
http://localhost:3000/api/v1

Endpoints principais:

### Auth

POST /auth/login

### Alerts

POST /alerts

Payload:
{
"deviceId": "ESP32-001",
"type": "EMERGENCY"
}

---

## 🔐 Autenticação

* Usar JWT
* Header:
  Authorization: Bearer {token}

---

## 📱 Páginas a serem geradas

---

## 1. LoginPage

### Requisitos:

* Campos:

  * email
  * password
* Botão "Entrar"
* Integração com AuthCubit
* Mostrar loading e erro

---

## 2. EmergencyPage (CRÍTICA)

### Requisitos:

* Tela simples
* Fundo claro
* Botão central grande (200x200)
* Texto: "SOS"
* Cor: vermelho
* Feedback visual ao clicar
* Usar EmergencyCubit

### Ação:

Ao clicar:
→ chamar /alerts
→ enviar alerta

---

## 3. DashboardPage

### Requisitos:

* Listar alertas
* Mostrar:

  * data
  * status
* Consumir AlertsCubit

---

## 🧠 Estado (Cubit)

Cada página deve ter:

* State
* Cubit
* Integração com Repository

---

## 📦 Repositories

Criar:

* AuthRepository
* AlertsRepository

Usar ApiService (Dio)

---

## 🔁 Fluxo esperado

Login → salvar token → acessar páginas → enviar alerta → backend processa → retorno sucesso

---

## 🎨 UI Guidelines

* Acessível para idosos
* Botões grandes
* Alto contraste
* Texto legível (mínimo 18px)

---

## ⚠️ Regras importantes

* Não usar setState
* Usar Bloc/Cubit
* Separar lógica de UI
* Não duplicar código
* Seguir estrutura modular

---

## 🧪 Resultado esperado

A IA deve gerar:

* páginas completas
* cubits funcionais
* integração com API
* código pronto para rodar

---

## 🔚 Instrução final

Gerar todos os arquivos necessários dentro da pasta lib/ seguindo a estrutura definida, garantindo que o app funcione com Flutter + Bloc + Dio.
