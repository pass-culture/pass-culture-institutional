FROM nginx:1.27.3

RUN apt-get update && \
    apt-get install -y gettext-base && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf.template

CMD ["sh", "-c", "envsubst '$IAP_ID_TOKEN' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]


EXPOSE 8080
