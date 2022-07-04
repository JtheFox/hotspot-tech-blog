const titleEl = document.querySelector('#title');
const contentEl = document.querySelector('#content');
const createBtn = document.querySelector('#createPost');
const cancelBtn = document.querySelector('#cancelPost');
const updateBtn = document.querySelector('#updatePost');
const deleteBtn = document.querySelector('#deletePost');

const postHasEmptyField = () => {
    const isEmpty = [titleEl.value, contentEl.value].some(e => e.length === 0);
    if (isEmpty) alert('You cannot submit an empty post');
    return isEmpty;
}

const createPostHandler = async (event) => {
    event.preventDefault();
    if (postHasEmptyField()) return;
    
    const title = titleEl.value;
    const content = contentEl.value;
    const response = await fetch('/dashboard/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const newPostData = response.json();
        document.location.replace(`/post/${newPostData.id}`);
    } else alert('Failed to create post.');
}

const cancelPostHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
}

const updatePostHandler = async (event) => {
    event.preventDefault();
    if (postHasEmptyField()) return;
    
    const title = titleEl.value;
    const content = contentEl.value;
    const id = document.location.pathname.split('/').at(-1);
    const response = await fetch(`/dashboard/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const updatedPostData = response.json();
        document.location.replace(`/post/${updatedPostData.id}`);
    } else alert('Failed to update post.');
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    
    const id = document.location.pathname.split('/').at(-1);
    const response = await fetch(`/dashboard/post/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) document.location.replace('/dashboard');
    else alert('Failed to delete post.');
}

if (createBtn) {
    createBtn.addEventListener('click', createPostHandler);
    cancelBtn.addEventListener('click', cancelPostHandler);
} else {
    updateBtn.addEventListener('click', updatePostHandler);
    deleteBtn.addEventListener('click', deletePostHandler);
}