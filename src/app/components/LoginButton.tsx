// components/LoginButton.tsx
"use client"
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiTwotoneMail } from "react-icons/ai";


export default function LoginButton() {
    return (
        <div className="flex gap-2">
            <button onClick={async () => {
                await signIn("google", {
                    callbackUrl: "/",
                    redirect: false
                });
            }} className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 bg-opacity-40 hover:bg-pink-100 transition-all ease-in duration-200 cursor-pointer">
                <Image src="/GoogleButton.png" alt="google_icon_buton_login" width={25} height={25} />
            </button>
            <button onClick={async () => {
                await signIn("github", {
                    callbackUrl: "/",
                    redirect: false,
                });
            }} className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 bg-opacity-40 hover:bg-pink-100 transition-all ease-in duration-200 cursor-pointer">
                <Image src="/GitHubButton.png" alt="github_icon_buton_login" width={25} height={25} />

            </button>
            <Link href="/auth/login" className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 bg-opacity-40 hover:bg-pink-100 transition-all ease-in duration-200 cursor-pointer">
                <AiTwotoneMail
                    className='w-[27px] h-[27px]'
                />
            </Link>
        </div>
    );
}
