import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    qualification: { type: String, default: '' },
    hospital: { type: String, default: '' },
    location: { type: String, default: '' },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    about: { type: String, default: '' },
    availability: [{ type: String }],
    timings: [{ type: String }],
    image: { type: String, default: '' },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;