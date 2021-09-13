const postFormHandler = async (event) => {
    event.preventDefault();

    
    const newTitle = document.querySelector('#newTitle').value.trim();
    const newText = document.querySelector('#newText').value.trim();
    const newFile = document.querySelector('#file-upload').value.trim();
    if (newTitle && newText && newFile) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ newTitle, newText, newFile}),
            headers: { 'Content-Type': 'application/json' },
        });
console.log(response)
        if (response.ok) {
            // document.location.replace('/dashboard');
        } else {
            alert('Failed upload');
        }
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', postFormHandler);