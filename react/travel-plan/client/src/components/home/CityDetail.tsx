import { City } from "@/types";
import ArrowIcon from "@/assets/icons/arrow.svg?react";
import FlightIcon from "@/assets/icons/airplanemode_active.svg?react";
import VisaIcon from "@/assets/icons/airplane_ticket.svg?react";
import VoltageIcon from "@/assets/icons/power.svg?react";
import ClockIcon from "@/assets/icons/schedule.svg?react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

interface Props {
  city: City;
}

export default function CityDetail({ city }: Props) {
  return (
    <div className="w-full flex flex-col">
      {/* 컨텐츠 영역 */}
      <div className="mb-18 flex">
        <div className="flex-1 flex flex-col mr-17">
          {/* 타이틀 */}
          <div className="mb-18">
            <h3 className="text-20 text-gray300 mb-10">
              {city.nameEn.toUpperCase()}
            </h3>
            <h2 className="text-30 font-bold">
              {city.country.name} {city.name}
            </h2>
          </div>
          {/* 설명 */}
          <p className="text-14 leading-[160%] -tracking-[0.08px] mb-18">
            {city.description}
          </p>
          {/* 부가 정보 */}
          <div className="flex gap-x-26">
            <div className="flex flex-col">
              <div className="text-15 font-semibold tracking-[0.15px] mb-16">
                <FlightIcon className="mr-8" />
                <span>항공</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                직항
              </p>
              <p> 약 {city.flightHour} 시간</p>
            </div>
            <div className="flex flex-col">
              <div className="text-15 font-semibold tracking-[0.15px]">
                <VisaIcon className="mr-8" />
                <span>비자</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                {city.country.visa.required ? "필요" : "무비자"}
              </p>
              <p>{city.country.visa.duration}일</p>
            </div>
            <div className="flex flex-col">
              <div className="text-15 font-semibold tracking-[0.15px]">
                <VoltageIcon className="mr-8" />
                <span>전압</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                콘센트
              </p>
              <p>{city.country.voltage}</p>
            </div>
            <div className="flex flex-col">
              <div className="text-15 font-semibold tracking-[0.15px]">
                <ClockIcon className="mr-8" />
                <span>시차</span>
              </div>
              <p className="text-gray600 tracking-[0.14px] text-14 mb-8">
                한국대비
              </p>
              <p>
                {city.timezoneOffset === 0
                  ? "없음"
                  : `${city.timezoneOffset}시간`}
              </p>
            </div>
          </div>
        </div>
        <img
          src={city.thumbnail}
          alt={city.name}
          className="w-[261px] rounded-10"
        />
      </div>
      {/* 버튼 영역 */}
      <div>
        <Link to={`/plan/${city.code}`}>
          <Button className="w-185 flex items-center justify-center">
            <span className="ml-8">일정 만들기</span>
            <ArrowIcon className="ml-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
