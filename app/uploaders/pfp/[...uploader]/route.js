import {NextResponse} from "next/server";
import {readFile} from "fs/promises";

export async function GET(request, { params }) {
    const { uploader } = await params;

    const buffer = await readFile(`videos/${uploader}.jpg`);

    return new NextResponse(buffer);
}