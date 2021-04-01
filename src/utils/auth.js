/**
 * @param 引入路由
 */
import router from '@/router'; // vue-router

/**
 * @param 定义变量
 * sessionStorage   用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
 * localStorage     用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
 */
const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-Token-Refresh'
const TokenExpire = 'Admin-Token-expire'
const SidebarOpened = 'App-sidebar-opened'

// 操作token
export function setToken(token) {
    sessionStorage.setItem(TokenKey, token);
}
export function getToken() {
    return sessionStorage.getItem(TokenKey)
}
export function removeToken() {
    sessionStorage.removeItem(TokenKey)
}

// 操作refreshToken
export function setRefreshToken(refreshToken) {
    sessionStorage.setItem(RefreshTokenKey, refreshToken);
}
export function getRefreshToken() {
    return sessionStorage.getItem(RefreshTokenKey)
}
export function removeRefreshToken() {
    sessionStorage.removeItem(RefreshTokenKey)
}

// 操作tokenExpire
export function setTokenExpire(tokenExpire) {
    sessionStorage.setItem(TokenExpire, tokenExpire);
}
export function getTokenExpire() {
    return sessionStorage.getItem(TokenExpire)
}
export function removeTokenExpire() {
    sessionStorage.removeItem(TokenExpire)
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
