import { render, waitFor } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Layout } from "@/components/global/Layout";
import theme from "@/theme";

import { NEXT_AUTH_SESSION_DATA } from "../data/libs/next-auth";

jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("layout component", () => {
    test("renders the layout", async () => {
        (useRouter as jest.Mock).mockReturnValue({});
        (useSession as jest.Mock).mockReturnValue(NEXT_AUTH_SESSION_DATA);

        const { container } = render(
            <ConfigProvider theme={theme}>
                <Layout>
                    <h1>Test Layout</h1>
                </Layout>
            </ConfigProvider>,
        );

        await waitFor(() => {
            expect(
                container.getElementsByClassName("ant-menu-item").length,
            ).toBe(6);
            expect(container).toMatchSnapshot();
        });
    });
});
