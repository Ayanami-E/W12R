"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function BookForm() {
    // 状态变量
    const [name, setName] = (0, react_1.useState)('');
    const [author, setAuthor] = (0, react_1.useState)('');
    const [pages, setPages] = (0, react_1.useState)('');
    const handleSubmit = async (e) => {
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
        }
        catch (err) {
            console.error(err);
            alert('Error: ' + err);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Book Name:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: name, required: true, onChange: (e) => setName(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Author:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "author", value: author, required: true, onChange: (e) => setAuthor(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Pages:" }), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "pages", value: pages, required: true, onChange: (e) => setPages(e.target.value) })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", name: "submit", children: "Submit Book" })] }));
}
exports.default = BookForm;
