#!/bin/bash

# Wait until MySQL is ready
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  sleep 3
done

echo "✅ MySQL is ready."

echo "Using existing .env"

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Run any new migrations (use --force to avoid prompt)
php artisan migrate --force

# Seed your lookup tables
php artisan db:seed --class=UserTypeSeeder --force
php artisan db:seed --class=CategorySeeder --force
php artisan db:seed --class=AiModelSeeder --force

echo "✅ Laravel setup complete. Starting Apache..."

# Start Apache in the foreground
exec apache2-foreground
