const commentTextEl = document.querySelector('#text');

postCommentHandler = async (event) => {
    event.preventDefault();
    const text = commentTextEl.value
    if (text.length === 0) {
        alert('Cannot submit an empty comment');
        return;
    }

    const post_id = document.location.pathname.split('/').at(-1);
    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) document.location.reload();
    else alert('Failed to create comment.');
}

document.querySelector('#postComment').addEventListener('click', postCommentHandler);
