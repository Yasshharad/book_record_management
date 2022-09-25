const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controllers/book-controller");

const router = express.Router();

//get all the books
router.get('/', getAllBooks);

//get all the books by id
router.get("/:id", getSingleBookById);

// get all issued books
router.get("/issued/by-user", getAllIssuedBooks);

//create new book
router.post("/", (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data provided",
        });
    }

    const book = books.find((each) => each.id === data.id);

    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists with this id, please use a unique id",
        });
    }

    const allBooks = [...books, data];

    return res.status(201).json({
        success: true,
        data: allBooks,
    });
});

//update  book
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book not found with this particular id",
        });
    }

    const updateData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updateData,
    });
});

//get all issued books with fine
module.exports = router;