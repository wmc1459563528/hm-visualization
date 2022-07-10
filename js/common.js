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
