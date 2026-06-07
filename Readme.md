# Sellora SQL

## Description

This is a simple API that allows you to create, read, update, and delete data from a SQL database. It uses TypeScript and Express.js for the backend and Prisma for the database.

## Features

- Create, read, update, and delete data from a SQL database.
- Use TypeScript for the backend and Prisma for the database.
- Use Express.js for the backend.
- Use Prisma for the database.
- Use Docker for the development environment.
- Use Docker Compose for the development environment.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:

```
git clone https://github.com/Sellora/sellora-sql.git
```

2. Navigate to the project directory:

```
cd sellora-sql
```

3. Install the dependencies:

```
npm install
```

4. Create a .env file in the project directory and add the following variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sellora
```

5. Start the development server:

```
npm run dev
```

6. Open your browser and navigate to http://localhost:3000.

## Usage

To create a new record, send a POST request to the /api/products endpoint with the following JSON payload:

```
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product Description",
  "category": "Electronics",
  "image": "https://example.com/product-image.jpg"
}
```

To read all records, send a GET request to the /api/products endpoint.
To read a specific record, send a GET request to the /api/products/{id} endpoint with the id of the record you want to read.
To update a record, send a PUT request to the /api/products/{id} endpoint with the id of the record you want to update and the updated JSON payload.
To delete a record, send a DELETE request to the /api/products/{id} endpoint with the id of the record you want to delete.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
