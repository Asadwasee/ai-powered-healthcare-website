import { Mail, Phone, MapPin } from "lucide-react";

function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Contact Information
      </h2>

      <div className="space-y-6">

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            <Mail size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">health@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            <Phone size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            <MapPin size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-gray-600">
              Karachi, Pakistan
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactInfo;