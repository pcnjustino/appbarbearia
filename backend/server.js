const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Get Appointments for a Specific User
app.get('/appointments', async (req, res) => {
  const userId = req.query.userId;
  const snapshot = await db.collection('appointments').where('userId', '==', userId).get();
  const appointments = snapshot.docs.map(doc => doc.data());
  res.json(appointments);
});

// Create a New Appointment
app.post('/appointments', async (req, res) => {
  const { date, time, userId } = req.body;
  await db.collection('appointments').add({ date, time, userId });
  res.send('Appointment added successfully');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
