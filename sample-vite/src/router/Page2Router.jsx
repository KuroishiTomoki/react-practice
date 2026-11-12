

import { Page2 } from "../Page2";
import { UrlParameter } from "../UrlParameter";

export const Page2Router = [
    {
        path:"/page2",
        Children:<Page2/>
    },
    {
        path:"/page2/:id",
        Children:<UrlParameter/>
    }

]