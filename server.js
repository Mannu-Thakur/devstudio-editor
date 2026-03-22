const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== CONNECT DB =====
mongoose.connect("mongodb://127.0.0.1:27017/code_editor")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ===== SCHEMA =====
const Project = mongoose.model("Project", {
    html: String,
    css: String,
    js: String
});

// ===== SAVE PROJECT =====
app.post("/save", async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.json({ id: project._id });
    } catch (err) {
        res.status(500).json({ error: "Failed to save project" });
    }
});

// ===== LOAD PROJECT =====
app.get("/project/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Project not found" });
    }
});

// ===== START SERVER =====
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});