
//만들어준 api axios 사용
import axios from '../api/axios';
import requests from '../api/requests';
import{useState, useEffect } from 'react';
import './Banner.css';


const Banner = () => {

  const [movie, setMovie] = useState([]);

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
      params: {append_to_response:"videos"}
    })
    setMovie(movieDetail);
  }

  return (
    <div>Banner</div>
  )
};

export default Banner;