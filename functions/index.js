const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();




const app = express();
app.use(cors({ origin: ['http://127.0.0.1:5500', 'https://api-slutuppgift-31665.web.app', 'https://api-slutuppgift-31665.firebaseapp.com'] }));


app.get('/', async (req, res) =>{
    const snapshot = await admin.firestore().collection('posts').get();

    let posts = [];
    snapshot.forEach(doc =>{
        let id = doc.id;
        let data = doc.data();

        posts.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(posts));
})

app.get('/:id', async (req, res) =>{
    const snapshot = await admin.firestore().collection("users").doc(req.params.id).get();

    const postId = snapshot.id;
    const postData = snapshot.data();

    res.status(200).send(JSON.stringify({id: postId, ...postData}));

})

app.post('/', async (req, res) =>{
    const post = req.body;
    await admin.firestore().collection('posts').add(post);

    res.status(201).send();
})

app.put('/:id', async (req, res) =>{
    const body = req.body;

    await admin.firestore().collection('posts').doc(req.params.id).update(body);

    res.status(200).send();
})

app.delete('/:id', async (req, res) =>{
    const body = req.body;

    await admin.firestore().collection('posts').doc(req.params.id).delete;

    res.status(200).send();
})

exports.post = functions.https.onRequest(app);


