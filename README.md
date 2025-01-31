# 📚 CTFL Simulado

Este é um projeto de simulado para a certificação **CTFL-BSTQB** desenvolvido em **React + TypeScript + Vite**.

## 🚀 Funcionalidades

✔️ Simulado com 40 questões aleatórias  
✔️ Tempo total de 60 minutos para completar o exame  
✔️ Exibição da pontuação final e status de aprovação  
✔️ Interface responsiva  

---

## **🛠️ Como Rodar o Projeto**

Você pode rodar este projeto de duas formas:
1. **Usando Docker** (Recomendado para rodar sem precisar instalar dependências)
2. **Rodando Localmente** (Baixando o código e rodando com `npm run dev`)

---

## **🐳 Rodando com Docker (Método Recomendado)**

Se você **não quiser instalar Node.js e dependências**, pode rodar usando **Docker**.

### **1️⃣ Instalar o Docker**
Se ainda não tiver, baixe e instale o Docker:  
🔗 [Download do Docker](https://www.docker.com/get-started)

### **2️⃣ Construir a Imagem Docker**
No terminal (na raiz do projeto), execute:

```sh
docker build -t ctfl-simulado .
```
### **3️⃣ Rodar o Container**

No terminal (na raiz do projeto), execute:

```sh
docker run -p 4173:4173 ctfl-simulado
```

Agora, o site estará disponível em:
➡️ http://localhost:4173

## **💻 Rodando Localmente (npm run dev)**
Caso queira rodar localmente sem Docker, siga os passos:

### **1️⃣ Instalar o Node.js**
Baixe e instale o Node.js (v18 ou superior):
🔗 Download do Node.js

### **2️⃣ Clonar o Repositório**
```sh
git clone https://github.com/joaopaulorn700/CTFLSimulado.git
cd CTFLSimulado
```
### **3️⃣ Instalar as Dependências**
```sh
npm install
```

### **4️⃣ Rodar o Servidor
```sh
npm run dev
```
O site estará disponível em:
➡️ http://localhost:3000

## **🛠️ Tecnologias Utilizadas
⚛️ React
📜 TypeScript
⚡ Vite
🎨 TailwindCSS
🐳 Docker
🌐 GitHub Pages (Para Deploy) (Em Andamento)

## *📩 Contato
Se tiver dúvidas ou sugestões, entre em contato:
📧 Email: joaopaulo.rm7@gmail.com
🐙 GitHub: joaopaulorn700