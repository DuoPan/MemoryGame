/*
 * 创建一个包含所有卡片的数组
 */

// 卡牌类
function card(){
	this.isOpen = 0;
	this.content = "undefined";
	//this.nodeLI 存放li元素数组
}

// 图像集合
var patterns = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

// 卡牌数组
var cards = new Array(16);

// 存放翻开的卡牌的序号
var open = [];

// 记录步数
var steps = 0;


function init(){
	cards.length = 0;
	open.length = 0;
	steps = 0;
	document.getElementById("steps").innerHTML = steps;
		
	// 创建卡片数组，并且初始化图案
	for (var i = 0; i < 16; i++) {
		cards[i] = new card();
		cards[i].content = patterns[Math.floor(i/2)];
	}

	// 洗牌 多洗几次
	shuffle(cards);
	shuffle(cards);
	shuffle(cards);

	// 把打乱的图案放入到每个li里面
	var deck = document.getElementById("board");
	var j = 0;
	for (var i = 0; i < deck.childNodes.length; i++) {
		if(deck.childNodes[i].nodeName == "LI"){
	 		deck.childNodes[i].className = "card"
	 		cards[j].nodeLI = deck.childNodes[i];
			cards[j].nodeLI.innerHTML = '<i class="' + cards[j].content + '"></i>';
	 		j++;
	 	}
	}

	// 初始化卡片都显示背面
	// 监听点击事件
	for (var i = 15; i >= 0; i--) {
		cards[i].nodeLI.className = "card";
		cards[i].nodeLI.id = i;
		cards[i].nodeLI.addEventListener('click',function(){openCard(this);});
	}
}


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//shuffle(cards);

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */


function openCard(node){
	if(cards[node.id].isOpen == 1){//正面状态
		return;
	}

	cards[node.id].nodeLI.className = "card match";
	cards[node.id].isOpen = 1;

	if(open.length % 2 == 0){//翻开第一个
		open.push(node.id);
	}else{//翻开第二个
		//	更新步数
		steps++;
		document.getElementById("steps").innerHTML = steps;
		if(cards[node.id].content == cards[open[open.length-1]].content){
			open.push(node.id);
			if(open.length == 16){
				alert("win");
			}
		}
		else{
			//用户可能按得很快，所以先处理好数组，再推迟显示
			var t = open[open.length-1];
			open.pop();
			//推迟翻面
			setTimeout(function(){
				cards[node.id].nodeLI.className = "card";
				cards[node.id].isOpen = 0;
				cards[t].nodeLI.className = "card";
				cards[t].isOpen = 0;
			}, 600);
			
		}
		
		
	}	

}



function restart(){
	init();
}


init();

