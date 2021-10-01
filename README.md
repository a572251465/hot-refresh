# hot-refresh [![Weekly downloads](https://img.shields.io/npm/dw/chokidar.svg)](https://github.com/a572251465/hot-refresh) [![Yearly downloads](https://img.shields.io/npm/dy/chokidar.svg)](https://github.com/a572251465/hot-refresh)

> Static server  && Hot update from time to time 

> It is not allowed to open two services in one directory, because this may involve webstock communication 

>If the page does not refresh from time to time, press the center key on the terminal 

## What plugin is this?
### English
```txt
  1. Support powerful front-end static services 
  2. The powerful log system can be freely controlled by parameters 
  3. Support static service cache (mandatory cache and negotiation cache)
  4. It can monitor all file changes introduced into HTML and notify the browser of updates
  5. When introducing or deleting external links, it can make differential comparison to reduce the performance consumption of listening files
  6. It can save and refresh the browser from time to time, ending the era of manually refreshing the browser
```
### 中文
```txt
  1. 支持强大静态服务
  2. 强大的log体系，可以通过参数自由控制打印
  3. 支持静态服务缓存（强制缓存，以及协商缓存）
  4. 能够监听html中引入所有的文件变化，而从通知浏览器更新
  5. 引入或是删除外部链接时，能够做颗粒程度的差异化比较，减少监听文件对性能消耗
  6. 能够做到时时保存，时时刷新浏览器，结束了手动刷新浏览器的时代
```
## Support scope？
### English
```txt
  1. Front and rear end separation items 
  2. Simple H5 web pages 
```
### 中文
```txt
  1. 前端后分离项目
  2. 单纯的h5 web项目
```
## Parameter system ?
##### 1. [-V] output the version
```shell
 $ hot-refresh -V
 $ 1.0.1
```
##### 2. [-p] Port number to start the service
```shell
  $ hot-refresh -p 9000
  $ http://localhost:9000
```
##### 3. [-l] print error log
```shell
  $ hot-refresh -l
```
##### 4. [-lw] log write file
```shell
  $ hot-refresh -lw
  // The monitored log will be printed to the root directory of the service 
  // 监听的log会打印到服务的根目录下
```
##### 5. [-s] start only static services
```shell
  $ hot-refresh -s
  // 是否只需要静态服务
```
###### 6. [-c] start static file caching
```shell
  $ hot-refresh -c
  // 是否开启静态缓存模式
```
## install
```shell
  npm install hot-refresh -g
  yarn add hot-refresh -g
```
## use -- 推荐使用
```txt
  npx hot-refresh -p 8080
```
## for example
```shell
$ hot-refresh -p 9000
Service started successfully, the address is: F:\other-project\test
http://192.168.31.121:9000
http://127.0.0.1:9000
http://localhost:9000
File change watch ...
Hit CTRL-C to stop the server

```
