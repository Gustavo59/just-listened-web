import { ReactNode } from "react";

type LayoutBodyProps = {
    children: ReactNode;
};

export function LayoutBody(props: LayoutBodyProps) {
    return <div>{props.children}</div>;
}
