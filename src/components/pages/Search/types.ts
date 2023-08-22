import { ReleaseDatePrecisionEnum } from "@/domain/constants";

export type SearchData = {
    results: {
        artists: Array<{
            id: string;
            genres: Array<string>;
            imageUrl: string;
            name: string;
        }>;
        albums: Array<{
            id: string;
            imageUrl: string;
            name: string;
            releaseDate: Date;
            releaseDatePrecision: ReleaseDatePrecisionEnum;
            artistsName: Array<string>;
        }>;
    };
};

export type SearchDataArtistsDTO = {
    id: string;
    genres: Array<string>;
    imageUrl: string;
    name: string;
};

export type SearchDataAlbumsDTO = {
    id: string;
    imageUrl: string;
    name: string;
    releaseDate: string;
    artistsName: Array<string>;
};

export type SearchDataDTO = {
    results: {
        artists: Array<SearchDataArtistsDTO>;
        albums: Array<SearchDataAlbumsDTO>;
    };
};
