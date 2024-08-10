export interface Movie {
    id: string
    name: string
    year: number
    posterUrl: string
    description: string
    backdrop?: {
        url: string
    }
    isPlaylist?: boolean
    poster?: {
        previewUrl: string
    }
    rating: {
        imdb: number
    }
}