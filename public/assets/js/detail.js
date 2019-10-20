var id = getUrlParams('id');
$.ajax({
    type:'get',
    url:`/posts/${id}`,
    success:function(res){
        console.log(res)
        var html = template('detailTpl',res)
        $('.article').html(html)
    }
})

$('.article').on('click','#like',function(){
    $.ajax({
        type:'post',
        url:`/posts/fabulous/${id}`,
        success:function(){
            alert('点赞成功')
        }
    })
})

var state = 0;//评论的状态是否需要经过审核

$.ajax({
    type:'get',
    url:'/settings',
    success:function(res){
        if(res.review == false){
            state = 0;//不需要审核
        }else{
            state = 1;//需要审核
        }
        if(res.comment == true){
            $('.comment').show()
        }
    }
})

//评论的提交功能
$('.comment form').on('submit',function(){
    var content = $(this).find('textarea').val();
    
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:id,
            state:state 
        },
        success:function(res){
            alert('评论成功')
            $(this).find('textarea').val("")
        }
    })
    return false;
})


// 文章编辑功能思路
// 1. 事件委托给编辑添加点击事件
// 2. 当点击之后跳转到编辑功能页面 把当前的文章的id值带过去
// 3. 获取到地址栏的id值
// 4. 根据id值查询ajax数据， value="{{content}}"
// 5. 封面的文件上传功能
// 6. 给表单添加submit提交事件，阻止表单提交，收集表单数据，发送ajax,
// 7. 使用location.href = 'posts.html'跳转到文章列表页面

