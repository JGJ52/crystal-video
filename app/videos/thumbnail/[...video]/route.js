import {NextResponse} from "next/server";
import {readFile} from "fs/promises";

export async function GET(request, { params }) {
   const { video } = await params;

   const buffer = await readFile(`videos/${video}.jpg`);

   return new NextResponse(buffer);
}