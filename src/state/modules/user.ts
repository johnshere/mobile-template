/*
 * @Author: zhouyankai
 * @Date: 2023-07-26
 * @LastEditTime: 2024-03-08 17:42:28
 * @LastEditors: 周艳凯 750419898@qq.com
 * @Description:有关权限的pinia
 */
import { defineStore } from 'pinia'

interface AuthState {
    token?: string
    user: Record<string, any>
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        token: undefined,
        user: {}
    }),
    getters: {
        isLogin(): boolean {
            return this.token !== undefined
        }
    },
    actions: {
        // 登录
        login() {
            return new Promise<void>(resolve => {
                setTimeout(() => {
                    this.token = '132131'
                    resolve()
                }, 2000)
            })
        }
    },
    // 本地持久化存储
    persist: {
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync
        }
    }
})
