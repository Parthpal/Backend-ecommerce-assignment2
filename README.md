## 1. Clone the Repository

git clone https://github.com/Parthpal/Backend-ecommerce-assignment2.git
cd Backend-ecommerce-assignment2

## Install Dependencies

npm install

## Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

port=3000
DATABASE_URL=mongodb+srv://mongo_ose:mongo_ose@cluster0.kf7gnio.mongodb.net/ecommerce_assignment_2?retryWrites=true&w=majority&appName=Cluster0

## Build the Project

npm run build

## Run the Application

npm run start:dev

#### The application will start on the port specified in your .env file. By default, it runs on http://localhost:3000.
