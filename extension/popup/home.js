const pwd = document.querySelector("#pwd")
const copy = document.querySelector("#copy-pwd")
const refresh = document.querySelector("#new-pwd")
const configuration = document.querySelector("#config-pwd-toggle")
let sizePwdNumber = document.querySelector("#size-pwd-number")
const sizePwdRange = document.querySelector("#size-pwd-range")
let amountPwdNumber = document.querySelector("#amount-pwd-number")
const amountPwdRange = document.querySelector("#amount-pwd-range")
const pwdContainEspecialCharacters = document.querySelector("#especial-characters")
const characters = document.querySelector("#characters")

configuration.addEventListener("click", () => {
    const configurationFields = document.querySelector("#config-pwd-fields")

    configurationFields.style.display = configurationFields.style.display == "none"? "flex": "none"
    pwd.style.display = pwd.style.display == "flex"? "none": "flex"
})

configuration.addEventListener("mouseover", () => {
    configuration.querySelector("i").classList.add("fa-spin-pulse")	
})
configuration.addEventListener("mouseout", () => {
    configuration.querySelector("i").classList.remove("fa-spin-pulse")	
})

copy.addEventListener("click", () => {
    const generatedPwd = document.querySelector("#generated-pwd")

    generatedPwd.select
    navigator.clipboard.writeText(generatedPwd.textContent.trim());
    copy.children[0].innerHTML = "Copied"
})

copy.addEventListener("mouseover", () => {
    copy.children[0].innerHTML = "Copy"
})

sizePwdNumber.addEventListener("change", () => {
    if(parseInt(sizePwdNumber.value) > parseInt(sizePwdNumber.max)) {
        sizePwdNumber.value = sizePwdNumber.max
    }

    sizePwdRange.value = sizePwdNumber.value
})

sizePwdRange.addEventListener("change", () => {
    sizePwdNumber.value = sizePwdRange.value
})

amountPwdNumber.addEventListener("change", () => {
    if(parseInt(amountPwdNumber.value) > parseInt(amountPwdNumber.max)) {
        amountPwdNumber.value = amountPwdNumber.max
    }

    amountPwdRange.value = amountPwdNumber.value
})

amountPwdRange.addEventListener("change", () => {
    amountPwdNumber.value = amountPwdRange.value
})

pwdContainEspecialCharacters.addEventListener("change", () => {
    if(pwdContainEspecialCharacters.checked && !characters.value) {
        pwdContainEspecialCharacters.checked = false
    }
})

characters.addEventListener("change", () => {
    if(pwdContainEspecialCharacters.checked && !characters.value) {
        pwdContainEspecialCharacters.checked = false
    }
})

refresh.addEventListener("click", () => {
    const generatedPwd = document.querySelector("#generated-pwd")
    let amountPwdNumber = document.querySelector("#amount-pwd-number")
    

    generatedPwd.textContent = ""

    for(let amount = 0; amount < parseInt(amountPwdNumber.value); amount++) {
        const pwd = ifChecked()

        if(!pwd) {
            generatedPwd.insertAdjacentHTML("beforeend", "None character selected")
            break
        } else {
            const shuffleCharacters = [...pwd]

            for(index in shuffleCharacters) {
                const randomPosition = crypto.getRandomValues(new Uint32Array(1))[0] % shuffleCharacters.length;

                [shuffleCharacters[index], shuffleCharacters[randomPosition]] = [shuffleCharacters[randomPosition], shuffleCharacters[index]]
            }

            generatedPwd.textContent += `${String.raw`${shuffleCharacters.join().replaceAll(',', '')}`}\n`
        }

    }
})

function ifChecked() {
    const pwdContainLowercase = document.querySelector("#lowercase")
    const pwdContainUppercase = document.querySelector("#uppercase")
    const pwdContainNumber = document.querySelector("#number")
    const pwdContainEspecialCharacters = document.querySelector("#especial-characters")
    const characters = document.querySelector("#characters")
    let sizePwdNumber = document.querySelector("#size-pwd-number")

    const regElements = []

    if(pwdContainLowercase.checked){
        regElements.push(pwdContainLowercase.value)
    }
    if (pwdContainUppercase.checked) {
        regElements.push(pwdContainUppercase.value)
    }
    if (pwdContainNumber.checked) {
        regElements.push(pwdContainNumber.value)
    }
    if (pwdContainEspecialCharacters.checked) {
        regElements.push(characters.value)
    }

    if(!regElements.length) {
        return false
    }

    const result = []

    for(let size = 1; size <= parseInt(sizePwdNumber.value); size++) {
        if(sizePwdNumber.value < 4) {
            result.push(all(regElements[crypto.getRandomValues(new Uint32Array(1))[0] % regElements.length]))
        } else if (sizePwdNumber.value >= 4 && sizePwdNumber.value < 8) {
            if (size === 1) { 
                regElements.forEach(element => result.push(all(element)))
                size = regElements.length
            } else {
                result.push(all(regElements[crypto.getRandomValues(new Uint32Array(1))[0] % regElements.length]))
            }
            
        } else if (sizePwdNumber.value >= 8) {
            if (size === 1) {
                for(let count = 0; count < 2; count++) { 
                    regElements.forEach(element => result.push(all(element)))
                }

                size = regElements.length * 2
            } else {
                result.push(all(regElements[crypto.getRandomValues(new Uint32Array(1))[0] % regElements.length]))
            }

        }

    }

    return String(result).replaceAll(",", "")
}

function all(range) {
    if(range == "a-z" || range == "A-Z" || range == "0-9") {
        return new RandExp(`[${range}]`).gen()
    } else if (range) {
        return range[crypto.getRandomValues(new Uint32Array(1))[0] % range.length]
    } else {
        return ""
    }
}