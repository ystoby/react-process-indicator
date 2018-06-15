# React 圆环翻页进度条

## DOC:

### 使用教程：

1. 进入src->pages->home文件夹 ；

2. 如果想添加页面，请新建一个js文件，命名规则Pagex.*.js，x代表新页面属于第几部分（part）,*代表该页面作为第x部分第*页出现 ；

3. 新建页面类名命名方式同2，唯一的区别是将连接part与page间的.改为_；

4. 将新页面组件在index.js文件里引入即可;

5. <ProcessIndicator />组件传递参数，currentPart为当前页面所处部分，currentPage为当前页面，obj为一个对象，对象的key值是part,value值是该部分有多少页面，flag有两个值，分别是0，1，0表示所处part只有一个页面，1表示所处part有至少两个页面，dir(可选)有'down'、'up'两个状态，指示是上翻页还是下翻页。

