import { SearchData } from "@/components/pages/Search/types";
import { ReleaseDatePrecisionEnum } from "@/domain/constants";

export const MOCK_SEARCH: SearchData = {
    results: {
        albums: [
            {
                id: "7ycBtnsMtyVbbwTfJwRjSP",
                imageUrl:
                    "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1",
                name: "To Pimp A Butterfly",
                releaseDate: new Date("2015-03-16"),
                releaseDatePrecision: ReleaseDatePrecisionEnum.day,
                artistsName: ["Kendrick Lamar"],
            },
        ],
        artists: [
            {
                id: "2YZyLoL8N0Wb9xBt1NhZWg",
                genres: [
                    "conscious hip hop",
                    "hip hop",
                    "rap",
                    "west coast rap",
                ],
                imageUrl:
                    "https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022",
                name: "Kendrick Lamar",
            },
        ],
    },
};

export const MOCK_SEARCH_EMPTY_IMAGE_URL: SearchData = {
    results: {
        albums: [
            {
                id: "3DGQ1iZ9XKUQxAUWjfC34w",
                imageUrl: "",
                name: "good kid, m.A.A.d city (Deluxe)",
                releaseDate: new Date("2012"),
                releaseDatePrecision: ReleaseDatePrecisionEnum.day,
                artistsName: ["Kendrick Lamar"],
            },
        ],
        artists: [],
    },
};
