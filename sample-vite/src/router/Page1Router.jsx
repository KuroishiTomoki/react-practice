
import { Page1 } from "../Page1";
import { UrlParameter } from "../UrlParameter";

export const Page1Router = [
    {
        path:"/page1",
        Children:<Page1/>
    },
    {
        path:"/page1/:id",
        Children:<UrlParameter/>
    }
]