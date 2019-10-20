$('#logo').on('change', function () {
    //获取当前文件的数据(二进制的数据)
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#hiddenLogo').val(res[0].avatar)
            $('#preview').attr('src', res[0].avatar)
        }
    })
})

$('#settingsForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/settings',
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })
    return false;
})


//发送ajax 获取网站设置的信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        //将logo地址存在隐藏域中
        $('#hiddenLogo').val(response.val);
        //将logo显示出来
        $('#preview').attr('src', response.logo);
        //将网站标题显示在页面中
        $('input[name="title"]').val(response.title);
        //将是否开启评论功能显示在页面中
        $('input[name="comment"]').prop('checked', response.comment);
        //将评论是否经过人工审核显示在页面中
        $('input[name="review"]').prop('checked', response.review);
    }
})