# Stage 1: Compile and Build angular codebase
FROM nginx:stable

COPY ./dist/ /usr/share/nginx/html

EXPOSE 80
