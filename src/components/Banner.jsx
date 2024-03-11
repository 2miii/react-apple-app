
//만들어준 api axios 사용
import axios from '../api/axios';
import requests from '../api/requests';
import{useState, useEffect } from 'react';
import './Banner.css';


const Banner = () => {

  const [movie, setMovie] = useState(null);

  //배너 이미지 가져오기
  useEffect(() => {
    fetchData();  
  }, [])

  const fetchData = async() => {
    //현재 상영중인 영화 정보 가져오기(여러개)
    const response = await axios.get(requests.fetchNowPlaying);
      console.log(response);
    
    //여러 영화 중 하나의 영화 ID 가져오기
    const movieId = 
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    
    //특정 영화 > 상세 정보 가져오기 (비디오 포함)
    const {data:movieDetail} = await axios.get (`movie/${movieId}`,{
      params: {
        append_to_response:"videos"
      }
    })
    console.log('movieDetail',movieDetail);
    setMovie(movieDetail);
  }

  //영화설명 줄이기 - 특정 숫자에서 텍스트를 잘라줌
  const truncate = (string, number) => {
    return string?.lngth > number ? string.string.substring(0,n) + "...": string;
  }

  if (!movie) {
    return (
        <div>
            Loading...
        </div>
    )
  } else {
    return (
        <div
          className='banner'
          style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition:'top center',
            backgroundsize:'cover'
          }}
        >
         <div className='banner_contents'>
            <h1 className='banner_title'>
              {movie.title || movie.name || movie.original_title}
            </h1>
         </div>
         <div>
          {/* 해당 영화에 비디오가 있을 떄만 버튼 보여줌 */}
            {movie.videos?.results[0]?.ket ?
            <button
               className='banner_button play'
            >
              play
            </button>
            :null
          }
         </div>
         {/* 영화 줄거리요약 */}
         <p className='banner_description'>
          {/* 100글자 이내로 줄임 */}
          {truncate(movie.overview,100)}
         </p>
        </div>
    )
  }
}


export default Banner;