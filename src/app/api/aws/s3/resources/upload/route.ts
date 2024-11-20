// import { NextResponse } from "next/server";
// import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function POST(req: Request) {
//   const bucketName = process.env.AWS_S3_BUCKET_NAME!;
//   const command = new ListObjectsCommand({ Bucket: bucketName });
//   const formData = await req.formData();
//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const resourceFile = formData.get("resourceFile") as File;
//   const previewImage = formData.get("previewImage") as File;

//   if (!title || !description || !resourceFile || !previewImage) {
//     return NextResponse.json(
//       { error: "Todos los campos son obligatorios." },
//       { status: 400 }
//     );
//   }

//   try {
//     const resourceKey = `resources/${resourceFile.name}`;
//     const previewKey = `previews/${resourceFile.name.split(".")[0]}.jpg`;

//     // Subir archivo del recurso
//     const uploadResource = new Upload({
//       client: s3,
//       params: {
//         Bucket: process.env.AWS_S3_BUCKET_NAME!,
//         Key: resourceKey,
//         Body: resourceFile.stream(),
//         ContentType: resourceFile.type,
//       },
//     });

//     // Subir imagen de previsualización
//     const uploadPreview = new Upload({
//       client: s3,
//       params: {
//         Bucket: process.env.AWS_S3_BUCKET_NAME!,
//         Key: previewKey,
//         Body: previewImage.stream(),
//         ContentType: previewImage.type,
//       },
//     });

//     await Promise.all([uploadResource.done(), uploadPreview.done()]);

//     return NextResponse.json({ message: "Recurso subido exitosamente." });
//   } catch (error) {
//     console.error("Error al subir recursos:", error);
//     return NextResponse.json(
//       { error: "Error al subir el recurso." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const formData = await req.formData();

  // Obtener datos del formulario
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const cost = formData.get("cost") as string;
  const price = formData.get("price") as string | null;
  const resourceFile = formData.get("resourceFile") as File;
  const previewImage = formData.get("previewImage") as File;

  // Validar campos requeridos
  if (
    !title ||
    !description ||
    !category ||
    !cost ||
    !resourceFile ||
    !previewImage
  ) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  // Validar categoría
  const validCategories = [
    "Plantilla Web",
    "Plantilla Móvil",
    "Componente UI",
    "Diseño Figma",
    "Diseño(Imagen) Photoshop",
    "Audio",
  ];
  // Validación de la categoría
  if (!validCategories.includes(category)) {
    return NextResponse.json(
      {
        error: `La categoría es inválida. Categorías válidas: ${validCategories.join(
          ", "
        )}`,
      },
      { status: 400 }
    );
  }

  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const fileExtension = previewImage.name.split(".").pop()?.toLowerCase();

  // Validación adicional del archivo
  if (!validExtensions.includes(`.${fileExtension}`)) {
    return NextResponse.json(
      { error: "La imagen de previsualización debe ser JPEG, PNG o WEBP." },
      { status: 400 }
    );
  }
  // Verificar el tamaño de la imagen
  const maxSize = 5 * 1024 * 1024; // 5 MB
  if (previewImage.size > maxSize) {
    return NextResponse.json(
      { error: "El tamaño de la imagen no debe exceder los 5 MB." },
      { status: 400 }
    );
  }

  // Validar tamaño del archivo del recurso
  if (resourceFile.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "El archivo del recurso no debe exceder los 10MB." },
      { status: 400 }
    );
  }

  // Validar costo y precio
  if (cost === "Pago" && (!price || !["$5", "$20", "$45"].includes(price))) {
    return NextResponse.json(
      { error: "El precio seleccionado no es válido." },
      { status: 400 }
    );
  }

  try {
    // Crear claves únicas para los archivos
    const resourceKey = `resources/${category}/${resourceFile.name}`;
    const previewKey = `previews/${category}/${
      resourceFile.name.split(".")[0]
    }.webp`;

    // Subir archivo del recurso
    const uploadResource = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: resourceKey,
        Body: resourceFile.stream(),
        ContentType: resourceFile.type,
      },
    });

    // Subir imagen de previsualización
    const uploadPreview = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: previewKey,
        Body: previewImage.stream(),
        ContentType: previewImage.type,
      },
    });

    await Promise.all([uploadResource.done(), uploadPreview.done()]);

    // Devolver respuesta exitosa con detalles del recurso
    return NextResponse.json({
      message: "Recurso subido exitosamente.",
      resource: {
        title,
        description,
        category,
        cost,
        price: cost === "Pago" ? price : "Gratis",
        resourceUrl: `${bucketName}/${resourceKey}`,
        previewUrl: `${bucketName}/${previewKey}`,
      },
    });
  } catch (error) {
    console.error("Error al subir recursos:", error);
    return NextResponse.json(
      { error: "Error al subir el recurso." },
      { status: 500 }
    );
  }
}
