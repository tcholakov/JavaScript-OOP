/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function validateBookISBN(book) {
			if (book.isbn) {
				if (book.isbn.length !== 10 && book.isbn.length !== 13) {
					throw new Error('Invalid book isbn');
				}

				if (books.some(function (item) {
					return item.isbn === book.isbn;
				})) {
					throw new Error('Invalid book isbn');
				}
			} else {
				throw new Error('Invalid book isbn');
			}
		}

		function validateBookTitle(book){
			if(books.some(function(item){
				return item.title === book.title;
			})){
				throw new Error('Book with reapeating title is added');
			}
		}

		function validateBookAuthor(book) {
			if (book.author) {
				if (book.author.length <= 0) {
					throw new Error('Invalid book author');
				}
			} else {
				throw new Error('Invalid book author');
			}
		}

		function listBooks() {
			if (arguments.length === 1) {
				var obj = arguments[0];
				if (books.some(function (book) {
					return book.category === obj.category;
				})) {
					return  books.filter(function (book) {
						return book.category === obj.category;
					});
				}

				return [];
			} else {
				return books;
			}
		}

		function addBook(book) {
			book.ID = books.length + 1;
			validateBookISBN(book);
			validateBookAuthor(book);
			validateBookTitle(book);
			books.push(book);
			addCategory(book.category);
			return book;
		}

		function addCategory(category) {
			if (category) {
				if (!categories.some(function (item) {
					return item === category;
				})) {
					categories.push(category);
				}
			} else {
				throw new Error('Invalid category');

			}
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
