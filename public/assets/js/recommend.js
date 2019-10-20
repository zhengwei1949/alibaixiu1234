//热门推荐
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(res){
        //复用 避免模板写二次
        var tpl = `
        {{each data}}
            <li>
            <a href="javascript:;">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
            </li>
        {{/each}}
        `
        var html = template.render(tpl,{data:res});
        $('.hots ul').html(html);
    }
})