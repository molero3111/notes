# Notes CRUD React App

This React application provides a user-friendly interface for creating, managing, and organizing notes. It leverages CRUD (Create, Read, Update, Delete) operations to interact with a Notes API built using Python and Django, accessible at https://emmanuelcodinghub.com/notes/api.

## Features:

- **Create notes**: Add new notes with detailed content.
- **Assign tags and categories**: Organize your notes by attaching relevant tags and categories.
- **Update notes**: Edit existing notes to modify their content or categorization.
- **Delete notes**: Remove notes you no longer need.
- **View notes**: Access and browse through all your created notes.

## Tech Stack:

- **Node.js**: 20.12.0
- **Npm**: 10.5.0
- **React**: 18.2.0
- **React Router Dom**: 6.23.1
- **Bootstrap**: 5.3.3
- **Axios**: 1.7.2
- **Redux**: 5.0.1
- **API**: Python / Django


## Run Project locally

1. Clone the repository:

```bash
git clone https://github.com/molero3111/notes.git
```

2. cd into notes repository:

```bash
cd notes/
```

3. Install dependencies:

```bash
npm install
```

4. create .env file from .env.example:
```bash
cp .env.example .env
```
You may edit .env, changing the api url if you are running API on localhost, APP_URL should not be changed since that's the one configured in vite.config.js


5. Run project:
```bash
npm run dev
```
6. Access notes app on http://localhost:5173/notes-app/, 
you may sign up with a new user at http://localhost:5173/notes-app/signup