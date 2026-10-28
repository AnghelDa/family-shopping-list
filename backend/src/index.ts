import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ItemModel } from "./models/item";

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Lipseste MONGODB_URI din .env");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Conectat la MongoDb"))
  .catch((err) => console.error("Eroare la conectarea MongoDb:", err));

const normalize = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

app.get("/items", async (req, res, next) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

app.post("/items", async (req, res, next) => {
  try {
    const name = req.body?.name;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Numele este obligatoriu" });
    }

    const existing = await ItemModel.find();
    const exists = existing.some((i) => normalize(i.name) === normalize(name));
    if (exists) {
      return res.status(409).json({ error: "Articolul exista deja" });
    }

    const newItem = await ItemModel.create({ name });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

app.patch("/items/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: "Articolul nu exista" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

app.delete("/items/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: "Articolul nu exista" });
    }
    res.status(200).json({ message: "Articolul a fost sters" });
  } catch (err) {
    next(err);
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Eroare neasteptata:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Id-ul articolului este invalid." });
    }
    res.status(500).json({ error: "Eroare server, incearca din nou" });
  },
);

app.listen(3000, () => {
  console.log("Serverul ruleaza pe http://localhost: 3000");
});
