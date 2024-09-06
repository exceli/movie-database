export interface Movie {
    id: string
    name: string
    year: number
    posterUrl: string
    description: string
    dateAdded?: string
    isWatched?: boolean
    backdrop?: {
        url: string
    }
    isPlaylist?: boolean
    poster?: {
        previewUrl: string
        url: string
    }
    rating: {
        imdb: number
    }
}