import { create } from "zustand";

// if loggedUser has a phone number means the user is logged in.
export const useLoggedUserStore = create(
    (set) => ({
        loggedUser: {userPhoneNumber: null},
        setLoggedUser: (userPhone) => set(
            () => ({userPhoneNumber: userPhone})
        )
    })
)