

const url = 'https://us-central1-api-slutuppgift-31665.cloudfunctions.net/user';


let users = [];
let selectedUser = [];

const nameInput = document.querySelector('#nameInput');
const createUserButton = document.querySelector('#createUserButton');



const getUsers = async () => {
    try{
        const response = await fetch(url);

        if(response.ok) {
            users = await response.json();
            console.log(users);
        }
        else {
            throw new Error(response.statusText);
        }
    } catch(err){
        throw err;
    }
}

const createUser = async () => {
    console.log('hej');
    const newUser = { name: nameInput.value };
    console.log(newUser);
    if(!newUser.name){
        
        return;
    }

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        console.log(response);

        if(response.ok){
            users.push(newUser);
            console.log(users);
        } else{
            throw new Error(response.statusText);
        }


    } catch (err) {
        throw err;
    }
}
getUsers();
createUserButton.addEventListener('click', createUser);