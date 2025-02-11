export function logInit(clazz: string, method: string, request: unknown) {
    console.log(`START | class:${clazz} | method:${method} | request:${JSON.stringify(request)}`);
}

export function logMid(clazz: string, main_method: string, step: string, request: unknown) {
    console.log(`MIDLE | class:${clazz} | main_method:${main_method}| step:${step} | ${JSON.stringify(request)}`);
}

export function logEnd(clazz: string, method: string, response: unknown) {
    console.log(`END | class:${clazz} | method:${method} | response:${JSON.stringify(response)}`);
}

export function throwError(msgError: string, error: unknown) {
    console.error(`${msgError}${error}`);
    throw new Error(msgError);
}

