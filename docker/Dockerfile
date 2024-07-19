FROM php:8.3-apache

RUN apt-get update && \
    apt-get install --yes --force-yes \
    cron g++ gettext libicu-dev openssl \
    libc-client-dev libmcrypt-dev \
    libtidy-dev libcurl4-openssl-dev \
    libz-dev libmemcached-dev git-core libpq-dev \
    libzip4 libzip-dev libwebp-dev
  # libxml2-dev libfreetype6-dev \

# PHP Configuration
RUN docker-php-ext-install  gettext iconv intl  tidy zip sockets
RUN docker-php-ext-install  pgsql mysqli
RUN docker-php-ext-install  pdo_mysql
RUN docker-php-ext-install  pdo_pgsql

RUN pecl install xdebug && docker-php-ext-enable xdebug &&\
    echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini &&\
    echo "xdebug.client_host = host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN pecl install mongodb && docker-php-ext-enable mongodb
RUN curl -sS https://getcomposer.org/installer | php \
            && mv composer.phar /usr/bin/composer
#    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp &&\
#    docker-php-ext-install gd &&\
# Apache Configuration
RUN a2enmod rewrite

# SSL
RUN mv  /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/000-default-ssl.conf &&\
    a2enmod ssl && \
    a2ensite 000-default-ssl &&\
    openssl req -subj '/CN=example.com/O=My Company Name LTD./C=US' -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem

EXPOSE 80
EXPOSE 443

## Imagemagick : install fails on 8.0
#RUN apt-get install --yes --force-yes libmagickwand-dev libmagickcore-dev
#RUN yes '' | pecl install -f imagick &&\
#    docker-php-ext-enable imagick

COPY create_vhost config-vhost start /usr/local/bin/
COPY php.ini /usr/local/etc/php/


CMD ["start"]
