import { Card, Image, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SearchDataAlbumsDTO } from "../types";

const { Title } = Typography;

const { Meta } = Card;

export type AlbumsListProps = {
    albums: Array<SearchDataAlbumsDTO>;
};

export default function AlbumsList({ albums }: AlbumsListProps) {
    const router = useRouter();

    return (
        <Space direction="vertical">
            <Title level={2}>Albums</Title>

            <Swiper
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {albums.map((album) => {
                    return (
                        <SwiperSlide style={{ maxWidth: 200 }} key={album.id}>
                            <a href={`/albums/${album.id}`}>
                                <Card
                                    hoverable
                                    style={{ width: 200, marginBottom: 10 }}
                                    cover={
                                        <Image
                                            alt={`${album.name} Image`}
                                            src={album.imageUrl}
                                            preview={false}
                                            width={200}
                                            height={200}
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    }
                                >
                                    <Meta
                                        title={album.name}
                                        description={
                                            <>
                                                {album.releaseDate} <br />
                                                <ArtistsNames
                                                    artistsNames={
                                                        album.artistsName
                                                    }
                                                />
                                            </>
                                        }
                                    />
                                </Card>
                            </a>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Space>
    );
}

export type ArtistNameProps = {
    artistsNames: Array<string>;
};

export function ArtistsNames({ artistsNames }: ArtistNameProps) {
    const artistsNamesLength = artistsNames.length;
    return (
        <>
            {artistsNames.map((name, index) => (
                <span key={index}>
                    <span>{name}</span>

                    {index + 1 < artistsNamesLength && <span>, </span>}
                </span>
            ))}
        </>
    );
}
