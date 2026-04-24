import "./page.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import MaterialIcon from "@/app/material";

export default function Download() {
    return (
        <main>
            <div className="download ct">
                <div className="ct">
                    <p className={"title rubik"}>
                        Download videos from <span className={"rubik text-red-600"}>
                            <FontAwesomeIcon icon={faYoutube} />
                            YouTube
                        </span>
                    </p>
                    <input type={"url"} className={"fredoka url"} placeholder={"YouTube URL"} />
                </div>
                <button className={"btn rubik"}>
                    <MaterialIcon icon={"download"} /> Download
                </button>
            </div>
        </main>
    )
}