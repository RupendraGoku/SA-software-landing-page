# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Demo Modal

The demo modal now uses a custom React UI and a tiny Google Apps Script bridge behind the scenes.

Responses follow this flow:

React modal -> Apps Script bridge -> Google Form -> linked Google Sheet

Setup:

1. Open your Google Form in edit mode.
2. Go to `Extensions -> Apps Script`.
3. Paste the code from `google-apps-script/demo-form-bridge.gs`.
4. Replace `GOOGLE_FORM_EDIT_URL` with your Google Form edit URL.
5. Deploy it as a Web App with access set to `Anyone`.
6. Copy `.env.example` to `.env.local`.
7. Set `VITE_DEMO_SUBMIT_URL` to the deployed Web App `exec` URL.
8. Restart Vite after editing the env file.

This keeps the front-end fully custom while still recording real Google Form responses and updating the linked Google Sheet.
