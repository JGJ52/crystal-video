import {NextResponse} from "next/server";
import youtubeDl from "youtube-dl-exec";

export async function POST(request) {
    const { url } = await request.json();

    if (!url) {
        return NextResponse.json({ error: "No URL" });
    }

    try {
        const info = await youtubeDl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
        });

        return NextResponse.json(info);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}