import { Phone, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

function EmergencyCard({ service }) {
  const Icon = service.icon;

  const colorClasses = {
    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
      border: "border-red-100",
      button: "bg-red-600 hover:bg-red-700",
    },
    rose: {
      bg: "bg-rose-50",
      icon: "text-rose-600",
      border: "border-rose-100",
      button: "bg-rose-600 hover:bg-rose-700",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-100",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    indigo: {
      bg: "bg-indigo-50",
      icon: "text-indigo-600",
      border: "border-indigo-100",
      button: "bg-indigo-600 hover:bg-indigo-700",
    },
  };

  const colors = colorClasses[service.color];

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border
        ${colors.border}
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
        flex
        flex-col
      `}
    >
      {/* Top */}

      <div className="p-6">

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            ${colors.bg}
            flex
            items-center
            justify-center
            mb-6
          `}
        >
          <Icon
            size={34}
            className={colors.icon}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900">
          {service.title}
        </h3>

        <p className="text-gray-600 mt-3 leading-7">
          {service.description}
        </p>

      </div>

      {/* Bottom */}

      <div className="mt-auto border-t border-gray-100 p-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-500">
              Emergency Contact
            </p>

            <h4 className="text-xl font-bold text-gray-900">
              {service.phone}
            </h4>

          </div>

          <div
            className={`
              w-12
              h-12
              rounded-full
              ${colors.bg}
              flex
              items-center
              justify-center
            `}
          >
            <Phone
              size={20}
              className={colors.icon}
            />
          </div>

        </div>

        <a
          href={`tel:${service.phone}`}
          className="block"
        >
          <Button>

            <Phone size={18} />

            Call Now

            <ArrowRight size={18} />

          </Button>
        </a>

      </div>

    </div>
  );
}

export default EmergencyCard;