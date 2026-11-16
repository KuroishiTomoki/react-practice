import { atom } from "jotai";

export const userState = atom({
    key:"userState",
    default: { isAdmin:false }
});