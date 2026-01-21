<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# FreshCart E-Commerce

A modern e-commerce frontend application built with **React**, **Vite**, and **TypeScript**, focusing on performance, scalability, and clean UI/UX.

---

## Tech Stack

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **TanStack React Query**
- **Zustand** (state management)
- **Axios**
- **React Hook Form + Zod** (form validation)
- **Framer Motion** (animations)
- **Swiper** (sliders)
- **Radix UI**
- **ESLint**

---

## Features

- User authentication (login / register / reset password)
- Product listing & product details
- Categories & brands pages
- Shopping cart functionality
- Wishlist management
- Responsive design
- Form validation with Zod
- Toast notifications
- Smooth animations

---

## 📂 Project Structure

src/
│── Api/
│── Components/
│── Pages/
│── Store/
│── hooks/
│── assets/
│── lib/
│── Schemas/
│── main.tsx
│── App.tsx


---

##  Installation & Setup

Clone the repository:

```bash
git clone https://github.com/ahmedcodwars/freshcart-ecommerce.git
cd freshcart-ecommerce

Install dependencies:
npm install

Run the project in development mode:
npm run dev

Build for Production:
npm run build

Preview production build:
npm run preview

Linting:
npm run lint
>>>>>>> 72619cc37a6c0ff5cab92fb425d2c6d45f2fbe2f
