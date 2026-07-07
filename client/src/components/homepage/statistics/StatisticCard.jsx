function StatisticCard({icon, count, label}){
    return(
        <div className="bg-white text-center rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 gap-4">
            
            <div className=" flex items-center justify-center w-14 h-14 rounded-full  p-2 text-primary bg-primary/10 mx-auto ">{icon}</div>
            <h3 className=" text-4xl text-secondary font-bold ">{count}</h3>
            <h1 className="text-lg font-bold text-gray-900 mt-4">{label}</h1>

        </div>
    )
}
export default StatisticCard;