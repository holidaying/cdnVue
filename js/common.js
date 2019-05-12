/**
 * 定义请求常量
 * TIME_OUT、ERR_OK
 */
var TIME_OUT = 30000; // 请求超时时间
var ERR_OK = true; // 请求成功返回状态，字段和后台统一
// 请求超时时间
axios.defaults.timeout = TIME_OUT
// 封装请求拦截
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token') // 获取token
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        if (token) { // 如果token不为null，否则传token给后台
            config.headers['tokenId'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
    response => {
        let data = response;
        if (data.message === 'token failure!') { // 如果后台返回的错误标识为token过期，则重新登录
            localStorage.removeItem('token') // token过期，移除token
            // 进行重新登录操作
        } else {
            return Promise.resolve(response)
        }
    },
    error => {
        // let message = "系统繁忙，请稍后重试！";
        if (error && error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message
        }
        return Promise.reject(error)
    }
)
window.$http = function (options) {
    var method = (options.type || options.method || "get").toLowerCase();
    var data = options.data;
    var config = {
        url: options.url || "http://114.116.73.63.8888/",
        method: method,
        timeout: options.timeout || 0,
        data: data
    };
    debugger
    return axios(config).then(res => {
        return res.data;
    });
};