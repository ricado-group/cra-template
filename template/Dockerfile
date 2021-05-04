FROM nginx:stable

# Copy our Nginx Default Site Configuration
COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf

# Copy Source Files
COPY ./build /usr/share/nginx/html

# Expose Ports for this Application
EXPOSE 80