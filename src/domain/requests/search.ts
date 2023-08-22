import { ReleaseDatePrecisionEnum } from "../constants";

export type SearchResponse = {
    results: {
        artists: Array<{
            id: string;
            genres: Array<string>;
            image_url: string;
            name: string;
        }>;
        albums: Array<{
            id: string;
            image_url: string;
            name: string;
            release_date: string;
            release_date_precision: ReleaseDatePrecisionEnum;
            artists_name: Array<string>;
        }>;
    };
};
