# React 圆环翻页进度条

## DOC:

### 使用教程：

1. npm i react-process-indicator ；

2. import ProcessIndicator from 'react-process-indicator'
   import 'react-process-indicator/src/pages/home/picss.styl' ；

3. <ProcessIndicator {...{currentPart,currentPage,dir,flag,obj,num}}/>；

4. currentPart为当前页面所处部分，currentPage为当前页面，obj为一个对象，对象的key值是part,value值是该部分有多少页面，flag有两个值，分别是0，1，0表示所处part只有一个页面，1表示所处part有至少两个页面，dir(可选)有'down'、'up'两个状态，指示是上翻页还是下翻页，num为part总数 ；

5. 使用者需在本地自行引入picss.styl样式 。

