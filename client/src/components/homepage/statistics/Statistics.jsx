
import StatisticCard from "./StatisticCard";

function Statistics(){
    const statistics=[
        {
            id: 1,
            icon: "...",
            count: "500+",
            label: "qualified doctors",
        },
        {
            id: 2,
            icon: "...",
            count: "10k+",
            label: "Happy Patients",
        },
        {
            id: 3,
            icon: "...",
            count: "2k+",
            label: "Lab tests completed",
        }
    ]
    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 ">
                 <h1 className="text-4xl font-bold text-secondary text-center">Health Statistics Counter</h1>
                 <p className=" text-gray-600 text-center mt-4 max-w-2xl mx-auto">Our achievements highlight the trust, quality, and dedication that drive us to provide exceptional healthcare services.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-4">
                    {
                        statistics.map((statistic)=>(
                            <StatisticCard
                            key={statistic.id}
                            icon={statistic.icon}
                            count={statistic.count}
                            label={statistic.label}
                            />
                        ))
                    }
                 </div>

            </div>

        </section>
    )
}
export default Statistics;