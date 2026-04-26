"use client"
import "./navbar.css";
import Button from "@/app/navbar/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateRight, faDownload, faHome} from "@fortawesome/free-solid-svg-icons";
import Download from "@/app/download/download";
import {useState} from "react";

function Empty() { return null; }

export default function Navbar({ updateVideos, homeClick }) {
    const [View, setView] = useState(() => Empty);

    function is(view) {
        return View === view;
    }

    const DownloadView = () => <Download hide={() => setView(() => Empty)} />;

    return (
        <>
            <nav>
                <div className={"flex flex-row"}>
                    <Button onClick={homeClick ? homeClick : () => setView(() => Empty)} background={(is(Empty) || is(DownloadView)) && !homeClick}>
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Button>
                    <Button onClick={() => setView(() => is(DownloadView) ? Empty : DownloadView)} background={is(DownloadView)}>
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                    </Button>
                </div>
                <div className={"flex flex-row"}>
                    <Button onClick={updateVideos}>
                        <FontAwesomeIcon icon={faArrowRotateRight} />
                    </Button>
                </div>
            </nav>
            <View />
        </>
    )
}