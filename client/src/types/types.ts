import { initialUserState } from '../store/userSlice';
import { initialSliderState } from '../store/sliderSlice';

export interface RootState {
  modalState: {
    modal: boolean;
  };
  userState: initialUserState;
  sliderState: initialSliderState;
}

export interface category {
  _id: string;
  type: string;
  icon?: string;
}

export interface Profile {
  _id: string;
  userName: string;
  email: string;
  image: string;
}

export interface Post {
  _id: string;
  profile: Profile;
  number: number;
  showNumber: boolean;
  poster: string;
  image: string[];
  price: number;
  desc: string;
  category: {
    _id: string;
    type: string;
    icon: string;
  };
  city: {
    _id: string;
    type: string;
  };
  created: Date;
}
