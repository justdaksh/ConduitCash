import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const usernameAtom = atom({
  key: "username",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const firstnameAtom = atom({
  key: "firstnameAtom",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const lastnameAtom = atom({
  key: "lastnameAtom",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const emailAtom = atom({
  key: "emailAtom",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const passwordAtom = atom({
  key: "passwordAtom",
  default: "",
});

export const numberAtom = atom({
    key: "numberAtom",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const balanceAtom = atom({
    key: 'balanceAtom',
    default: null,
});

export const tokenAtom = atom({
    key: 'tokenAtom',
    default: localStorage.getItem('token') || '',
  });

export const receiverAtom = atom({
    key:"receiverAtom",
    default:"",
    effects_UNSTABLE: [persistAtom],
})

export const sendToAtom = atom({
    key:"sendToAtom",
    default:""
})

export const sendAmountAtom = atom({
    key:"sendAmountAtom",
    default:""
})