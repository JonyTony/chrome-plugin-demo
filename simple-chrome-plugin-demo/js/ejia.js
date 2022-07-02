console.log("this is reading helper!")

function init(){
    console.log("this is reading helper init!")
}

// 
$('iframe[src="/im/xiaoxi/"]').load(()=>{
    console.log("xwzx")
})
// 
var reading = 0
function xiaoxi_add(){
    
    
}
var home_container = $('div#home-container')
home_container.bind("DOMNodeInserted",(e)=>{
    setTimeout(() => {
        xiaoxi_add()
    }, 5000);

})

$('li[data-url="/im/xiaoxi/"]').click()
$('iframe[src="/im/xiaoxi/"]').load(()=>{
    var xwzx = $('iframe[src="/im/xiaoxi/"]').contents().find('li#XT-XT-2bb8a866-d2a3-47da-bbad-8c63db21e9b6-dd566281-9032-11e6-a62c-005056987210')
    console.log(xwzx)
    if(xwzx.length == 1){
        if(reading == 0 && $('div#im-chat-name').text() != '新闻咨询'){   
                console.log(3)        
                var unread = xwzx.find('i.session-item-unread')
                console.log(unread)
                xwzx.click()
        }        
    }
})


var iframes = $('ul.nav-menu')
iframes.bind("DOMNodeInserted",()=>{
    setTimeout(()=>{
        var iframe_xiaoxi = $('iframe[src="/im/xiaoxi/"]')
        if(iframe_xiaoxi.length > 0){
            iframe_xiaoxi.load(()=>{
                console.log("iframe_xiaoxi load")
            })
        }
        console.log($('iframe[src="/im/xiaoxi/"]'))
        // iframes.unbind("DOMNodeInserted")
    },2000)
    
})

function on_xiaoxi_load(){

}



function for_ejia(){
    // 1.点击消息
    $('li[data-url="/im/xiaoxi/"]').click()
    // 2.查找新闻咨询，查询是否存在未阅读的新闻咨询,如存在未读，则点击
    var home_container = $('div#home-container')
    home_container.bind("DOMNodeInserted",(e)=>{
        console.log(e)
        var doc_xiaoxi = $('iframe[src="/im/xiaoxi/"]').contents()
        if(doc_xiaoxi.length > 0){
            doc_xiaoxi[0].bind("DOMSubtreeModified", xiaoxi_add(doc_xiaoxi[0]))
        }
    
    })

    $('li[data-url="/im/xiaoxi/"]').click()

    // 检查标题
    $('div#im-chat-name').text() == '新闻咨询'


    var doc_xiaoxi = $('iframe[src="/im/xiaoxi/"]').contents()[0]
    $(doc_xiaoxi).ready(function(){
        var xwzx = $('li[id="XT-XT-2bb8a866-d2a3-47da-bbad-8c63db21e9b6-dd566281-9032-11e6-a62c-005056987210"]')
        var unread = xwzx.find('i.session-item-unread')
        console.log(unread)
        if(unread.length == 1){
            xwzx.click()
        }
    
    // 3.点击新闻咨询，查询是否存在未阅读的新闻咨询，如已读，则查询最后一篇是否已点赞

    // 4.等待新闻咨询页加载，获取新闻咨询数量
    var last_xw = $('div.chat-item:last')  
    console.log(last_xw)
    var xw0 = last_xw.find('li.first')
    xw0.click()
    })    

    // 5.点击新闻咨询列表第一项
    // 6.查看当前页面,等待5s，点赞
    var doc_xw = $('iframe#iframe-yl_iframe_dialog_1').contents()[0]
    $(doc_xw).ready(()=>{
        setTimeout(() => {
            $('span.praise-num').click()
            $('a.yl-iframe-dialog-close').click()
        }, 5000);
    })
    // 8.关闭当前页，返回前一页
    // 9.点击新闻咨询列表第二项，循环5-8，至最后一项

    // 10.点击新变厂新闻咨询
}