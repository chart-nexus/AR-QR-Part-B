export type File = {
    id: number,
    folder_location: string,
    file_path: string,
    need_verify: boolean,
    page: number
}

export type FilesResponseDto = File[]
