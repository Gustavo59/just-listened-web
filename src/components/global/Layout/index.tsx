import { ReactNode } from "react";

import styles from "./index.module.css";
import { useRouter } from "next/router";
import { LayoutMenu } from "./LayoutMenu";
import { LayoutBody } from "./LayoutBody";

type LayoutProps = {
    children: ReactNode;
};

export function Layout(props: LayoutProps) {
    const router = useRouter();

    if (router.pathname === "/login") {
        return <>{props.children}</>;
    }
    return (
        <div className={styles.Layout}>
            <section className={styles.Layout__Menu}>
                <LayoutMenu />
            </section>
            <section className={styles.Layout__Body}>
                <LayoutBody>{props.children}</LayoutBody>
            </section>
        </div>
    );
}
