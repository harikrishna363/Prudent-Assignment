const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, 'database.db');
let db = null;

const PORT = process.env.PORT || 4000;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run('PRAGMA foreign_keys = ON');

    app.listen(PORT, () => {
      console.log(`Server Running at port ${PORT}`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

app.get('/api/books', async (req, res) => {
    const { author = '', genre = '', publishedYear = '' } = req.query;
    const query = `
        SELECT b.*, a.name AS author_name, g.name AS genre_name
        FROM books b
        INNER JOIN authors a ON b.author_id = a.author_id
        INNER JOIN genres g ON b.genre_id = g.genre_id
        WHERE author_name LIKE "%${author}%" AND genre_name LIKE "%${genre}%"
        AND strftime('%Y', b.published_date) LIKE "%${publishedYear}%"
    `;

    const abc = `SELECT * FROM books`

    try {
        const data = await db.all(query);        
        res.status(200).json(data);

    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/book-details/:bookId', async (req, res) => {
    const { bookId } = req.params;

    const query = `
        SELECT b.*, a.name AS author, g.name AS genre
        FROM books b
        INNER JOIN authors a ON b.author_id = a.author_id
        INNER JOIN genres g ON b.genre_id = g.genre_id
        WHERE b.book_id = ?
    `;

    try {
        const data = await db.get(query, [bookId]);        
        res.status(200).json(data);
        
    } catch (err) {
        console.error('Error fetching book details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/add-book', async (req, res) => {
    const bookData = req.body
    const {title, author, genre, pages, published_date} = bookData

    const insertBookQuery = `INSERT INTO books(title, author_id, genre_id, pages, published_date)
                             VALUES (?, ?, ?, ?, ?) `

    try{
        await db.run('BEGIN TRANSACTION');

        const authorDetails = await db.get(`SELECT author_id from authors WHERE name = ?`, [author])
        let authorId
        if (!authorDetails) {
            const newAuthor = await db.run(`INSERT INTO authors(name) VALUES (?)`, [author])
            authorId = newAuthor.lastID
        } else {
            authorId = authorDetails.author_id
        }

        let genreDetails = await db.get(`SELECT genre_id from genres WHERE name = ?`, [genre])
        let genreId
        if (!genreDetails) {
            const newGenre = await db.run(`INSERT INTO genres(name) VALUES (?)`, [genre])
            genreId = newGenre.lastID
        } else {
            genreId = genreDetails.genre_id
        }

        await db.run(insertBookQuery, [title, authorId, genreId, pages, published_date])

        await db.run('COMMIT');

        return res.status(200).json({ success: 'Book Added successfully' });
    } catch (err) {
        await db.run('ROLLBACK');
        console.error('Error Adding Book:', err);
        res.status(500).json({ failure: err.message });
      }
})

app.put('/api/update-book', async (req, res) => {
    const bookData = req.body
    const {book_id, title, author, genre, pages, published_date, author_id, genre_id} = bookData

    const updateBookQuery = `UPDATE books
                             SET title = ?, author_id = ?, genre_id = ?, pages = ?, published_date = ?
                             WHERE book_id = ? `

    try{
        await db.run('BEGIN TRANSACTION');

        const authorDetails = await db.get(`SELECT author_id from authors WHERE name = ?`, [author])
        let authorId
        if (!authorDetails){
            const newAuthor = await db.run(`INSERT INTO authors(name) VALUES (?)`, [author])
            authorId = newAuthor.lastID
        }
        else if (authorDetails != undefined && authorDetails.author_id != author_id) {
            authorId = authorDetails.author_id
        } else {
            authorId = author_id
        }

        let genreDetails = await db.get(`SELECT genre_id from genres WHERE name = ?`, [genre])
        let genreId
        if (!genreDetails) {
            const newGenre = await db.run(`INSERT INTO genres(name) VALUES (?)`, [genre])
            genreId = newGenre.lastID
        } else if (genreDetails != undefined && genreDetails.genre_id != genre_id) {
            genreId = genreDetails.genre_id
        } else {
            genreId = genre_id
        }

        await db.run(updateBookQuery, [title, authorId, genreId, pages, published_date, book_id])

        await db.run('COMMIT');

        return res.status(200).json({ success: 'Changes Saved successfully' });
    } catch (err) {
        await db.run('ROLLBACK');
        console.error('Error Adding Book:', err);
        res.status(500).json({ failure: err.message });
      }
})

app.delete('/api/delete-book/:bookId', async (req, res) => {
    const {bookId} = req.params

    try{
        await db.run(`DELETE FROM books WHERE book_id = ?`, [bookId])
        return res.status(200).json({ success: 'Book Deleted successfully' });

    } catch (err) {
        console.error('Error Deleting Book:', err);
        res.status(500).json({ failure: err.message });
      }
})


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

initializeDBAndServer();