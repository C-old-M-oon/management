/* 
* @Author: leeZ
* @Date:   2018-04-19 12:19:12
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-26 15:37:05
*/
var url = require("url"),
    fs = require("fs"),
    http = require("http"),
    path = require("path");
http.createServer(function (req, res) {
    // var pathname = __dirname + url.parse("/"+req.url).pathname;//资源指向public目录
    var pathname = 'F:/TZJ/management'
    console.log(pathname)
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
    fs.exists(pathname, function (exists) {
        if (exists) {
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": 'text/html;charset="utf-8"'});
            }
            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });
        } else {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("<h1>404 Not Found</h1>");
        }
    });
}).listen(8889);
console.log("监听8889端口");


// var http = require('http'); var fs = require('fs');//引入文件读取模块
// var documentRoot = 'F:/TZJ/management'; //需要访问的文件的存放目录

// var server= http.createServer(function(req,res){ var url = req.url; //客户端输入的url，例如如果输入localhost:8888/index.html //那么这里的url == /index.html
//     var file = documentRoot + url;
// console.log(url); //E:/PhpProject/html5/websocket/www/index.html 
// fs.readFile( file , function(err,data){ /* 一参为文件路径 二参为回调函数 回调函数的一参为读取错误返回的信息，返回空就没有错误 二参为读取成功返回的文本内容 */ 
//     if(err){ res.writeHeader(404,{ 'content-type' : 'text/html;charset="utf-8"' });
//     res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
//     res.end();
// }else{ 
// res.writeHeader(200,{ 'content-type' : 'text/html;charset="utf-8"' }); res.write(data);//将index.html显示在客户端 
// res.end(); } }); }).listen(8888);
// console.log('服务器开启成功');