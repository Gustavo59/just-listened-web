import { ReleaseDatePrecisionEnum } from "@/domain/constants";

export type AlbumData = {
    album: {
        id: string;
        imageUrl: string;
        name: string;
        releaseDate: Date;
        releaseDatePrecision: ReleaseDatePrecisionEnum;
        artists: Array<{
            id: string;
            name: string;
        }>;
        genres: Array<string>;
    };
};

export type AlbumDataDTO = {
    id: string;
    imageUrl: string;
    name: string;
    releaseDate: string;
    artists: Array<{
        id: string;
        name: string;
    }>;
    genres: Array<string>;
};
