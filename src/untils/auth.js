// token 处理

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return window.sessionStorage.removeItem(TokenKey)
}
