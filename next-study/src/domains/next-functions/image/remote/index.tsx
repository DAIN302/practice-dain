import Image, { ImageLoaderProps } from "next/image";
import { FC } from "react";

// 이미지 주소를 이용해서 이미지를 넣는 경우

const RemoteMain: FC = () => {
  return (
    <main>
      <Image
        src="/bmo2.jpg"
        width={500}
        height={300}
        loader={imageLoader}
        quality={50}
        loading="lazy"
        alt="image"
      />
      {/* remote image 는 이미지의 가로 사이즈, 세로 사이즈 둘 다 지정 필요
    이유? 이미지에 대한 정보를 모르기 때문(외부에서 가져와서, 이미지를 실제로 요청하기 전까지는 아무런 정보가 없음)  */}
      {/* loader : 이미지 서버에 있는 이미지를 가져올 때 next 에서 자체적으로 만들어주는 src set 이 도움이 안되는
    경우가 있어서 이를 커스텀 해주는 옵션*/}
    {/* <Image src="/bmo2.jpg" width={500} height={300} alt="image" placeholder="blur" blurDataURL=""/> */}
    {/* loading : 최적화 옵션 기본값은 lazy 
    lazy 옵션을 주면 뷰포트 바깥에서는 렌더링을 하지 않음, 따라서 성능상의 이점이 있음
    끄는 법 -> eager 공식문서에서는 권장하지 않음
    옵션을 끄기보다 우선순위를 높이는 것이 더 바람직
    */}
    </main>
  );
};

export { RemoteMain };

// loader 함수
function imageLoader(params: ImageLoaderProps) {
  const { src, width, quality } = params;

  console.log(src, width, quality);

  return `/img${src}?w=${width}&q=${quality}`;
}
