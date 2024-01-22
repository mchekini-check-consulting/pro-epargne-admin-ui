FROM nginx
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY dist/fuse /usr/share/nginx/html
