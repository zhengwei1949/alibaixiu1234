//获取分类的ajax数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template('categoryTpl',{data:res});
        $('#category').html(html)
    }
})

//图片上传功能
$('#feature').on('change',function(){
    // console.dir(this)
    // FormData:收集表单数据 上传文件
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        //jq默认会把数据变成键值对的形式，我们的数据类型是multipart/form-data 分开向服务器发送
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res)
            $('.thumbnail').attr('src',res[0].avatar).show()
            $('#thumbnail').val(res[0].avatar)
        }
    })
})

//退出再登录一下
$('#addForm').on('submit',function(){
    console.log(123)
    //收集表单数据 ajax
    $.ajax({
        type:'post',
        url:'/posts',
        data:$(this).serialize(),
        success:function(res){
            //当添加成功之后，跳转到后台文章列表页
            location.href = 'posts.html'
        }
    })
    return false;
})