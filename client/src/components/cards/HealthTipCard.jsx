function HealthTipCard({ tip }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      p-6
      h-full
      "
    >
      <div
        className="
        w-16
        h-16
        rounded-2xl
        bg-primary/10
        flex
        items-center
        justify-center
        text-3xl
        mb-5
        "
      >
        {tip.icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900">
        {tip.title}
      </h3>

      <p className="mt-3 text-gray-600 leading-7">
        {tip.description}
      </p>
    </div>
  );
}

export default HealthTipCard;