   const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const progressInput = document.getElementById('progress');
    const bookList = document.getElementById('bookList');
    let editMode = false;

    function getBooks() {
      return JSON.parse(localStorage.getItem('books') || '[]');
    }

    function saveBook() {
      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
      const progress = progressInput.value.trim();
      if (!title || !author || !progress) return;

      const books = getBooks();
      books.push({ title, author, progress });
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
      clearInputs();
    }

    function clearInputs() {
      titleInput.value = '';
      authorInput.value = '';
      progressInput.value = '';
    }

    function toggleEdit() {
      editMode = !editMode;
      renderBooks();
    }

    function deleteBook(index) {
      const books = getBooks();
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
    }

    function renderBooks() {
      const books = getBooks();
      bookList.innerHTML = books.length === 0 ? '<em>No books saved yet.</em>' : '';
      books.forEach((book, index) => {
        const entry = document.createElement('div');
        entry.className = 'book-entry';
        entry.innerHTML = `
          <strong>📘 Title:</strong> ${book.title}<br>
          <strong>✍️ Author:</strong> ${book.author}<br>
          <strong>📈 Progress:</strong> ${book.progress}
        `;
        if (editMode) {
          const delBtn = document.createElement('button');
          delBtn.className = 'delete-btn';
          delBtn.textContent = 'Delete';
          delBtn.onclick = () => deleteBook(index);
          entry.appendChild(delBtn);
        }
        bookList.appendChild(entry);
      });
    }

    renderBooks();