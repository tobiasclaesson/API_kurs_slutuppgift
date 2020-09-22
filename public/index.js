

const url = 'https://us-central1-api-slutuppgift-31665.cloudfunctions.net/post';


let posts = [];
let selectedPost = {};

const nameInput = document.querySelector('#nameInput');
const createUserButton = document.querySelector('#createUserButton');
const postTable = document.querySelector("#postContainer");

function renderPostTable() {
    let tableRow = "";

    posts.forEach(post => {
        tableRow += 
        `<div class='post' id=${post.id} onclick="showEditSection(this.id)">${post.name} ${post.id}</div>
        <button onclick="deletePost()">delete</button>
        `;
    });

    postTable.innerHTML = tableRow;
}

const showEditSection = (postId) => {
    if(!postId) {
        throw new Error("No id present.");
    }

    selectedPost = postId;
    
    console.log(selectedPost);
    deletePost();
    console.log(selectedPost);
}

const getPosts = async () => {
    try{
        const response = await fetch(url);

        if(response.ok) {
            posts = await response.json();
            renderPostTable();
        }
        else {
            throw new Error(response.statusText);
        }
    } catch(err){
        throw err;
    }
}

const createPost = async () => {
    console.log('hej');
    const newPost = { name: nameInput.value };
    console.log(newPost);
    if(!newPost.name){
        
        return;
    }

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        console.log(response);

        if(response.ok){

            posts.push(newPost);
            console.log(posts);
            renderPostTable();
            
        } else{
            throw new Error(response.statusText);
        }


    } catch (err) {
        throw err;
    }
}

const deletePost = async () => {
    if(!selectedPost) {
        throw new Error('No user id found.');
    }
    try {
        const response = await fetch(url + selectedPost, {
            method: 'DELETE',
            
        });
        
        if(response.ok) { 
            console.log(response);
            posts = posts.filter(post => post.id !== selectedPost);
            renderPostTable();
        }
        else {
            throw new Error(response.statusText);
        }
    } 
    catch (err) {
        throw err;
    }
}

getPosts();
createUserButton.addEventListener('click', createPost);