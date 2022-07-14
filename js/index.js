//  todo 如果不带token信息 则会报错401 
; (async function () {
    const { data: res } = await axios.get('/dashboard')
    // console.log(res)
    // 将数据渲染到页面
    // 遍历对象
    for (let key in res.overview) {
        document.querySelector(`[name=${key}]`).innerHTML = res.overview[key]
    }
    initLine(res.year)
    initSalary(res.salaryData)
    initGroup(res.groupData)
    initMap(res.provinceData)
    initGender(res.salaryData)
    // todo 线图
    function initLine(year) {

        // console.log(year)
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#line'));
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '2021全科学薪资走势',
                textStyle: {
                    fontSize: 16,
                },
                left: 10,
                top: 15,
            },
            // 绘图网格
            grid: {
                top: '20%',
                // left: '20%',
            },
            // 提示框
            tooltip: {
                // 触发类型
                trigger: 'axis',
            },
            color: [
                {
                    // 线性渐变效果
                    type: 'linear',
                    // 决定方向
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#499FEE', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#5D75F0', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            ],
            xAxis: {
                type: 'category',
                data: year.map(item => item.month),
                // 轴线
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        // 线的类型
                        type: 'dashed',
                    },
                },
                axisLabel: {
                    color: '#999',
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#ccc'],
                        type: 'dashed',
                    },
                },
            },
            series: [
                {
                    data: year.map(item => item.salary),
                    type: 'line',
                    // 平滑效果
                    smooth: true,
                    // symbol: 'rect',
                    symbolSize: 10,
                    // 曲线宽度
                    lineStyle: {
                        width: 8,
                    },
                    // 区域填充
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#499FEE', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0)', // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                },
            ],
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    // todo 饼图
    function initSalary(salary) {

        // console.log(salary)
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#salary'));
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '班级薪资分布',
                left: 10,
                top: 15,
                textStyle: {
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '5%',
                left: 'center'
            },
            color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A', '#ee6666'],
            series: [
                {
                    // name 图表的名字将会在提示框出现的
                    name: '班级薪资分布',
                    // pie 饼图
                    type: 'pie',
                    // radius 圆的半径
                    radius: ['40%', '50%'],
                    // 中心坐标
                    center: ['50%', '45%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    /*   data: [
                          { value: 148, name: 'Search Engine' },
                          { value: 735, name: 'Direct' },
                          { value: 580, name: 'Email' },
                          { value: 484, name: 'Union Ads' },
                          { value: 300, name: 'Video Ads' }
                      ] */
                    data: salary.map(item => {
                        return { value: item.g_count + item.b_count, name: item.label }
                    })
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    // todo 柱状图
    function initGroup(group, num = 1) {

        // console.log(group)
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#lines'));
        // 指定图表的配置项和数据
        const option = {
            grid: {
                left: 70,
                top: 30,
                right: 30,
                bottom: 50,
            },
            xAxis: {
                type: 'category',
                data: group[num].map(item => item.name),
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color: '#999'
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#ccc'],
                        type: 'dashed'
                    }
                }
            },
            // 提示框
            tooltip: {},
            color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#34D39A' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }, {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#499FEE' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }],
            series: [
                {
                    name: '期望薪资',
                    data: group[num].map(item => item.hope_salary),
                    type: 'bar'
                },
                {
                    name: '就业薪资',
                    data: group[num].map(item => item.salary),
                    type: 'bar'
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    // todo 注册点击事件 排他
    const btns = document.querySelectorAll('#btns button')
    btns.forEach(item => {
        item.addEventListener('click', function () {
            // 排他
            // 1、移除掉所有的类
            document.querySelector('#btns button.btn-blue').classList.remove('btn-blue')
            // 2、添加当前类
            this.classList.add('btn-blue')
            initGroup(res.groupData, this.innerHTML)

        })
    })
    // todo 籍贯分布
    function initMap(province) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#map'));
        // 指定图表的配置项和数据
        const dataList = [
            { name: '南海诸岛', value: 0 },
            { name: '北京', value: 0 },
            { name: '天津', value: 0 },
            { name: '上海', value: 0 },
            { name: '重庆', value: 0 },
            { name: '河北', value: 0 },
            { name: '河南', value: 0 },
            { name: '云南', value: 0 },
            { name: '辽宁', value: 0 },
            { name: '黑龙江', value: 0 },
            { name: '湖南', value: 0 },
            { name: '安徽', value: 0 },
            { name: '山东', value: 0 },
            { name: '新疆', value: 0 },
            { name: '江苏', value: 0 },
            { name: '浙江', value: 0 },
            { name: '江西', value: 0 },
            { name: '湖北', value: 0 },
            { name: '广西', value: 0 },
            { name: '甘肃', value: 0 },
            { name: '山西', value: 0 },
            { name: '内蒙古', value: 0 },
            { name: '陕西', value: 0 },
            { name: '吉林', value: 0 },
            { name: '福建', value: 0 },
            { name: '贵州', value: 0 },
            { name: '广东', value: 0 },
            { name: '青海', value: 0 },
            { name: '西藏', value: 0 },
            { name: '四川', value: 0 },
            { name: '宁夏', value: 0 },
            { name: '海南', value: 0 },
            { name: '台湾', value: 0 },
            { name: '香港', value: 0 },
            { name: '澳门', value: 0 },
        ]
        // ! 思路:遍历上边数组，跟后台的数据对比，如果有name，则同步value
        dataList.forEach(item => {
            const res = /省|回族自治区|维吾尔自治区|壮族自治区|特别行政区|自治区/g
            const obj = province.find(key => key.name.replace(res, '') === item.name)
            if (obj) {
                item.value = obj.value
            }
        })
        const option = {
            title: {
                text: '籍贯分布',
                top: 10,
                left: 10,
                textStyle: {
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} 位学员',
                borderColor: 'transparent',
                backgroundColor: 'rgba(0,0,0,0.5)',
                textStyle: {
                    color: '#fff',
                },
            },
            visualMap: {
                min: 0,
                max: 6,
                left: 'left',
                bottom: '20',
                text: ['6', '0'],
                inRange: {
                    color: ['#ffffff', '#0075F0'],
                },
                show: true,
                left: 40,
            },
            geo: {
                map: 'china',
                roam: false,
                zoom: 1.0,
                label: {
                    normal: {
                        show: true,
                        fontSize: '10',
                        color: 'rgba(0,0,0,0.7)',
                    },
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        color: '#e0ffff',
                    },
                    emphasis: {
                        areaColor: '#34D39A',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
            series: [
                {
                    name: '籍贯分布',
                    type: 'map',
                    geoIndex: 0,
                    data: dataList,
                },
            ],
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    // todo 男女分布
    function initGender(gender) {

        // console.log(salary)
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#gender'));
        // 指定图表的配置项和数据
        const option = {
            title: [
                {
                    text: '男女薪资分布',
                    left: 10,
                    top: 10,
                    textStyle: {
                        fontSize: 16,
                    },
                },
                {
                    text: '男生',
                    left: '50%',
                    top: '45%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 12,
                    },
                },
                {
                    text: '女生',
                    left: '50%',
                    top: '85%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 12,
                    },
                },
            ],
            color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
            tooltip: {
                trigger: 'item'
            },

            series: [
                {
                    type: 'pie',
                    radius: ['20%', '30%'],
                    center: ['50%', '30%'],
                    /*    data: [
                           { value: 1048, name: 'Search Engine' },
                           { value: 735, name: 'Direct' },
                           { value: 580, name: 'Email' },
                           { value: 484, name: 'Union Ads' },
                           { value: 300, name: 'Video Ads' }
                       ] */
                    data: gender.map((item) => ({ name: item.label, value: item.b_count })),
                },
                {
                    type: 'pie',
                    radius: ['20%', '30%'],
                    center: ['50%', '70%'],
                    /*  data: [
                         { value: 1048, name: 'Search Engine' },
                         { value: 735, name: 'Direct' },
                         { value: 580, name: 'Email' },
                         { value: 484, name: 'Union Ads' },
                         { value: 300, name: 'Video Ads' }
                     ] */
                    data: gender.map((item) => ({ name: item.label, value: item.g_count })),
                }
            ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
})()