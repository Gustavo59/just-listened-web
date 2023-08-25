import { ReleaseDatePrecisionEnum } from "@/domain/constants";
import { GetAlbumResponse } from "@/domain/requests/album";

export function GetAlbumDTO(data: GetAlbumResponse) {
    return {
        album: {
            id: data.album.id,
            imageUrl: data.album.image_url,
            name: data.album.name,
            releaseDate: new Date(data.album.release_date),
            releaseDatePrecision:
                ReleaseDatePrecisionEnum[data.album.release_date_precision],
            artists: data.album.artists.map((artist) => ({
                id: artist.id,
                name: artist.name,
            })),
            genres: data.album.genres,
        },
    };
}
