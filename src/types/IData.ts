export interface IPosts {
  _id: string;
  description: string;
  comments: string[];
  image: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  }
  created_at: number;
  likes: number;

}

export type postState = {
  posts: IPosts[];
  isLoadingPosts: boolean;
  editPostId: string;
}

export type userState = {
  currentUser: Ilogin,
  isAuth: boolean
  isLoading: boolean
}

export interface Ilogin {
  token: string;
  username: string;
  _id: string;
  avatar: string;
}



