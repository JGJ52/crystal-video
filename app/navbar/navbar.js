"use client"
import "./navbar.css";
import Button from "@/app/navbar/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faGear, faHome} from "@fortawesome/free-solid-svg-icons";
import Home from "@/app/home";
import Download from "@/app/download/page";
import Settings from "@/app/settings/page";

export default function Navbar({ view, setView }) {
    return (
        <>
            <nav>
                <div className={"flex flex-row"}>
                    <Button onClick={() => setView(() => Home)} background={view === Home}>
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Button>
                    <Button onClick={() => setView(() => Download)} background={view === Download}>
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                    </Button>
                </div>
                <Button onClick={() => setView(() => Settings)} background={view === Settings} >
                    <FontAwesomeIcon icon={faGear} />
                    Settings
                </Button>
            </nav>
        </>
    )
}