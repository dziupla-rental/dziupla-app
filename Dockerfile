# STEP-1 BUILD
# Defining node image and giving alias as node-builder
# It's better to define version otherwise me might face issue in future build

FROM node:21-alpine3.18 as node-builder

#Accepting build-arg to create environment specific build
#it is useful when we have multiple environment (e.g: dev, tst, staging, prod)
#default value is development
ARG build_env=development

#Creating virtual directory inside docker image
WORKDIR /app

RUN npm cache clean --force

#Copying file from local machine to virtual docker image directory
COPY . .

#installing deps for project
RUN npm install

#creating angular build
RUN npm run-script ng build -- --configuration=$build_env

#STEP-2 RUN
#Defining nginx img
FROM nginx:1.25.3 as ngx

#removing default nginx files
RUN rm -rf /usr/share/nginx/html/*

#copying compiled code from dist to nginx folder for serving
COPY --from=node-builder /app/dist/dziupla-app/browser /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80
