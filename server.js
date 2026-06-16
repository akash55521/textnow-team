const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: '*', // সব ওয়েবসাইট থেকে রিকোয়েস্ট এক্সেপ্ট করবে
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// API এন্ডপয়েন্ট: মেইল চেক করার জন্য
app.post('/get-mail', async (req, res) => {
    const { email, password } = req.body;
    const apiKey = "bg1or2226i24kxmdc8ooeuz405bgasdw";
    const targetUrl = `https://api.dongvanfb.net/api/getMessages?email=${email}&password=${password}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to connect to Mail API" });
    }
});

// সার্ভার চালু করা
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` 🚀 NODEJS INDUSTRIAL MAIL PROCESSOR v2.0`);
    console.log(` ✅ Server running on http://localhost:${PORT}`);
    console.log(`==================================================`);
});
