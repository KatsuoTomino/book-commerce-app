type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thunmbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: string;
};

export type { BookType, User, Purchase };
