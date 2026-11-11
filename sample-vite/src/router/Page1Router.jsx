
import { Page1 } from "../Page1";
import { Page1DetailA } from "../Page1DetailA";
import { Page1DetailB } from "../Page1DetailB";

export const Page1Router = [
    {
        path:"/page1",
        Children:<Page1/>
    },
    {
        path:"/page1/detailA",
        Children:<Page1DetailA/>
    },
    {
        path:"/page1/detailB",
        Children:<Page1DetailB/>
    },

]