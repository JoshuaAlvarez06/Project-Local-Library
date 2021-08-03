function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const sortedAccts = accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
  return sortedAccts;
}
function getTotalNumberOfBorrows(accounts, books) {
  let count = 0;
  const result = books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === accounts.id) {
        count++;
      }
    })
  })
  return count;
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  const result = books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) { count++ };
    })
  })
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  //Loop through books array
  books.forEach((book) => {
    //Loop through borrows to check for matching Borrower ID to match Account ID
    book.borrows.find((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) { 
        //If match is found, find the author
        authors.find((author) => {
          if (book.authorId === author.id) { 
              book[`author`] = author;
              result.push(book);
          }
        })
    }
  }, [])
}, [])
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
