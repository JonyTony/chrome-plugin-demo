(function() {
	console.log('这是 simple-chrome-plugin-demo 的content-script！');
})();
var reading = 1
var read_object = {
	count: -1,
	index: 0,
	read_list: []
}
Object.defineProperty(read_object,'count',{
    get:function(){
        return count;
    },
    set:function(newValue){
        count=newValue;
        console.log('set :',newValue);
        //需要触发的渲染函数可以写在这...
		if(read_object.read_list != [] && count > 0){
			var index = read_object.index
			console.log("reading start")
			var click_item = read_object.read_list[index]
			watch_iframe_dialog()
			click_item.click()
		}
		if(count == 0){
			setTimeout(()=>{
				read_object.index = 0;
				read_object.read_list = [];
				read_object.count = -1;
				$('body').unbind()
				if(reading == 0){
					// 新闻资讯
					open_xwzx("XT-XT-2bb8a866-d2a3-47da-bbad-8c63db21e9b6-dd566281-9032-11e6-a62c-005056987210")
				}
				if(reading == 1){
					// 新变厂新闻资讯
					open_xwzx("XT-XT-0ba2025b-e2cb-498b-99b1-cdc741a21f75-dd566281-9032-11e6-a62c-005056987210")
				}
				if(reading == 2){
					// 开讲了
					open_xwzx("XT-XT-1b1e03a9-8222-4b7f-a7eb-a5d91e2d012d-dd566281-9032-11e6-a62c-005056987210")
				}
				reading += 1;
			},2000)
		}
    }
})

function readed_set(){
	setTimeout(() => {
		read_object.index++
		read_object.count--
	}, 1000);
}


// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
	if(request.cmd == 'add_auto_praise') {
		console.log(document.title)
		add_iframes_event()
		$('li[data-url="/im/xiaoxi/"]').click()
	}
	else {
		console.log('我收到你的消息了：'+JSON.stringify(request));
	}
});

function add_iframes_event(){
	iframes = $('ul.nav-menu')
	iframes.bind("DOMNodeInserted",()=>{
		setTimeout(()=>{
			var iframe_xiaoxi = $('iframe[src="/im/xiaoxi/"]')
			if(iframe_xiaoxi.length > 0){
				$('iframe[src="/im/xiaoxi/"]').ready(()=>{
					console.log("iframe_xiaoxi load")
					read_object.count = 0;
					// 新闻咨询
					// open_xwzx('XT-XT-2bb8a866-d2a3-47da-bbad-8c63db21e9b6-dd566281-9032-11e6-a62c-005056987210')
				})
			}
			console.log($('iframe[src="/im/xiaoxi/"]'))
		},2000)
		iframes.unbind("DOMNodeInserted")
	})
}

function open_xwzx(id){
	var doc_xiaoxi = $('iframe[src="/im/xiaoxi/"]')[0].contentDocument
	var xwzx = $('iframe[src="/im/xiaoxi/"]').contents().find('li#'+id)
    console.log(xwzx)
    if(xwzx.length == 1){
		var unread = xwzx.find('i.session-item-unread')
        if(reading == 0 && $('div#im-chat-name').text() != '新闻资讯'){ 
			console.log("reading 新闻资讯")  
				read_last_xw($(".im-chat-main-wrapper",doc_xiaoxi))
                xwzx.click()
        }   
		if(reading == 1 && $('div#im-chat-name').text() != '新变厂新闻资讯'){   
			console.log("reading 新变厂新闻资讯") 
			if(unread.length >= 0){
				read_last_xw($(".im-chat-main-wrapper",doc_xiaoxi))
				xwzx.click()
			}
		}    
		if(reading == 2 && $('div#im-chat-name').text() != '开讲了'){   
			console.log("reading 开讲了") 
			if(unread.length >= 0){
				read_last_xw($(".im-chat-main-wrapper",doc_xiaoxi))
				xwzx.click()
			}
		}   
    }
}

function read_last_xw(xw_container){
	xw_container.bind("DOMSubtreeModified",(e)=>{
		var doc = e.currentTarget.ownerDocument
		// console.log("xw_container DOMSubtreeModified")
		// console.log(e.currentTarget)
		$(e.currentTarget).ready(()=>{
			var title = $("#im-chat-name",doc).text()
			console.log(title)
			if(title == '新闻资讯' || title == '新变厂新闻资讯' || title == '开讲了' ){
				console.log("read xwzx")
				var last_xw = $('div.chat-item:last',doc)
				var xw_list = last_xw.find("a")
				console.log(xw_list)
				if(xw_list.length > 0 && reading <= 3){
					read_object.read_list = xw_list
					read_object.count = xw_list.length
					xw_container.unbind()
				}
				
			}
		})
		
		
	})
}

function read_one_xw(xw_reading){
	xw0.click()

}

function watch_iframe_dialog(){
	var body = $('body')
	body.bind("DOMNodeInserted",()=>{
		console.log("dialog insert")
		setTimeout(()=>{
			// 获取加载的新闻
			var iframe_dialog = $('#iframe-yl_iframe_dialog_1')
			if(iframe_dialog.length > 0){
				iframe_dialog.ready(()=>{
					console.log("iframe_dialog ready")
					var doc_xw = $('iframe#iframe-yl_iframe_dialog_1').contents()[0]
					setTimeout(() => {
						var title = $('.article-container h3',doc_xw).text()
						var time = $('.article-container',doc_xw).find('p.header-info').text().trim()
						console.log("reading:" + title + " " + time)
						// $('span.praise-num', doc_xw).click()
						var praise_unActive = $('span.praise-num', doc_xw)
						if(praise_unActive.length > 0){
							praise_unActive.click()
						}
						var praise_active = $('span.praise-active', doc_xw)
						if(praise_active.length > 0){
							console.log(title + "，已点赞！")
						}
						$('a.yl-iframe-dialog-close')[0].click()
						readed_set()
					}, 5000);
				})
			}
		},1000)
		body.unbind()
		console.log("dialog close")
	})

}

