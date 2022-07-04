createPostHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard/post/create');
}

deletePostHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/post.${event.target.dataset.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert('Post deleted successfully.');
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.');
    }
}

document.querySelector('#createPost').addEventListener('click', createPostHandler);
document.querySelector('#deletePost').addEventListener('click', editPostHandler);