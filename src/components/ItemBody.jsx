import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import MenuGrid from './MenuGrid';
import InfoCardSection from './InfoCardSection';
import GraduateStatsCard from './GraduateStatsCards';
import Statistic from './Statistic';
import JurnalHome from '../pages/home/container/JurnalHome';
import { getAllJurnals } from '../services/index/jurnals';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function ItemBody() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil query parameter dari URL
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchKeyword = searchParams.get('search') || '';

  const { data, refetch } = useQuery({
    queryKey: ['jurnals', searchKeyword, currentPage],
    queryFn: () => getAllJurnals(searchKeyword, currentPage, 12),
    onError: (error) => {
      toast.error(error.message || 'Error fetching jurnals');
      console.error(error);
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, searchKeyword]);

  const handlePageChange = (page) => {
    navigate(`/jurnalall?page=${page}&search=${encodeURIComponent(searchKeyword)}`);
  };

  const handleSearch = (keyword) => {
    const safeKeyword = typeof keyword === 'string' ? keyword : String(keyword);
    navigate(`/jurnalall?page=1&search=${encodeURIComponent(safeKeyword)}`);
  };

  return (
    <div className="w-full px-3 mt-[-40px]">
      <SearchBar onSearchKeyword={handleSearch} />
      <MenuGrid />
      <InfoCardSection />
      <Statistic />
      <JurnalHome 
        data={data} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}
