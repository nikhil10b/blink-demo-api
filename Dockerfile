FROM node:20-alpine AS builder
LABEL maintainer="team@company.com" version="1.0" description="Application container"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

FROM node:20-alpine
LABEL maintainer="team@company.com" version="1.0" description="Application container"
WORKDIR /app
RUN adduser --disabled-password --gecos "" demotest
COPY --from=builder /app /app
USER demotest
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "index.js"]