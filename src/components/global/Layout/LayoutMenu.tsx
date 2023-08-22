import Icon, {
    HomeOutlined,
    PoweroffOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Image } from "antd";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { AlbumsIcon } from "@/components/icons/AlbumsIcon";
import { ArtistsIcon } from "@/components/icons/ArtistsIcon";
import { CurrentSession } from "@/domain/entities/CurrentSession";

export function LayoutMenu() {
    const router = useRouter();

    const handleMenuClick = (destPath: string) => {
        router.push(destPath);
    };

    const { data: session } = useSession() as CurrentSession;

    const items: MenuProps["items"] = [
        {
            label: "Home",
            key: "/",
            icon: <HomeOutlined />,
        },
        {
            label: "Albums",
            key: "/albums",
            icon: <AlbumsIcon />,
            disabled: true,
        },
        {
            label: "Artists",
            key: "/artists",
            icon: <ArtistsIcon />,
            disabled: true,
        },
        {
            label: "Search",
            key: "/search",
            icon: <SearchOutlined />,
        },
        {
            label: `${session.user.name}`,
            key: "/user",
            icon: (
                <Icon
                    component={() => (
                        <Image
                            preview={false}
                            height={30}
                            src={session.user.image}
                            style={{ borderRadius: "15px" }}
                            alt="user-image"
                        />
                    )}
                />
            ),
            style: {
                marginLeft: "auto",
            },
            disabled: true,
        },
        {
            label: (
                <Button
                    icon={<PoweroffOutlined />}
                    type="text"
                    onClick={() => signOut()}
                    danger
                >
                    Sign Out
                </Button>
            ),
            key: "options",
        },
    ];

    return (
        <>
            <Menu
                mode="horizontal"
                items={items}
                onClick={(e) => {
                    handleMenuClick(e.key);
                }}
            />
        </>
    );
}
