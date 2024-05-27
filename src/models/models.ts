import {IconType} from "react-icons";


export type Tabs = {
    id: number,
    title: string,
    icon: IconType
}

export type User = {
    ids: string[]
    _id: string;
    id: string,
    username: string,
    password: string,
    roles: string[],
    active: boolean,
    rating: string,
    phone: string
}


export type Order = {
    id: number,
    name: string,
    time: string,
    date: string,
    phone_number: string
}