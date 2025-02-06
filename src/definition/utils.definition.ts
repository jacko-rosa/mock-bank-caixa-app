export interface Response {
    response: object, status: HttpStatus
}

export interface HttpStatus {
    status: number
}

const OK: HttpStatus = { status: 200 }
const BAD_REQUEST: HttpStatus = { status: 400 }
const UNAUTHORIZED: HttpStatus = { status: 401 }
const INTERNAL_ERROR: HttpStatus = { status: 500 }

export const ResponseStatus = {
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    INTERNAL_ERROR

}