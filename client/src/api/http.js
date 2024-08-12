import axios from 'axios';
import { ElMessage } from 'element-plus';
// 创建 axios 实例
const TIMEOUT = 30000
const service = axios.create({
    baseURL: 'http://api.localhost.com:8000', // 配置基础 URL
    timeout: TIMEOUT, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 1. 添加通用头部信息
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }

        // 2. 请求日志记录
        console.log('Request:', config);

        // 3. 参数处理（例如：处理 GET 请求的参数）
        if (config.method === 'get' && config.params) {
            config.params = {
                ...config.params,
                // 添加公共参数或处理参数
            };
        }

        // 4. 显示加载状态
        // 如果有全局的 loading 状态控制，可以在这里开启
        // showLoading();

        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // 1. 统一处理响应数据
        const res = response.data;

        // 2. 响应日志记录
        console.log('Response:', response);

        // 3. 隐藏加载状态
        // 如果有全局的 loading 状态控制，可以在这里关闭
        // hideLoading();

        return res;
    },
    error => {
        // 对响应错误做点什么
        console.error('Response Error:', error);

        if (error.response) {
            // 服务器返回的错误
            switch (error.response.status) {
                case 401:
                    // 未授权
                    console.error('Unauthorized: Please log in again.');
                    // ElMessage.error('登录失效，请重新登录')
                    // router.push({
                    //     path: '/login'
                    // })
                    // 可以做一些重定向到登录页面的处理
                    // window.location.href = '/login';
                    break;
                case 403:
                    // 拒绝访问
                    console.error('Forbidden: You do not have permission.');
                    ElMessage.error('您没有权限访问')
                    break;
                case 404:
                    // 资源未找到
                    console.error('Not Found: The requested resource could not be found.');
                    ElMessage.error('找不到资源')
                    break;
                case 422:
                    // 资源未找到
                    console.error('Not Found: The requested resource could not be found.');
                    ElMessage.error('客户端参数有误')
                    break;
                case 500:
                    // 服务器错误
                    console.error('Server Error: Please try again later.');
                    ElMessage.error('服务器内部错误')
                    break;
                default:
                    // 其他错误
                    console.error(`Error: ${error.response.status}`);
                    ElMessage.error(error.response.status)
            }
        } else {
            // 其他错误
            ElMessage.error(error)
        }

        // 4. 隐藏加载状态
        // 如果有全局的 loading 状态控制，可以在这里关闭
        // hideLoading();

        return Promise.reject(error);
    }
);

const get = async (url, data, timeout) => {
    return await service.get(url, { params: data, timeout: timeout ?? TIMEOUT })
}

const post = async (url, data, timeout) => {
    return await service.post(url, data, { timeout: timeout ?? TIMEOUT })

}
const patch = async (url, data, timeout) => {
    return await service.patch(url, data, { timeout: timeout ?? TIMEOUT })
}
const put = async (url, data, timeout) => {
    return await service.put(url, data, { timeout: timeout ?? TIMEOUT })
}
const del = async (url, data, timeout) => {
    return await service.delete(url, data, { timeout: timeout ?? TIMEOUT })
}


const http = {
    get,
    post,
    patch,
    put,
    del,
}

export default http;
