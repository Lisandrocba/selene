import { Link } from "react-router-dom"
import type { ItemProps } from "../types/homeTypes"


const Item = (props: ItemProps) => {
  const { _id, title, description, imgUrl } = props.item
  return (
    <Link to={`/pelicula/${_id}`} className="flex flex-col justify-center items-center bg-[#d8da0a] p-5 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition duration-300">
      {
        imgUrl ? (
          <img src={imgUrl} className="w-50 mb-10" alt={title} />
        ) : (
          <img src="https://placehold.co/150x250" className="w-50 mb-10" alt="Placeholder" />
        )
      }
      <h2 className="text-xl text-black">{title}</h2>
      <p className="text-xl text-black">{description}</p>
    </Link>
  )
}

export default Item
