import {styled} from 'styled-components';

// import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';

const MainPage  = () => {
  return (
      <Container>
      {/* <Nav />  App.jsx에서 호출되어있음   */}
      <Banner/>
      <Row title="Trending now" id="TN" fetchUrl ={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl ={requests.fetchTopRated}/>
      <Row title="Action Movies" id="AM" fetchUrl ={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" id="CM" fetchUrl ={requests.fetchComedyMovies}/>
    </Container>
  )
}

// 컨테이너
const Container = styled.main`
position: relative;
display: block;
top:70px;
padding: 0 calc(3.5vw + 5px);
`

export default MainPage;
