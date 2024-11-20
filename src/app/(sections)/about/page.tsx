import React from "react";

export default function AboutUs() {
    return (
        <div className="welcome min-h-screen ">
            <header className="px-6 py-8 bg-pink-600 opacity-60 text-white transform transition-all ease-in hover:opacity-90 duration-300">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
                    <p className="mt-2 text-lg">
                        Descubre más sobre el equipo detrás de Wiki UI Templates.
                    </p>
                </div>
            </header>
            <main className="px-6  py-12 max-w-6xl mx-auto flex flex-col justify-center items-center text-center">
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-pink-400">Nuestra Misión</h2>
                    <p className="mt-4 text-slate-200 text-lg leading-relaxed">
                        En <b>Wiki UI Templates</b>, nuestra misión es simplificar el proceso
                        de desarrollo web y móvil, ofreciendo plantillas y recursos de alta
                        calidad. Creemos que todos, desde desarrolladores principiantes
                        hasta expertos, merecen acceso a herramientas que potencien su
                        creatividad y productividad.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-pink-400">Nuestra Historia</h2>
                    <p className="mt-4 text-slate-200 text-lg leading-relaxed">
                        Fundada en 2024, <b>Wiki UI Templates</b> nació como una respuesta a la
                        necesidad de recursos accesibles para diseñadores y desarrolladores.
                        Con un enfoque en calidad, accesibilidad y comunidad, hemos crecido
                        para convertirnos en una plataforma confiable para profesionales de
                        todo el mundo.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-pink-400">Nuestro Equipo</h2>
                    <p className="mt-4 text-slate-200 text-lg leading-relaxed">
                        Somos un grupo de desarrolladores, diseñadores y entusiastas
                        tecnológicos apasionados por crear soluciones útiles. Con experiencia
                        en tecnologías como <b>Next.js, TypeScript, Prisma, y AWS</b>, trabajamos
                        juntos para ofrecer una plataforma de primera clase.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-pink-400">¿Por Qué Elegirnos?</h2>
                    <ul className="mt-4 text-slate-200 text-lg flex text-start">
                        • Amplia variedad de plantillas web y móviles.
                        <br />
                        • Fácil descarga y acceso a recursos.
                        <br />
                        • Enfoque en la calidad y la innovación.
                        <br />
                        • Soporte continuo para nuestra comunidad.
                        <br />
                    </ul>
                </section>
            </main>

        </div>
    );
}
