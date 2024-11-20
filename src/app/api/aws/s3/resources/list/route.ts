import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const resourcesPrefix = "resources/";
  const previewsPrefix = "previews/";

  try {
    // Obtener los objetos del bucket
    const resourcesCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: resourcesPrefix,
    });
    const resourcesData = await s3.send(resourcesCommand);

    const previewsCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: previewsPrefix,
    });
    const previewsData = await s3.send(previewsCommand);

    // Procesar los objetos para construir la respuesta
    const resources = (resourcesData.Contents || []).map((resource) => {
      const fileName =
        resource.Key?.replace(resourcesPrefix, "").split(".")[0] ||
        "Sin título";
      const title =
        resource.Key?.replace(resourcesPrefix, "")
          .split("/")
          .pop()
          ?.split(".")[0] || "Sin título";
      const description =
        resource.Key?.replace(resourcesPrefix, "")
          .split("/")
          .pop()
          ?.split(".")[0] || "Sin descripción";
      const previewKey = `${previewsPrefix}${fileName}.webp`;
      const preview = previewsData.Contents?.find((p) => p.Key === previewKey);

      // Establecer los metadatos (simulación por el momento)
      const category = fileName.split("/")[0]; // La categoría es la subcarpeta dentro de resources
      const cost = category === "Audio" ? "Gratis" : "Pago"; // Asignar "Gratis" o "Pago" basado en la categoría, puedes modificarlo
      const price = cost === "Pago" ? "$5" : null; // Precio fijo para los recursos pagos

      return {
        title,
        description: `${description}`, // En el futuro, puedes extraer metadatos personalizados de otro lugar.
        category, // Puedes almacenar categorías en un sistema de metadatos si es necesario.
        // cost: "Gratis", // Similar al campo de categoría, este debería obtenerse de otro lugar.
        price: "Pro",
        resourceUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${resource.Key}`,
        previewUrl: preview
          ? `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${preview.Key}`
          : null,
      };
    });

    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Error al listar los recursos:", error);
    return NextResponse.json(
      { error: "Error al listar los recursos." },
      { status: 500 }
    );
  }
}
