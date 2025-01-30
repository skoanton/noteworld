# NoteApp

NoteApp is a secure and encrypted note-taking application that allows users to store and manage notes privately and safely. All notes are encrypted to ensure data security.

## Features

- **Encrypted Notes** – All notes are stored in an encrypted format to ensure privacy and security.
- **Assigned Accounts** – Users cannot create their own accounts; accounts must be assigned by an administrator.
- **Upcoming AI Integration** – Planned functionality where AI can analyze and provide insights based on your notes.
- **Improved UI** – Ongoing work to enhance the user interface and user experience.

## Installation

### 1. Klona repositoryt

```sh
git clone https://github.com/your-repo/noteapp.git
```

### 2. Navigera till projektmappen

```sh
cd noteapp
```

### 3. Kopiera och konfigurera miljövariabler

```sh
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### 4. Installera beroenden för både klient och server

```sh
npm install --prefix client
npm install --prefix server
```

### 5. Starta PostgreSQL med Docker (valfritt för utvecklingsläge)

```sh
docker compose up postgres
```

### 6. Sätt upp servern

```sh
npm run setup --prefix server
```

### 7. Starta projektet

```sh
npm run dev --prefix server
npm run dev --prefix client
```

## Quick start

```sh
npm run setup
```

## Usage

Since accounts are manually assigned, you need an invitation to log in and use the application.

## Future Updates

- **AI Integration** to enable querying notes for insights.
- **Enhanced UI/UX** for a more intuitive user experience.

## Contribute

If you would like to contribute to the project, submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License.
