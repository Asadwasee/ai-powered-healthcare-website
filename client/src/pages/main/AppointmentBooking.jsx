import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import doctors from "../../constants/doctors";
import DoctorSummaryCard from "../../components/appointment/DoctorSummaryCard";
import AppointmentForm from "../../components/appointment/AppointmentForm";

function AppointmentBooking() {
  const { id } = useParams();

  const doctor = doctors.find(
    (doc) => doc.id === Number(id)
  );

  if (!doctor) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">

        <h1 className="text-4xl font-bold text-gray-900">
          Doctor Not Found
        </h1>

        <p className="text-gray-500 mt-4 max-w-lg mx-auto leading-7">
          The doctor you are looking for doesn't exist or may have been removed.
        </p>

        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </Link>

      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}

      <Link
        to={`/doctors/${doctor.id}`}
        className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-8"
      >
        <ArrowLeft size={18} />
        Back to Doctor Details
      </Link>

      {/* Heading */}

      <div className="mb-10">

        <span className="inline-flex items-center rounded-full bg-blue-50 text-primary px-4 py-1 text-sm font-medium">
          Appointment Booking
        </span>

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
          Schedule Your Appointment
        </h1>

        <p className="text-gray-500 text-lg mt-4 max-w-3xl leading-8">
          Complete the booking form below to reserve your consultation with your
          preferred healthcare professional. Please ensure all details are
          accurate before confirming your appointment.
        </p>

      </div>

      {/* Layout */}

      <div className="grid xl:grid-cols-3 gap-8 items-start">

        {/* Doctor */}

        <div>

          <DoctorSummaryCard doctor={doctor} />

        </div>

        {/* Form */}

        <div className="xl:col-span-2">

          <AppointmentForm doctor={doctor} />

        </div>

      </div>

    </section>
  );
}

export default AppointmentBooking;