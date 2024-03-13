import './Row.css';
import axios from '../api/axios';
import { useState, useEffect, useCallback } from 'react';
import MovieModal from './MovieModal';

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

  console.log(document.getElementById(id));
  
  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow-left">
          <span className="arrow"
            onClick={
              ()=> {
                document.getElementById(id).scrollLeft -= window.innerWidth -80;
                // getElementById(id)는 app.jsx <Row id> 넣어둔 .row_posters의 요소 /innerWidth 화면내부영역
              }
            }
          >
            {"<"}
          </span>
        </div>
      
        <div id={id} className="row_posters">
          {movies.map((movie) => (
            <img 
              key={movie.id}
              className="row_poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
              onClick={()=> handleClick(movie)}
            />
          ))}
        </div>
        
        <div className="slider_arrow-right">
            <span className="arrow"
            onClick={
              ()=> {
                document.getElementById(id).scrollLeft += window.innerWidth -80;
                // getElementById(id)는 app.jsx <Row id> 넣어둔 .row_posters의 요소 /innerWidth 화면내부영역
              }
            }
            >
              {">"}
            </span>
          </div>
        </div>
            {/* 모달이 true 일 때  */}
            {modalOpen ?
            <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> : null
            // 모달창을 닫기 위해 set 내려줌
            }
    </div>
  )
}

export default Row;