import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { LOGIN_URL } from "../components/pages/LoginPage";

type PrivateRouterProps = {
    children: ReactNode;
};

export function PrivateRouter(props: PrivateRouterProps) {
    const [loading, setLoading] = useState(true);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && router.pathname === LOGIN_URL)
            router.push("/").then(() => setLoading(false));

        if (status === "unauthenticated" && router.pathname !== LOGIN_URL)
            router.push(LOGIN_URL).then(() => setLoading(false));

        if (
            (status === "authenticated" && router.pathname !== LOGIN_URL) ||
            (status === "unauthenticated" && router.pathname === LOGIN_URL)
        )
            setLoading(false);
    }, [status]);

    return loading ? <h1>Carregando...</h1> : <>{props.children}</>;
}
