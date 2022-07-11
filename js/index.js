//  todo 如果不带token信息 则会报错401 
; (async function () {
    const { data: res } = await axios.get('/dashboard')
    console.log(res)
})()