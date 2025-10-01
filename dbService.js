const User = require('./models/user'); // Importera din Sequelize-modell
const Author = require('./models/author'); // Importera din Sequelize-modell
const Book = require('./models/book'); // Importera din Sequelize-modell

// CRUD-funktioner för User-modellen

async function createUser(name, email) {
  return await User.create({ name, email });
}

async function getAllUsers() {
  return await User.findAll();
}

async function getOneUser(id) {
  return await User.findByPk(id);
}

async function updateUser(id, updatedFields) {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(updatedFields);
  }
  return null;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
}

//Post och Get för Author och Book

async function createAuthor(name, age) {
  return await Author.create({ name, age });
}

async function getAllAuthors() {
  // return await Author.findAll({ include: Book }); // Inkludera böcker direkt, aka eager loading
  return await Author.findAll(); // Lazy loading, hämta böcker separat vid behov
}

async function createBook(title, pages, authorId) {
  return await Book.create({ title, pages, authorId });
}

async function getAllBooks() {
  return await Book.findAll({ include: Author }); // Inkludera författarinformation direkt, aka eager loading
  // return await Book.findAll(); // Lazy loading, hämta författare separat vid behov
}

module.exports = { createUser, getAllUsers, getOneUser, updateUser, deleteUser,
  createAuthor, getAllAuthors, createBook, getAllBooks
 };
