
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {imageBasePath} from "../../constant";
import './DetailPage.css';
import styled from "styled-components";

const DetailPage = (
) => {
  // console.log(useParams());
  //movieId로 나오는 이유는 Roter path=":movieId"로 해줘서

  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(
        `/movie/${movieId}`
      );
      setMovie(response.data);
    }
    fetchData();
  }, [movieId])
  
  if(!movie) return null;

  const truncate = (string, number) => {
    return string?.length > number ? string.substring(0,number) + "...": string;
  }
  

  return (
    <Container>
      <div className="Detail_Wrap">
        <img
          className="Detail_img"
          src={`${imageBasePath}${movie.backdrop_path}`}
          alt="detail_img"
        />
        <div className="Detail_contents">
          <h1 className="Detail_title">
            {movie.title || movie.name || movie.original_title}
          </h1>

          
          <p className="modal_genres">
            장르:{" "}
            {movie.genres.map((genre, index) => (
            <span key={index}>{genre.name}</span>
              ))}
           &nbsp; ||  &nbsp;

            <span>
              상영시간 : {movie.runtime} 분
            </span>
          </p>


          {/* 영화 줄거리요약 */}
          <p className="Detail_description">
          &nbsp;
          {/* 100글자 이내로 줄임 */}
          {truncate(movie.overview, 200)}
          </p>
        </div>
      </div>
    </Container>
  )
}


const Container = styled.div`
  display:flex;
  justify-content:center;
  padding:100px calc(3.5vw + 5px) 0;
`


export default DetailPage;