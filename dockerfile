FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm 
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm run build
EXPOSE 3000
RUN pnpm prisma migrate deploy
CMD ["pnpm", "run", "start"]
