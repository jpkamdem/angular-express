FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json angular.json tsconfig.json ./
RUN npm install && \
    npm install -g @angular/cli

COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
RUN apk add --no-cache curl

COPY --from=builder /app/dist/web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]