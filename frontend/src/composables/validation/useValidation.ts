
export const emailRules = {
    regex: (value: string) => /^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,4}$/.test(value) || 'Helytelen e-mail cím formátum!', 
}

export const requiredRules = {
    required: (value: string) => !!value || 'A mező kitöltése kötelező!',
}

export const dangerousCharactersRules = {
    dangerousCharacter: (value: string) => !/<|>/.test(value) || 'tiltott karakter!'
}