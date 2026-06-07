const express = require('express');
const path = require('path');
const db = require('./firebase');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.Mid-server-Sh2Gb0Myp4rvUpa4XPqtl2XE,
});
async function saveOrder(order) {
  const ref = db.ref('orders');
  await ref.push(order);
  console.log('Order berhasil disimpan ke Firebase');
}
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});

app.post('/create-transaction', async (req, res) => {
  try {
    const total = Number(req.body.total);

    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;

    console.log("RAW BODY:", req.body);
    console.log("TOTAL TYPE:", typeof req.body.total);
    console.log("TOTAL PARSED:", total);

    if (!total || isNaN(total)) {
      return res.status(400).json({ error: "Invalid total" });
    }

    let orderId = 'ORDER-' + Date.now();
await saveOrder({
  orderId: orderId,
  total: Math.round(total),
  name: name,
  phone: phone,
  address: address,
  status: 'pending',
  createdAt: Date.now()
});
let parameter = {
  transaction_details: {
    order_id: orderId,
    gross_amount: Math.round(total)
  },

  item_details: [
    {
      id: "item-1",
      price: Math.round(total),
      quantity: 1,
      name: "Order Marketplace"
    }
  ],

  finish_redirect_url: `https://wirastore.vercel.app/success.html?order_id=${orderId}`
};

    const transaction = await snap.createTransaction(parameter);

    return res.json({
      token: transaction.token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
console.log("FIREBASE OK");