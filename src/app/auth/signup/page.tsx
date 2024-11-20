"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return unmatchedPassword();
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            loginNow();
            userCreated();
            router.push("/auth/login");
        }
    });

    const userCreated = () => toast.success("¡Cuenta creada!");
    const loginNow = () => toast.success("¡Ya puedes Iniciar Sesión!");

    const unmatchedPassword = () => toast.error("Las contraseñas no coinciden", {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });
    console.log(errors);
    return (
        <div className="">
            {/* Sección del Formulario */}
            <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12  bg-slate-100">
                <div className="flex justify-center items-center text-center my-5">
                    <Link href="/">
                        <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-gray-900 rounded-3xl group bg-gradient-to-br from-red-500 to-red-500 group-hover:from-red-500 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 text-[15px] sm:text-[35px] md:text-[40px]">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#333] rounded-3xl group-hover:bg-opacity-0">
                                Volver a la pantalla de Inicio
                            </span>
                        </div>
                    </Link>
                </div>
                {/*  */}
                <div className="flex h-screen items-center justify-center p-10">
                    <div className="xl:w-1/2  rounded-2xl border border-red-500 md:shadow-xl">
                        <div className="grid md:grid-cols-2 p-5">
                            <div className="">
                                <img
                                    src="https://cdni.iconscout.com/illustration/premium/thumb/login-10299071-8333958.png?f=webp"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <form onSubmit={onSubmit}>
                                    <h1 className="text-center font-extrabold uppercase text-rose-500">
                                        Registro
                                    </h1>
                                    <br />
                                    <input
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "El nombre de usuario es requerido",
                                            },
                                        })}
                                        autoComplete="off"
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                                        placeholder="Nombre completo"
                                    />
                                    {errors.name && (
                                        <span className="text-red-500">
                                            {errors.name.message?.toString()}
                                        </span>
                                    )}
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
                                        className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                                        placeholder="correo@gmail.com"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500">
                                            {errors.email.message?.toString()}
                                        </span>
                                    )}
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
                                        type="password"
                                        className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                                        placeholder="Contraseña"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">
                                            {errors.password.message?.toString()}
                                        </span>
                                    )}
                                    <input
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message:
                                                    "La confirmación de la contraseña es requerida",
                                            },
                                        })}
                                        autoComplete="off"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                                        placeholder="Confirmar Contraseña"
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-red-500">
                                            {errors.confirmPassword.message?.toString()}
                                        </span>
                                    )}
                                    <button
                                        type="submit"
                                        className="mb-3 w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white"
                                    >
                                        Registrar
                                    </button>
                                </form>
                                <Link href="/auth/login">
                                    <div className="py-2 px-4 bg-slate-300 text-pink-500 font-bold rounded-xl">
                                        Iniciar Sesión
                                    </div>
                                </Link>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Nextjs NextAuth Prisma Login y Registro
// https://www.youtube.com/watch?v=iZDK42F2cTc    25:57

// Next.js - How to setup & use Vercel Postgres (Serverless PostgreSQL database)
// https://www.youtube.com/watch?v=_ad99LhxBeQ
