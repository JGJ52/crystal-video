import "./uploader.css";
import Image from "next/image";

export default function Uploader({ uploader, setUploader }) {
    return (
        <>
            <div className="uploader" onClick={() => setUploader(uploader)}>
                <Image src={`/uploaders/pfp/${uploader.id}`} alt={uploader.name} loading={"eager"} width={216} height={216} />
                <p className={"name rubik"}>{uploader.name}</p>
            </div>
        </>
    )
}