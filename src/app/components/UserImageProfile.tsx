import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
Image

const UserImageProfile = () => {
    const { data: session, status, update } = useSession();
    // Función para generar la imagen de perfil con las iniciales
    const getInitialsImage = (name: string) => {
        if (!name) return null;
        const initials = name
            .split(' ')
            .slice(0, 2) // Obtener las dos primeras palabras (si existen)
            .map(word => word.charAt(0).toUpperCase()) // Obtener la primera letra de cada palabra
            .join(''); // Unir las letras

        return (
            <div
                className="w-16 h-16 flex items-center justify-center bg-pink-500 bg-opacity-50 text-white rounded-full text-lg"
                style={{ fontSize: '1.5rem' }}
            >
                <Link href="/profile">
                    {initials}
                </Link>
            </div>
        );
    };
    return (
        <>
            {/* Imagen de perfil */}
            <div className="mb-6">
                {session?.user?.image ? (
                    <Link href="/profile">
                        <Image
                            src={session.user.image}
                            alt="User profile"
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </Link>
                ) : (
                    getInitialsImage(session?.user?.name || "")
                )}
            </div>
        </>
    );
}

export default UserImageProfile;