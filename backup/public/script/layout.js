var baseUrl = window.location.protocol + '//' + window.location.host;
var baseDoc = baseUrl + '/mirror';
var docList = [
    {
        id: 1,
        name: '主页',
        path: '/www.layui.net/index.htm',
        description: '主页',
        children: []
    },
    {
        id: 2,
        name: '文档',
        path: '/www.layui.net/doc/index.htm',
        description: '文档',
        children: []
    },
    {
        id: 3,
        name: '例子',
        path: '/www.layui.net/demo/index.htm',
        description: '例子',
        children: []
    },
    {
        id: 4,
        name: 'Layer',
        path: '/www.layui.net/layer/index.htm',
        description: 'Layer',
        children: []
    },
    {
        id: 5,
        name: 'Laydate',
        path: '/www.layui.net/laydate/index.htm',
        description: 'Laydate',
        children: []
    },
    {
        id: 6,
        name: '扩展组件',
        path: '/fly.layui.net/extend/index.htm',
        description: '扩展组件',
        children: []
    },
    {
        id: 7,
        name: 'Layui社区模版',
        path: '/fly.layui.net/store/fly/index.htm',
        description: '基于 layui 的极简社区模版',
        children: []
    },
    {
        id: 8,
        name: '模板应用市场',
        path: '/fly.layui.net/store/index.htm',
        description: '模板应用市场',
        children: [
            {
                id: 81,
                name: '大气风格的网络公司企业模版',
                path: '/fly.layui.net/store/layuiNetCompany/index.htm',
                description: '大气风格的网络公司企业模版',
                children: []
            },
            {
                id: 82,
                name: '简约家居商城模板',
                path: '/fly.layui.net/store/layuiHomeMall/index.htm',
                description: '简约家居商城模板',
                children: []
            },
            {
                id: 83,
                name: '极简新闻资讯模板',
                path: '/fly.layui.net/store/layuiSimpleNews/index.htm',
                description: '极简新闻资讯模板',
                children: []
            },
            {
                id: 84,
                name: '静谧风格个人博客模板',
                path: '/fly.layui.net/store/layuiQuietBlog/index.htm',
                description: '静谧风格个人博客模板',
                children: []
            },
            {
                id: 85,
                name: '母婴商城模板',
                path: '/fly.layui.net/store/layuiMaternalBabyMall/index.htm',
                description: '母婴商城模板',
                children: []
            },
            {
                id: 86,
                name: '极简博客模板',
                path: '/fly.layui.net/store/layuiSimpleBlog/index.htm',
                description: '极简博客模板',
                children: []
            },
            {
                id: 87,
                name: '通用企业公司网站模板',
                path: '/fly.layui.net/store/layuiUniversalCompany/index.htm',
                description: '通用企业公司网站模板',
                children: []
            },
            {
                id: 88,
                name: '微新闻',
                path: '/fly.layui.net/store/layuiWeNews/index.htm',
                description: '微新闻',
                children: []
            },
            {
                id: 89,
                name: '闲言轻博客模块',
                path: '/fly.layui.net/store/xianyan/index.htm',
                description: '闲言轻博客模块',
                children: []
            }
        ]
    },
    {
        id: 9,
        name: 'Layui CDN',
        path: 'https://www.layuicdn.com',
        description: '感谢 layuicdn 提供的备份',
        children: []
    },
    {
        id: 10,
        name: 'Layui源码下载',
        path: '/res.layui.net/static/download/layui/layui-v2.6.8.zip?v=1',
        description: 'Layui官方源码下载',
        children: []
    }
];
