import { City } from "./movie"

export interface TheatreEn {
    id: string,
    nameEn: string,
    type: string
}

export interface TheatreTe {
    id: string,
    nameTe: string,
    type: string
}

export interface TheatreHi {
    id: string,
    nameHi: string,
    type: string
}

export interface Theatre {
    id: string,
    name: string
}

export interface TheatreWithLocation {
    id: string,
    name: string,
    location: City
}