interface Props {
  title: string;
  description: string;
  image: string;
}

export default function Card({ title, description, image }: Props) {
  return (
    <div className="flex flex-col">
      <img
        className="w-[316px] h-190 rounded-10 mb-20"
        src={image}
        alt={title}
      />
      <div className="px-11">
        <h3 className="text-22 text-gray900 font-medium mb-10">{title}</h3>
        <p className="text-16 text-gray600">{description}</p>
      </div>
    </div>
  );
}
