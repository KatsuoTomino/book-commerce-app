// "use client";

import Book from "@/component/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";
import { getServerSession } from "next-auth";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user: User = session?.user as User;

  let purchaseBookIds: string;

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchaseData = await response.json();

    purchaseBookIds = purchaseData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );

    // console.log(purchaseBookIds);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds?.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
