import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { MOCK_GET } from "@/__tests__/data/dtos/album";
import { NEXT_AUTH_SESSION_DATA } from "@/__tests__/data/libs/next-auth";
import { AlbumPage } from "@/components/pages/Albums/Album";
import { AlbumController } from "@/controllers/AlbumController";
import { useLoading } from "@/providers/LoadingProvider";

jest.mock("../../../../../controllers/AlbumController");

jest.mock("next-auth/react", () => ({
    useSession: jest.fn().mockReturnValue(NEXT_AUTH_SESSION_DATA),
}));

jest.mock("../../../../../providers/LoadingProvider");
(useLoading as jest.Mock).mockReturnValue({
    setIsLoading: jest.fn(),
});

const mockGet = jest.fn();

describe("Album page tests", () => {
    afterEach(() => {
        cleanup();
    });

    test("render album with results", async () => {
        AlbumController.get = mockGet.mockResolvedValue(MOCK_GET);

        render(<AlbumPage id={MOCK_GET.album.id} />);

        waitFor(() => {
            screen.findByText("To Pimp A Butterfly");
            screen.findByText("Kendrick Lamar");
            screen.findByText("15/03/2015");
            screen.getByAltText("To Pimp A Butterfly Image");
        });
    });
});
