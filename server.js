const express = require('express');
const bodyParser = require('body-parser');

const { createUser, getAllUsers, getOneUser, updateUser, deleteUser,
  createAuthor, getAllAuthors, createBook, getAllBooks
} = require('./dbService'); // Importera dina databasfunktioner

const syncDatabase = require('./syncDatabase');

const app = express();
const PORT = 3000;
app.use(bodyParser.json()); // Middleware för att parsa JSON

// Skapa en ny användare 
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte skapa användare' });
  }
});

// Hämta alla användare
app.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

// Hämta en användare med ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await getOneUser(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Användare hittades inte' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

// Uppdatera en användare med ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Användare hittades inte' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte uppdatera användare' });
  } 
});

// Radera en användare med ID
app.delete('/users/:id', async (req, res) => {
  try {
    const success = await deleteUser(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Användare hittades inte' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte radera användare' });
  }
});

// Basic crud för Author och Book kan läggas till på liknande sätt
// Vill bara ha Post och get för dessa

app.post('/authors', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newAuthor = await createAuthor(name, age);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte skapa författare' });
  }
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta författare' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, pages, authorId } = req.body;
    const newBook = await createBook(title, pages, authorId);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte skapa bok' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta böcker' });
  }
});


// Starta servern
app.listen(PORT, async () => {
  await syncDatabase();
  console.log(`Servern körs på http://localhost:${PORT}`);
});

module.exports = app; // Exportera app för testning