import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Pastikan react-icons sudah diinstal 

const JurnalCard = ({ jurnal }) => {
    const renderStars = (rating, ranks) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Cek apakah ada Q1/Q2/Q3 di ranks array
    const isHighRank = Array.isArray(ranks)
        ? ranks.some(rank => ["Q1", "Q2", "Q3", "Q4"].includes(rank.name?.toUpperCase()))
        : false;

    const rankColor = isHighRank ? "text-green-500" : "text-orange-500";

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className={rankColor} />);
    }
    if (halfStar) {
        stars.push(<FaStarHalfAlt key="half" className={rankColor} />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className={rankColor} />);
    }

    return stars;
};


    return (
        <div className="p-5 bg-white rounded-2xl shadow-shadow-2 hover:translate-y-[-8px] transition-all">
            {jurnal.cover ? (
                <img
                    src={jurnal.cover}
                    alt={jurnal.name}
                    className="object-cover img-size rounded-sm"
                />
            ) : (
                <img
                    src="/images/notfoundimage.png"
                    alt="notfoundimage"
                    className="object-cover img-size rounded-sm"
                />
            )}

            <p className="text-base font-bold my-3 line-clamp-4">{jurnal.name}</p>
            <p className="text-base font-medium my-3 line-clamp-4">{jurnal.institutions.length > 0
                ? jurnal.institutions
                    .slice(0, 3)
                    .map(
                        (institution, index) =>
                            `${institution.name}${jurnal.institutions.slice(0, 3).length === index + 1
                                ? ""
                                : ", "
                            }`
                    )
                : "Uninstitutioned"}</p>
            <p className="text-base font-medium my-3 line-clamp-4">
                <span className="font-bold">Publish:</span>{" "}
                {jurnal.publishperiods.length > 0
                    ? (() => {
                        const value = jurnal.publishperiods
                            .slice(0, 3)
                            .map((publishperiod, index) =>
                                `${publishperiod.month}${jurnal.publishperiods.slice(0, 3).length === index + 1 ? "" : ", "}`
                            )
                            .join("");

                        return value.length > 20 ? `${value.slice(0, 20)}...` : value;
                    })()
                    : "Unpublishperiod"}
            </p>

            {/* Rating Bintang */}
            <div className="flex gap-1 mb-3 text-yellow-500 text-lg">
               {renderStars(jurnal.rating_avg || 0, jurnal.ranks)}

            </div>

            <a
                href={`/jurnalall/${jurnal.slug}`} // Pastikan ada di data JSON
                className="flex items-center gap-3 text-white bg-linear-main w-full justify-center p-3 rounded-sm shadow-inner-shadow-1 hover:bg-transparent hover:border hover:border-purple-600 hover:text-purple-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
            >
                {/* Teks di sini */}


                Detail
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z" />
                    <path d="M8 5a3 3 0 100 6a3 3 0 000-6z" />
                </svg>

            </a>
        </div>
    );
};

export default JurnalCard;
