# Notes App

A markdown application where you can store your notes seamlessly on the go.

## Technologies used
1. [React](https://react.dev/)
2. [Typescript](https://www.typescriptlang.org/)
3. [React Markdown](https://www.npmjs.com/package/react-markdown) (For Rendering markdown data)
4. [remark-gfm](https://www.npmjs.com/package/remark-gfm) (For additional markdown features)
5. [Tailwind CSS](https://tailwindcss.com/) (For styling)
6. [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react) (For creating and editing Markdown)
7. [react-router-dom](npm i react-router-dom) (For routing)
8. [Firebase](https://firebase.google.com/) (For data storage)
9. [react-hot-toast](https://react-hot-toast.com/docs) (For toast notifications)

## Steps for running

1. Open your faviorite terminal as paste the below commands.

```
git clone https://github.com/apr61/notes-app.git

cd notes-app

npm install

```

2. Update the `.env` with your project details of __Firebase__.

```ts
VITE_APP_FIREBASE_API_KEY = ""
VITE_APP_FIREBASE_AUTH_DOMAIN = ""
VITE_APP_FIREBASE_PROJECT_ID = ""
VITE_APP_FIREBASE_STORAGE_BUCKET = ""
VITE_APP_FIREBASE_MESSAGE_ID = ""
VITE_APP_FIREBASE_APP_ID = ""
VITE_APP_FIREBASE_MEASUREMENT_ID = ""
```

3. Run the project

```
npm run dev
```

Happing Coding 😉