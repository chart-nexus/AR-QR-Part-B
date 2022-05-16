export type Keywords = {
    id: number,
    word: string,
    score: number
}

export type Configs = {
    id: number,
    sheet_name: string,
    threshold: number,
    keywords: Keywords[]
}

export type ConfigsResponseDto = Configs[]
