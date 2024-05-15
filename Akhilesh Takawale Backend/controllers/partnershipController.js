const fs = require('fs');
const db = require('../db.json');
const { validationResult } = require('express-validator');

exports.createPartnership = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;
        const newPartnership = { id: Date.now(), name, description };
        db.partnerships.push(newPartnership);
        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.status(201).json(newPartnership);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPartnerships = (req, res) => {
    try {
        res.json(db.partnerships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePartnership = (req, res) => {
    try {
        const id = req.params.id;
        const partnership = db.partnerships.find(item => item.id === parseInt(id));
        if (!partnership) return res.status(404).json({ message: "Partnership not found" });

        const { name, description } = req.body;
        partnership.name = name || partnership.name;
        partnership.description = description || partnership.description;

        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.json(partnership);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePartnership = (req, res) => {
    try {
        const id = req.params.id;
        const index = db.partnerships.findIndex(item => item.id === parseInt(id));
        if (index === -1) return res.status(404).json({ message: "Partnership not found" });

        db.partnerships.splice(index, 1);
        fs.writeFileSync('./db.json', JSON.stringify(db));
        res.json({ message: "Partnership deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
