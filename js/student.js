// todo 获取元素
const tbody = document.querySelector('.list')
const total = document.querySelector('.total')
const modalBox = document.querySelector('#modal')
const modal = new bootstrap.Modal(modalBox)
const openModal = document.querySelector('#openModal')
const title = modalBox.querySelector('.modal-title')
const submit = modalBox.querySelector('#submit')
const form = modalBox.querySelector('#form')
// 获取级联相关标签
const pSelect = document.querySelector('[name=province]')
const cSelect = document.querySelector('[name=city]')
const aSelect = document.querySelector('[name=area]')

render()
initprovince()
// todo 渲染页面 查询
async function render() {
    const { data: res } = await axios.get('/students')
    // console.log(res)
    // todo map方法的join方法 拼接字符串 也可以用forEach方法拼接字符串
    tbody.innerHTML = res.map(item =>
        `<tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.gender === 0 ? '男' : '女'}</td>
            <td>第${item.group}组</td>
            <td>${item.hope_salary}</td>
            <td>${item.salary}</td>
            <td>${item.province} ${item.city} ${item.area}</td>
            <td>
                <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen" data-id="${item.id}"></i></a>
                <a href="javascript:;" class="text-danger"><i class="bi bi-trash" data-id="${item.id}"></i></a>
            </td>
        </tr>
        `).join('')
    // 渲染总人数
    total.innerHTML = res.length
}
// todo 删除功能
tbody.addEventListener('click', async function (e) {
    if (e.target.classList.contains('bi-trash')) {
        await axios.delete(`/students/${e.target.dataset.id}`)
        // 重新渲染页面
        render()
        // 轻提示
        showTip('删除成功')


    }
    // 修改
    if (e.target.classList.contains('bi-pen')) {
        // 修改标题
        title.innerHTML = '修改学员'
        // 添加自定义标签 区分添加功能或者修改功能
        modalBox.dataset.type = e.target.dataset.id
        // 调用显示方法
        modal.show()
        // 重新渲染页面
        render()
        const { data: student } = await axios.get(`/students/${e.target.dataset.id}`)
        // console.log(student)
        const element = document.querySelectorAll('[name]')
        // console.log(element)
        element.forEach(item => {
            if (item.name === 'gender') {
                // 其他
                console.log(item)
                if (student.gender === +item.value) {
                    item.checked = true
                }

                // 性别
            } else {
                item.value = student[item.name]
            }

        })

        // console.log(pSelect.value)
        const { data: city } = await axios.get('/api/city', {
            params: {
                pname: pSelect.value
            }
        })
        // 遍历并渲染
        cSelect.innerHTML = ` <option value="">--城市--</option>${city.map(item => ` <option value="${item}">${item}</option>`).join('')}`
        // console.log(cSelect)
        cSelect.value = student.city
        // 区
        const { data: area } = await axios.get('/api/area', {
            params: {
                pname: pSelect.value,
                cname: cSelect.value
            }
        })
        // 遍历并渲染
        aSelect.innerHTML = ` <option value="">--地区--</option>${area.map(item => ` <option value="${item}">${item}</option>`).join('')}`
        aSelect.value = student.area

    }
})
// todo 添加
openModal.addEventListener('click', function () {
    // 修改标题
    title.innerHTML = '添加学员'
    // 添加自定义标签 区分添加功能或者修改功能
    modalBox.dataset.type = 'add'
    modal.show()
})

// todo 省市区级联
async function initprovince() {
    // 省
    const { data: province } = await axios.get('/api/province')
    // console.log(province)
    // 遍历并渲染
    const res = province.map(item => ` <option value="${item}">${item}</option>`).join('')
    pSelect.innerHTML = ` <option value="">--省份--</option>${res}`
    // 市
    pSelect.addEventListener('change', async function () {
        // console.log(pSelect.value)
        const { data: city } = await axios.get('/api/city', {
            params: {
                pname: pSelect.value
            }
        })
        // 遍历并渲染
        cSelect.innerHTML = ` <option value="">--城市--</option>${city.map(item => ` <option value="${item}">${item}</option>`).join('')}`
        // 如果切换省份则清空区的内容
        aSelect.innerHTML = ` <option value="">--地区--</option>`
    })
    // 区
    cSelect.addEventListener('change', async function () {
        // console.log(pSelect.value)
        const { data: area } = await axios.get('/api/area', {
            params: {
                pname: pSelect.value,
                cname: cSelect.value
            }
        })
        // 遍历并渲染
        aSelect.innerHTML = ` <option value="">--地区--</option>${area.map(item => ` <option value="${item}">${item}</option>`).join('')}`
    })
}
// todo 点击按钮添加
submit.addEventListener('click', async function () {
    const data = serialize(form, { hash: true })

    data.age = +data.age
    data.gender = +data.gender
    data.group = +data.group
    data.salary = +data.salary
    data.hope_salary = +data.hope_salary

    console.log(data)
    if (modalBox.dataset.type === 'add') {
        try {
            // 如果是
            const { data: res } = await axios.post('/students', data)
            console.log(res)
            showTip('添加成功')
            modal.hide()
            form.reset()
            render()
        } catch (err) {
            showTip('添加失败')
        }
    } else {
        console.log(modalBox.dataset.type)
        const { data: res } = await axios.put(`/students/${modalBox.dataset.type}`, data)
        console.log(res)
        modal.hide()
        render()
        showTip('修改成功')
    }

})
