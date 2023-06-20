# Establecer la imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package.json ./

# Instalar las dependencias del proyecto
RUN npm install --quiet

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación TypeScript
RUN npm run build

# Comando para ejecutar la aplicación
CMD ["node", "build/src/index.js"]
