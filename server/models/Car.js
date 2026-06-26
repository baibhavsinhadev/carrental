import mongoose, { Schema } from "mongoose";

const carSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: String, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);
export default Car;