# emergencia60

Emergency Button for Seniors: Device that sends an alert to family members in case of emergency.

# Figma Project Screenpages

https://www.figma.com/design/BFPobDjzjU1PErCvVp1E4D/Emerg%C3%AAncia-60-?node-id=0-1&p=f&t=uddJcs2wwY3jTuAo-0

# 🆘 Projeto Integrador EBAC - Sistema IoT de Alerta de Emergência para Idosos

## 📌 Descrição

Este projeto tem como objetivo desenvolver uma solução baseada em **Internet das Coisas (IoT)** para auxiliar idosos em situações de emergência, permitindo o acionamento rápido de contatos responsáveis por meio de um botão físico conectado à internet.

A solução integra dispositivos embarcados, backend em nuvem e aplicação mobile, garantindo comunicação em tempo real e alta confiabilidade.

---

## 🧠 Arquitetura da Solução

A arquitetura segue um modelo orientado a eventos com comunicação assíncrona:

[ ESP32 (Botão) ]
↓
[ MQTT Broker ]
↓
[ Backend (NestJS) ]
↓
[ Banco de Dados ]
↓
[ Serviço de Notificação ]
↓
[ App Mobile (React Native) ]

---

## 🧱 Tecnologias Utilizadas

### 🔙 Backend

- Node.js
- NestJS
- PostgreSQL
- MQTT (Mosquitto / AWS IoT Core)
- Redis (opcional)

### 📱 Mobile

- React Native (Expo)
- Axios
- Firebase Cloud Messaging

### 🔌 IoT

- ESP32
- Protocolo MQTT
- Wi-Fi

### ☁️ Infraestrutura

- Docker / Docker Compose
- VPS (DigitalOcean, Contabo) ou AWS

---

## 📁 Estrutura do Projeto (NX Monorepo)

apps/
api/ # Backend (NestJS)
mobile/ # App Mobile (React Native)
web-admin/ # (Opcional) Painel Web

libs/
core/ # Regras de negócio
data-access/ # Integração com APIs
types/ # Interfaces compartilhadas
ui/ # Componentes reutilizáveis

tools/

---

## ⚙️ Funcionalidades

### 👴 Para o usuário (idoso)

- Acionamento de botão de emergência físico

### 👨‍👩‍👧 Para responsáveis

- Recebimento de alertas em tempo real
- Visualização de eventos
- Confirmação de atendimento

### 🛠️ Sistema

- Cadastro de usuários e dispositivos
- Registro de alertas
- Notificações multicanal (Push, SMS, WhatsApp)

---

## 🔄 Fluxo de Funcionamento

1. O idoso pressiona o botão físico (ESP32)
2. O dispositivo envia um evento via MQTT
3. O backend consome o evento
4. O sistema registra o alerta no banco de dados
5. Notificações são enviadas aos contatos cadastrados
6. O responsável recebe e pode responder ao alerta

---

## 🔐 Segurança

- Autenticação via JWT
- Comunicação segura (HTTPS / TLS)
- Identificação de dispositivos via API Key
- Controle de acesso (RBAC)

---

## 🗄️ Modelo de Dados (Simplificado)

### users

- id
- name
- type (elderly | guardian)

### devices

- id
- user_id
- status
- last_seen

### alerts

- id
- device_id
- timestamp
- status

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js >= 18
- Docker
- NX CLI

```bash
npm install -g nx
```
