import {useEffect, useState} from "react";
import { styled } from "styled-components"


const Nav = () => {

  const [show, setShow] = useState("false");

  const listener = () => {
    if (window.scrollY > 50 ) {
      setShow("true");
    }else {
      setShow("false");
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener);
  
    return () => {
      window.removeEventListener('scroll', listener);
    }
  }, [])
  

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={() => ( window.location.href ="/" )}

        />
      </Logo>
    </NavWrapper>
  )
}


// nav 
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show === "true" ? "#090b13": "#090b13"} ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo =styled.a`
padding: 0;
width: 70px;
font-size:0;
display:inline-block;
margin-bottom:10px;

img{
  display: inline-block;
  margin-bootom:10px;
}
`;

// scroll


export default Nav;