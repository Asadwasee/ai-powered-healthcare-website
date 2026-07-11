import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

const buildAppointmentId = () => {
  return `APT-${Math.floor(100000 + Math.random() * 900000)}`;
};

const createAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, email, phone, date, time, reason } = req.body;

    if (!doctorId || !patientName || !email || !phone || !date || !time || !reason) {
      return res.status(400).json({ message: 'All appointment fields are required' });
    }

    const doctor = await Doctor.findOne({ id: Number(doctorId) });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the selected time slot is already booked
const existingAppointment = await Appointment.findOne({
  doctorId: doctor.id,
  date,
  time,
});

if (existingAppointment) {
  return res.status(400).json({
    message: "This time slot is already booked. Please choose another time.",
  });
}

    const appointment = await Appointment.create({
      appointmentId: buildAppointmentId(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName,
      email,
      phone,
      date,
      time,
      reason,
      fee: doctor.fee,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { email, doctorId } = req.query;
    const query = {};

    if (email) {
      query.email = email.toLowerCase();
    }

    if (doctorId) {
      query.doctorId = Number(doctorId);
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

export { createAppointment, getAppointments };