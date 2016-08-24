FROM node

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json /app/
RUN npm install

# Copy application files
COPY . /app

# Precompile javascript
RUN ./node_modules/.bin/babel src --out-dir lib

CMD ["node", "lib/index.js"]
