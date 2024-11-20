import { NextResponse } from "next/server";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const bucketName = process.env.AWS_S3_BUCKET_NAME!;
    const command = new ListObjectsCommand({ Bucket: bucketName });

    const response = await s3.send(command);

    const resources =
      response.Contents?.map((item) => ({
        key: item.Key!,
        title: item.Key?.split(".")[0], // Ejemplo: usar el nombre del archivo como título
        description: "Descripción predeterminada para el recurso.",
        category: "Plantilla ", // Asignar manualmente o basar en una convención de nombres
        previewUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
      })) || [];

    return NextResponse.json({ resources });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
