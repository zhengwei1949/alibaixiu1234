$('#logo').on('change',function(){
    //获取当前文件的数据(二进制的数据)
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res){
            $('#hiddenLogo').val(res[0].avatar)
            $('#preview').attr('src',res[0].avatar)
        }
    })
})