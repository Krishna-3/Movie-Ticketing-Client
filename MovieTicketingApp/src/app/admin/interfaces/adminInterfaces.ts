export interface City {
    id: number,
    city: string
}

export interface TheatreModel {
    id: number,
    nameEn: string,
    nameTe: string,
    nameHi: string,
    locationId: number
}

export interface TheatreName {
    nameEn: string,
    nameTe: string,
    nameHi: string
}

export interface MovieModel {
    id: number,
    titleEn: string,
    titleHi: string,
    titleTe: string,
    descriptionEn: string,
    descriptionHi: string,
    descriptionTe: string,
    languageEn: string,
    languageHi: string,
    languageTe: string,
    rating: number,
    photo: string
}

export interface MovieTitle {
    titleEn: string,
    titleHi: string,
    titleTe: string
}

export interface MovieDescription {
    descriptionEn: string,
    descriptionHi: string,
    descriptionTe: string
}

export interface MovieLanguage {
    languageEn: string,
    languageHi: string,
    languageTe: string
}

export interface MovieLocationModel {
    id: number,
    locationId: number,
    movieId: number,
    movie: MovieModel,
    location: City
}

export interface MovieLocationId {
    locationId: number,
    movieId: number
}