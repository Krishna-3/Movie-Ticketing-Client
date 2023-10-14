export interface City {
    id: number,
    city: string
}

export interface MovieEn {
    id: number,
    titleEn: string,
    descriptionEn: string,
    languageEn: string,
    rating: number,
    photo: string,
    type: string
}

export interface MovieTe {
    id: number,
    titleTe: string,
    descriptionTe: string,
    languageTe: string,
    rating: number,
    photo: string,
    type: string
}

export interface MovieHi {
    id: number,
    titleHi: string,
    descriptionHi: string,
    languageHi: string,
    rating: number,
    photo: string,
    type: string
}

export interface Movie {
    id: number,
    title: string,
    description: string,
    language: string,
    rating: number,
    photo: string
}

export interface Seat {
    id: number,
    seatNumber: string,
    booked: boolean
}