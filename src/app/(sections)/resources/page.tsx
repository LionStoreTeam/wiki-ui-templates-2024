"use client";

import { useState, useEffect } from "react";



type Resource = {
    title: string;
    description: string;
    category: string;
    cost: string;
    price?: string;
    resourceUrl: string;
    previewUrl: string;
};

export default function ResourceGallery() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [searchQuery, setSearchQuery] = useState("");

    // Categorías disponibles
    const categories = [
        "Todas",
        "Plantilla Web",
        "Plantilla Móvil",
        "Componente UI",
        "Diseño Figma",
        "Diseño(Imagen) Photoshop",
        "Audio",
    ];

    // Cargar recursos al montar el componente
    useEffect(() => {
        async function fetchResources() {
            try {
                const response = await fetch("/api/aws/s3/resources/list");
                const data = await response.json();
                setResources(data.resources);
                setFilteredResources(data.resources); // Inicializar la lista filtrada
            } catch (error) {
                console.error("Error al cargar los recursos:", error);
            }
        }
        fetchResources();
    }, []);



    // Filtrar recursos cuando cambien la categoría o el término de búsqueda
    useEffect(() => {
        const filtered = resources.filter((resource) => {
            const matchesCategory =
                selectedCategory === "Todas" ||
                resource.category.toLowerCase() === selectedCategory.toLowerCase();

            const matchesSearch =
                searchQuery === "" ||
                resource.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });

        setFilteredResources(filtered);
    }, [resources, selectedCategory, searchQuery]);

    return (
        <div className="welcome min-h-screen py-12 px-6 flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-bold text-pink-50">Galería de Recursos</h1>

            {/* Barra de búsqueda y filtro */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Buscador */}
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />

                {/* Selector de categoría */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar recursos filtrados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <div
                            key={resource.resourceUrl}
                            className="border-2 border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-slate-700 transition-all transform ease-in hover:scale-105 duration-300 opacity-70 hover:opacity-100"
                        >
                            {/* Imagen de previsualización */}
                            <img
                                src={resource.previewUrl}
                                alt={resource.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                {/* Título y descripción */}
                                <h2 className="font-bold text-lg text-pink-500">{resource.title}</h2>
                                <p className="text-sm text-pink-50">{resource.description}</p>

                                {/* Etiquetas */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="text-xs bg-white text-black px-2 py-1 rounded">
                                        {resource.category}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${resource.cost === "Gratis"
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 text-white"
                                            }`}
                                    >
                                        {resource.cost === "Gratis" ? "Gratis" : resource.price}
                                    </span>
                                </div>

                                {/* Botones */}
                                <div className="mt-4 flex justify-between">
                                    <a
                                        href={resource.resourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-200 bg-opacity-20 hover:bg-blue-950 text-white px-4 py-2 rounded"
                                    >
                                        Descargar
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="">
                        <p className="text-center text-sm text-pink-50">No hay recursos disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
