# [Hotspot Tech Blog]()

## Table of Contents
1. [Description](#description)
2. [Mock Up](#mock-up)
3. [Installation](#installation)
4. [Resources](#resources)

## Description
A Wordpress-style blog built using Model View Controller paradigm with MySQL, Express, Handlebars, and Bootstrap.

## Mock Up
[![Demonstration Thumbnail](assets/demo-thumbnail.png)](https://streamable.com/s2sbxd)

## Installation
- Make sure you have [NodeJS](https://nodejs.org/en/download/) installed
- Clone the project to your machine
-  Navigate to the project folder in your terminal, using MySQL shell run
```bash
source db/schema.sql
```
- Exit MySQL shell, then add a .env file to the root of the project with
```bash
DB_NAME='techblog_db'
DB_USER='root'
DB_PASSWORD='your_mysql_password'
```
- In your terminal, run
```bash
npm run seed
npm start
```
- Preview the site on http://localhost:3001/ in your browser

## Resources
- [Online Repository](https://github.com/JtheFox/ecommerce-backen