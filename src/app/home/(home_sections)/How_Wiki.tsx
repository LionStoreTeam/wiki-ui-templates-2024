import { lexend } from "@/app/fonts/fonts";
import Image from "next/image";

const HowWikiUI = () => {
    return (
        <div className="welcome min-h-screen w-full pt-10 pb-10">
            <h1 className="pb-16 text-[20px] text-pink-50 md:text-[40px] font-medium">
                <p className={lexend.className}>
                    ¿Porque Wiki UI <br />
                    es la mejor opción?
                </p>
            </h1>
            <div className="p-2 flex gap-2 justify-center items-center text-center md:gap-20">
                {/* Image */}
                <div className="">
                    <Image src="https://www.visily.ai/wp-content/uploads/2024/01/No-learning-curve-min-2.png" alt="" width={500} height={500} />
                </div>
                {/* Text */}
                <div className="md:w-[400px] text-slate-100">
                    <h2 className="flex text-start text-[65px] font-bold text-pink-400">
                        <p className={lexend.className}>
                            #1
                        </p>
                    </h2>
                    <p className="flex pb-2 text-[20px] text-start font-semibold md:text-[30px]">
                        Plantillas Móviles y Web Modernas
                    </p>
                    <p className="flex text-start font-normal">
                        Wiki UI es un proyecto de código abierto que utiliza <br />
                        Next.js y Tailwind CSS para crear un sitio web <br />
                        colaborativo y fácil de entender.
                    </p>
                </div>
            </div>
            <div className="mt-16 p-2 flex gap-2 justify-center items-center text-center md:gap-20">
                {/* Text */}
                <div className="md:w-[400px] text-slate-100">
                    <h2 className="flex text-start text-[65px] font-bold text-pink-400">
                        <p className={lexend.className}>
                            #2
                        </p>
                    </h2>
                    <p className="flex pb-2 text-[20px] text-start font-semibold md:text-[30px]">
                        Ecommerce, Blog, Portafolio, Web Sites, Landing Pages y mucho más
                    </p>
                    <p className="flex text-start font-normal">
                        Wiki UI es un proyecto de código abierto que utiliza <br />
                        Next.js y Tailwind CSS para crear un sitio web <br />
                        colaborativo y fácil de entender.
                    </p>
                </div>
                {/* Image */}
                <div className="flex">
                    <Image src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={500} height={500}
                        className="rounded-3xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default HowWikiUI;