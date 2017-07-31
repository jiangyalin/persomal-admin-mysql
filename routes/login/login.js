const express = require('express');
const router = express.Router();
const User = new require('./../../models/User');
const moment = require('moment');

//登陆
router.get('/',function (req, res) {
    res.render('login/login');
});

router.post('/signIn',function (req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    let criteria = { name: name,is_deleted: 1}; // 查询条件
    let fields   = { name : 2, pwd : 1}; // 待返回的字段
    let options = {};
    User.find(criteria, fields, options, function(error, user){
        let url = JSON.stringify(req.session.UrlReferrer);
        if (user[0]) {
            if (user[0].pwd == pwd) {
                req.session.user = user[0];
                req.session.user.pwd = '******';//删除密码（不允许将密码存入session）
            } else {
                url = JSON.stringify('/login');
            }
        } else {
            url = JSON.stringify('/login');
        }
        res.jsonp(url);//返回访问路径
    });
});

module.exports = router;