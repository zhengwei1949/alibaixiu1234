//ajax数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        // console.log(res)
        var html = template('usersTpl', { data: res });
        // console.log(html);
        $('#usersBox').html(html)
    }
})

$('#userForm').on('submit', function () {
    //jq提供的方法，可以自动把当前表单所有的表单数据序列化 自动收集
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            location.reload()//刷新当前页面
            //如果不这样写，还可以自己拼接一个tr,然后追加到tbody的最后一行，这样写有点麻烦，但是好处是当前页面没有刷新
        }
    })
    // console.log(formData)
    return false;//兼容性最强的
})


//上传用户头像
//原生代码
// document.getElementById('avatar').onchange = function(){
//     var fd = new FormData()
//     fd.append('avatar',this.files[0]);
//     var xhr = new XMLHttpRequest();
//     xhr.open('post','/upload');
//     xhr.send(fd)
//     xhr.onload = function(){
//         console.log(xhr.responseText)
//     }
// }

$('#modifyBox').on('change', "#avatar", function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        //固定写法
        //jq默认我们传的是一个对象，它会帮我们转换成key=value&key=value的形式
        //但是我们现在数据文件上传 multipart/form-data 数据分开传
        processData: false,
        //jq默认会添加一行代码 xhr.setRequestHeader('content-type',')
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar)
        }
    })
})


$('#usersBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    console.log(id)
    //通过id获取当前这一条要编辑的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            console.log(res)
            var html = template('modifyTpl', res);
            console.log(html)
            $('#modifyBox').html(html);
        }
    })
})

//用事件委托给修改表单添加事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    //jq当中自动收集表单数据
    console.log($(this).serialize())
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
        //get post put delete
        type: 'put',
        url: '/users/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })
    return false;
})


//删除功能 事件委托
$('#usersBox').on('click', '.del', function () {
    if (confirm('确定要删除吗?')) {
        //id值
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }

})


//批量删除功能的实现
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    //找到tbody下面所有的checkbox,给它们添加checked效果
    var checkList = $('#usersBox input[type="checkbox"]');//jq对象，把tbody中所有的input找到
    // attr,prop,css 如果只有一个参数，就是获取，如果有两个参数，就是在设置
    checkList.prop('checked', bool);
    if (bool == true) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})

//全选效果的切换
$('#usersBox').on('change', 'input[type="checkbox"]', function () {
    //只有当tbody中所有的checkbox的数量和所有的打勾的checkbox数量一样的，说明是全选
    if ($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if ($('#usersBox input[type="checkbox"]:checked').length > 0) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})


$('#deleteAll').on('click', function () {
    if (confirm('确定要删除吗')) {
        //选出来所有的打勾的checkbox
        var checkList = $('#usersBox input[type="checkbox"]:checked');
        var str = ""
        checkList.each(function (index, item) {
            str += $(item).attr('data-id') + '-'
        })
        //截取最后面的-
        //str用来收集所有的id，用-拼在一起
        str = str.substr(0, str.length - 1)
        $.ajax({
            type: 'delete',
            url: "/users/" + str,
            success: function () {
                location.reload();
            }
        })
    }

})