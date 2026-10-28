import { model, Schema } from "mongoose";

const itemSchema = new Schema({
  name: { type: String, required: true },
  onList: { type: Boolean, default: false },
  checked: { type: Boolean, default: false },
});

export const ItemModel = model("Item", itemSchema);
