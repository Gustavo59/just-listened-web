import { useEffect, useState } from "react";

import { Image, Space, Typography } from "antd";
import { useSession } from "next-auth/react";

import { AlbumController } from "@/controllers/AlbumController";
import { CurrentSession } from "@/domain/entities/CurrentSession";
import { useLoading } from "@/providers/LoadingProvider";
import { dateFormatter } from "@/utils/formatter";

import style from "./index.module.css";
import { AlbumData, AlbumDataDTO } from "./types";

const { Title, Text } = Typography;

export type AlbumPageProps = {
    id: string;
};

export function AlbumPage({ id }: AlbumPageProps) {
    const { data: session } = useSession() as CurrentSession;
    const [album, setAlbum] = useState<AlbumDataDTO>();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        setIsLoading(true);
        AlbumController.get(session.accessToken, id)
            .then((data) => {
                setIsLoading(false);
                setAlbum(dataSourceDTO(data));
            })
            .catch(setIsLoading(false));
    }, []);

    function dataSourceDTO(item: AlbumData): AlbumDataDTO {
        return {
            id: item.album.id,
            imageUrl: item.album.imageUrl,
            name: item.album.name,
            releaseDate: dateFormatter(
                item.album.releaseDate,
                item.album.releaseDatePrecision,
            ),
            artists: item.album.artists.map((artist) => ({
                id: artist.id,
                name: artist.name,
            })),
            genres: item.album.genres,
        };
    }

    return (
        <section>
            {album && (
                <Space direction="horizontal" className={style.AlbumDiv}>
                    <Space>
                        <Image
                            alt={`${album.name} Image`}
                            src={album.imageUrl}
                            preview={false}
                            width={460}
                            height={460}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    </Space>
                    <Space
                        direction="vertical"
                        className={style.AlbumDiv__Info}
                    >
                        <div
                            style={{
                                borderBottom: "3px solid #7dd96a",
                                marginBottom: "15px",
                            }}
                        >
                            <Title level={2} style={{ marginBottom: "10px" }}>
                                {album.name}
                            </Title>
                        </div>

                        <Space direction="vertical">
                            <Space direction="horizontal">
                                <div className={style.AlbumDiv__InfoName}>
                                    <Text>Artists</Text>
                                </div>
                                {album.artists.map((artist, index) => (
                                    <Text strong key={index}>
                                        {artist.name}
                                    </Text>
                                ))}
                            </Space>
                            <Space direction="horizontal">
                                <div className={style.AlbumDiv__InfoName}>
                                    <Text>Release</Text>
                                </div>
                                <Text strong>{album.releaseDate}</Text>
                            </Space>
                            <Space direction="horizontal">
                                <div className={style.AlbumDiv__InfoName}>
                                    <Text>Genres</Text>
                                </div>
                                {album.genres.map((genre, index) => (
                                    <Text strong key={index}>
                                        {genre}
                                    </Text>
                                ))}
                            </Space>
                        </Space>
                    </Space>
                </Space>
            )}
        </section>
    );
}
