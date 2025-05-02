# -------- BASE IMAGE: PHP with Apache --------
FROM php:8.4-apache

# Set working directory inside the container
WORKDIR /var/www/html

# -------- INSTALL SYSTEM DEPENDENCIES AND PHP EXTENSIONS --------
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libonig-dev libxml2-dev zip curl \
    # Needed for database migration
    default-mysql-client \
    # Enable PHP extensions for Laravel
    && docker-php-ext-install pdo pdo_mysql zip \
    # Clean up to reduce image size
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# -------- ENABLE APACHE MOD_REWRITE FOR LARAVEL ROUTES --------
RUN a2enmod rewrite \
 && sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-enabled/000-default.conf \
 && sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/public>|' /etc/apache2/apache2.conf

# -------- INSTALL COMPOSER --------
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# -------- COPY LARAVEL APP INTO THE CONTAINER --------
COPY . .

# -------- INSTALL LARAVEL DEPENDENCIES --------
RUN composer install --no-dev --optimize-autoloader

# -------- SET FOLDER PERMISSIONS FOR LARAVEL --------
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# -------- ENTRYPOINT SCRIPT FOR MIGRATIONS AND STARTUP --------
COPY dockerShell.sh /usr/local/bin/dockerShell.sh
RUN chmod +x /usr/local/bin/dockerShell.sh

# Expose HTTP port
EXPOSE 80

# Run startup script on container launch
ENTRYPOINT ["dockerShell.sh"]
