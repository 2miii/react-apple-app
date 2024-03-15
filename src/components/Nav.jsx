import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { styled } from "styled-components";


const Nav = () => {

  const [show, setShow] = useState("false");
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); //

  const listener = () => {
    if (window.scrollY > 50 ) {
      setShow("true");
    }else {
      setShow("false");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listener);
  
    return () => {
      window.removeEventListener("scroll", listener);
    }
  }, [])
  

  const handleChange = (e) =>{
    setSearchValue(e.target.value) ;
    navigate(`/search?q=${e.target.value}`); //App.jsx에서 route path='search' 경로이용하므려
  }

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      <Input
          type="text"
          className="nav_input"
          placeholder="영화를 검색해주세요."
          value={searchValue}
          onChange={handleChange}
          // onChange={(e)=>setSearchValue(e.target.value)} 대신 handleChange
      ></Input>
      <Login>로그인</Login>
    </NavWrapper>
  )
}

// input
const Input =styled.input`
  position:fixed;
  left:50%;
  transform:translate(-50%, 0);
  background-color:rgba(0,0,0,0.5);
  border-radius:5px;
  color:white;
  padding:5px;
  border:1px solid lightgray;
`
const Login =styled.a`
  padding:8px 16px;
  background-color:rgba(0,0,0,0.6);
  text-transform: uppercase;
  letter-spacing:1.5px;
  border:1px solid #f9f9f9;
  border-radius:4px;
  transition: all 0.2s ease;

    &:hover{
      background-color:#f9f9f9;
      color:#000000;
      border-color:transparent;
    }
`

// nav 
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show === "true" ? "#090b13" : "#090b13")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
padding: 0;
width: 70px;
font-size:0;
display:inline-block;
margin-bottom:10px;

img{
  display: inline-block;
  width:106px;
  height:40px;
}
`;

export default Nav;