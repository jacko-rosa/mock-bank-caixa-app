export function isRequired(nameProp: string, valueProp: unknown) {
    if (!valueProp) {
        throw Error(`${nameProp} is required`)
    }
}

export function shouldHasMorThen(nameProp: string, valueProp: string, limit: number) {
    if (valueProp.length < limit) {
        throw Error(`${nameProp} should has more then ${limit} characters`)
    }
}

export function shouldHas(nameProp: string, valueProp: string, limit: number) {
    if (valueProp.length != limit) {
        throw Error(`${nameProp} should has exactly ${limit} characters`)
    }
}

export function shouldHasLessThen(nameProp: string, valueProp: string, limit: number) {
    if (valueProp.length > limit) {
        throw Error(`${nameProp} should has less then ${limit} characters`)
    }
}

export function validateCPF_CNPJ(cpf_cnpj: string) {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/;

    isRequired('cpf_cnpj', cpf_cnpj);

    const hasDot = cpf_cnpj.includes(".")
    if (hasDot) {
        if (!regexCpf.test(cpf_cnpj) || !cnpjRegex.test(cpf_cnpj)) {
            throw Error(`CPF/CNPJ invalid fomat`)
        }
    } else {
        if (cpf_cnpj.length === 11 || cpf_cnpj.length === 14) {
            return
        }
        throw Error(`CPF/CNPJ should has 11 ou 14 characters`)
    }
}

