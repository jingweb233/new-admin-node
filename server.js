const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

// 创建 Express 应用
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
})

const stuArr = [
    {
        "id": 1,
        "name": "张三",
        "age": 14,
        "sex": 1,
        "number": 1,
        "class": 2,
        "state": "1",
        "address": "山东省 青岛市",
        "phone": "13879032312"
    },
    {
        "id": 2,
        "name": "李四",
        "age": 13,
        "sex": 1,
        "number": 2,
        "class": 2,
        "state": "1",
        "address": "河南省 洛阳市",
        "phone": "15679045643"
    },
    {
        "id": 3,
        "name": "曾艳",
        "age": 13,
        "sex": 2,
        "number": 3,
        "class": 2,
        "state": "1",
        "address": "山东省 烟台市",
        "phone": "13879037381"
    }
];

const Info = [
    {
        id: '1',
        name: '小明',
        sex: '1',
        age: '12',
        father: '小明爸爸',
        mother: '小明妈妈',
        address: '湖南长沙',
        time: '2022-01-12',
        phone: '13656776655'
    },
    {
        id: '2',
        name: '小红',
        sex: '2',
        age: '12',
        father: '小红爸爸',
        mother: '小红妈妈',
        address: '湖北武汉',
        time: '2022-01-12',
        phone: '14725898788'
    },
    {
        id: '3',
        name: '小军',
        sex: '1',
        age: '12',
        father: '小军爸爸',
        mother: '小军妈妈',
        address: '湖南绵阳',
        time: '2022-01-12',
        phone: '13151878944'
    },

]

const workdata = [
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
]

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    const token = jwt.sign({ username, password }, "moam")
    res.send({
        token,
        status: 200,
        result: stuArr,
        message: "登陆成功",
        username: username
    });
});

app.get('/api/students', (req, res) => {
    const name = req.query.name
    if (name) {
        const stu = stuArr.find((item) => item.name === name)
        if (stu) {
            res.send({
                status: 200,
                data: stu,
                total: 1
            })
        } else {
            res.send({
                status: 404,
                data: null,
                message: "未找到匹配的学生",
                total: stuArr.length
            })
        }
    } else {
        res.send({
            "status": 200,
            "message": "获取数据成功",
            "data": stuArr,
            "total": stuArr.length
        }
        )
    }
})

app.delete("/api/students/:id", (req, res) => {
    // 获取学生的id，并确保它是字符串类型
    const id = String(req.params.id);

    // 遍历数组
    for (let i = 0; i < stuArr.length; i++) {
        if (String(stuArr[i].id) === id) {
            // 找到要删除的学生，从数组中移除
            stuArr.splice(i, 1);
            // 数据删除成功
            res.status(200).send({
                status: 200,
                message: "数据删除成功"
            });
            return;
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(404).send({
        status: 404,
        message: "学生id不存在"
    });
});

app.get("/api/info", (req, res) => {

    // 将数据返回
    res.send({
        status: 200,
        data: Info,
        message: "数据获取成功",
        total: Info.length
    })
})

app.post("/api/info", (req, res) => {

    const { name, age, sex, address, phone, mother, father, time } = req.body

    // 创建学生信息
    if (name && age && sex && address && phone && mother && father && time) {
        const st = {
            id: +Info.at(-1).id + 1 + "",
            name,
            age,
            sex,
            address,
            phone,
            mother,
            father,
            time
        }
        // 将学生信息添加到数组
        Info.push(st)
    }


    res.send({
        status: 200,
        data: Info,
        message: "数据添加成功",
        total: Info.length
    })
})

app.delete("/api/info/:id", (req, res) => {
    // 获取学生的id，并确保它是字符串类型
    const id = String(req.params.id);

    // 遍历数组
    for (let i = 0; i < Info.length; i++) {
        if (String(Info[i].id) === id) {
            // 找到要删除的学生，从数组中移除
            Info.splice(i, 1);
            // 数据删除成功
            res.status(200).send({
                status: 200,
                message: "数据删除成功"
            });
            return;
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(404).send({
        status: 404,
        message: "学生id不存在"
    });
});

app.put("/api/info", (req, res) => {
    // 获取数据
    const { id, name, age, sex, address, phone, mother, father, time } = req.body

    // 根据id查询学生
    const updateStu = Info.find((item) => item.id === id)

    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.sex = sex
        updateStu.phone = phone
        updateStu.address = address
        updateStu.mother = mother
        updateStu.father = father
        updateStu.time = time

        res.send({
            status: 200,
            data: updateStu,
            message: "数据修改成功"
        })
    } else {
        res.status(403).send({
            status: "error",
            message: "学生不存在"
        })
    }
})

app.get("/api/work", (req, res) => {
    // 尝试从查询参数中获取 page 和 size，并提供默认值
    const page = parseInt(req.query.page, 10) || 1
    const size = parseInt(req.query.size, 10) || 1

    // 计算分页的起始和结束索引
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, workdata.length);

    // 根据分页参数获取数据
    const works = workdata.slice(startIndex, endIndex);

    // 将数据返回
    res.send({
        "status": 200,
        "message": "获取数据成功",
        "data": works,
        // "total" 应该是整个数据集的总大小，而不是当前页的长度
        "total": workdata.length
    });
});

app.get("/api/view", (req, res) => {
    res.send({
        "status": 200,
        "message": "获取数据成功",
        "data": {
            "legend": ["技术总监","产品经理","后端开发","前端开发","运维/测试"],
            "xAxis": ["周一","周二","周三","周四","周五","周六","周日"],
            "series": [
                {
                    "name": "技术总监",
                    "type": "line",
                    "stack": "总量",
                    "data": [80,83,84,40,44,11,12]
                },
                {
                    "name": "产品经理",
                    "type": "line",
                    "stack": "总量",
                    "data": [66,34,39,42,45,20,30]
                },
                {
                    "name": "后端开发",
                    "type": "line",
                    "stack": "总量",
                    "data": [66,65,59,44,33,10,20]
                },
                {
                    "name": "前端开发",
                    "type": "line",
                    "stack": "总量",
                    "data": [33,33,44,55,55,11,23]
                },
                {
                    "name": "运维/测试",
                    "type": "line",
                    "stack": "总量",
                    "data": [33,55,44,66,77,11,3]
                }
            ]
        }
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器已启动，监听在端口 3000 上');
});