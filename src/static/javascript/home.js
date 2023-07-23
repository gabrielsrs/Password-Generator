const copy = document.querySelector("#copy-pwd")
const refresh = document.querySelector("#new-pwd")
const configuration = document.querySelector("#config-pwd-toggle")
const configurationFields = document.querySelector("#config-pwd-fields")
const sizePwdNumber = document.querySelector("#size-pwd-number")
const sizePwdRange = document.querySelector("#size-pwd-range")
const amountPwdNumber = document.querySelector("#amount-pwd-number")
const amountPwdRange = document.querySelector("#amount-pwd-range")
const pwdContainUppercase = document.querySelector("#uppercase")
const pwdContainLowercase = document.querySelector("#lowercase")
const pwdContainNumber = document.querySelector("#number")
const pwdContainEspecialCharacters = document.querySelector("#especial-characters")
const characters = document.querySelector("#characters")

configuration.addEventListener("click", () => {
    configurationFields.style.display = configurationFields.style.display === "none"? "flex": "none"
})

copy.addEventListener("click", () => {
    const generatedPwd = document.querySelector("#generated-pwd")
    generatedPwd.select
    navigator.clipboard.writeText(generatedPwd.textContent.trim());    
})

refresh.addEventListener("click", () => {
    const generatedPwd = document.querySelector("#generated-pwd")
    generatedPwd.innerHTML = `n!G2K4fiCB26n!G2K4fiCB26n!G2K4fiCB26nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\nn!G2K4fiCB26\n`
})