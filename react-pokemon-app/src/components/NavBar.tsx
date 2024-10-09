import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// 파이어베이스 사용을 위한 import
import {
  User
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../firebase";

const userDataFromStorage = localStorage.getItem("userData")

// 로그인 데이터 유지를 위해 로컬 스토리지의 데이터 가져오기
// 새로고침 하더라도 로컬스토리지에 유저데이터가 있기 떄문에 로그인 유지 가능
const initialUserData = userDataFromStorage ? JSON.parse(userDataFromStorage) : null;

const Navbar = () => {
  // 파이어베이스
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // 스크롤에 따른 navbar 색상 변경을 위한 state
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<User | null>(initialUserData);

  // 로그인 페이지에서만 로그인 버튼 보여주기 위한 pathname 읽어오기
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      // 로그인하면 _UserImpl 객체 로그아웃 하면 null
      if (!user) {
        // 로그인 상태 아니라면 로그인 페이지로
        navigate("/login");
      } else if (user && pathname === "/login") {
        // 로그인이 되어 있고, login 페이지면 메인페이지 이동
        navigate("/");
      }
    });

    return () => {
      // 언마운트 시 호출
      unsubscribe();
    };
  }, [pathname]);

  // 파이어베이스
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result); // _UserCrendential 객체
        setUserData(result.user);
        // 로그인 데이터 유지를 위해 로컬스토리지에 유저 데이터 저장
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    // 마운트될 떄 스크롤 이벤트 함수 등록
    window.addEventListener("scroll", listener);

    return () => {
      // 언마운트될 때 스트롤 이벤트 함수 제거
      window.removeEventListener("scroll", listener);
    };
  }, []);

  // 로그아웃 함수
  const handleLogOut = () => {
    // 파이어베이스에서 제공해주는 로그아웃 함수
    signOut(auth)
      .then(() => {
        setUserData(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`;

  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt="poke logo"
          src={img}
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/login" ? (
        <Login onClick={handleAuth}>로그인</Login>
      ) : (
        <SignOut>
          { userData?.photoURL && 
            <UserImage src={userData.photoURL} alt={"user photo"} />
          }
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

// 유저 이미지 styled-component
const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

// 로그아웃 버튼 styled-component
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

// 로그아웃 styled-component
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

// 로그인 버튼 styled-component
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  color: white;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

// image styled-component
const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;

// logo styled-component
const Logo = styled.a`
  display: block;
  padding: 0;
  width: 50px;
  margin-top: 4px;
`;

// nav styled-component
const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
`;
// show state 가 true 면 navbar의 색상 변경

export default Navbar;
