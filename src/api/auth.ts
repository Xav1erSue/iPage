import {Message} from "@arco-design/web-vue";
import Axios from "@/utils/request";
import {Login, Register} from "@/api/interface";
import router from "@/router";
import store from "@/store";

// 静默校验token
export const validate = async (isProtected: boolean) => {
    // 本地无token但进入页面不受保护，无需认证
    if (!localStorage.token && !isProtected) return
    // 本地无token且进入页面受保护，跳转至登录页
    if (!localStorage.token && isProtected) {
        Message.error('请登陆后再次访问！');
        await router.push({name: "Login"});
    }
    // 本地有token，校验token
    if (localStorage) {
        Axios.post('/auth/validate')
            .then(res => {
                switch (res.status) {
                    case 200:
                        // 如果token认证通过则将用户信息和登录状态储存在Store中
                        store.commit('CHANGE_LOGIN_STATUS', true)
                        store.commit('SAVE_USERNAME', res.data.user.name)
                        break
                    default:
                        store.commit('CHANGE_LOGIN_STATUS', false)
                        localStorage.removeItem("token")
                }
            })
        // 一般在进入页面时校验，刷新加载状态
        store.commit('CHANGE_LOADING_STATUS', 0);
    }
}

export const register = (userInfo: Register) => {
    store.commit('CHANGE_LOADING_STATUS', 1)
    Axios.post('/auth/register', userInfo)
        .then(res => {
            if (res.status === 201) {
                // 注册成功
                localStorage.token = res.data.token;
                store.commit('SAVE_USERNAME', userInfo.name);
                store.commit('CHANGE_LOADING_STATUS', 2);
                setTimeout(() => {
                    router.push({name: 'Home'})
                }, 3000)
            } else {
                Message.error(res.data.message);
                store.commit('CHANGE_LOADING_STATUS', 2);
            }
        })
        .catch(() => {
            Message.error('请求出错，请稍后再试！');
            store.commit('CHANGE_LOADING_STATUS', 2);
        })
}

export const login = async (userInfo: Login) => {
    store.commit('CHANGE_LOADING_STATUS', 1)
    Axios.post('/auth/login', userInfo)
        .then(res => {
            switch (res.status) {
                case 404:
                case 403:
                    Message.error(res.data.message);
                    break;
                case 200:
                    // 登录成功
                    store.commit('CHANGE_LOGIN_STATUS', true);
                    localStorage.token = res.data.token;
                    setTimeout(() => {
                        router.push({name: 'Home'})
                    }, 3000)
                    break;
                default:
                    Message.error('未知错误');
                    break;
            }
            store.commit('CHANGE_LOADING_STATUS', 2);
        })
        .catch(() => {
            Message.error('请求出错，请稍后再试！');
            store.commit('CHANGE_LOADING_STATUS', 2);
        })
}

export const logOut = () => {
    store.commit('CHANGE_LOGIN_STATUS', false);
    localStorage.removeItem("token");
    Message.success('您已成功退出登录！');
}

