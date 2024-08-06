const { Op } = require("sequelize");
const Book = require("../models/Books");
const Member = require("../models/Members");
const BookBorrow = require("../models/BookBorrows");

async function borrowBook(req, res) {
  try {
    const { memberId, bookId, startDate } = req.body;

    const penaltyEndDate = await BookBorrow.findOne({
      where: {
        member_id: memberId,
        penalty_date: {
          [Op.not]: null,
        },
      },
      order: [["penalty_date", "DESC"]],
    });

    if (penaltyEndDate && new Date() < new Date(penaltyEndDate.penalty_date)) {
      return res.status(400).json({ error: "Member is currently penalized." });
    }

    const borrowedBooksCount = await BookBorrow.count({
      where: { member_id: memberId , return_date_book: null },
    });

    if (borrowedBooksCount >= 2) {
      return res
        .status(400)
        .json({ error: "Member cannot borrow more than 2 books." });
    }

    const bookBorrowed = await BookBorrow.findOne({
      where: {
        book_id: bookId,
        borrow_end_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (bookBorrowed) {
      if (bookBorrowed.member_id === memberId) {
        return res
          .status(400)
          .json({ error: "You currently borrowed this book." });
      }
      return res
        .status(400)
        .json({ error: "The book is currently borrowed by another member." });
    }

    const startDateBorrowed = new Date(startDate);
    const endDateBorrowed = new Date(startDateBorrowed);
    endDateBorrowed.setDate(startDateBorrowed.getDate() + 7);

    const book = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    if (book) {
      await book.update({
        stock: book.stock - 1,
      });
    }

    await BookBorrow.create({
      book_id: bookId,
      member_id: memberId,
      borrow_start_date: startDate,
      borrow_end_date: endDateBorrowed,
    });

    res.status(200).json({ message: "Book borrowed successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function returnBook(req, res) {
  try {
    const { memberId, bookId } = req.body;

    const borrowRecord = await BookBorrow.findOne({
      where: {
        member_id: memberId,
        book_id: bookId,
        return_date_book: null
      },
    });

    if (!borrowRecord) {
      return res
        .status(400)
        .json({ error: "No record found for this book borrowing." });
    }

    const updateStock = async (data) =>{
      const book = await Book.findOne({
        where: {
          id: data.book_id,
        },
      });
  
      if (book) {
        await book.update({
          stock: book.stock + 1,
        });
      }
  
    }

    if (borrowRecord.borrow_end_date < new Date()) {
      const penaltyEndDate = new Date();
      penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);

      updateStock(borrowRecord);
      await BookBorrow.update(
        {
          return_date_book: new Date(),
          penalty_date: penaltyEndDate,
        },
        {
          where: {
            id: borrowRecord.id,
          },
        }
      );

      return res.status(200).json({ message: "Member has been penalized." });
    }

    updateStock(borrowRecord);

    if (borrowRecord.return_date_book) {
      return res.status(400).json({
        error: `The book has already been returned on ${borrowRecord.return_date_book}.`
      });
    }

    await BookBorrow.update(
      {
        return_date_book: new Date(),
      },
      {
        where: {
          id: borrowRecord.id,
        },
      }
    );

    res.status(200).json({ message: "Book returned successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function checkAvailableBooks(req, res) {
  try {
    const books = await Book.findAll();

    const borrowedBooks = await BookBorrow.findAll({
      where: {
        return_date_book : null
      },
      attributes: ["book_id"],
      group: ["book_id"],
    });

    const borrowedBookIds = borrowedBooks.map((record) => record.book_id);
    const availableBooks = books.filter((book) => {
      return book.stock > 0 || !borrowedBookIds.includes(book.id);
    });
    
    res.status(200).json({ availableBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function checkMembers(req, res) {
  try {
    const members = await Member.findAll();

    const data = await Promise.all(
      members.map(async (member) => {
        const books_borrowed = await BookBorrow.count({
          where: { member_id: member.id },
        });

        return {
          member,
          books_borrowed,
        };
      })
    );

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  borrowBook,
  returnBook,
  checkAvailableBooks,
  checkMembers,
};
