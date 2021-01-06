import { useImmer } from "use-immer";
import { createContainer } from "unstated-next";

export interface ICurrentUser {
  character: string[];
  name: string;
  phone: string;
  user_id: number;
}

type UserState = ICurrentUser | null;


export const useUser = (initialState = null) => {
  const [user, updateUser] = useImmer<UserState>(initialState);

  const saveUser = (user: ICurrentUser) => {
    updateUser((draft) => {
      draft = user;
    });
  };

  return { user, saveUser };
};

const User = createContainer(useUser);

export const UserProvider = User.Provider;

export const useUserContainer = () => User.useContainer();
