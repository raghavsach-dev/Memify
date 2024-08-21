document.addEventListener('DOMContentLoaded', fetchMemes);

function fetchMemes() {
    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            const memeList = document.getElementById('memeList');
            data.data.memes.forEach(meme => {
                const memeItem = document.createElement('div');
                memeItem.className = 'meme-item';
                memeItem.innerHTML = `<img src="${meme.url}" alt="${meme.name}" data-id="${meme.id}">`;
                memeItem.addEventListener('click', () => {
                    window.location.href = `meme.html?id=${meme.id}&name=${encodeURIComponent(meme.name)}&url=${encodeURIComponent(meme.url)}`;
                });
                memeList.appendChild(memeItem);
            });
        })
        .catch(error => console.error('Error fetching memes:', error));
}
