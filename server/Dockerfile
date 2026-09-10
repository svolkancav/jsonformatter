# Build stage: compile TypeScript to dist/
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime stage: production deps + compiled output only
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY scripts ./scripts
EXPOSE 8080
CMD ["node", "dist/index.js"]
