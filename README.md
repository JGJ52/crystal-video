# crystal-video
![hackatime](https://hackatime.hackclub.com/api/v1/badge/U0922GMGGTU/JGJ52/crystal-video)

Setting up
```shell
git clone https://github.com/JGJ52/crystal-video.git
cd crystal-video/
cp .env.example .env
```

Now, change the database password in .env
\
Then,

```shell
docker compose up -d
```

You're done!

The docker image is big, because it contains ffmpeg and yt-dlp inside it.

If YouTube blocks you from downloading videos anonymously, the downloader won't work.