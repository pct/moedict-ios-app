# 萌字典 iOS App

## 緣起
寫程式造福社會

## 致謝
[http://g0v.tw](http://g0v.tw)

[http://3du.tw](http://3du.tw)

## 快照
![](https://raw.github.com/pct/moedict-ios-app/master/screenshots/1.png)

## 字庫
並非離線 App, 採用 API server 資料

## api server?
參照 [https://github.com/pct/moedict-server](https://github.com/pct/moedict-server) 建置

## 編譯
`$ cd moedict-ios-app`

`$ bundle` (install ruby gems)

`$ rake` (build and run iOS Simulator)

`$ ./send.sh` (send to iphone device)

## TODO
 * 「詞」的搜尋似乎有問題，待解決
 * 如果要製作離線 App, sqlite 檔案近 100M 該如何處理？
