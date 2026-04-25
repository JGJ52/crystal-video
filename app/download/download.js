"use client"
import "./download.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import MaterialIcon from "@/app/material";
import {useRef} from "react";
import Overlay from "@/app/overlay";
import {toast} from "react-toastify";

export default function Download({ hide }) {
    const input = useRef(null);

    async function fetchInfo(url) {
        try {
            const info = toast.info("Downloading...", { autoClose: false });
            const res = await fetch('/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            if (!res.ok) {
                toast.dismiss(info);
                return toast.error("Failed to download");
            }
            toast.dismiss(info);
            toast.success("Successfully downloaded", { autoClose: 1000 });
        } catch (error) {
            toast.error("Failed to download");
        }
    }

    return (
        <>
            <div className="download ct">
                <div className="ct">
                    <p className={"title rubik"}>
                        Download videos from <span className={"rubik text-red-600"}>
                            <FontAwesomeIcon icon={faYoutube} />
                            YouTube
                        </span>
                    </p>
                    <input ref={input} type={"url"} className={"fredoka url"} placeholder={"YouTube URL"} />
                </div>
                <button className={"btn rubik"} onClick={() => fetchInfo(input.current?.value || "")}>
                    <MaterialIcon icon={"download"} /> Download
                </button>
            </div>
            <Overlay onClick={hide} />
        </>
    )
}