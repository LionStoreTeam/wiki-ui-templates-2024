"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { caveat, lexend, manrope } from "@/app/fonts/fonts";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Importar los iconos de react-icons
import { motion } from "framer-motion";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);  // Estado para la visibilidad de la contraseña


    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (res?.error) {
            return setError(res.error as string);
        } else {
            router.push("/");
            router.refresh();
        }
    });
    return (
        <div className="login p-10 min-h-screen flex flex-col md:flex-row justify-center items-center">
            {/* Sección del Formulario Inicio de Sesión*/}
            <div className="flex flex-col justify-center items-center text-center">
                <div className="relative">
                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        viewBox="0 0 300 300"
                        className="w-[220px] h-[220px] md:w-[500px] md:h-[500px]"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0"
                            />
                        </defs>
                        <text fill="rgb(219, 39, 119)">
                            <textPath
                                xlinkHref="#circlePath"
                                className="text-lg"
                            >
                                ¡Explora Nuevos Estilos! - Inicia Sesión Ahora
                            </textPath>
                        </text>
                    </motion.svg>
                    <Link
                        href="/Contacto"
                        className="w-14 h-14 md:w-36 md:h-36 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-500 text-white font-bold hover:bg-pink-700 duration-300 rounded-full flex items-center justify-center "
                    >
                        <p className="text-[10px] sm:text-[25px] md:text-[25px]">
                            Wiki UI
                        </p>
                    </Link>
                </div>
            </div>
            <div className="py-7 px-5 w-[300px] md:w-[600px] xl:w-[750px] bg-white rounded-xl">
                <div className="flex items-center pb-5 select-none">
                    <Image src="/base_logo/wiki_ui_logo_bg_transparent.png" alt="wiki_ui_logo" width={70} height={70} />
                    <span className={caveat.className}>
                        <p className="text-[35px] font-bold text-slate-700">
                            Inicia Sesión
                        </p>
                    </span>
                </div>
                <h1 className="text-[20px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Bienvenido a Wiki UI!  {"  "} 👋🏻
                    </span>
                </h1>
                <h1 className="text-[12px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Por favor inicia sesión en tu cuenta para empezar la aventura
                    </span>
                </h1>
                {/* Login with Google or GitHub */}
                <div className="pt-10 pb-7 flex gap-12 justify-center">
                    <button onClick={async () => {
                        await signIn("google", {
                            callbackUrl: "/",
                            redirect: false
                        });
                    }} className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 hover:bg-pink-200 transition-all ease-in duration-200 cursor-pointer">
                        <Image src="/GoogleButton.png" alt="google_icon_buton_login" width={50} height={50} />
                    </button>
                    <button onClick={async () => {
                        await signIn("github", {
                            callbackUrl: "/",
                            redirect: false,
                        });
                    }} className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 hover:bg-pink-200 transition-all ease-in duration-200 cursor-pointer">
                        <Image src="/GitHubButton.png" alt="github_icon_buton_login" width={50} height={50} />

                    </button>
                </div>
                <div className="pb-6 flex justify-center items-center text-center gap-3 text-slate-400 select-none">
                    <p>________</p>
                    <p className="pt-3">O</p>
                    <p>________</p>
                </div>
                <div className=""></div>
                <form onSubmit={onSubmit}>
                    {error && (
                        <p className="bg-red-500 text-sm font-bold text-slate-100 p-3  mt-3 rounded-xl">
                            {error}
                        </p>
                    )}
                    <br />
                    {errors.email && (
                        <span className="text-red-500">
                            {errors.email.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Correo
                        </span>
                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El correo es requerido",
                            },
                        })}
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="mt-2 mb-3 w-full rounded-lg bg-zinc-100 outline-rose-400 px-5 py-3"
                        placeholder="some@gmail.com"
                    />
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 pt-5 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Contraseña
                        </span>
                    </label>
                    <div className="relative mt-2 mb-10">
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                            })}
                            autoComplete="off"
                            id="password"
                            name="password"
                            type={passwordVisible ? "text" : "password"}  // Cambiar el tipo de input según el estado
                            className="w-full rounded-lg bg-zinc-100 outline-rose-400 px-5 py-3 pr-12"  // Agregar padding extra para el icono
                            placeholder="••••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}  // Alternar visibilidad de la contraseña
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}  {/* Mostrar el icono adecuado */}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mb-3 w-full rounded-lg bg-rose-500 px-5 py-3 font-semibold text-white"
                    >
                        Ingresar
                    </button>
                </form>
                <span className={manrope.className}>
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                        <p className="text-[13px] text-slate-600 font-semibold">
                            ¿Nuevo en nuestra plataforma?
                        </p>
                        <Link href="/auth/signup">
                            <p className="text-[14px] text-pink-600 font-semibold">
                                Crear una cuenta
                            </p>
                        </Link>
                    </div>
                </span>

            </div>
            <Toaster />
        </div>
    );
}


