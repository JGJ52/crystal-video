import {createReadStream, statSync} from "fs";
import {NextResponse} from "next/server";
import {query} from "@/instrumentation";

export async function GET(request, { params }) {
    const id = (await params).video[0];

    const { rows } = await query(
        "SELECT * FROM videos WHERE id = $1",
        [id]
    );

    const vid = rows[0];
    if (!vid) {
        return new NextResponse("Not found", { status: 404 });
    }

    const path = `videos/${vid.id}.${vid.ext}`;
    const stat = statSync(path);
    const fileSize = stat.size;

    const range = request.headers.get("range");

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;

        const stream = createReadStream(path, { start, end });

        return new NextResponse(stream, {
            status: 206,
            headers: {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize.toString(),
                "Content-Type": `video/${vid.ext}`,
            },
        });
    }

    const stream = createReadStream(path);

    return new NextResponse(stream, {
        headers: {
            "Content-Length": fileSize.toString(),
            "Content-Type": `video/${vid.ext}`,
        },
    });
}