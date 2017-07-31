// 配置文件
const config = {
    port: 8087,
    mysql: {
        database: 'personalDB',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306
    },
    session: {
        database: 'personalDB',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306,
        secret: 'personalDB',
        key: 'personalDB',
        maxAge: 2592000000
    }
};

module.exports = config;