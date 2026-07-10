import {Button} from '../ui/Button';
function Hero(){
    return(
        <section className='bg-gradient-to-r from-primary/10 via-white to-secondary/10 min-h-[90vh] flex items-center'>
            <div className='max-w-5xl mx-auto px-6 text-center animate-fade-in'>
                <span className="inline-flex  items-center rounded-full  bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Your Health Our Priority.
            </span>
                <h1 className='mt-2 text-4xl md:text-6xl font-bold leading-tight text-secondary'>
                    AI-Powered Healthcare
                </h1>
               
                <p className=' mt-4 mx-auto max-w-3xl text-lg text-gray-700 leading-8'>
                    Experience smarter healthcare with our AI-powered platform. Easily book appointments, order medicines, schedule lab tests, access emergency care, explore trusted health resources, and receive dedicated support—all in one place.
                </p>
               <div className='flex flex-col sm:flex-row  gap-4 justify-center mt-8'>
                <Button variant='secondary'>Book Appointments</Button>
                <Button >Learn More</Button>
               </div>
                
            </div>
        </section>
    )
}
export default Hero;