import mongoose, { Schema, models, model } from "mongoose";

const VisitorSchema = new Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true,
    },

    firstVisit: {
      type: Date,
      default: Date.now,
    },

    lastVisit: {
      type: Date,
      default: Date.now,
    },

    visitCount: {
      type: Number,
      default: 1,
    },

    pagesViewed: {
      type: [String],
      default: [],
    },

    device: {
      type: String,
      default: "Unknown",
    },

    browser: {
      type: String,
      default: "Unknown",
    },

    os: {
      type: String,
      default: "Unknown",
    },

    location: {
      city: {
        type: String,
        default: "Unknown",
      },
      region: {
        type: String,
        default: "Unknown",
      },
      country: {
        type: String,
        default: "Unknown",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Visitor = models.Visitor || model("Visitor", VisitorSchema);

export default Visitor;