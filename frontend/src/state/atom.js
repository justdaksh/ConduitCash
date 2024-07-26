import { atom, selector } from "recoil";

export const usernameAtom = atom({
  key: "username",
  default: "",
});

export const firstnameAtom = atom({
  key: "firstnameAtom",
  default: "",
});

export const lastnameAtom = atom({
  key: "lastnameAtom",
  default: "",
});

export const emailAtom = atom({
  key: "emailAtom",
  default: "",
});

export const passwordAtom = atom({
  key: "passwordAtom",
  default: "",
});

export const numberAtom = atom({
    key: "numberAtom",
    default: "",
})

export const userIdAtom = atom({
    key: 'userId',
    default: localStorage.getItem('userId') || null,
  });

export const balanceAtom = atom({
    key: 'balanceAtom',
    default: null,
});

export const tokenAtom = atom({
    key: 'tokenAtom',
    default: localStorage.getItem('token') || '',
  });

export const userNameSelector = selector({
    key: 'userNameSelector',
    get: ({ get }) => {
      const userId = get(userIdAtom);
      
      return userId ? 'User' : 'Guest';
    },
  });

export const sendToAtom = atom({
    key:"sendToAtom",
    default:""
})

export const sendAmountAtom = atom({
    key:"sendAmountAtom",
    default:""
})