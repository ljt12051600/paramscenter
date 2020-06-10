合并代碼样子
git fetch  upstream (对应源);
git merge upstream/master


# 2020.6.2 
1.重置密码bug 
2.定义了一个klbTop  回到顶部功能  方法，直接到每个vue文件下this.toTop()调用就可以;
3.input-number 样式居中修改。
# 2020.6.10
1.路由分离
2.添加获取可视区的方法    使用  div  :style="contentHeight()"   这个方法里可以传值（默认130），用来显示滚动和可视区的范围