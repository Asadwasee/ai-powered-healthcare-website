import Doctor from '../models/Doctor.js';
import seedDoctors from '../data/doctors.js';

const ensureSeedDoctors = async () => {
  const count = await Doctor.countDocuments();

  if (count === 0) {
    await Doctor.insertMany(seedDoctors);
  }
};

const getDoctors = async (req, res) => {
  try {
    await ensureSeedDoctors();

    const { specialization, search } = req.query;
    const query = {};

    if (specialization && specialization !== 'All') {
      query.specialization = specialization;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
      ];
    }

    const doctors = await Doctor.find(query).sort({ rating: -1, experience: -1 });

    return res.json(doctors);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    await ensureSeedDoctors();

    const doctor = await Doctor.findOne({ id: Number(req.params.id) });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    return res.json(doctor);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch doctor', error: error.message });
  }
};

export { getDoctors, getDoctorById };