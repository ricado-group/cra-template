#
# Builder Image
#
FROM --platform=linux/amd64 node:lts-buster-slim AS build

# Create the App Build Directory
WORKDIR /app

# NPM Token Argument
ARG NPM_TOKEN

# Create an npmrc Config File
RUN echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

# Copy the Package JSON to Install NPM Packages
COPY ["package.json", "package-lock.json", "./"]

# Install NPM Packages
RUN npm ci

# Copy the Application Source Code
COPY . .

# Compile the JS Application
RUN npm run build:ci


#
# Final Image
#
FROM ricado/nginx-web-app:1.0.4 as final

# Work in the Nginx Web Directory
WORKDIR /usr/share/nginx/html

# Copy the JS Application Files from the Build Image
COPY --from=build /app/build /usr/share/nginx/html