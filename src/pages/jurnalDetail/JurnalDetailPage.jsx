import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getAllJurnals, getSingleJurnal } from '../../services/index/jurnals';
import JurnalDetailPageSkeleton from './JurnalDetailPageSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import parseJsonToHtml from '../../utils/parseJsonToHtml';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import CommentsContainer from '../../components/comments/CommentsContainer';
import { Helmet } from "react-helmet";


const JurnalDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

const { data, isLoading, isError } = useQuery({
  queryFn: () => getSingleJurnal({ slug }),
  queryKey: ['jurnal', slug],
  onSuccess: (data) => {
    console.log("Data dari getSingleJurnal:", data); // ✅ Tambahkan baris ini untuk melihat isi responsenya

    setBreadCrumbsData([
      { name: 'Beranda', link: '/' },
      { name: 'Jurnal Detail', link: `/jurnalall/${data.slug}` },
    ]);
    setBody(parseJsonToHtml(data?.body));
  },
});



  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-orange-500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-orange-500" />);
    }

    return stars;
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <JurnalDetailPageSkeleton />;
  if (isError || !data) return <ErrorMessage message="Couldn't fetch the jurnal data" />;

  return (
    <>
      <Helmet>
    <title>{data?.name} | Sistem Informasi Jurnal</title>
    <meta property="og:title" content={`${data?.name} | Sistem Informasi Jurnal`} />
    <meta property="og:description" content="Lihat detail jurnal pada Sistem Informasi Jurnal." />
    <meta content={data?.cover} property="og:image" />
    <meta content={data?.cover} property="og:image:secure_url" />
    <meta content="1280" property="og:image:width" />
    <meta content="640" property="og:image:height"/ >
    <meta property="og:type" content="website" />
  </Helmet>
    <MainLayout>
      <div className="w-full px-6 mt-[120px]">
        {/* Breadcrumb */}
        <div className="mx-auto items-center justify-center max-w-7xl flex">
          <div className="lg:text-l w-full justify-between text-m">
            {breadCrumbsData.map((item, index) => (
              <span key={index} className={`cursor-pointer ${index === breadCrumbsData.length - 1 ? 'font-semibold' : ''}`}>
                <a href={item.link} className="hover:underline">
                  {item.name}
                </a>
                {index !== breadCrumbsData.length - 1 && ' > '}
              </span>
            ))}
          </div>
        </div>


        {/* Header */}
        <div className='mx-auto items-center justify-center max-w-7xl flex py-3 undefined'>
          <div className='w-full lg:p-[32px] md:p-[16px] p-3 bg-linear-main shadow-inner-shadow-1 rounded-md text-neutral-10  bottom-0'>
            <div className="text-heading-s sm:text-heading-m font-semibold">{data?.name}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-8 mb-12 space-y-4 bg-white p-6 rounded-lg shadow">
          {/* Gambar */}
          <div className="flex justify-center">
            {data?.cover ? (
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={data.cover}
                  alt={data.title}
                  className="cover-detail mx-auto block"
                />
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/notfoundimage.png"
                  alt="notfoundimage"
                  className="cover-detail mx-auto block"
                />
              </div>
            )}
          </div>


          {/* Tanggal */}
          <p className="text-sm text-gray-600 text-end">
            {new Date(data?.createdAt || Date.now()).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <h1 className="text-3xl font-semibold text-center">{data?.name}</h1>
          <div className="info-row flex items-center gap-2">
            <span className="info-label">Rating</span>
            <span className="info-value flex items-center gap-1">: {renderStars(data?.rating_avg || 0)}
            </span>
          </div>

          <p className="info-row">
            <span className="info-label">Link </span><span className="info-value">: {data?.url}</span>
          </p>
          <p className="info-row">
            <span className="info-label">Harga </span><span className="info-value">: {data.currencies.length > 0
                ? data.currencies
                  .slice(0, 3)
                  .map(
                    (currency, index) =>
                      `${currency.name}${data.currencies.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Uncurrencies"} {data.currencies.length > 0
                ? data.currencies
                  .slice(0, 3)
                  .map(
                    (currency, index) =>
                      `${currency.symbol}${data.currencies.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unsymbol"} {data?.apc}</span>
          </p>
          <p className="info-row">
            <span className="info-label">Contact </span><span className="info-value">: {data?.contact}</span>
          </p>
          <p className="info-row">
            <span className="info-label">Email </span><span className="info-value">: {data?.email}</span>
          </p>

          <p className="info-row">
            <span className="info-label">Column Styles </span><span className="info-value">: {data.columnstyles.length > 0
                ? data.columnstyles
                  .slice(0, 3)
                  .map(
                    (columnstyle, index) =>
                      `${columnstyle.name}${data.columnstyles.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unstyled"} ({data.columnstyles.length > 0
                ? data.columnstyles
                  .slice(0, 3)
                  .map(
                    (columnstyle, index) =>
                      `${columnstyle.description}${data.columnstyles.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "UnDescription"})</span>
          </p>

           <p className="info-row">
            <span className="info-label">Institutions </span><span className="info-value mr-2">: {data.institutions.length > 0
                ? data.institutions
                  .slice(0, 3)
                  .map(
                    (institution, index) =>
                      `${institution.name}${data.institutions.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Uninstitutioned"}
              </span>
          </p>

          <p className="info-row">
            <span className="info-label">Countries </span><span className="info-value">: {data.countries.length > 0
                ? data.countries
                  .slice(0, 3)
                  .map(
                    (country, index) =>
                      `${country.name}${data.countries.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Uncountried"}</span>
          </p>
          <p className="info-row">
            <span className="info-label">Languages </span><span className="info-value">: {data.languages.length > 0
                ? data.languages
                  .slice(0, 3)
                  .map(
                    (language, index) =>
                      `${language.name}${data.languages.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unlanguageed"}
              </span>
          </p>
          <p className="info-row">
            <span className="info-label">Publish </span><span className="info-value">: {data.publishperiods.length > 0
                ? data.publishperiods.map((publishperiod, index) =>
                  `${publishperiod.month}${index === data.publishperiods.length - 1 ? "" : ", "}`
                )
                : "publishperioded"}
              </span>
          </p>

          <p className="info-row">
            <span className="info-label">Rank </span><span className="info-value">: {data.ranks.length > 0
                ? data.ranks
                  .slice(0, 3)
                  .map(
                    (rank, index) =>
                      `${rank.name}${data.ranks.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unranked"}
              </span>
          </p>

          <p className="info-row">
            <span className="info-label">Track </span><span className="info-value">: {data.tracks.length > 0
                ? data.tracks
                  .slice(0, 3)
                  .map(
                    (track, index) =>
                      `${track.name}${data.tracks.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Untracked"}
                </span>
          </p>

          <CommentsContainer
            comments={data?.comments}
            className="mt-10"
            logginedUserId={userState?.userInfo?._id}
            jurnalSlug={slug}
          />
        </div>
      </div>
    </MainLayout>
    </>
  );
};

export default JurnalDetailPage;
