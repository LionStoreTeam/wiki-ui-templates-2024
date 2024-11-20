"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";



export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [error, setError] = useState("");
    const [showsucces, setShowsuccess] = useState(false);

    const searchParams = useSearchParams();
    const signUpSuccessParam = searchParams.get("register");

    useEffect(() => {
        if (signUpSuccessParam === "true") {
            setShowsuccess(true);
        }
    }, [signUpSuccessParam]);


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
        <div className="">
            {/* Sección del Formulario Inicio de Sesión*/}
            <div className="min-h-screen flex flex-col justify-center sm:py-12 bg-slate-100">
                <div className="flex justify-center items-center text-center my-5">
                    <Link href="/">
                        <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-gray-900 rounded-3xl group bg-gradient-to-br from-red-500 to-red-500 group-hover:from-red-500 group-red:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 text-[15px] sm:text-[35px] md:text-[40px]">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#333] rounded-3xl group-hover:bg-opacity-0">
                                Volver a la pantalla de Inicio
                            </span>
                        </div>
                    </Link>
                </div>
                {/*  */}
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 ">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="shadow-inner py-5">
                                {showsucces && (
                                    <div
                                        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-4"
                                        role="alert"
                                    >
                                        <div className="text-center">
                                            <div>
                                                <p className="font-bold">Succesfully Sign up</p>
                                                <p className="text-sm">Please login</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <h1 className="font-bold">Login with Github</h1>
                                <button
                                    className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl  px-4 py-3 text-sm font-semiboldshadow-sm transition-all duration-150 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    onClick={async () => {
                                        const result = await signIn("github", {
                                            callbackUrl: "/",
                                            redirect: false,
                                        });
                                        console.log(result);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={50}
                                        height={50}
                                        fill="currentColor"
                                        viewBox="0 0 1792 1792"
                                    >
                                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                                    </svg>
                                </button>

                                <h1 className="pt-7 font-bold">Login with Google</h1>
                                <button
                                    className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl  px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    onClick={async () => {
                                        const result = await signIn("google", {
                                            callbackUrl: "/",
                                            redirect: false,
                                        });
                                        console.log(result);
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height={50}
                                        width={50}
                                    >
                                        <g clipPath="url(#clip0_13183_10121)">
                                            <path
                                                d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                                                fill="#3F83F8"
                                            ></path>
                                            <path
                                                d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                                                fill="#34A853"
                                            ></path>
                                            <path
                                                d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                                                fill="#FBBC04"
                                            ></path>
                                            <path
                                                d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                                                fill="#EA4335"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_13183_10121">
                                                <rect
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                    transform="translate(0.5)"
                                                ></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </Suspense>

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
                                    {error && (
                                        <p className="bg-red-500 text-sm font-bold text-slate-100 p-3  mt-3 rounded-xl">
                                            {error}
                                        </p>
                                    )}
                                    <h1 className="text-center font-extrabold uppercase text-rose-500">
                                        Inicio de Sesión
                                    </h1>
                                    <br />
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
                                        placeholder="••••••••••"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">
                                            {errors.password.message?.toString()}
                                        </span>
                                    )}
                                    <button
                                        type="submit"
                                        className="mb-3 w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white"
                                    >
                                        Ingresar
                                    </button>
                                </form>
                                <Link href="/auth/signup">
                                    <div className="py-2 px-4 bg-slate-300 text-pink-500 font-bold rounded-xl">
                                        Crear una cuenta
                                    </div>
                                </Link>
                            </div>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


