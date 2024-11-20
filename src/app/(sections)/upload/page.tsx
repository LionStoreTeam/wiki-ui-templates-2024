"use client"
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const categories = [
    "Plantilla Web",
    "Plantilla Móvil",
    "Componente UI",
    "Diseño Figma",
    "Diseño(Imagen) Photoshop",
    "Audio",
];

const prices = ["$5", "$20", "$45"];

const NewResourceForm: React.FC = () => {
    const [previewImage, setPreviewImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [costType, setCostType] = useState<"Gratis" | "Pago">("Gratis");
    const [price, setPrice] = useState<string | null>(null);
    const [resourceFile, setResourceFile] = useState<File | null>(null);
    const [uploadedResource, setUploadedResource] = useState<any | null>(null);  // Estado para almacenar el recurso subido


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!previewImage || !title || !description || !resourceFile) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const resourceUploadSucces = () => toast.success("Recurso subido exitosamente.");

        const formData = new FormData();
        formData.append("previewImage", previewImage);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("resourceFile", resourceFile);
        formData.append("cost", costType);
        if (costType === "Pago" && price) {
            formData.append("price", price);
        }

        try {
            const response = await fetch("/api/aws/s3/resources/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setUploadedResource(data.resource);  // Actualizamos el estado con los datos del recurso
                resourceUploadSucces();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error("Error al subir el recurso:", error);
            alert("Ocurrió un error al intentar subir el recurso.");
        }
    };

    return (
        <div className="welcome min-h-screen py-12 px-6 flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white opacity-60 p-6 shadow-lg rounded-lg transform transition-all ease-linear border-4 border-pink-400 hover:opacity-100 duration-300"
            >
                <h2 className="text-2xl font-semibold mb-4">Subir Nuevo Recurso</h2>
                {/* Imagen de Previsualización */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Preview Image</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png, image/webp"
                        onChange={(e) => setPreviewImage(e.target.files?.[0] || null)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Título */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    ></textarea>
                </div>

                {/* Categoría */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Costo */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Costo</label>
                    <div className="flex items-center gap-4">
                        <label>
                            <input
                                type="radio"
                                value="Gratis"
                                checked={costType === "Gratis"}
                                onChange={() => setCostType("Gratis")}
                                className="mr-2"
                            />
                            Gratis
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Pago"
                                checked={costType === "Pago"}
                                onChange={() => setCostType("Pago")}
                                className="mr-2"
                            />
                            Pago
                        </label>
                    </div>
                </div>

                {/* Precio (solo si el costo es "Pago") */}
                {costType === "Pago" && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Precio</label>
                        <select
                            value={price || ""}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Seleccione un precio</option>
                            {prices.map((priceOption) => (
                                <option key={priceOption} value={priceOption}>
                                    {priceOption}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Archivo del recurso */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Archivo del recurso</label>
                    <input
                        type="file"
                        onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600"
                >
                    Subir Recurso
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default NewResourceForm;
