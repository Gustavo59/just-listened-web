import { Card, Image, Space, Typography } from "antd";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SearchDataArtistsDTO } from "../types";

const { Title } = Typography;

const { Meta } = Card;

export type ArtistsListProps = {
    artists: Array<SearchDataArtistsDTO>;
};

export default function ArtistsList({ artists }: ArtistsListProps) {
    return (
        <Space direction="vertical">
            <Title level={2}>Artists</Title>

            <Swiper
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {artists.map((artist) => {
                    return (
                        <SwiperSlide style={{ maxWidth: 200 }} key={artist.id}>
                            <Card
                                hoverable
                                style={{ width: 200, marginBottom: 10 }}
                                cover={
                                    <Image
                                        alt={`${artist.name} Image`}
                                        src={artist.imageUrl}
                                        preview={false}
                                        width={200}
                                        height={200}
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <Meta title={artist.name} />
                            </Card>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Space>
    );
}
