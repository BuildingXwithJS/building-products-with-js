FROM node

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json /app/
RUN npm install

# Copy application files
COPY . /app

CMD ["npm", "start"]
