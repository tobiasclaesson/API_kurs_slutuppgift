const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();




const app = express();
app.use(cors({ origin: ['http://127.0.0.1:5500'] }));


app.get('/', async (req, res) =>{
    const snapshot = await admin.firestore().collection('users').get();

    let users = [];
    snapshot.forEach(doc =>{
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(users));
})

app.get('/:id', async (req, res) =>{
    const snapshot = await admin.firestore().collection("users").doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));

})

app.post('/', async (req, res) =>{
    const user = req.body;
    await admin.firestore().collection('users').add(user);

    res.status(201).send();
})

app.put('/:id', async (req, res) =>{
    const body = req.body;

    await admin.firestore().collection('users').doc(req.params.id).update(body);

    res.status(200).send();
})

app.delete('/:id', async (req, res) =>{
    const body = req.body;

    await admin.firestore().collection('users').doc(req.params.id).delete;

    res.status(200).send();
})

exports.user = functions.https.onRequest(app);


