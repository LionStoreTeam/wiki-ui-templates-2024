"use client"

import LogOut from "@/app/components/SignOutButton";
import UserImageProfile from "@/app/components/UserImageProfile";
import { geologica } from "@/app/fonts/fonts";
import { useSession } from "next-auth/react";
import { TypeAnimation } from "react-type-animation";

function DashboardPage() {
    const { data: session, status, update } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <section className="welcome min-h-screen flex flex-col items-center">
            <h1 className="pb-10 text-slate-200 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-semibold">
                <p className="text-pink-100 border-b-2 border-pink-500">
                    <span className={geologica.className}>
                        <TypeAnimation
                            sequence={[
                                "Bienvenido a",
                                2000,
                                "Wiki UI",
                                2000,


                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                </p>
            </h1>
            <div className="w-[300px] md:w-[600px] xl:w-[750px] bg-white bg-opacity-20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-8">
                <UserImageProfile />
                <h1 className="">
                    <span className="text-[20px] text-pink-50 font-bold">Name:</span> <br />{" "}
                    <p className="text-[30px] text-pink-500 font-bold">
                        {session?.user?.name}
                    </p>
                </h1>
                {/* <h1 className="">
                    <span className="text-[20px] text-pink-50 font-bold">Email:</span> <br />{" "}
                    <p className="text-[30px] text-pink-500 font-bold">
                        {session?.user?.email}
                    </p>
                </h1> */}
                <div className="">
                    <LogOut />
                </div>
            </div>
        </section>
    );
}

export default DashboardPage;
