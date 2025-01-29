# Använd Node.js som basbild
FROM node:18

# Ställ in arbetskatalog i containern
WORKDIR /usr/src/app

# Kopiera package.json och package-lock.json för att installera beroenden
COPY package*.json ./

# Installera Node.js-beroenden
RUN npm install

COPY . .
# Copy Prisma schema and configuration
COPY src/prisma ./src/prisma
RUN npx prisma generate --schema=./src/prisma/schema.prisma
# Kopiera resten av backend-koden till containern


# Bygg TypeScript-filer
RUN echo "Running npm run build" && npm run build && echo "Build completed"  # Lägg till loggning
RUN ls -l dist/  # Kolla om dist finns efter build

# Exponera backend-porten
EXPOSE 5000

# Kör migreringar och starta backend
CMD ["sh", "-c", "npm run prisma:migrate && npx ts-node src/prisma/seed.ts && npm start"]
