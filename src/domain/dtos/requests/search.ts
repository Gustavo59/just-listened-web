import { ReleaseDatePrecisionEnum } from "@/domain/constants";
import { SearchResponse } from "@/domain/requests/search";

export function SearchDTO(data: SearchResponse) {
    return {
        results: {
            artists: data.results.artists.map((artist) => ({
                id: artist.id,
                genres: artist.genres,
                imageUrl: artist.image_url,
                name: artist.name,
            })),
            albums: data.results.albums.map((album) => ({
                id: album.id,
                imageUrl: album.image_url,
                name: album.name,
                releaseDate: new Date(album.release_date),
                releaseDatePrecision:
                    ReleaseDatePrecisionEnum[album.release_date_precision],
                artistsName: album.artists_name,
            })),
        },
    };
}
