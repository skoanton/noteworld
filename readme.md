## Starta projektet

För att starta projektet, följ dessa steg:

1. Installera beroenden:
    ```sh
    cd client
    npm install
    ```

2. Starta Docker:
    ```sh
    cd ..
    docker-compose up
    ```

3. Starta utvecklingsservern:
    ```sh
    cd client
    npm run dev
    ```

## Prisma Kommandon

### Sätt upp ett nytt Prisma-projekt

```sh
cd server
prisma init
```

### Generera artefakter (t.ex. Prisma Client)

```sh
cd server
prisma generate
```

### Bläddra i din data

```sh
cd server
prisma studio
```

### Skapa migrationer från ditt Prisma-schema, tillämpa dem på databasen, generera artefakter (t.ex. Prisma Client)

```sh
cd server
prisma migrate dev
```

### Hämta schemat från en befintlig databas och uppdatera Prisma-schemat

```sh
cd server
prisma db pull
```

### Skicka Prisma-schemats tillstånd till databasen

```sh
cd server
prisma db push
```

### Validera ditt Prisma-schema

```sh
cd server
prisma validate
```

### Formatera ditt Prisma-schema

```sh
cd server
prisma format
```

### Visa Prisma versionsinformation

```sh
cd server
prisma version
```

### Visa Prisma debug-information

```sh
cd server
prisma debug
```

## Detaljerade Kommandobeskrivningar

### `npx prisma migrate dev`

**Syfte:** Detta kommando genererar och tillämpar en ny migration baserat på dina Prisma-schemaändringar. Det skapar migrationsfiler som håller en historik över ändringar.

**Användningsfall:** Använd detta när du vill upprätthålla en historik över databasändringar, vilket är viktigt för produktionsmiljöer eller när du arbetar i team. Det möjliggör versionskontroll av ditt databas-schema.

**Fördelar:** Detta kommando inkluderar även kontroller för att tillämpa migrationer på ett kontrollerat sätt, vilket säkerställer dataintegritet.

### `npx prisma db push`

**Syfte:** Detta kommando används för att skicka ditt aktuella Prisma-schema direkt till databasen. Det tillämpar alla ändringar du har gjort i ditt schema utan att skapa migrationsfiler.

**Användningsfall:** Det är särskilt användbart under utvecklingsfasen när du snabbt vill synkronisera ditt databas-schema med ditt Prisma-schema utan att oroa dig för migrationshistorik.

**Varning:** Det kan skriva över data om dina schemaändringar påverkar befintliga tabeller eller kolumner, så det är bäst för tidig utveckling eller prototypning.