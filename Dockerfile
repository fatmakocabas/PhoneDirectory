# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force

# Generate the build of the application
RUN npm run build

FROM nginx:alpine 

COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html
 
#CMD npm start
# Expose port 80
EXPOSE 80
