const fs = require('fs');
const db = require('../db.json');
const { validationResult } = require('express-validator');

exports.createInquiry = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, message } = req.body;
        const newInquiry = { id: Date.now(), name, email, message };
        db.inquiries.push(newInquiry);
        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.status(201).json(newInquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInquiries = (req, res) => {
    try {
        res.json(db.inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateInquiry = (req, res) => {
    try {
        const id = req.params.id;
        const inquiry = db.inquiries.find(item => item.id === parseInt(id));
        if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

        const { name, email, message } = req.body;
        inquiry.name = name || inquiry.name;
        inquiry.email = email || inquiry.email;
        inquiry.message = message || inquiry.message;

        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteInquiry = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = db.inquiries.findIndex(inquiry => inquiry.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        db.inquiries.splice(index, 1);
        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.json({ message: "Inquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

