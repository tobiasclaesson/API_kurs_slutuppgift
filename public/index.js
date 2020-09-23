

//const url = 'https://us-central1-api-slutuppgift-31665.cloudfunctions.net/post/';
const url = 'http://localhost:5001/api-slutuppgift-31665/us-central1/post/';


let posts = [];
let selectedPost = {};

const titleInput = document.querySelector('#titleInput');
const descInput = document.querySelector('#descInput');
const createUserButton = document.querySelector('#createUserButton');
const postTable = document.querySelector("#postContainer");

function renderPosts() {
    let postsDiv = "";

    posts.forEach(post => {
        console.log(post.id);
        postsDiv += 
        `<div class='post' onclick="" id=${post.id} >
        <span class='postHeader'>
        <p class='postTitle'>${post.title}</p>
        <button class='postDeleteButton' id=${post.id} onclick="showEditSection(this.id), deletePost() ">X</button>

        </span>
        <input id=${post.id} onblur="showEditSection(this.id), updatePost(this.value)" type="text" value="${post.desc}" class='postText'></input>
        </div>
        
        
        
        `;
    });
    
    postTable.innerHTML = postsDiv;
}

const showEditSection = (postId) => {
    if(!postId) {
        throw new Error("No id present.");
    }

    selectedPost = postId;
    



}

const getPosts = async () => {
    try{
        const response = await fetch(url);

        if(response.ok) {
            posts = await response.json();
            renderPosts();
        }
        else {
            throw new Error(response.statusText);
        }
    } catch(err){
        throw err;
    }
}

const createPost = async () => {
    const newPost = { title: titleInput.value, desc: descInput.value};
    //console.log(newPost);
    if(!newPost.title || !newPost.desc){
        
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

        if(response.ok){
            const body = await response.text();
            console.log(body);
            newPost.id = body;
            
            posts.push(newPost);
            //console.log(posts);
            renderPosts();
            
        } else{
            throw new Error(response.statusText);
        }


    } catch (err) {
        throw err;
    }
}

const updatePost = async (newValue) => {
    
    if(!selectedPost) {
        throw new Error('No post id found.');
    }
    console.log(newValue);
    const newObject = { desc: newValue};
    try{
        const response = await fetch(url + selectedPost, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        });

        if(response.ok){
            const body = await response.text();

            posts.forEach(post => {
                if(post.id === selectedPost){
                    post.desc = newValue
                }
                

            })
            
            //posts.push(newValue);
            console.log(posts);
            renderPosts();
            
        } else{
            throw new Error(response.statusText);
        }


    } catch (err) {
        throw err;
    }
}

const deletePost = async () => {
    if(!selectedPost) {
        throw new Error('No post id found.');
    }
    console.log(selectedPost);
    try {
        const response = await fetch(url + selectedPost, {
            method: 'DELETE',
            headers: {
                
            }
        });
        
        if(response.ok) { 
            console.log(response);
            posts = posts.filter(post => post.id !== selectedPost);
            renderPosts();
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