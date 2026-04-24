import Video from "@/app/videos/video";

export default function Home() {
    const videos = [
        {
            title: "Cica vagyok videó",
            id: 1,
            duration: 24000,
            uploader: "csédániel",
            released: 1244441383000
        },
        {
            title: "Cica vagyok videó",
            id: 2,
            duration: 24000,
            uploader: "csédániel",
            released: 1244441383000
        },
    ]

    return (
        <>
            <div className="home">
                <div className="videos">
                    {videos.map((video) => (
                        <Video key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </>
    )
}