import { ReactNode } from "react";

import { useRouter } from "next/router";

import styles from "./index.module.css";
import { LayoutBody } from "./LayoutBody";
import { LayoutMenu } from "./LayoutMenu";

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
