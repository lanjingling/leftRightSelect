# leftRightSelect
基于jQuery开发的左右选择列表插件，类似于multiselect.js、Bootstrap Dual Listbox、extjs itemselector <br><br>
1、使用方法：<br>
 &nbsp;1.在需要使用leftRightSelect组件的页面引入jquery.js、leftRightSelect.js和leftRightSelect.css<br>
 &nbsp;2.初始化代码：<br>
  &lt;div class="leftrightSel" id="selectbox"&gt; <br>
  var dimensionSelBox = $("#selectbox").leftRigthSel({
			//leftData:[{id:1,text:'测试1'},{id:2,text:'测试2'}]
	});
	<br><br>
2、常用方法：<br>
 &nbsp;1.清空列表：<br>
  dimensionSelBox.cleanAll();
  <br><br>
 &nbsp;2.获取右侧列表的值(返回数组)<br>
  var valueArray = dimensionSelBox.getRightDatas();
  <br><br>
 &nbsp; 3.动态加载左侧列表的值：<br>
  var url = ./test.json;
	dimensionSelBox.cleanAll();
	dimensionSelBox.loadLeft(url);
	<br>其中test.json中的数据为：<br>
	[{id:1,text:"ceshi1"},{id:2,text:"ceshi2"}]

3、实例：<br>
![image](https://github.com/lanjingling/leftRightSelect/blob/master/lrs.png)