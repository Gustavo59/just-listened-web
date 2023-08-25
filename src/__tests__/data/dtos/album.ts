import { AlbumData } from "@/components/pages/Albums/Album/types";
import { ReleaseDatePrecisionEnum } from "@/domain/constants";

export const MOCK_GET: AlbumData = {
    album: {
        id: "7ycBtnsMtyVbbwTfJwRjSP",
        imageUrl:
            "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1",
        name: "To Pimp A Butterfly",
        releaseDate: new Date("2015-03-16"),
        releaseDatePrecision: ReleaseDatePrecisionEnum.day,
        artists: [
            {
                id: "2YZyLoL8N0Wb9xBt1NhZWg",
                name: "Kendrick Lamar",
            },
        ],
        genres: [],
    },
};
