# Usamos una imagen oficial de Node ligera
FROM node:22-alpine

# Creamos y nos movemos al directorio de trabajo 
WORKDIR /usr/app_aaee_rmz

# Copiamos los archivos de dependencias primero (optimización de capas de Docker)
COPY package*.json ./

# Instalamos las dependencias 
RUN npm install --omit=dev

# Copiamos el resto del código la carpeta src
COPY src/ ./src/

# Exponemos el puerto de nuestra API
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["node", "src/rmz/index.js"]