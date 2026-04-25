import {NextResponse} from "next/server";
import { create } from 'youtube-dl-exec';
import {query} from "@/instrumentation";
const youtubeDl = create('/usr/bin/yt-dlp');

export async function POST(request) {
    const { url } = await request.json();

    if (!url) {
        return NextResponse.json({ error: "No URL" }, { status: 400 });
    }

    try {
        const info = await youtubeDl(url, {
            f: "bestvideo[ext=webm]+bestaudio[ext=webm]/best",
            dumpSingleJson: true,
            preferFreeFormats: true,
            noPlaylist: true,
            jsRuntimes: "node",
        });

        await youtubeDl(url, {
            f: "bestvideo[ext=webm]+bestaudio[ext=webm]/best",
            o: `videos/${info.id}.%(ext)s`,
            writeThumbnail: true,
            convertThumbnails: "jpg",
            noPlaylist: true,
            mergeOutputFormat: "webm",
            ffmpegLocation: "/usr/bin/ffmpeg",
            jsRuntimes: "node",
        });

        await youtubeDl(info.uploader_url, {
            o: `videos/${info.channel_id}.jpg`,
            playlistItems: 0,
            writeThumbnail: true,
            convertThumbnails: "jpg",
            noPlaylist: true,
            ffmpegLocation: "/usr/bin/ffmpeg",
            jsRuntimes: "node",
        });

        await query(`
                INSERT INTO uploaders (id, name)
                VALUES (
                    $1,
                    $2
               )
                ON CONFLICT (id)
                DO UPDATE SET 
                              name = excluded.name;
        `, [info.channel_id, info.uploader])

        await query(`
                INSERT INTO videos (id, uploader, title, description, duration, categories, tags, ext, timestamp) 
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8,
                    $9
               )
                ON CONFLICT (id)
                DO UPDATE SET
                              uploader = EXCLUDED.uploader,
                              title = EXCLUDED.title,
                              description = EXCLUDED.description,
                              duration = EXCLUDED.duration,
                              categories = EXCLUDED.categories,
                              tags = EXCLUDED.tags,
                              ext = EXCLUDED.ext,
                              timestamp = EXCLUDED.timestamp;
            `, [info.id, info.channel_id, info.title, info.description, info.duration, JSON.stringify(info.categories), JSON.stringify(info.tags), info.ext, info.timestamp * 1000]);

        return NextResponse.json(info);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}