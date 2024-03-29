import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";

const initalUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};
const Nav = () => {

  const [show, setShow] = useState("false");
  const [userData, setUserData] = useState(initalUserData); //객체타입으로 받아주려고 JSON~

  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate(); 
  const {pathname} = useLocation();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); 

  const listener = () => {
    if (window.scrollY > 50 ) {
      setShow("true");
    }else {
      setShow("false");
    }
  }


  //로그인 정보 확인 후 페이지이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if(!user){
        navigate('/');
      }else if(user && pathname === "/"){
        navigate('/main');
      }
    })

  }, [auth, navigate, pathname])
  


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

  // 팝업
  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result); //로그인 데이터 가져오기
      setUserData(result.user); 
      //정보유지하기
      localStorage.setItem('userData',JSON.stringify(result.user) );
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  const handleLogOut = () => {
    signOut(auth).then(()=> {
      setUserData({});
      localStorage.removeItem('userData');

    }).catch((error)=>{
      alert(error.message);
    })
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

      {/* 로그인 화면에서 검색창 가리기 */}
      {pathname === "/" ? (
        <Login
          onClick={handleAuth}
        > 로그인
        </Login>
      ) :

      <Input
        type="text"
        className="nav_input"
        placeholder="영화를 검색해주세요."
        value={searchValue}
        onChange={handleChange}
        // onChange={(e)=>setSearchValue(e.target.value)} 대신 handleChange
      />
      }
  
      {pathname !== "/" ?
       <SignOut>
          <UserImg src= {userData.photoURL} alt ={userData.displayName}/>
          <DropDown>
            <span onClick={ handleLogOut }>
              Sign Out
            </span>
          </DropDown>
        </SignOut>
        : null
        
      }

    </NavWrapper>
  )
}

const DropDown = styled.div`
  position:absolute;
  top:48px;
  right:0;
  width:100%;
  padding: 10px;
  background:rgb(19,19,19);
  border:1px solid rgba(151,151,151,0.34);
  box-shadow:rgb(0 0 0 / 50%) 0px 0px 18px 0px ;
  font-size:14px;
  letter-spacing:3px;
  opacity:0;
`
const SignOut = styled.div`
  position:Relative;
  height:48px;
  width:48px;
  displat:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;

  &:hover{
    ${DropDown}{
      opacity:1;
      transition-duration: 1s;
  }
  }
`
const UserImg = styled.img`
  border-radius:50%;
  width:100%;
  height:100%;
`


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
  width:100%;
  
}
`;

export default Nav;