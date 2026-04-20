# 🚀 HostelHub: Smart Expense Tracker & Settlement Engine

**Batch:** 2029 | **Course:** Building Web Applications with React  
**Live Application:** [Insert Your Live Deployment Link Here]

---

## 🎯 Project Overview
HostelHub is a production-level React application designed to solve the common "who-owes-what" friction in shared living spaces. It simplifies complex group expenses into a minimal set of transactions using a custom settlement engine.

### The Problem
Traditional expense tracking often leads to "circular debts" (A owes B, B owes C, C owes A). This creates confusion and unnecessary bank transfers.

### The Solution
HostelHub uses a **Greedy Debt-Simplification Algorithm** to aggregate all room expenses and calculate the most efficient way to settle up, minimizing the total number of transactions.

---

## ✨ Core Features
- **User Authentication:** Secure Login/Signup via Firebase Auth.
- **Real-time Dashboard:** Track total room spending and individual contributions.
- **Dynamic Split Logic:** Add expenses and split them selectively among specific roommates.
- **Settlement Engine:** Automated "Who Pays Whom" logic with $O(N \log N)$ efficiency.
- **Notice Board:** A centralized space for room announcements and reminders.
- **Responsive Design:** Dark-themed, mobile-first UI built with Tailwind CSS.

---

## 🛠️ Tech Stack
- **Frontend:** React 18 (Functional Components, Hooks)
- **State Management:** React Context API (Auth) & Custom Hooks (Data)
- **Backend:** Firebase (Firestore NoSQL & Authentication)
- **Styling:** Tailwind CSS
- **Notifications:** React-Toastify
- **Routing:** React Router v6

---

## 🧠 Advanced Technical Implementation

### 1. The Settlement Algorithm
Instead of simple subtraction, HostelHub implements a **Greedy Algorithm**. 
- It identifies "Debtors" and "Creditors."
- It matches the largest debtor with the largest creditor iteratively.
- This ensures that if 10 people share an expense, the app finds the path with the **minimum number of transfers**.

### 2. Performance Optimization
- **useMemo:** Used for heavy balance calculations and debt-matching algorithms to prevent redundant computations during UI re-renders.
- **useCallback:** Utilized to maintain stable function references for Firebase CRUD operations.
- **Custom Hooks:** Business logic is decoupled from UI components (e.g., `useExpenses`, `useNotices`) for better maintainability and cleaner code.

### 3. Security & Protected Routes
- **Route Guarding:** Implemented `ProtectedRoute` and `PublicRoute` components to manage navigation based on Firebase Auth state.
- **Auth Persistence:** State is managed via `onAuthStateChanged` to ensure the user session persists across refreshes.

---

## 🏗️ Project Structure
```text
/src
  /components  # Reusable UI (Cards, Forms, Navbar)
  /context     # Global Auth state & Loading logic
  /hooks       # Custom logic for data fetching & real-time listeners
  /services    # Firebase API interaction layer (Firestore CRUD)
  /pages       # Main view screens (Dashboard, Balances, Notices)
  App.js       # Routing & Navigation Guards
  firebase.js  # SDK Configuration