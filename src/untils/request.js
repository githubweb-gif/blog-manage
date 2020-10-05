import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store/index'
import { getToken } from '../untils/auth'

const baseURL = {
    url: ''
}
if (process.env.NODE_ENV === 'production') {
    baseURL.url = 'http://106.53.102.65:3000/'
} else {
    baseURL.url = 'http://106.53.102.65:3000/'
}

const service = axios.create({
    baseURL: baseURL.url,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 20000) {
            console.log(res)
            Message({
                message: res.data.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: 非法令牌; 50012: 其他用户登录 50014: 令牌过期;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认注销', {
                    confirmButtonText: '重新登入',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.data.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
