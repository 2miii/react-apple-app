
import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';

function App() {

  return (
    <Container>
    <Nav />
    <Banner/>
    </Container>
  )
}

// 컨테이너
const Container = styled.main`
postion: relative;
display: block;
top:70px;
padding: 0 calc(3.vw + 5px);
`
export default App;
