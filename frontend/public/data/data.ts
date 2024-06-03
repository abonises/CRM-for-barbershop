import {Tabs} from "../../src/models/models";
import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineReviews } from "react-icons/md";

export const URL_API = '';

export const tabsArray: Tabs[] = [
    {
        id: 1,
        title: 'Stuff',
        icon: IoPerson
    },
    {
        id: 2,
        title: 'Orders',
        icon: CgNotes
    },
    {
        id: 3,
        title: 'Reviews',
        icon: MdOutlineReviews
    }
]