# 🧹 Sweeepstakes

Sweeepstakes is a real-time chore coordination app that helps roommates and families manage tasks, track progress, and earn fun badges. It’s designed to make shared living smoother and a little more competitive — in a good way.

## 📑 Index

- [Overview](#overview)
- [Roadmap](#roadmap)
- [Tech Stack](#tech-stack)
- [Third-Party API](#third-party-api)
- [Features](#features)
- [Setup](#setup)

## 🧭 Overview

**Tagline**: _From mess to success._

Users can join a household group, assign chores, track completion, and earn badges for their contributions. Real-time updates keep everyone in sync.

## 🛠️ Roadmap

1. **Specification** – Define user stories and core features
2. **AWS Infrastructure** – EC2 for backend, RDS for database
3. **HTML** – Static layout for login, dashboard, and chore form
4. **CSS** – Responsive design and chore status styling
5. **React** – Refactor into components and add routing
6. **Backend** – Node.js + Express API with JWT auth
7. **Database** – PostgreSQL schema for users, groups, chores
8. **WebSocket** – Real-time updates with Socket.IO

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Hosting**: AWS EC2
- **Auth**: JWT
- **WebSocket**: Socket.IO

## 🔗 Third-Party API

**Badge Generator (Shields.io)**  
Used to create dynamic badges for completed chores and milestones.  
Example:

```js
const badgeURL = `https://img.shields.io/badge/Laundry_Legend-blue`;
```

## ✨ Features

- Group creation and chore assignment
- Real-time updates for task completion
- Badge rewards for milestones
- Clean, responsive UI

## 🚀 Setup

- Clone the repo
- Install dependencies
- Set environment variables
- Run the server
