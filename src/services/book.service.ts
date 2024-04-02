import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class BookService {
    async getBooks() {
        return prisma.book.findMany();
    }

    async getBookById(id: string) {
        const book = await prisma.book.findUnique({
            where: {id: Number(id)},
            include: {
                borrows: {
                    select: {
                        score: true
                    }
                }
            }
        });

        if (!book) {
            return null;
        }

        if (book.borrows.length === 0) {
            return {
                id: book.id,
                name: book.name,
                score: -1
            };
        }
        const totalScore = book.borrows.reduce((sum, borrow) => sum + (borrow.score || 0), 0);
        const averageScore = totalScore / book.borrows.length;
        console.log('averageScore:', averageScore, book.borrows.length, book);

        return {
            id: book.id,
            name: book.name,
            score: averageScore.toFixed(2) // Ortalama puanı 2 ondalık basamağa yuvarla
        };
    }


    async createBook(bookData: any) {
        try {
            // Veritabanına yeni bir kitap ekleyin
            const newBook = await prisma.book.create({
                data: {
                    name: bookData.name // Gönderilen kitap verisinin adını kullanın
                }
            });

            return newBook; // Oluşturulan kitabı döndürün
        } catch (error) {
            console.error('Error creating book:', error);
            throw new Error('Failed to create book'); // Hata durumunda bir hata fırlatın
        }
    }


    async borrowBook(userId: string, bookId: string) {
        try {
            // userId ve bookId değerlerini kontrol edin ve uygun olup olmadıklarını doğrulayın
            const parsedUserId = parseInt(userId);
            const parsedBookId = parseInt(bookId);

            // Eğer değerler uygunsa devam edin
            if (isNaN(parsedUserId) || isNaN(parsedBookId)) {
                throw new Error('Invalid userId or bookId');
            }

            // Kullanıcının belirli bir kitabı ödünç aldığı tarihi kaydetmek için Borrow modelini kullanarak veritabanına yeni bir giriş oluşturun
            const borrowedBook = await prisma.borrow.create({
                data: {
                    borrowDate: new Date(), // Ödünç alma tarihini şu anki zamana ayarlayın
                    user: {
                        connect: {id: parsedUserId} // Kullanıcıyı kullanıcı kimliğiyle bağlayın
                    },
                    book: {
                        connect: {id: parsedBookId} // Kitabı kitap kimliğiyle bağlayın
                    }
                }
            });

            return borrowedBook; // Ödünç alınan kitabı döndürün
        } catch (error) {
            console.error('Error borrowing book:', error);
            throw new Error('Failed to borrow book'); // Hata durumunda bir hata fırlatın
        }
    }


    async returnBook(userId: string, bookId: string, score: number) {
        try {
            const returnedBook = await prisma.borrow.updateMany({
                where: {
                    userId: parseInt(userId),
                    bookId: parseInt(bookId),
                    returnDate: null
                },
                data: {
                    returnDate: new Date(),
                    score: score
                }
            });

            return returnedBook;
        } catch (error) {
            console.error('Error returning book:', error);
            throw new Error('Failed to return book');
        }
    }


}