import { GetStaticPropsContext } from "next";

import { AlbumPage } from "@/components/pages/Albums/Album";

export type AlbumRouterProps = {
    id: string;
};

export default function AlbumRouter({ id }: AlbumRouterProps) {
    return <AlbumPage id={id} />;
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { id } = context.params!;

    if (!id) {
        return { redirect: { destination: "/" } };
    }
    return { props: { id } };
}
