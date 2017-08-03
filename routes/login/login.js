const express = require('express');
const router = express.Router();
const User = require('./../../models/user');
const moment = require('moment');

//登陆
router.get('/',function (req, res) {
    res.render('login/login');
});

router.post('/signIn',function (req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    let criteria = name; // 查询条件
    (async () => {
        var user = await User.findAll({
            where: {
                name: criteria
            }
        });
        let url = JSON.stringify(req.session.UrlReferrer);
        console.log('user',user)
        console.log('user[0]',user[0])
        console.log('user[0].password',user[0].password)
        if (user[0]) {
            if (user[0].password == pwd) {
                req.session.user = user[0];
                req.session.user.password = '******'; // 删除密码（不允许将密码存入session）
            } else {
                url = JSON.stringify('/login');
            }
        } else {
            url = JSON.stringify('/login');
        }
        res.jsonp(url); // 返回访问路径
    })();
});

module.exports = router;