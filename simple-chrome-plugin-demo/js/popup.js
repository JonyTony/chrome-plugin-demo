console.log('你好，我是popup！');
var continue_doc
var ejia_tabId
var iframes
// 阅读助手
$('#read_helper').click(e => {
	sendMessageToContentScript({cmd:'add_auto_praise'})
	// add_iframes_event()
	// $('li[data-url="/im/xiaoxi/"]').click()
});

function add_iframes_event(){
	iframes = $('ul.nav-menu')
	iframes.bind("DOMNodeInserted",()=>{
		setTimeout(()=>{
			var iframe_xiaoxi = $('iframe[src="/im/xiaoxi/"]')
			if(iframe_xiaoxi.length > 0){
				iframe_xiaoxi.load(()=>{
					console.log("iframe_xiaoxi load")
					iframes.unbind("DOMNodeInserted")
				})
			}
			console.log($('iframe[src="/im/xiaoxi/"]'))
			// iframes.unbind("DOMNodeInserted")
		},2000)
	})
}





function openEjia(){
	// 在新标签页打开e+
	// window.open(chrome.extension.getURL('background.html'));
	console.log("this read_helper init")
	getCurrentTabId(tabId => {
		chrome.tabs.create({url: 'https://ejia.tbea.com/home'});
		alert('当前标签ID：' + tabId);
	});
	setTimeout(() => {
		getCurrentTabId(tabId =>{
			if(document.title == "TBe+"){
				ejia_tabId = tabId;
				alert(ejia_tabId)
				alert("this is ejia main page, next to login")
			}
			alert("run next")
		})
	}, 2000);
}


// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}