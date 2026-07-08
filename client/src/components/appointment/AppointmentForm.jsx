import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import AppointmentSuccessModal from "./AppointmentSuccessModal";
import { createAppointment as submitAppointment } from "../../services/appointmentService";

import {
  CalendarDays,
  Clock3,
  FileText,
  User,
  Mail,
  Phone,
  CalendarCheck,
} from "lucide-react";

function AppointmentForm({ doctor }) {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [appointmentData, setAppointmentData] = useState(null);

  const [submitError, setSubmitError] = useState("");

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  const isToday = formData.date === today;

  const availableTimeSlots = !isToday
    ? timeSlots
    : timeSlots.filter((slot) => {
        const now = new Date();
        const [time, meridian] = slot.split(" ");

        let [hour, minute] = time.split(":").map(Number);

        if (meridian === "PM" && hour !== 12) {
          hour += 12;
        }

        if (meridian === "AM" && hour === 12) {
          hour = 0;
        }

        const slotDate = new Date();

        slotDate.setHours(hour);
        slotDate.setMinutes(minute);
        slotDate.setSeconds(0);

        return slotDate > now;
      });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.patientName)) {
      newErrors.patientName =
        "Name should contain only alphabets.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^(03\d{9}|\+923\d{9})$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid Pakistani phone number.";
    }

    if (!formData.date) {
      newErrors.date = "Please choose a date.";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time slot.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please describe your symptoms.";
    } else if (formData.reason.trim().length < 15) {
      newErrors.reason =
        "Please provide at least 15 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateAppointmentID = () => {
    return `APT-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      reason: "",
    });

    setErrors({});
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitError("");

    try {
      const data = await submitAppointment({
        doctorId: doctor.id,
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      });

      const appointment = {
        id: data.appointmentId || generateAppointmentID(),
        doctorName: data.doctorName || doctor.name,
        date: data.date || formData.date,
        time: data.time || formData.time,
        fee: data.fee || doctor.fee,
      };

      setAppointmentData(appointment);
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
          "Unable to book the appointment right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <>
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">

      {/* Heading */}

      <div className="mb-8">

        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium">
          Appointment Form
        </span>

        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          Patient Information
        </h2>

        <p className="text-gray-500 mt-2 leading-7">
          Fill in the information below to request your appointment.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Name */}

        <div>

          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <User size={18} />
            Full Name
          </label>

          <Input
            name="patientName"
            placeholder="Enter your full name"
            value={formData.patientName}
            onChange={handleChange}
            error={errors.patientName}
          />

        </div>

        {/* Email + Phone */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Mail size={18} />
              Email Address
            </label>

            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

          </div>

          <div>

            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Phone size={18} />
              Phone Number
            </label>

            <Input
              name="phone"
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />

          </div>

        </div>

        {/* Date + Time */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <CalendarDays size={18} />
              Appointment Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-primary"
            />

            {errors.date && (
              <p className="text-sm text-red-500 mt-2">
                {errors.date}
              </p>
            )}

          </div>

          <div>

            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Clock3 size={18} />
              Time Slot
            </label>

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-primary"
            >

              <option value="">
                Select Time
              </option>

              {availableTimeSlots.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>
              ))}

            </select>

            {errors.time && (
              <p className="text-sm text-red-500 mt-2">
                {errors.time}
              </p>
            )}

          </div>

        </div>

        {/* Reason */}

        <div>

          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <FileText size={18} />
            Describe Your Symptoms
          </label>

          <textarea
            rows={5}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly explain your symptoms or reason for consultation..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 resize-none transition focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-primary"
          />

          {errors.reason && (
            <p className="text-sm text-red-500 mt-2">
              {errors.reason}
            </p>
          )}

        </div>

        {/* Live Summary */}

        <div className="rounded-2xl bg-slate-50 border border-gray-200 p-6">

          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Appointment Summary
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-500">Doctor</span>
              <span className="font-semibold">{doctor.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold">
                {formData.date || "Not Selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-semibold">
                {formData.time || "Not Selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Consultation Fee</span>
              <span className="font-semibold">
                Rs. {doctor.fee}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold">
                Pay at Clinic
              </span>
            </div>

          </div>

        </div>

        {submitError && (
          <p className="text-sm text-red-600 font-medium">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
        >
          <CalendarCheck size={18} />
          {loading
            ? "Booking Appointment..."
            : "Confirm Appointment"}
        </Button>

      </form>

    </div>

    {/* Success Modal */}

    <AppointmentSuccessModal
      open={showSuccessModal}
      appointment={appointmentData}
      onClose={() => setShowSuccessModal(false)}
    />

  </>
);
}

export default AppointmentForm;