FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /usr/share/nginx/html/index.html
COPY imagen.jpeg /usr/share/nginx/html/imagen.jpeg
COPY video1.mp4 /usr/share/nginx/html/video1.mp4
COPY video2.mp4 /usr/share/nginx/html/video2.mp4

RUN chmod 644 /usr/share/nginx/html/*

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
