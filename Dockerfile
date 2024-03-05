# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# remove package.json
RUN rm -rf /usr/local/app/package.json

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

FROM nginx:alpine 

COPY --from=build /usr/local/app/dist/ /usr/share/nginx/html
 
#CMD npm start
# Expose port 80
EXPOSE 80
