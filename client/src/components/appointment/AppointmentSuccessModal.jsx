import { Link } from "react-router-dom";
import {
  CircleCheckBig,
  CalendarDays,
  Clock3,
  BadgeDollarSign,
  User,
  Hash,
  ArrowRight,
} from "lucide-react";

import { Button } from "../ui/Button";

function AppointmentSuccessModal({
  open,
  appointment,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-md">

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">

        <div className="w-full max-w-xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-[zoom-in_0.25s_ease]">

          {/* Top Section */}

          <div className="bg-green-50 border-b border-green-100 px-6 sm:px-8 py-6 sm:py-8 text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

              <CircleCheckBig
                size={46}
                className="text-green-600"
              />

            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900">
              Appointment Confirmed
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-7 max-w-md mx-auto">
              Your appointment has been successfully booked.
              A confirmation has been generated for your visit.
            </p>

          </div>

          {/* Body */}

          <div className="p-5 sm:p-8">

            {/* Appointment ID */}

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 text-center">

              <div className="flex items-center justify-center gap-2 text-primary">

                <Hash size={18} />

                <span className="font-medium">
                  Appointment ID
                </span>

              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-widest text-primary break-all">
                {appointment.id}
              </h3>

            </div>

            {/* Summary */}

            <div className="mt-7 rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">

              {/* Doctor */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4">

                <div className="flex items-center gap-3 text-gray-600">

                  <User size={18} />

                  <span>Doctor</span>

                </div>

                <span className="font-semibold text-gray-900">
                  {appointment.doctorName}
                </span>

              </div>

              {/* Date */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4">

                <div className="flex items-center gap-3 text-gray-600">

                  <CalendarDays size={18} />

                  <span>Appointment Date</span>

                </div>

                <span className="font-semibold">
                  {appointment.date}
                </span>

              </div>

              {/* Time */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4">

                <div className="flex items-center gap-3 text-gray-600">

                  <Clock3 size={18} />

                  <span>Time Slot</span>

                </div>

                <span className="font-semibold">
                  {appointment.time}
                </span>

              </div>

              {/* Fee */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4">

                <div className="flex items-center gap-3 text-gray-600">

                  <BadgeDollarSign size={18} />

                  <span>Consultation Fee</span>

                </div>

                <span className="font-bold text-primary">
                  Rs. {appointment.fee}
                </span>

              </div>

            </div>

            {/* Next Steps */}

            <div className="mt-8 bg-slate-50 rounded-2xl p-5 sm:p-6">

              <h4 className="font-semibold text-gray-900 mb-4">
                What happens next?
              </h4>

              <ul className="space-y-4 text-sm text-gray-600">

                <li className="flex gap-3">

                  <ArrowRight
                    size={16}
                    className="mt-1 text-primary shrink-0"
                  />

                  <span>
                    Please arrive at least <strong>15 minutes early</strong> before your scheduled appointment.
                  </span>

                </li>

                <li className="flex gap-3">

                  <ArrowRight
                    size={16}
                    className="mt-1 text-primary shrink-0"
                  />

                  <span>
                    Bring your previous prescriptions, reports and medical records if available.
                  </span>

                </li>

                <li className="flex gap-3">

                  <ArrowRight
                    size={16}
                    className="mt-1 text-primary shrink-0"
                  />

                  <span>
                    Consultation fee will be paid directly at the clinic.
                  </span>

                </li>

              </ul>

            </div>

            {/* Buttons */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Button
                variant="secondary"
                onClick={onClose}
                className="w-full"
              >
                Close
              </Button>

              <Link
                to="/doctors"
                className="w-full"
              >
                <Button className="w-full">
                  Browse Doctors
                </Button>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AppointmentSuccessModal;