# Commercial Automation Backend

### Project Description
- This project is designed to automate the commercial department of a company that sells goods online. The system allows tracking the financial operations of the company, managing products, customers, and sales.The project is written in TypeScript using Node.js.

## Installation
- git clone
- cd commercial-automation-backend
- npm install

## Configuration
- Create a .env file in the root directory of the project and add the necessary environment variables.

## Running the Application
- npm start

## API Routes
- authRoutes - Routes for authentication
- productRoutes - Routes for managing products
- saleRoutes - Routes for managing sales
- userRoutes - Routes for managing users(use in the future for improvement)

## Domain Description
The commercial department of a company selling various goods online tracks the financial operations of the company.
The company's operations are organized as follows:
Certain products are listed for sale on the company's website. Each product has a name, price, and unit of measurement (pieces, kilograms, liters).
Personal data of customers are collected for research and optimization of the online store's operations. Standard questionnaire data, phone number, and email address for contact are collected.
Customers who purchase goods for more than 5000 UAH become "permanent customers" and receive a 2% discount on each purchase...
For each sale, the customer, product, quantity, sale date, and delivery date are automatically recorded.