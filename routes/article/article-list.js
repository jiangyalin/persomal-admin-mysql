const express = require('express');
const router = express.Router();
const MyRequest = require('./../../my_node_modules/my-request');
const ApiServer = require('./../../config/api-server');

//文档页面
router.get('/',function (req, res) {
    res.render('article/article-list');
});

//文档数据(分页)
router.get('/findArticlesList', function (req, res) {
    const data = {
        title: req.query.title,
        pageIndex: req.query.pageIndex,
        pageSize: req.query.pageSize
    };
    MyRequest.get(ApiServer.mysqlServer, '/article/findArticlesList', data, function (value) {
        value = JSON.parse(value);
        res.jsonp(value);
    });
});

//删除文章（假删除）
router.get('/removeArticle',function (req, res) {
    //修改数据
    const data = {id: req.query.id};//查找条件
    MyRequest.get(ApiServer.mysqlServer, '/article/removeArticle', data, function (value) {
        value = JSON.parse(value);
        res.jsonp(value);
    });
});

module.exports = router;