import { SearchController } from "@/controllers/SearchController";
import { api } from "@/external_interfaces/api";

import { SEARCH_RESPONSE } from "../data/requests/search";

jest.mock("../../external_interfaces/api");
global.Request = jest.fn().mockImplementation(() => ({}));

describe("Search controller tests", () => {
    test("try search", async () => {
        (api as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(SEARCH_RESPONSE),
            status: 200,
        });

        const expected = {
            results: {
                albums: [
                    {
                        id: "7ycBtnsMtyVbbwTfJwRjSP",
                        imageUrl:
                            "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1",
                        name: "To Pimp A Butterfly",
                        releaseDate: new Date("2015-03-16"),
                        releaseDatePrecision: "day",
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

        await expect(
            SearchController.search("token", "kendrick lamar"),
        ).resolves.toStrictEqual(expected);
    });
});
