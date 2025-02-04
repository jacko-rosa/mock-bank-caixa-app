export interface response {
    response: object, status: httpStatus
}

export interface httpStatus {
    status: number
}

const OK: httpStatus = { status: 200 }
const BAD_REQUEST: httpStatus = { status: 400 }
const UNAUTHORIZED: httpStatus = { status: 401 }
const INTERNAL_ERROR: httpStatus = { status: 500 }

export const ResponseStatus = {
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    INTERNAL_ERROR

}