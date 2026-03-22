# 🚀 DevStudio Editor – Full Stack Code Playground

A powerful **browser-based code editor** inspired by VS Code and CodePen, built using **Monaco Editor**, with live preview, console, project export, and shareable links powered by a full-stack backend.

---

## 📸 Screenshot

 
<img width="1919" height="1069" alt="Screenshot 2026-03-22 222756" src="https://github.com/user-attachments/assets/1e920fb1-34d8-4aec-815d-8a11b4824273" />

 
---

## 🔗 Live Demo

👉 https://your-live-link.com

---

## 🧠 Features

* 💻 Monaco Editor (VS Code-like experience)
* ⚡ Live preview with sandboxed iframe
* 🖥️ Built-in console (log & error capture)
* 📦 Download project as ZIP (HTML/CSS/JS)
* 🔗 Shareable links (MongoDB storage)
* 🎨 Clean dark UI with resizable panels

---

## 🛠️ Tech Stack

**Frontend**

* HTML, CSS, JavaScript
* Monaco Editor
* JSZip

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Mannu-Thakur/devstudio-editor.git
cd devstudio-editor
npm install
```

### Start MongoDB

```bash
mongod --dbpath "C:\data\db"
```

### Start Backend

```bash
npm start
```

### Run Frontend

```bash
npx http-server
```

Open:

```
http://127.0.0.1:8080
```

---

## 🔄 Share Feature Flow

1. Click **Share**
2. Code is saved to backend
3. Unique ID generated
4. Open link:

```
http://localhost:8080/?id=projectId
```

5. Code loads automatically

---

## 🧠 Engineering Highlights

* Sandboxed execution using iframe
* Console interception via `postMessage`
* Client-side ZIP generation
* Async Monaco initialization handling
* REST API + MongoDB persistence

---

## 🚀 Future Improvements

* 📁 Multi-file system
* 🌐 Deployment (Vercel + Render)
* 👤 User authentication
* 🔄 Real-time collaboration

---

## 👨‍💻 Author

**Mannu Thakur**
Computer Engineering Student

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

---
