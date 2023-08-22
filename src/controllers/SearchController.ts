import { SearchDTO } from "@/domain/dtos/requests/search";
import { InternalExcept } from "@/domain/exceptions";
import { SearchResponse } from "@/domain/requests/search";
import { api } from "@/external_interfaces/api";
import { generateUrlParams } from "@/utils/urls";

export class SearchController {
    public static async search(token: string, query: string) {
        const urlParams = generateUrlParams({
            query: query,
        });
        const url = `${process.env.NEXT_PUBLIC_API || ""}/search${urlParams}`;

        const request = new Request(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const response = await api(request);

        if (response.status === 200) {
            const result = (await response.json()) as SearchResponse;
            return SearchDTO(result);
        }

        throw new InternalExcept();
    }
}
