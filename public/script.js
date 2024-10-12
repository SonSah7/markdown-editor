const socket = io();

// Reference to the markdown input and preview div
const markdownInput = document.getElementById('markdown');
const preview = document.getElementById('preview');

// Update preview when user types
markdownInput.addEventListener('input', () => {
    const markdownText = markdownInput.value;
    // Send markdown text to server
    socket.emit('markdown', markdownText);
});

// Listen for markdown updates from the server
socket.on('markdown', (msg) => {
    preview.innerHTML = marked(msg); // Use the marked library for rendering markdown
});
