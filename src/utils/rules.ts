import Axios from "@/utils/request";

export const nameRule = [
    {
        required: true,
        message: '用户名不能为空！'
    },
    {
        validator: (value: string, cb: any) => {
            return Axios.post(`/check`, {name: value})
                .then(res => {
                    if (res.status === 409) {
                        cb('该用户名已被注册！');
                    }
                })
        }
    }
]

export const pwdRule = [
    {
        required: true,
        message: '密码不能为空！'
    },
    {
        minLength: 6,
        message: '密码不得短于6位！'
    },
    {
        validator: (value: string, cb: any) => {
            if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/)))
                cb('密码必须包括大写字母、小写字母和数字！')
        }
    }
]

export const phoneNumRule = [
    {
        required: true,
        message: '手机号不能为空！'
    },
    {
        length: 11,
        message: '请输入正确的手机号！'
    },
    {
        validator: (value: string, cb: any) => {
            return Axios.post(`/check`, {phoneNumber: value})
                .then(res => {
                    if (res.status === 409) {
                        cb('该手机号已被注册！');
                    }
                })
        }
    }
]

export const codeRule = [
    {
        required: true,
        message: '验证码不能为空！'
    },
    {
        length: 6,
        message: '请输入六位验证码！'
    },
]

export const emailRule = [
    {
        required: true,
        message: '邮箱不能为空！'
    },
    {
        validator: (value: string, cb: any) => {
            if (!value.match(/\w+@\w+\.\w+/)) {
                cb('邮箱格式错误！')
            } else return Axios.post('/check', {email: value})
                .then(res => {
                    if (res.status === 409) {
                        cb('该邮箱已被注册！');
                    }
                })
        }
    },
]

