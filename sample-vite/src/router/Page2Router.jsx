

import { Page2 } from "../Page2";
import { UrlParameter } from "../UrlParameter";

export const Page2Router = [
    {
        path:"/",
        Children:<Page2/>
    },
    {
        path:"/:id",
        Children:<UrlParameter/>
    }

]