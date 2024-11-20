"use client"

import { geologica } from "@/app/fonts/fonts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const Welcome = () => {
    const { data: session, status, update } = useSession();
    return (
        <div className="welcome min-h-screen w-full px-10 pt-10 flex flex-col text-center justify-center items-center">
            <h1 className="text-slate-200 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-semibold">
                <p className="text-pink-100 border-b-2 border-pink-500">
                    <span className={geologica.className}>
                        <TypeAnimation
                            sequence={[
                                "Wiki UI",
                                2000,
                                "Plantillas UI para tod@s",
                                2000,


                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                </p>
            </h1>
            <div className="mt-5 p-2 w-[300px] text-slate-50 text-[16px] font-medium sm:w-[500px] md:w-[650px] sm:text-[20px] md:text-[25px]">
                <p>
                    Comunicar tus ideas no siempre es sencillo, gustos, estilos, imaginación, todo esto sin mucho tiempo.
                </p>
                <p>Ahora con
                    <span className="font-bold text-[#ED1E79]">
                        {" "}Wiki UI{" "}
                    </span>
                    encuentra diseños y recursos increíbles para tus proyectos, desarrollo web, móvil, figma, imágenes, tracks y mucho más.
                </p>
            </div>
            {
                session && (<Link href="/home" className="mt-5 py-3 px-2 font-semibold text-slate-100 bg-pink-400 rounded-md hover:bg-pink-500 transition-all ease-in duration-200 cursor-pointer">
                    Empezar a utilizar Wiki UI
                </Link>
                )}
            {!session && (
                <Link href="/auth/login" className="mt-5 py-3 px-2 font-semibold text-slate-100 bg-pink-400 rounded-md hover:bg-pink-500 transition-all ease-in duration-200 cursor-pointer">
                    Inicia sesión para comenzar
                </Link>
            )}

            <div className="w-full mt-10 mb-10 flex justify-center items-center">
                <video muted preload="metadata" loop playsInline autoPlay poster="https://www.visily.ai/wp-content/uploads/2024/01/Thumbnail-homepage-2-min-scaled.jpg"
                    className="rounded-xl"
                >
                    <source src="https://www.visily.ai/wp-content/uploads/2024/01/Home-Hero-Video.webm" type="video/webm" />
                    <source src="https://www.visily.ai/wp-content/uploads/2024/01/Home-Hero-Video.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export default Welcome;