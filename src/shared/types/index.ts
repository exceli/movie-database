export interface Movie {
    id: string
    name: string
    year: number
    posterUrl: string
    description: string
    backdrop?: {
        url: string
    }
    rating: {
        imdb: number
    }
}