import "./video.css";
import Image from "next/image";

export default function Video({ video, uploader, setPlaying }) {
    return (
        <>
            <div className="video" onClick={() => setPlaying(video)}>
                <Image src={`/videos/thumbnail/${video.id}`} alt={video.title} loading={"eager"} width={432} height={216} />
                <p className={"title rubik"}>{video.title}</p>
                <p className={"info fredoka"}>
                    by {uploader}
                    <br />
                    on {new Date(Number(video.timestamp)).toLocaleString("hu-HU")}
                </p>
            </div>
        </>
    )
}