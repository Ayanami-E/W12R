import React, { useState } from 'react';

function BookForm() {
  // 状态变量
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 组装要发送的对象
    const bookData = {
      name: name,
      author: author,
      pages: parseInt(pages, 10) || 0
    };

    try {
      // 通过相对路径 "/api/book" 发起请求
      // 因为 vite.config.ts 已配好 proxy，会转发到 http://localhost:1234/api/book
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) {
        throw new Error('Failed to save the book');
      }

      const data = await response.json();
      console.log('Book saved:', data);
      // 提交成功，可以做一些提示，或清空表单
      setName('');
      setAuthor('');
      setPages('');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={pages}
          required
          onChange={(e) => setPages(e.target.value)}
        />
      </div>
      <button type="submit" name="submit">Submit Book</button>
    </form>
  );
}

export default BookForm;
