# Back-end Service Documentation

This is the back-end service for the SaaS DTI application, built with Node.js and Express, providing RESTful APIs for managing orders, inventory, sectors, technicians, and brands.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Node-Postgres (pg)

## Project Structure

```
back-end/
├── db/                  # Database related files
│   ├── comandos/        # SQL commands and queries
│   ├── tables/          # Table definitions
│   └── db.js            # Database configuration
├── routes/              # API route handlers
│   ├── estoque.js       # Inventory management routes
│   ├── marcas.js        # Brands management routes
│   ├── ordens.js        # Service orders routes
│   ├── setores.js       # Sectors management routes
│   └── tecnicos.js      # Technicians management routes
├── server.js            # Main application entry point
├── .env                 # Environment configuration
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_db_name
PORT=3001  # API server port
```

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:3001` (or the port specified in your .env file).

## API Endpoints

### Orders Management
- `GET /ordens` - List all service orders
- `POST /ordens` - Create a new service order
- `PUT /ordens/:id` - Update an existing order
- `DELETE /ordens/:id` - Delete an order

### Inventory Management
- `GET /estoque` - List all inventory items
- `POST /estoque` - Add new inventory item
- `PUT /estoque/:id` - Update inventory item
- `DELETE /estoque/:id` - Remove inventory item

### Sectors Management
- `GET /setores` - List all sectors
- `POST /setores` - Create new sector
- `PUT /setores/:id` - Update sector
- `DELETE /setores/:id` - Delete sector

### Technicians Management
- `GET /tecnicos` - List all technicians
- `POST /tecnicos` - Add new technician
- `PUT /tecnicos/:id` - Update technician info
- `DELETE /tecnicos/:id` - Remove technician

### Brands Management
- `GET /marcas` - List all brands
- `POST /marcas` - Add new brand
- `PUT /marcas/:id` - Update brand
- `DELETE /marcas/:id` - Remove brand

## Database Schema

The application uses PostgreSQL with the following main tables:

- `orders` - Service orders information
- `inventory` - Equipment and parts inventory
- `sectors` - Department/sector information
- `technicians` - Technical staff information
- `brands` - Equipment brands and manufacturers

Detailed table structures and relationships can be found in the `db/tables/` directory.

## Development

### Code Style

This project follows standard Node.js/JavaScript coding conventions. Make sure to:

- Use meaningful variable and function names
- Add appropriate comments for complex logic
- Follow RESTful API design principles
- Handle errors appropriately

### Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

### Security

- Environment variables are used for sensitive data
- Input validation is implemented for all endpoints
- Database queries are parameterized to prevent SQL injection

## Deployment

1. Set up your production environment variables
2. Build the application:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is proprietary and confidential.