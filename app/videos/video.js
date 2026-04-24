import "./video.css";
import Image from "next/image";

export default function Video({ video }) {
    return (
        <>
            <div className="video">
                <Image src={`/api/videos/${video.id}/thumbnail`} alt={video.title} width={432} height={216} />
                <p className={"title rubik"}>{video.title}</p>
                <p className={"info fredoka"}>
                    by {video.uploader}
                    <br />
                    on {new Date(video.released).toLocaleString("hu-HU")}
                </p>
            </div>
        </>
    )
}