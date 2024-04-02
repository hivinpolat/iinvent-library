import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface Book {
    id: number;
    name: string;
    // Diğer özellikler buraya eklenebilir
}

export class UserService {
    async getUsers(): Promise<any> {
        return await prisma.user.findMany();
    }

    async getUser(id: number): Promise<any> {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                borrows: {
                    include: {
                        book: true
                    }
                }
            }
        });

        if (!user) {
            return {};
        }

        const pastBooks = [];
        const presentBooks = [];

        for (const borrow of user.borrows) {
            const bookData: any = {
                name: borrow.book.name
            };

            // Kitabın kullanıcı puanını al
            if (borrow.score) {
                bookData.userScore = borrow.score;
            }

            // Kitap iade edilmişse "past" kategorisine, aksi halde "present" kategorisine ekle
            if (borrow.returnDate) {
                pastBooks.push(bookData);
            } else {
                presentBooks.push(bookData);
            }
        }

        return {
            id: user.id,
            name: user.name,
            books: {
                past: pastBooks,
                present: presentBooks
            }
        };
    }


    async createUser(name: string) {
        return prisma.user.create({
            data: {
                name: name
            }
        });
    }
}
