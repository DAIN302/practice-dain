import React from "react";

// 로그인 페이지
const LoginPage = () => {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png`;
  return (
    <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* 텍스트 */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl shadow-lg max-w-3xl p-5">
            Pokemon
          </h2>
          <p className="text-xs mt-4 text-[#002d74]">
            포켓몬 사이트에 오신 것을
          </p>
          <p className="text-xs mt-4 text-[#002d74]">환영합니다.</p>
          <p className="text-xs mt-4 text-[#002d74]">로그인 해주세요.</p>
        </div>
        {/* 이미지 */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={img} alt="login-img" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
