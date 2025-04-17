export function logInit(clazz: string, method: string, request: unknown) {
    console.log(`CLAZZ: ${clazz} | START | METHOD: ${method} | ${JSON.stringify(request)}`);
}

export function logMid(clazz: string, main_method: string, step: string, request: unknown) {
    console.log(`CLAZZ: ${clazz} | MIDLE | METHOD: ${main_method} | STEP: ${step} | CONTENT: ${JSON.stringify(request)}}`);
}

export function logEnd(clazz: string, method: string, response: unknown) {
    console.log(`CLAZZ: ${clazz} | END | METHOD: ${method} | ${JSON.stringify(response)}`);
}

export async function throwError(error: Error, clazz: string, method: string): Promise<never> {
    console.error(`CLAZZ: ${clazz} | METHOD: ${method} | ERROR: ${JSON.stringify(error)} MESSAGE: ${error.message}`);
    throw error;
}