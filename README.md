# client 环境安装与使用

## 1. 环境安装
> 需要提前安装nodejs环境

```shell
cd client
npm install // 或 sudo npm install
```

## 2. 使用

### 2.1 启动最基础环境
```shell
npm run client
```
打开浏览器: http://localhost:8081/  
再打开浏览器控制台，可看到client的方法。

### 2.2 启动带签名的client
```shell
npm run withsign
```
**注：启动的时候，通过 ctr+c 停掉上一个**

### 2.3 启动带Keplr的client
```shell
npm run withkeplr
```
**注：启动的时候，通过 ctr+c 停掉上一个**

### 2.4 启动带合约的client
```shell
npm run withcontract
```
**注：启动的时候，通过 ctr+c 停掉上一个**
