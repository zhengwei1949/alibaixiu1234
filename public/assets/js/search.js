//获取地址栏上的分类id值
// var categoryId = location.search.split('=')[1]; 这样写法没有通用性，在参数很多的时候得到错误的结果

//根据key找对应的value值
function getUrlParams(key){
    var str = location.search.substr(1);
    var arr = str.split('&');
    for(var i=0;i<arr.length;i++){
        var arr1 = arr[i].split('=');
        if(arr1[0] == key){
            return arr1[1]
        }
    }
}

var key = getUrlParams('key')

$.ajax({
    type:'get',
    url:`/posts/search/${key}`,
    success:function(res){
        console.log(res)
        var html = template('listTpl',{data:res});
        $('#listBox').html(html)
    }
})