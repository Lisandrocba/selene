import type { ItemProps } from "../types/homeTypes"


const Item = (props: ItemProps) => {
  const { title, description, imgUrl } = props.item
  console.log(imgUrl)
  return (
    <div className="flex flex-col justify-center items-center bg-[#d8da0a] p-5 text-black text-xl rounded-lg shadow-lg cursor-pointer hover:scale-105 transition duration-300">
      {
        imgUrl ? (
          <img src={imgUrl} className="w-50 mb-10" alt={title} />
        ) : (
          <img src="https://placehold.co/150x250" className="w-50 mb-10" alt="Placeholder" />
        )
      }
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Item
