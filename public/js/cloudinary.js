const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/catz-n-dogz/upload';
const CLOUDINARY_UPLOAD_PRESET = 'lhxcc2tl';

var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
let picUrl;

fileUpload.addEventListener('change', function (event) {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData

    }).then(function (res) {
        console.log(res);
        imgPreview.src = res.data.secure_url;
        picUrl = res.data.url;
        console.log(picUrl);
    }).catch(function (err) {
        console.log(err)
    });

});


const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newTitle').value.trim();
    const post_content = document.querySelector('#newText').value.trim();
    const filename = picUrl;
    console.log(filename);
    if (title && post_content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, post_content, filename}),
            headers: { 'Content-Type': 'application/json' },
        });
console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed upload');
        }
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', postFormHandler);