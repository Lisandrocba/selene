export interface IPropsDetallePelicula {
  id: string
}

export interface IUrerId {
  _id: string
  username: string
}

export interface IComments {
  _id: string
  comment: string
  movieId: string
  userId: IUrerId
  createdAt: string
}

export interface IPropsAddComment {
  comment: string
  change: (e: React.ChangeEvent<HTMLInputElement>) => void
  setOpen: () => void
  submit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>
}