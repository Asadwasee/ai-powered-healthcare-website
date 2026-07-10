import {
  Ambulance,
  Droplets,
  Building2,
  ShieldAlert,
} from "lucide-react";

const emergencyServices = [
  {
    id: 1,
    title: "Ambulance",
    description:
      "Request emergency ambulance assistance available 24 hours a day.",
    phone: "1122",
    color: "red",
    icon: Ambulance,
  },

  {
    id: 2,
    title: "Blood Bank",
    description:
      "Find nearby blood banks and emergency blood donation centers.",
    phone: "0800-44444",
    color: "rose",
    icon: Droplets,
  },

  {
    id: 3,
    title: "Hospitals",
    description:
      "Locate nearby hospitals and emergency medical facilities.",
    phone: "051-111-123-456",
    color: "blue",
    icon: Building2,
  },

  {
    id: 4,
    title: "Police",
    description:
      "Contact emergency police services for immediate assistance.",
    phone: "15",
    color: "indigo",
    icon: ShieldAlert,
  },
];

export default emergencyServices;