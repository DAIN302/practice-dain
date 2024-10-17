import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  onChange?: (value: T) => void;
}

export default function Dropdown<T>({
  children,
  options,
  onChange,
}: PropsWithChildren<DropdownProps<T>>) {
  // 메뉴가 오픈된 상태
  const [opened, setOpened] = useState(false);
  // 선택된 데이터 정보 상태
  const [selected, setSelected] = useState(-1); // 인덱스 값을 갖는다.

  // open, close handler -> 성능 최적화를 위해 useCallback 사용, 함수 한번 생성되고 재활용이 가능하기 때문
  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  const handleChange = useCallback(
    (index: number) => {
      setSelected(index);
      onChange?.(options[index].value);
      close();
    },
    [close, onChange, options]
  );

  return (
    <DropdownContext.Provider
      value={{
        opened,
        open,
        close,
        options,
        selected,
        onChange: handleChange,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

// options 타입 지정
type DropdownOption<T> = {
  label: ReactNode;
  value: T; //value 는 사용자가 입력했을 때 받기 위해 제네릭으로 지정
};

// context 타입 지정을 위한 인터페이스
interface DropdownContextType<T = unknown> {
  // context 객체 만들었을 때 타입을  알 수 없기 떄문에 오류 발생, 그래서 unknown 으로 디폴트 설정
  opened: boolean;
  open: () => void;
  close: () => void;
  options: DropdownOption<T>[]; // 배열데이터로 받음
  selected: number;
  onChange: (index: number) => void;
}

// 전역으로 관리하기 위해 context 사용
const DropdownContext = createContext<DropdownContextType | null>(null);

// 드롭다운 버튼 컴포넌트
export function DropdownButton({ placeholder }: { placeholder?: string }) {
  const { open, options, selected } = useContext(DropdownContext)!;

  return (
    <button onClick={open}>
      {selected >= 0 ? options[selected].label : placeholder ?? ""}
    </button>
  );
}

// 드롭다운 메뉴
export function DropdownMenu() {
  const { opened, options, onChange } = useContext(DropdownContext)!;
  // opened 가 true 일때만 렌더링
  return opened ? (
    <div>
      {options.map((option, index) => (
        <DropdownMenuItem
          key={`${option.value}`}
          label={option.label}
          onSelect={() => onChange(index)}
        />
      ))}
    </div>
  ) : null;
}

// 드롭다운 메뉴에서 출력되는 아이템들
function DropdownMenuItem({
  label,
  onSelect,
}: {
  label: ReactNode;
  onSelect: () => void;
}) {
  return <button onClick={onSelect}>{label}</button>;
}
