const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const {UserController} = require('./controllers/user.controller');
const {BookController} = require('./controllers/book.controller');

const app = express();
const port = process.env.PORT || 3000;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API Documentation',
        },
    },
    apis: ['./controllers/*.ts'], // Swagger belgeleri için controller dosyalarının yolu
};
// Swagger belgelerini sunmak için /api-docs endpoint'ini kullan
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

const userController = new UserController();
app.get('/users', userController.getUsers.bind(userController));
app.get('/users/:id', userController.getUser.bind(userController));
app.post('/users', userController.createUser.bind(userController));

const bookController = new BookController();
app.get('/books', bookController.getBooks.bind(bookController));
app.get('/books/:id', bookController.getBook.bind(bookController));
app.post('/books', bookController.createBook.bind(bookController));
app.post('/users/:userId/borrow/:bookId', bookController.borrowBook.bind(bookController));
app.post('/users/:userId/return/:bookId', bookController.returnBook.bind(bookController));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
