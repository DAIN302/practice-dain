import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckBox = forwardRef<HTMLInputElement, Props>(function CheckBox(
  { label, ...props },
  ref
) {
  return (
    <label className="relative h-26 flex items-center">
      <input
        className="peer opacity-0 w-26 h-26"
        ref={ref}
        type="checkbox"
        {...props}
      />
      <FontAwesomeIcon
        icon={faSquare}
        className="absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transition-opacity"
      />
      <FontAwesomeIcon
        icon={faSquareCheck}
        className="absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transition-opacity"
      />
      <span className="pl-14">{label}</span>
    </label>
  );
});

export default CheckBox;
