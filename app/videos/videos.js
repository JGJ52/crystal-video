"use client"
import "./videos.css";
import {useEffect, useRef, useState} from "react";
import Video from "@/app/videos/video";
import Navbar from "@/app/navbar/navbar";
import {videos} from "@/instrumentation";
import Button from "@/app/navbar/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand, faPause, faPlay, faVolumeHigh, faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import MaterialIcon from "@/app/material";
import IconNotPage from "@/app/videos/icon-not-page";

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
    const ref = useRef(null);
    const [play, setPlay] = useState(faPlay);
    const timeoutRef = useRef(null);
    const [showIcon, setShowIcon] = useState(false);
    const time = useRef(null);
    const [where, setWhere] = useState(0);

    function playPause() {
        const { current } = ref;
        clearTimeout(timeoutRef.current);

        if (!current.paused) {
            current.pause();
            setPlay(faPlay);
        } else {
            current.play();
            setPlay(faPause);
        }

        setShowIcon(false);
        setTimeout(() => {
            setShowIcon(true);
            timeoutRef.current = setTimeout(() => {
                setShowIcon(false);
            }, 1000);
        }, 0);
    }

    function skip(time) {
        ref.current.currentTime += time;
    }

    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    function mute() {
        setMuted(!muted);
        const { current } = ref;
        current.volume = !muted ? 0 : volume;
    }

    function vol(e) {
        const { current } = ref;
        const volume = e.target.value / 100;
        setVolume(volume);
        if (!muted) {
            current.volume = volume;
        }
    }

    function timeUpdate() {
        const { current } = ref;
        const percent = (current.currentTime / current.duration) * 100;
        setWhere(percent);
        time.current.value = percent;
    }

    function otherTimeUpdate(current) {
        const w = current.target.value;
        if (w === where) return;
        const { current: video } = ref;
        video.currentTime = (w / 100) * video.duration;
    }

    if (playing) {
        return (
            <>
                <Navbar updateVideos={loadVideos} homeClick={() => setUploader(null)} />
                <div className="vid-ct">
                    <video src={`/videos/video/${playing.id}`} ref={ref} onClick={playPause} onTimeUpdate={timeUpdate} />
                    <input type={"range"} className={"volume time"} ref={time} onChange={e => otherTimeUpdate(e)} />
                    <div className="controls">
                        <div className="flex flex-row">
                            <input type={"range"} onChange={e => vol(e)} className={"volume"} />
                            <Button onClick={mute}>
                                <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeHigh} />
                            </Button>
                        </div>
                        <div className="flex flex-row">
                            <Button onClick={() => skip(-10)}>
                                <MaterialIcon icon={"fast_rewind"} />
                            </Button>
                            <Button onClick={playPause}>
                                <FontAwesomeIcon icon={play} />
                            </Button>
                            <Button onClick={() => skip(10)}>
                                <MaterialIcon icon={"fast_forward"} />
                            </Button>
                        </div>
                        <div className="flex flex-row relative">
                            <Button onClick={async () => await ref.current.requestFullscreen()}>
                                <FontAwesomeIcon icon={faExpand} />
                            </Button>
                        </div>
                    </div>
                    {showIcon && (
                        <IconNotPage>
                            <FontAwesomeIcon icon={play} size="3x" />
                        </IconNotPage>
                    )}
                </div>
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