export interface IMovie {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  year: string;
}

export interface ItemProps {
  item: IMovie
}