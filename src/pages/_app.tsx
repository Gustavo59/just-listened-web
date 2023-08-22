import "@/styles/global.css";

import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Layout } from "@/components/global/Layout";
import { startMirage } from "@/external_interfaces/mirage";
import { PrivateRouter } from "@/middlewares/PrivateRouter";
import { LoadingProvider } from "@/providers/LoadingProvider";
import theme from "@/theme";

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
                    <LoadingProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </LoadingProvider>
                </PrivateRouter>
            </ConfigProvider>
        </SessionProvider>
    );
}
