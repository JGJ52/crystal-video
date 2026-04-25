"use client"
import {useEffect, useState} from "react";
import {uploaders} from "@/instrumentation";
import Navbar from "@/app/navbar/navbar";
import Uploader from "@/app/uploaders/uploader";
import Videos from "@/app/videos/videos";

export default function Uploaders() {
    const [upls, setUploaders] = useState([]);

    async function loadUploaders() {
        const us = await uploaders();
        setUploaders(us);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUploaders().then(_ => {});
    }, []);

    const [upl, setUploader] = useState(null);

    if (upl) {
        return (
            <Videos uploader={upl} setUploader={setUploader} />
        )
    }

    return (
        <>
            <Navbar updateVideos={loadUploaders} />
            <div className="home">
                <div className="videos">
                    {upls.map((uploader) => (
                        <Uploader key={uploader.id} uploader={uploader} setUploader={setUploader} />
                    ))}
                </div>
            </div>
        </>
    );
}