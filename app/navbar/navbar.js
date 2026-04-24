"use client"
import "./navbar.css";
import Button from "@/app/navbar/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faGear, faHome} from "@fortawesome/free-solid-svg-icons";
import Settings from "@/app/settings/settings";
import Download from "@/app/download/download";
import {useState} from "react";

function Empty() { return null; }

export default function Navbar() {
    const [View, setView] = useState(() => Empty);

    function is(view) {
        return View === view;
    }

    const DownloadView = () => <Download hide={() => setView(() => Empty)} />;
    const SettingsView = () => <Settings hide={() => setView(() => Empty)} />;

    return (
        <>
            <nav>
                <div className={"flex flex-row"}>
                    <Button onClick={() => setView(() => Empty)} background={is(Empty) || is(DownloadView) || is(SettingsView)}>
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Button>
                    <Button onClick={() => setView(() => is(DownloadView) ? Empty : DownloadView)} background={is(DownloadView)}>
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                    </Button>
                </div>
                <Button onClick={() => setView(() => is(SettingsView) ? Empty : SettingsView)} background={is(SettingsView)}>
                    <FontAwesomeIcon icon={faGear} />
                    Settings
                </Button>
            </nav>
            <View />
        </>
    )
}