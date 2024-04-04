import {Request, Response} from 'express';
import {BookService} from "../services/book.service";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async getBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.getBooks();
            res.status(200).json(books);
        } catch (error) {
            console.error('Error getting books:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);
            res.status(200).json(book);
        } catch (error) {
            if (error) {
                res.status(404).send('Book not found');
            } else {
                console.error('Error getting book:', error);
                res.status(500).send('Internal Server Error');
            }
        }
    }

    async createBook(req: Request, res: Response) {
        try {
            const bookData = req.body;
            const {name} = req.body;
            if (!name) {
                res.status(400).send('Name is required');
                return;
            }
            const newBook = await this.bookService.createBook(name);
            res.status(201).json(newBook);
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async borrowBook(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            console.log('userId:', userId);
            const bookId = req.params.bookId;
            console.log('bookId:', bookId);
            await this.bookService.borrowBook(userId, bookId);
            res.status(200).send('Book borrowed successfully');
        } catch (error) {
            console.error('Error borrowing book:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async returnBook(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const bookId = req.params.bookId;

            const {score} = req.body;
            await this.bookService.returnBook(userId, bookId, score);
            res.status(200).send('Book returned successfully');
        } catch (error) {
            console.error('Error returning book:', error);
            res.status(500).send('Internal Server Error');
        }
    }


}

