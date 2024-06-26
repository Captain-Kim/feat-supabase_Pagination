import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Database } from '../types/supabase';
import { CardContainer, Card, CardImage, CardContent, CardTitle, CardDescription } from './Styled';

type Place = Database['public']['Tables']['places']['Row']; // 타입 정의


const InfiniteScroll: React.FC = () => {
    const [places, setPlaces] = useState<Place[]>([]); // 장소 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태를 저장할 상태
    const [page, setPage] = useState(0); // 현재 페이지 번호를 저장할 상태
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부를 저장할 상태
    const ITEMS_PER_PAGE = 10; // 페이지당 항목 수

    // 데이터 불러오는 함수
    const fetchPlaces = useCallback(async (page: number) => {
        if (!hasMore) return; // 더 불러올 데이터가 없으면 종료

        setLoading(true); // 로딩 상태로 전환
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE - 1;
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .order('created_at', { ascending: false }) // 생성일 내림차순으로 정렬
            .range(start, end); // 데이터 범위 설정

        if (error) {
            console.error(error); // 에러 로그 출력
        } else {
            if (data.length < ITEMS_PER_PAGE) {
                setHasMore(false); // 불러온 데이터가 적으면 더 이상 데이터가 없다고 설정
            }
            setPlaces((prevPlaces) => {
                const newPlaces = data.filter(
                    (place: Place) => !prevPlaces.some((prevPlace) => prevPlace.post_id === place.post_id)
                ); // 중복 데이터 필터링
                return [...prevPlaces, ...newPlaces]; // 기존 데이터에 새로운 데이터 추가
            });
        }
        setLoading(false); // 로딩 상태 해제
    }, [hasMore]);

    // 페이지 변경 시 데이터 불러오기
    useEffect(() => {
        fetchPlaces(page);
    }, [page, fetchPlaces]);

    // 스크롤 핸들러
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50 || loading || !hasMore) {
            return; // 스크롤이 충분히 내려가지 않았거나, 로딩 중이거나, 더 불러올 데이터가 없으면 종료
        }
        setPage((prevPage) => prevPage + 1); // 페이지 증가
    };

    // 스크롤 이벤트 리스너 설정
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // 클린업 함수로 이벤트 리스너 제거
    }, [loading, hasMore]);

    return (
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
            {loading && <div>Loading...</div>} {/* 로딩 중일 때 표시 */}
        </CardContainer>
    );
};

export default InfiniteScroll;