function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (book.borrows.some((borrow) => borrow.returned === false)) {
      acc++;
    }
    return acc;
  }, 0);
}

//HELPER FUNCTION USED IN NEXT 3 FUNCTIONS
function _giveTopFive(array) {
  return array.slice(0, 5);
}

function getMostCommonGenres(books) {
  let mostCommon = [];
  const genres = books.map((book) => book.genre);
  for (let genre of genres) {
    if (!mostCommon.some((book) => book.name === genre)) {
      mostCommon.push({ name: genre, count: 1 });
    } else {
      mostCommon.map((book) => {
        if (book.name === genre) {
          book.count++;
        }
      });
    }
  }
  return _giveTopFive(mostCommon).sort((bookA, bookB) => bookB.count - bookA.count);
}

function getMostPopularBooks(books) {
  const mostPopular = [];
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length).forEach((book) =>
    mostPopular.push({ name: book.title, count: book.borrows.length }));
  return _giveTopFive(mostPopular);
}


function getMostPopularAuthors(books, authors) {
  const list = [];
  //Loop through authors
  authors.forEach((author) => {
    //Create new object with author's name and count of how many times it appears in borrows (below)
    let obj = {
      name: `${author.name.first} ${author.name.last}`,
      count: total = 0
    };
    //Loop through books/borrows to add 1 for each time author's name is listed as borrowed
      books.forEach((book) => {
      if (book.authorId === author.id){ total += book.borrows.length};
      //Update count total in obj
      obj.count = total;
    })
    //Push author obj into list
    list.push(obj);
    })
    //Sort the list from highest count to lowest count.
    list.sort((authorA, authorB) => authorB.count - authorA.count);
    //Show only the top 5 authors
    const result = _giveTopFive(list);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};