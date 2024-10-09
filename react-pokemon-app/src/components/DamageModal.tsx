import React, { useRef } from "react";
import DamageRelation from "./DamageRelation.tsx";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { DamageRelations } from "../types/DamageRelationOfPokemonTypes.ts";

interface DamageModalProps {
  damages : DamageRelations[];
  setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const DamageModal = ({ setIsModalOpen, damages }:DamageModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 모달 본문 바깥 클릭 시 모달창 닫기
  useOnClickOutside(ref, () => setIsModalOpen(false));

  return (
    // 모달 배경
    <div className="flex items-center justify-center z-40 fixed left-0 bottom-0 w-full h-full bg-gray-800">
      {/* 모달 본문 */}
      <div className="modal bg-white rounded-lg w-1/2" ref={ref}>
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full justify-between">
            <div className="text-gray-900 font-medium text-lg">데미지 관계</div>
            <span
              className="text-gray-900 font-medium text-lg cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </span>
          </div>
          <DamageRelation damages={damages} />
        </div>
      </div>
    </div>
  );
};

export default DamageModal;
