import "@/styles/global.css";

import { Layout } from "@/components/global/Layout";
import { PrivateRouter } from "@/middlewares/PrivateRouter";
import { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "@/theme";
import { SessionProvider } from "next-auth/react";
import { startMirage } from "@/external_interfaces/mirage";

if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_API === undefined
)
    startMirage();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ConfigProvider theme={theme}>
                <PrivateRouter>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PrivateRouter>
            </ConfigProvider>
        </SessionProvider>
    );
}
