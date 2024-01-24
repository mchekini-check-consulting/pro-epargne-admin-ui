FROM nginx
COPY certificate.crt /etc/ssl/certificate.crt
COPY private.key /etc/ssl/private.key
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY dist/fuse /usr/share/nginx/html
EXPOSE 443
