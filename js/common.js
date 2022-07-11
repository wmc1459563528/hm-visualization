// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})
// todo 轻提示
const myBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(myBox, {
  animation: true, // 开启过渡动画
  autohide: true, // 开启自动隐藏
  delay: 3000, // 3s后自动关闭
})
// 将提示信息封装函数进行传参
const showTip = res => {
  // 获取到提示信息并修改
  myBox.querySelector('.toast-body').innerHTML = res
  toast.show()
}
// todo  axios请求根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
// todo 显示用户名
const userName = document.querySelector('#navbar-main .font-weight-bold')
if (userName) {
  userName.innerHTML = localStorage.getItem('user-name')
}
// todo 退出
// ! 思路： 登陆时候做什么 退出就清除什么
const logout = document.querySelector('#logout')
if (logout) {
  logout.addEventListener('click', function () {
    // 清除本地存储
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-token')
    // 跳转到登录页面
    location.href = './login.html'
  })
}
// todo 拦截器配置 携带token才可以访问数据
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  // todo 携带token访问数据 如果不带token信息 则会报错401 
  config.headers.Authorization = localStorage.getItem('user-token')
  return config; // ! 不能删
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});