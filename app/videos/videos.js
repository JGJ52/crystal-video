"use client"
import "./videos.css";
import { useEffect, useState } from "react";
import Video from "@/app/videos/video";
import Navbar from "@/app/navbar/navbar";
import {videos} from "@/instrumentation";

export default function Videos({ uploader, setUploader }) {
    const [vids, setVideos] = useState([]);

    async function loadVideos() {
        const vs = await videos(uploader.id);
        setVideos(vs);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadVideos().then(_ => {});
    }, []);

    const [playing, setPlaying] = useState(null);

    if (playing) {
        return (
            <>
                <Navbar updateVideos={loadVideos} homeClick={() => setUploader(null)} />
                <video src={`/videos/video/${playing.id}`} controls />
            </>
        )
    }

    return (
        <>
            <Navbar updateVideos={loadVideos} homeClick={() => setUploader(null)} />
            <div className="home">
                <div className="videos">
                    {vids.map((video) => (
                        <Video key={video.id} video={video} uploader={uploader.name} setPlaying={setPlaying} />
                    ))}
                </div>
            </div>
        </>
    );
}