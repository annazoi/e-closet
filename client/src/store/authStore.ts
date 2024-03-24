import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  username: string;
  avatar: string;
  userId: string;
  closetId: string;
  exp: number;
  logOut: () => void;
  logIn: (payload: any) => void;
}

const initialStateValues = {
  isLoggedIn: false,
  token: "",
  username: "",
  userId: "",
  closetId: "",
  avatar: "",
  exp: 0,
};

export const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        logOut: () => {
          set({
            ...initialStateValues,
          });
        },
        logIn: (payload: any) =>
          set({
            isLoggedIn: true,
            username: payload.username,
            token: payload.token,
            avatar: payload?.avatar,
            userId: payload.userId,
            closetId: payload.closetId,
            exp: payload.exp,
          }),
        updateProfile: (payload: any) =>
          set((state) => ({
            ...state,
            ...payload,
          })),
      }),
      {
        name: "e-Closet-auth",
      }
    )
  )
);

export const getAuthState = (): AuthState => {
  return authStore.getState();
};
