# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


composer create-project --prefer-dist laravel/laravel my-laravel-app "10.*"

php artisan migrate

composer require php-open-source-saver/jwt-auth

php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"

php artisan jwt:secret

npm create vite@latest auth-frontend -- --template react

cd auth-frontend

npm install react@18 react-dom@18

npm install

npm run dev

npm list react react-dom

php artisan make:controller AuthController

php artisan migrate:fresh

npm install web-vitals