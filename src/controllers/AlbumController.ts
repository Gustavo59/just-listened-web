import { GetAlbumDTO } from "@/domain/dtos/requests/album";
import { InternalExcept } from "@/domain/exceptions";
import { GetAlbumResponse } from "@/domain/requests/album";
import { api } from "@/external_interfaces/api";
import { generateUrlParams } from "@/utils/urls";

export class AlbumController {
    public static async get(token: string, id: string) {
        const urlParams = generateUrlParams({
            external_id: id,
        });

        const url = `${process.env.NEXT_PUBLIC_API || ""}/album/${urlParams}`;
        const request = new Request(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const response = await api(request);

        if (response.status === 200) {
            const result = (await response.json()) as GetAlbumResponse;
            return GetAlbumDTO(result);
        }

        throw new InternalExcept();
    }
}
