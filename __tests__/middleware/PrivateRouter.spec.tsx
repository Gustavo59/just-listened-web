import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PrivateRouter } from "@/middlewares/PrivateRouter";
import {
    NEXT_AUTH_NOT_SESSION,
    NEXT_AUTH_SESSION_DATA,
} from "../data/libs/next-auth";

const pushMock = jest.fn().mockResolvedValue({});
jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));

const TextComponent = () => {
    return (
        <PrivateRouter>
            <h1>Authenticated</h1>
        </PrivateRouter>
    );
};

describe("private routers middleware", () => {
    test("access a private page when is logged", async () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: "/",
            push: pushMock,
        });

        (useSession as jest.Mock).mockReturnValue(NEXT_AUTH_SESSION_DATA);

        render(<TextComponent />);

        await waitFor(() => {
            expect(pushMock).not.toHaveBeenCalledWith("/login");
            expect(screen.queryByText("Authenticated")).not.toBeNull();
        });
    });

    test("access a private page when is not logged", async () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: "/",
            push: pushMock,
        });

        (useSession as jest.Mock).mockReturnValue(NEXT_AUTH_NOT_SESSION);

        render(<TextComponent />);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/login");
            expect(screen.queryByText("Authenticated")).toBeNull();
        });
    });

    test("access a login page when is logged", async () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: "/login",
            push: pushMock,
        });

        (useSession as jest.Mock).mockReturnValue(NEXT_AUTH_SESSION_DATA);

        render(<TextComponent />);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/");
            expect(screen.queryByText("Authenticated")).toBeNull();
        });
    });
});
