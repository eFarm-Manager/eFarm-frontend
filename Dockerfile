FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



FROM nginx:mainline-alpine

RUN apk update && apk add --no-cache curl

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

#COPY nginx/entrypoint.sh /usr/share/nginx/entrypoint.sh

#RUN chmod +x /usr/share/nginx/entrypoint.sh

EXPOSE 80

#ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]