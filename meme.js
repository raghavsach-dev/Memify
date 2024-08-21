document.addEventListener('DOMContentLoaded', () => {
    const parameters = new URLSearchParams(window.location.search);
    const memeID = parameters.get('id');
    const memeurl = parameters.get('url');
    document.getElementById('memepreview').src = memeurl;
    document.getElementById('memeId').value = memeID;
    document.getElementById('memifybtn').addEventListener('click', generateMeme);
});

function generateMeme() {
    const memeID = document.getElementById('memeId').value;
    const upperText = document.getElementById('upperText').value;
    const lowerText = document.getElementById('lowerText').value;

    const Data = new URLSearchParams({
        template_id: memeID,
        text0: upperText,
        text1: lowerText,
        username: 'raghav1309',
        password: '@Raghav1309'
    });

    fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        body: Data
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('memepreview').src = data.data.url;
            const memifyButton = document.getElementById('memifybtn');
            memifyButton.textContent = 'Download Meme';
            memifyButton.removeEventListener('click', generateMeme);
            memifyButton.addEventListener('click', () => downloadMeme(data.data.url));
        } else {
            alert('Error creating meme');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating meme');
    });
}

function downloadMeme(memeUrl) {
    const a = document.createElement('a');
    a.href = memeUrl;
    a.download = 'meme.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}