import {
    cleanup,
    getAllByAltText,
    getByAltText,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NEXT_AUTH_SESSION_DATA } from "@/__tests__/data/libs/next-auth";
import { SearchPage } from "@/components/pages/Search";
import { SearchController } from "@/controllers/SearchController";
import { useLoading } from "@/providers/LoadingProvider";

import {
    MOCK_SEARCH,
    MOCK_SEARCH_EMPTY_IMAGE_URL,
} from "../../../data/dtos/search";

jest.mock("../../../../controllers/SearchController");

jest.mock("next-auth/react", () => ({
    useSession: jest.fn().mockReturnValue(NEXT_AUTH_SESSION_DATA),
}));

jest.mock("swiper/react", () => ({
    Swiper: ({ children }: any) => (
        <div data-testid="swiper-testid">{children}</div>
    ),
    SwiperSlide: ({ children }: any) => (
        <div data-testid="swiper-slide-testid">{children}</div>
    ),
}));

jest.mock("../../../../providers/LoadingProvider");
(useLoading as jest.Mock).mockReturnValue({
    setIsLoading: jest.fn(),
});

const mockSearch = jest.fn();

const TestComponent = () => <SearchPage />;

describe("Search tests", () => {
    afterEach(() => {
        cleanup();
    });

    test("render search with results", async () => {
        SearchController.search = mockSearch.mockResolvedValue(MOCK_SEARCH);

        render(<TestComponent />);

        const searchInputElement = screen.getByTestId("search-input-element");

        await userEvent.type(searchInputElement, "Kendrick Lamar");

        await screen.findByText("Artists");
        await screen.findByText("Albums");

        expect((await screen.queryAllByText("Kendrick Lamar")).length).toBe(2); // In albums and artists
        await screen.findByText("To Pimp A Butterfly");
    });

    test("test result empty when clear button is pressed", async () => {
        SearchController.search = mockSearch.mockResolvedValue(MOCK_SEARCH);

        const { container } = render(<TestComponent />);

        const searchInputElement = screen.getByTestId("search-input-element");
        const clearInputElement = container.getElementsByClassName(
            "ant-input-clear-icon",
        )[0];

        await userEvent.type(searchInputElement, "Kendrick Lamar");
        await waitFor(() => {
            //Waiting for the search to be done
            expect(screen.queryAllByText("Kendrick Lamar").length).toBe(2); // In albums and artists
        });

        await userEvent.click(clearInputElement);
        expect(screen.queryAllByText("Kendrick Lamar").length).toBe(0);
    });

    test("test image not found", async () => {
        SearchController.search = mockSearch.mockResolvedValue(
            MOCK_SEARCH_EMPTY_IMAGE_URL,
        );

        render(<TestComponent />);

        const searchInputElement = screen.getByTestId("search-input-element");

        await userEvent.type(searchInputElement, "Kendrick Lamar");

        await waitFor(() => {
            expect(
                screen
                    .getByAltText("good kid, m.A.A.d city (Deluxe) Image")
                    .getAttribute("src"),
            ).toBe("/image-not-found.png");
        });
    });
});
