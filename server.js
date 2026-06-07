const express = require('express');
const midtransClient = require('midtrans-client');
const db = require('./firebase');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// SIMPAN KE FIREBASE
async function saveOrder(order) {
  const ref = db.ref('orders');
  await ref.push(order);
}

// 🔥 ROUTE MIDTRANS
app.post('/create-transaction', async (req, res) => {
  try {
    const { total, name, phone, address } = req.body;

    const orderId = 'ORDER-' + Date.now();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total
      },
      customer_details: {
        first_name: name,
        phone: phone,
        billing_address: {
          address: address
        }
      }
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      token: transaction.token,
      order_id: orderId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Midtrans error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});
