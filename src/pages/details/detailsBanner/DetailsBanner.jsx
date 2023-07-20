import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import useFetchGame from "../../../hooks/useFetchGame";
import { fetchGame } from "../../../utils/api";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Demobtn from "../Demobtn";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [dets,setDets] = useState()

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const gameDetails = async () => {
        await fetchGame(id).then(({data}) => setDets(data))
    }

    useEffect(()=>{
        gameDetails()
    },[])


    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const dummy = {
        "adult": false,
        "backdrop_path": "https://cdnb.artstation.com/p/assets/images/images/058/109/407/large/archita-nair-0640b32d-16b2-48f3-a9bf-6c709f25d4d1.jpg?1673401411",
        "belongs_to_collection": null,
        "budget": 81000000,
        "genres": [
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 15,
                "name": "Adventure"
            },
            {
                "id": 25,
                "name": "Role-Playing"
            }
        ],
        "homepage": "https://thewitcher.com/witcher3",
        "id": 1943,
        "imdb_id": "tt2995512",
        "original_language": "en",
        "original_title": "The Witcher 3: Wild Hunt",
        "overview": "The Witcher 3: Wild Hunt is an action role-playing game set in an open world environment. Players control Geralt of Rivia, a monster hunter known as a Witcher. Geralt embarks on a quest to find his adopted daughter, Ciri, while navigating a war-torn fantasy world filled with dangerous creatures and political intrigue.",
        "popularity": 34.572,
        "poster_path": "https://cdnb.artstation.com/p/assets/images/images/058/109/407/large/archita-nair-0640b32d-16b2-48f3-a9bf-6c709f25d4d1.jpg?1673401411",
        "production_companies": [
            {
                "id": 431,
                "logo_path": "/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
                "name": "CD Projekt",
                "origin_country": "PL"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "PL",
                "name": "Poland"
            }
        ],
        "release_date": "2015-05-19",
        "revenue": 447000000,
        "runtime": 100,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "Polish",
                "iso_639_1": "pl",
                "name": "Polski"
            }
        ],
        "status": "Released",
        "tagline": "Go on an epic journey in a war-torn fantasy world",
        "title": "The Witcher 3: Wild Hunt",
        "video": false,
        "vote_average": 9.2,
        "vote_count": 9280
    }

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    const GAMES_URL = import.meta.env.GAMES_URL;
    const handlePlay = () => {
        const newWindow = window.open(`${GAMES_URL}/${dets?.homepage}`, '_blank', 'noopener,noreferrer,location=no');
        newWindow.opener = null;    
    }

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!dummy && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                {/* <Img src={url.backdrop + dummy.backdrop_path} /> */}
                                <Img src={dets?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {dets?.poster_path ? (
                                            // <Img
                                            //     className="posterImg"
                                            //     src={
                                            //         url.backdrop +
                                            //         dummy.poster_path
                                            //     }
                                            // />
                                            <Img
                                            className="posterImg"
                                            src={
                                                dets.poster_path
                                            }
                                        />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${
                                                dummy.name || dets?.title
                                            } (${dayjs(
                                                dummy?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {/* {dummy.tagline} */}
                                            Lorem ipsum dolor sit amet
                                        </div>

                                        <Genres dummy={_genres} />

                                        <div className="row">
                                            <CircleRating
                                                rating={dummy.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <a onClick={handlePlay}>
                                            <div
                                                className="playbtn"
                                                // onClick={() => {
                                                //     setShow(true);
                                                //     setVideoId(video.key);
                                                // }}
                                                // onClick={handlePlay}
                                            >
                                                <PlayIcon />
                                            </div>
                                            </a>

                                            <div
                                                className="demobtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <Demobtn />
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {/* {dummy.overview} */}
                                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </div>
                                        </div>

                                        <div className="info">
                                            {dummy.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dummy.status}
                                                    </span>
                                                </div>
                                            )}
                                            {dummy.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            dummy.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {dummy.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            dummy.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {dummy?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {dummy?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {dummy
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
