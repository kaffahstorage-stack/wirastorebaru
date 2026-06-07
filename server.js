const express = require('express');
const path = require('path');
const db = require('./firebase');
const midtransClient = require('midtrans-client');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

async function saveOrder(order) {
  const ref = db.ref('orders');
  await ref.push(order);
  console.log('Order berhasil disimpan ke Firebase');
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
  console.log("ENV TEST:", process.env.FIREBASE_PRIVATE_KEY);
});
const express = require('express');
const path = require('path');
const db = require('./firebase');
const midtransClient = require('midtrans-client');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

async function saveOrder(order) {
  const ref = db.ref('orders');
  await ref.push(order);
  console.log('Order berhasil disimpan ke Firebase');
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
  console.log("ENV TEST:", process.env.FIREBASE_PRIVATE_KEY);
});
