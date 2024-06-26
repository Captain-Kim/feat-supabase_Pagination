import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CardContainer, Card, CardImage, CardContent, CardTitle, CardDescription } from './Styled';
import { supabase } from '../supabaseClient';
import { Database } from '../types/supabase';

// 타입 정의
type Place = Database['public']['Tables']['places']['Row'];

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Pagination: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]); // 장소 데이터를 저장할 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호를 저장할 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수를 저장할 상태
  const ITEMS_PER_PAGE = 10; // 페이지당 항목 수

  // 데이터 불러오는 함수
  const fetchPlaces = async (page: number) => {
    const start = page * ITEMS_PER_PAGE; // 시작 인덱스 계산
    const end = start + ITEMS_PER_PAGE - 1; // 끝 인덱스 계산
    const { data, error, count } = await supabase
      .from('places')
      .select('*', { count: 'exact' }) // 총 항목 수를 포함하여 선택
      .order('created_at', { ascending: false }) // 생성일 내림차순으로 정렬
      .range(start, end); // 데이터 범위 설정

    if (error) {
      console.error(error); // 에러 로그 출력
    } else {
      setPlaces(data); // 데이터 설정
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE)); // 총 페이지 수 계산 및 설정
    }
  };

  // 페이지 변경 시 데이터 불러오기
  useEffect(() => {
    fetchPlaces(page);
  }, [page]);

  // 페이지 번호 렌더링 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <PageButton key={i} onClick={() => setPage(i)} disabled={page === i}>
          {i + 1}
        </PageButton>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <CardContainer>
        {places.map((place) => (
          <Card key={place.post_id}>
            {/* url은 이미지를 못 불러올 때 기본 이미지 설정. 이거 살리면 됨 트래픽 아끼려고 주석함 */}
            {/* <CardImage src={place.image || 'https://via.placeholder.com/300'} alt={place.name || 'Place'} /> */}
            <CardImage src={'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202401/17/f1984fc9-dd96-4ccf-93e4-7b5064d1bebf.jpg'} alt={'트래픽 아끼기용'} />
            <CardContent>
              <CardTitle>{place.name}</CardTitle>
              <CardDescription>{place.description}</CardDescription>
              <p>{place.st_date} - {place.ed_date}</p>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
      <PaginationControls>
        <PageButton onClick={() => setPage(0)} disabled={page === 0}>맨 처음으로</PageButton>
        <PageButton onClick={() => setPage(page - 1)} disabled={page === 0}>이전</PageButton>
        {renderPageNumbers()}
        <PageButton onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>다음</PageButton>
        <PageButton onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>맨 끝으로</PageButton>
      </PaginationControls>
    </div>
  );
};

export default Pagination;