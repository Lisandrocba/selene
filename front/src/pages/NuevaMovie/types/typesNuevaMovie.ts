export interface IFormMovie {
  title: string;
  description: string;
  year: string;
  userId: string;
  imgUrl: string;
}

export type IFormMovieErrors = Partial<Record<keyof IFormMovie, string>>;