import classNames from "classnames";

interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Switch({ id, checked, onChange }: Props) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.currentTarget.checked)}
        className="opacity-0 w-0 peer"
      />
      <label
        htmlFor={id}
        className={classNames(
          "flex items-center rounded-full h-15 w-27 bg-gray400 px-3",
          "before:inline-block before:h-10 before:w-10 before:rounded-full before:bg-white",
          "peer-checked:bg-main peer-checked:before:translate-x-11",
          "transition-colors duration-300 before:transition-transform before:duration-300"
        )}
      ></label>
    </>
  );
}
