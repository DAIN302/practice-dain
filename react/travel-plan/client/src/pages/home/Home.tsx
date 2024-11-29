import NarrowLayout from "@/components/common/NarrowLayout";
import WideLayout from "@/components/common/WideLayout";
import CityList from "@/components/home/CityList";
import FilterList from "@/components/home/FilterList";
import SearchInput from "@/components/home/SearchInput";
import { City } from "@/types";

export default function Home() {
  // const {data} = useQuery(국가필터, 검색필터)
//   const [search, setSearch] = useState('')

  return (
    <NarrowLayout className="flex flex-col items-center my-30">
      {/* 검색창 */}
      <div className="w-[339px] mb-24">
        <SearchInput onCompositionEnd={() => {}} />
      </div>
      {/* 국가필터 */}
      <div className="mb-21">
        <FilterList active="all" onChange={() => {}} />
      </div>
      {/* 여행지 리스트 */}
      <CityList cities={DUMMY_DATA} />
    </NarrowLayout>
  );
}

const DUMMY_DATA: City[] = [
  {
    city: "seoul",
    name: "서울",
    description: "서울의 설명",
    thumbnail: "https://picsum.photos/300/200?random=1",
  },
  {
    city: "Busan",
    name: "부산",
    description: "부산의 설명",
    thumbnail: "https://picsum.photos/300/200?random=2",
  },
  {
    city: "suwon",
    name: "수원",
    description: "수원의 설명",
    thumbnail: "https://picsum.photos/300/200?random=3",
  },
  {
    city: "jeju",
    name: "제주",
    description: "제주의 설명",
    thumbnail: "https://picsum.photos/300/200?random=4",
  },
  {
    city: "daejeon",
    name: "대전",
    description: "대전의 설명",
    thumbnail: "https://picsum.photos/300/200?random=5",
  },
  {
    city: "incheon",
    name: "인천",
    description: "인천의 설명",
    thumbnail: "https://picsum.photos/300/200?random=6",
  },
];
