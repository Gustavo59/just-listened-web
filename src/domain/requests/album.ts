import { ReleaseDatePrecisionEnum } from "../constants";

export type GetAlbumResponse = {
    album: {
        id: string;
        image_url: string;
        name: string;
        release_date: string;
        release_date_precision: ReleaseDatePrecisionEnum;
        artists: Array<{
            id: string;
            name: string;
        }>;
        genres: Array<string>;
    };
};
