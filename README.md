# Building Server-Side Operations in AG Grid with Angular, Laravel & MySQL

Learn how to perform server-side operations in AG Grid using Laravel that uses the MySQL database.

Please see the [accompanying blog post](https://blog.ag-grid.com/building-server-side-operations-in-ag-grid-with-angular-laravel-mysql) which explains the implementation.

This example implements the following features in the server-side: Grouping, Filtering, Sorting, Aggregation, Pagination, and Fetching Asynchronous Set Filter Values. 

Here's how our grid looks with the features enabled:

This repository is intended as a starting point when learning how to use the Server-Side Row Model, as it provides a simple grid implementation that uses a limited set of features and grid configurations.

## Prerequisites
The following should already be installed on your computer:
- PHP
- MySQL
- Composer

Note: If you don't have these installed please follow the documentation for [installing PHP](https://www.php.net/manual/en/install.php), [installing Composer](https://getcomposer.org/doc/00-intro.md) and how to [install Laravel using Composer](https://laravel.com/docs/8.x/installation#installation-via-composer) and [installing MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)

This example was tested using the following versions:
- AG Grid v25.1.0
- Angular v11.1.2
- Laravel v8.26.1 
- PHP v7.4.14
- MySQL v8.0.23
## Installation
Clone this repro and run the following commands in the root directory to install the required dependencies for the Laravel development server.
```bash
cd server
composer install
```
### Configuring the Database and Environment
Now that we've installed the dependencies, connect to your MySQL server with your username and password:

```bash
$ mysql -u root -p
```
then create a database with the name `sample_data`:

```sql
mysql> create database sample_data; 
```
To connect this database to Laravel, we need to create an `.env` file (you can rename the file `.env.example` to `.env`) and then add the <strong>database name</strong>, <strong>username</strong> and <strong>password</strong> inside the `.env` file as shown below (I've used `root` and `password` as an example):

```json
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sample_data
DB_USERNAME=root
DB_PASSWORD=password
```
Next, run this command to generate an application key for this app:
```bash
$ php artisan key:generate
```
### Setup Data
Now that we have a database, let's populate it with data. The data for this example can be found here: [`server/database/data/olympic-winners.json`](https://github.com/shuheb/ag-grid-angular-laravel-mysql/blob/main/server/database/data/olympic-winners.json).

Run the following command to create a table called `athletes` inside our database and seed it with the data in the json file above:
```bash
$ php artisan migrate:fresh --seed
```
### Run the App
Now that we've configured everything on the backend, we can start Laravel's local development server using the Artisan CLI's `serve` command:
```bash
$ php artisan serve
```
Let's go back to the root directory and start up our Angular development server:
```bash
$ cd client && npm install
$ npm run start
```
That's it! The application now should be running at http://localhost:4200/
