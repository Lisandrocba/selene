import type { ItemProps } from "../types/homeTypes"


const Item = (props: ItemProps) => {
  const { title, description } = props.item

  return (
    <div className="flex flex-col justify-center items-center bg-gray-700 p-5 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition duration-300">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Item
