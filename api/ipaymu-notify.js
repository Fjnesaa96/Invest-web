// File: api/ipaymu-notify.js (untuk Vercel / Express backend)

import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyXfGd92WDVlKapqTtfUAlElfwICxjzNc",
  authDomain: "indocapital-21d1f.firebaseapp.com",
  projectId: "indocapital-21d1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const data = req.body;

    const status = data.status;
    const referenceId = data.reference_id; // Contoh: 'DEPOSIT-20250712190000'

    if (status == 1 && referenceId) {
      const depositRef = doc(db, 'deposit', referenceId);
      await updateDoc(depositRef, {
        status: 'approved',
        approvedAt: Timestamp.now()
      });
    }

    return res.status(200).json({ message: 'OK' });

  } catch (err) {
    console.error('IPAYMU Webhook Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
