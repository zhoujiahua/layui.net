/**

 @Name: layuiQuietBlog - 静谧风格个人博客模板
 @Author: xuzhiwen
 @Copyright: layui.com

 */


layui.define(['element', 'carousel', 'laypage', 'form', 'laytpl'], function (exports) {
    var $ = layui.jquery
        , laytpl = layui.laytpl
        , element = layui.element
        , carousel = layui.carousel
        , laypage = layui.laypage
        , form = layui.form;

    laypage.render({
        elem: 'demo1'
        , count: 100 //数据总数
        , jump: function (obj) {
            //console.log(obj)
        }
    });


    //end 提交
    $('#item-btn').on('click', function () {
        var count = $('#LAY-msg-box li').length;
        //console.log(count)
        var data = new Date();
        var f = data.getFullYear(), m = data.getMonth(), g = data.getDate();
        time = f + '/' + m + '/' + g;
        var elemCont = $('#LAY-msg-content')
            , content = elemCont.val();
        if (content.replace(/\s/g, '') == "") {
            layer.msg('请先输入留言');
            return elemCont.focus();
        } else {

            var view = $('#LAY-msg-tpl').html()
                //模拟数据
                , data = {
                    name: '闲心'
                    , time: time
                    , avatar: '../res/static/img/avatar.jpg'
                    , content: content
                };

            //模板渲染
            laytpl(view).render(data, function (html) {
                $('#LAY-msg-box').prepend(html);
                elemCont.val('');
                layer.msg('留言成功', {
                    icon: 1
                })
            });
            $('#count').text(count + 1);
        }
    })


    exports('layBlog', {});
});