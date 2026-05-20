import {
  FaDog,
  FaChildren,
  FaSeedling,
  FaWheatAwn,
  FaSmoking,
  FaCouch,
  FaChair,
  FaSquareParking,
} from "react-icons/fa6"

type FeatureType =
  | "pet"
  | "kids"
  | "vegan"
  | "gluten"
  | "smoking"
  | "outdoor"
  | "indoor"
  | "parking"

const featureMap = {
  pet: {
    icon: FaDog,
    label: "Pet Friendly",
  },
  kids: {
    icon: FaChildren,
    label: "Kid Friendly",
  },
  vegan: {
    icon: FaSeedling,
    label: "Vegan Friendly",
  },
  gluten: {
    icon: FaWheatAwn,
    label: "Gluten Friendly",
  },
  smoking: {
    icon: FaSmoking,
    label: "Smoking Area",
  },
  outdoor: {
    icon: FaCouch,
    label: "Outdoor Dining",
  },
  indoor: {
    icon: FaChair,
    label: "Indoor Dining",
  },
  parking: {
    icon: FaSquareParking,
    label: "Parking Area",
  },
}

interface FeatureIconProps {
  type: FeatureType
}

export default function AmmenitiesIcon({ type }: FeatureIconProps) {
  const { icon: Icon, label } = featureMap[type]

  return (
    <div className="flex flex-col items-center">
      <Icon className="text-5xl text-teal-600" />
      <p className="font-medium text-center">{label}</p>
    </div>
  )
}