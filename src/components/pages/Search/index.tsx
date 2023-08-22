import React, { useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Space, Input } from "antd";
import { useSession } from "next-auth/react";

import { SearchController } from "@/controllers/SearchController";
import { ReleaseDatePrecisionEnum } from "@/domain/constants";
import { CurrentSession } from "@/domain/entities/CurrentSession";
import { useLoading } from "@/providers/LoadingProvider";
import { dateFormatter } from "@/utils/formatter";

import AlbumsList from "./AlbumsList";
import ArtistsList from "./ArtistsList";
import style from "./index.module.css";
import { SearchData, SearchDataDTO } from "./types";

export function SearchPage() {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<SearchData | null>(null);
    const { data: session } = useSession() as CurrentSession;
    const { setIsLoading } = useLoading();

    useEffect(() => {
        if (query !== "") {
            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true);
                SearchController.search(session.accessToken, query).then(
                    (data) => {
                        setResult(data);
                        setIsLoading(false);
                    },
                );
            }, 1000);

            return () => {
                clearTimeout(delayDebounceFn);
                setIsLoading(false);
            };
        } else {
            setResult(null);
        }
    }, [query]);

    function dataSourceDTO(item: SearchData): SearchDataDTO {
        return {
            results: {
                artists: item.results.artists.map((artist) => ({
                    id: artist.id,
                    genres: artist.genres,
                    imageUrl:
                        artist.imageUrl !== ""
                            ? artist.imageUrl
                            : "/image-not-found.png",
                    name: artist.name,
                })),
                albums: item.results.albums.map((album) => ({
                    id: album.id,
                    imageUrl:
                        album.imageUrl !== ""
                            ? album.imageUrl
                            : "/image-not-found.png",
                    name: album.name,
                    releaseDate: dateFormatter(
                        album.releaseDate,
                        ReleaseDatePrecisionEnum.year,
                    ),
                    artistsName: album.artistsName,
                })),
            },
        };
    }

    return (
        <div className={style.searchPage}>
            <section>
                <Space direction="vertical" size={32}>
                    <Space.Compact size="large" className={style.searchDiv}>
                        <Input
                            className={style.searchInput}
                            placeholder="Search"
                            addonBefore={<SearchOutlined />}
                            onChange={(e) => setQuery(e.target.value)}
                            allowClear
                            data-testid="search-input-element"
                        />
                    </Space.Compact>
                    {result && (
                        <AlbumsList
                            albums={dataSourceDTO(result).results.albums}
                        />
                    )}
                    {result && (
                        <ArtistsList
                            artists={dataSourceDTO(result).results.artists}
                        />
                    )}
                </Space>
            </section>
        </div>
    );
}
