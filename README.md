# alexa-gas-connector
# Amazon Alexa custom skill with Google Apps Script backend

> **Un'architettura serverless completa per connettere Alexa a Google Apps Script tramite AWS Lambda**

**[🇮🇹 Italiano](#-italiano) | [🇬🇧 English](#-english)**

---

## 🇮🇹 Italiano

### 📖 Panoramica

Questo progetto fornisce un'implementazione completa di una **Skill Alexa personalizzata** che comunica con un backend **Google Apps Script (GAS)** attraverso **AWS Lambda**. L'architettura è completamente serverless.

### Architettura del Sistema

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────────┐
│   Alexa     │─────▶│    Alexa     │─────▶│  AWS Lambda │─────▶│  Google Apps     │
│   Device    │      │   Service    │      │   Handler   │      │     Script       │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────────┘
                                                   │                       │
                                                   │◀──────────────────────┘
                                                   │      JSON Response
                                                   ▼
                                            ┌─────────────┐
                                            │   Risposta  │
                                            │    Vocale   │
                                            └─────────────┘
```

### 📦 Struttura del Progetto

```
alexa-gas-backend/
├── alexa/
|   ├── lambda/ 
│   |   ├── index.js                   # Handler AWS Lambda
|   └── interaction_model_schema.json  # Modello di interazione Alexa
├── gas/
│   ├── Code.gs                        # Endpoint principale
│   └── Utility.gs                     # Funzioni di utilità  
└── README.md
```

---



## Testing della Skill

#### Comandi di Test:

**🔹 Apertura skill:**
```
Alexa, apri skill test
```
**Risposta attesa:** _"Benvenuto nella skill test. Puoi farmi una richiesta semplice o inviarmi dei dati. Come posso aiutarti?"_

**🔹 Richiesta semplice:**
```
Alexa, chiedi a skill test di fare una richiesta semplice
```
**Risposta attesa:** _"Richiesta semplice eseguita con successo."_

**🔹 Invio dati:**
```
Alexa, chiedi a skill test di inviare il dato temperatura venticinque gradi
```
**Risposta attesa:** _"Dato ricevuto correttamente: temperatura venticinque gradi"_

```
Alexa, chiedi a skill test di mandare il dato ciao come stai
```
**Risposta attesa:** _"Dato ricevuto correttamente: ciao come stai"_

### Backend di esempio pubblico

**Puoi testare immediatamente la skill usando il backend pubblico di esempio:**

Nel file Lambda `index.js`, usa temporaneamente:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyfGR6MMHJZeNVFKxv0xjWrs8QFh5sGK0Jr-3Gb2D1UnVuWxaXw-VXv9OR8XZd6t8wX/exec';
```

> ⚠️ **Nota**: Questo è un backend di test pubblico. Per progetti in produzione, **crea sempre il tuo backend personale**.

---

## ✉️ Contatti e Supporto

- **Email**: gianlucabevilacqua.93@gmail.com

---
---

## 🇬🇧 English

### Overview

This project provides a complete implementation of an **Alexa Custom Skill** that communicates with a **Google Apps Script (GAS)** backend through **AWS Lambda**. The architecture is completely serverless.

### System Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────────┐
│   Alexa     │─────▶│    Alexa     │─────▶│  AWS Lambda │─────▶│  Google Apps     │
│   Device    │      │   Service    │      │   Handler   │      │     Script       │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────────┘
                                                   │                       │
                                                   │◀──────────────────────┘
                                                   │      JSON Response
                                                   ▼
                                            ┌─────────────┐
                                            │   Voice     │
                                            │  Response   │
                                            └─────────────┘
```

### 📦 Project Structure

```
alexa-gas-backend/
├── alexa/
|   ├── lambda/ 
│   |   ├── index.js                   # AWS Lambda Handler
|   └── interaction_model_schema.json  # Alexa interaction model
├── gas/
│   ├── Code.gs                        # Main endpoint
│   └── Utility.gs                     # Utility functions
└── README.md
```

---

## Skill Testing

#### Test Commands:

**🔹 Skill launch:**
```
Alexa, open skill test
```
**Expected response:** _"Welcome to skill test. You can make a simple request or send me data. How can I help you?"_

**🔹 Simple request:**
```
Alexa, ask skill test to make a simple request
```
**Expected response:** _"Simple request executed successfully."_

**🔹 Data sending:**
```
Alexa, ask skill test to send the data temperature twenty five degrees
```
**Expected response:** _"Data received correctly: temperature twenty five degrees"_

```
Alexa, ask skill test to send data hello how are you
```
**Expected response:** _"Data received correctly: hello how are you"_

### Public Example Backend

**You can immediately test the skill using the public example backend:**

In the Lambda `index.js` file, temporarily use:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyfGR6MMHJZeNVFKxv0xjWrs8QFh5sGK0Jr-3Gb2D1UnVuWxaXw-VXv9OR8XZd6t8wX/exec';
```

> ⚠️ **Note**: This is a public test backend. For production projects, **always create your own personal backend**.

---

## ✉️ Contacts and Support

- **Email**: gianlucabevilacqua.93@gmail.com

---

**Made with ❤️ by the Open Source Community**

*Star ⭐ this repository if you find it useful!*
