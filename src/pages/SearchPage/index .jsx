import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";

//searchTerm가져오기
const SearchPage = () => {
  // const location = useLocation();
  // console.log(location);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
    //http://localhost:5173/search?뒤 가져오기
  }

  let query = useQuery();
  const searchTerm = query.get('q');
  // console.log(searchTerm);

  // searchTerm이 바뀔 때마다 새로 영화 데이터 가져오기 
  useEffect(() => {
    if(searchTerm){
      fetchSearchMovie(searchTerm);

    }
  }, [searchTerm])
  
  const fetchSearchMovie =async (searchTerm) => {
    try{
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      // console.log(response); 가져오는지 확인
      setSearchResults(response.data.results);

    }catch (error){
      console.error(error);
    }
  }

  // 영화 이미지 가져오기
  if(searchResults.length > 0) {
    return (
      <section className="search_container">
        {searchResults.map((movie)=>{
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return(
                <div className="movie" key={movie.id}>
                  <div
                    onClick={() => navigate(`/${movie.id}`)}
                    className="movie_column-poster"
                  >
                    <img
                       src={ movieImageUrl}
                       alt="movie"
                       className="movie_poster"
                    />
                  </div>
                </div>
              )
          }


        })}
      </section>
    )
  }else {
    return(
      <section className="no_results">
        <div className="no_results-text">
          <p>
            검색하신 '{searchTerm}'에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }
  
  
}

export default SearchPage;