import './Row.css';
import axios from '../api/axios';
import { useState, useEffect, useCallback } from 'react';
import MovieModal from './MovieModal';
import { styled } from 'styled-components';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  //선택한 영화에 대한 것을 가져오기위해 생성(모달창)
  const [movieSelected, setMovieSelected] = useState({});
  // 모달창
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }


   //fetchUrl에서 요청받아오기
  const fetchMovieData =useCallback( async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  },[fetchUrl])

  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])

  // console.log(document.getElementById(id));
  
  return (
    <Container>
      <h2>{title}</h2>

      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        1378:{
          slidesPerView:6, //한번에 보이는 슬라이드 개수
          slidesPerGroup:6, //슬라이드 넘어가는 개수
        },
        998:{
          slidesPerView:5,
          slidesPerGroup:5, 
        },
        625:{
          slidesPerView:4,
          slidesPerGroup:4, 
        },
        0:{
          slidesPerView:3,
          slidesPerGroup:3, 
        }
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      >

        <div id={id} className="row_posters">
          {movies.map((movie) => (
            <SwiperSlide  key={movie.id}>
              <Wrap>
                <img 
                  className="row_poster"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={()=> handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
           
          ))}
        </div>

      </Swiper>

      {/* 모달이 true 일 때  */}
      {modalOpen ?
      <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> : null
      // 모달창을 닫기 위해 set 내려줌
      }
    </Container>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`

const Wrap =styled.div`
  width:95%;
  height:95%;
  padding-top:56.25%;
  border:3px solid rgba(249, 249,249, 0.1);
  border-radius:10px;
  box-shadow:rgb(0 0 0 /69%) 0px 26px 30px -10px,
            rgb(0 0 0 /73%) 0px 16px 10px -10px
  cursor:pointer;
  overfliw:hidden;
  position:relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s ;
  img{
    inset:0px;
    display:block;
    width:100%;
    height:100%;
    top:0;
    object-fit:cover;
    opacity:1;
    position:absolute;
    transition: opacitiy 500ms ease-in-out 0s;
    z-index:1;
  }
  &:hover{
    box-shadow:rgb(0 0 0 /80%) 0px 40px 58px -16px,
    rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform:scale(0.98);
    border-color:rgba(249, 249,249, 0.8);
  }
`
export default Row;