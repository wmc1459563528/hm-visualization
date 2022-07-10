// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})
// 轻提示
const myBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(myBox, {
  animation: true, // 开启过渡动画
  autohide: true, // 开启自动隐藏
  delay: 3000, // 3s后自动关闭
})
// todo 将提示信息封装函数进行传参
const showTip = res => {
  // 获取到提示信息并修改
  myBox.querySelector('.toast-body').innerHTML = res
  toast.show()
}
// todo axios请求根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
// todo 显示用户名
const username = document.querySelector('#navbar-main .text-sm')
username.innerHTML = localStorage.getItem('user-name')