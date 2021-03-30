/**
 * @param 引入路由
 */
import router from '@/router'; // vue-router

/**
 * @param 定义变量
 */
const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-Token-Refresh'
const TokenExpire = 'Admin-Token-expire'
const SidebarOpened = 'App-sidebar-opened'

// 操作token
export function setToken(token) {
    localStorage.setItem(TokenKey, token);
}
export function getToken() {
    return localStorage.getItem(TokenKey)
}
export function removeToken() {
    localStorage.removeItem(TokenKey)
}

// 操作refreshToken
export function setRefreshToken(refreshToken) {
    localStorage.setItem(RefreshTokenKey, refreshToken);
}
export function getRefreshToken() {
    return localStorage.getItem(RefreshTokenKey)
}
export function removeRefreshToken() {
    localStorage.removeItem(RefreshTokenKey)
}

// 操作tokenExpire
export function setTokenExpire(tokenExpire) {
    localStorage.setItem(TokenExpire, tokenExpire);
}
export function getTokenExpire() {
    return localStorage.getItem(TokenExpire)
}
export function removeTokenExpire() {
    localStorage.removeItem(TokenExpire)
}

// 操作sidebarOpened
export function setSidebarOpened(sidebarOpened) {
    localStorage.setItem(SidebarOpened, sidebarOpened);
}
export function getSidebarOpened() {
    if(localStorage.getItem(SidebarOpened) === 'true'){
        return true
    }else{
        return false
    }
}


// 退出登录
export function returnToLogin(){
    /**
     * 调用vueX里面的方法，清空本地存储
     */
    router.push({
        path: "/login"
    });
}
