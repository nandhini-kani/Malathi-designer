
import mongoose, { Schema, model, models } from "mongoose";

const VisitSchema = new Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    page: {
      type: String,
      required: true,
    },

    visitedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Visit ||
  model("Visit", VisitSchema);
