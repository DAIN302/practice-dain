import { categories } from "@/constant";
import { Place } from "@/types";
import cn from "classnames";

interface Props {
  category: Place["category"];
  className?: string;
}

export default function PlaceCategory({ category, className }: Props) {
  return (
    <span className={cn("text-main font-medium", className)}>
      {categories[category]}
    </span>
  );
}
