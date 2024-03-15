import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "../../api/axios";

//searchTerm가져오기
const SearchPage = () => {
  // const location = useLocation();
  // console.log(location);
  const [searchResults, setSearchResults] = useState([]);

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
      console.log(response);
      setSearchResults(response.data.results);

    }catch (error){
      console.error(error);
    }
  }

  
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage;