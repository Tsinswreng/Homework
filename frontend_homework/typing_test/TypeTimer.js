//23.02.03-1601
class TypeTimer{
	constructor() {
		this.mode = 1;//自由
		this.timeLimit = null;
		this.remainingTime = null;
		this.second = 0.0;
		this.startTime = 0;
		this.elapsedTime = 0;
		this.interruptedTime = 0;
		this.endTime = 0;
		this.state = -1;
		this.text = "";
		this.numberOfChar = 0;
		this.speedOfCharPerSecnod = 0;
		//this.speedOfCharPerMinute = 0;
		this.keyPressCounter = 0;
		this.speedOfKeyPressPerSecond = 0;
		//this.speedOfClickPerMinute = 0;
		this.clock = 0;
		this.tamKezIia = 0;//倒計時
	}
	setMode(mode){
		this.mode = mode;
	}
	setRemainingTime(remainingTime){
		this.remainingTime = remainingTime;
	}
	setKeyPressCounter(value) {
		this.keyPressCounter = value;
	}
	getText_(){
		this.text = typeText.myText;
	}
	timer(){
		this.second++;
		document.getElementById('timeCounter').value=this.second.toFixed(2)+'s';
		if(this.mode === 2){
			//this.calculateElapsedTime();
			document.getElementById('remainingTime').value= (this.timeLimit - this.second).toFixed(2)+"s";
			//console.log(this.elapsedTime);
		}
	}

	startTimer() {
		//alert(this.mode);
		this.startTime = Date.now();
		this.state = 1;
		if(this.mode === 1){
		this.timeLimit = null;
		} else if(this.mode === 2){
			this.timeLimit = parseFloat( document.getElementById("remainingTime").value);
			//setTimeout(this.timeOut, this.timeLimit*1000);//[[勿寫setTimeout(this.timeOut(), this.timeLimit);、第一個參數昰不帶括號之函數名
			this.tamKezIia =setTimeout(this.timeOut.bind(this), this.timeLimit*1000);
			/*.:)bind(this) 函数的作用是改变函数的 this 指向。在 JavaScript 中，通常情况下，函数的 this 指向其所在的对象。但是，如果将该函数作为回调函数传递给其他函数或作为事件处理程序，则函数的 this 指向可能会改变，此时就需要使用 .bind(this) 来显式指定函数的 this 指向。

如果在箭头函数中，函数的 this 指向是固定的，不会随函数被调用的对象而改变，因此不需要使用 .bind(this)。因此，在绝大多数情况下，如果使用箭头函数，就不需要使用 .bind(this)。*/
		}
		this.clock=setInterval(() => { this.timer() },1000);//[[
		/*綠每1000ms纔珩一次是函數、故兩次暫停ᵗ時ᵗ隙`小於一秒旹則實時ʸ示ᵗ時`會異於真ᵗ耗時。高頻ᵈ按F2乃現斯弊。
		蓋又非然。譬初按暫停旹示數昰5.5s、再續旹second昰從5始計洏逝˪ᵗ時昰從5.5始計
		*/
		this.showData();
		console.log("timer has started");
	}
	interrupt() {
		clearInterval(this.clock);
		if(this.mode === 2){
			clearTimeout(this.tamKezIia);
		}
		this.elapsedTime = this.elapsedTime + ( Date.now() - this.startTime)/1000;
		this.state = 0;
		this.showData();
		console.log("interrupt");
	}
	goOn() {
		this.startTime = Date.now();
		//this.clock=setInterval(this.timer,1000);
		this.second = this.elapsedTime;
		this.clock=setInterval(() => { this.timer() },1000);
		if(this.mode === 2){
			this.tamKezIia = setTimeout(this.timeOut.bind(this), (this.timeLimit-this.elapsedTime)*1000);
		}
		this.state = 1;
		this.showData();
		console.log("goOn");
	}
	calculateElapsedTime() {
		this.elapsedTime = this.elapsedTime + ( Date.now() - this.startTime)/1000;
	}
	showData(){
		if(this.state === -1){
			document.getElementById("status").value = "未开始";
			document.getElementById("status").style.color = "";
		}else if(this.state === 0){
			document.getElementById("status").value = "暂停中";
			document.getElementById("status").style.color = "yellow";
		}else if(this.state === 1){
			document.getElementById("status").value = "计时中";
			document.getElementById("status").style.color = "green";
		}
		this.setKeyPressCounter(control.keyPressCounter);
		//this.calculateNumberOfCharFrom("inputtingArea");//從舊版輸入框中取字符
		typeText.getMyTextFromFullTypingArea();
		typeTimer.getText_();
		this.calculateSpeed();
		document.getElementById("timeCounter").value = this.elapsedTime.toFixed(2) + "s";
		document.getElementById("remainingTime").value= this.remainingTime;
		document.getElementById("numeroDeChar").value = this.text.length + "个";
		document.getElementById("charPerSecond").value = this.speedOfCharPerSecnod.toFixed(2) + "/s";
		document.getElementById("charPerMinute").value = (this.speedOfCharPerSecnod*60).toFixed(2) + "/min";
		document.getElementById("numberOfKeyPress").value = this.keyPressCounter + "次";
		document.getElementById("clickPerSecond").value = this.speedOfKeyPressPerSecond.toFixed(2) + "/s";
		document.getElementById("clickPerMinute").value = (this.speedOfKeyPressPerSecond*60).toFixed(2) + "/min";
	}
	reset() {
		clearInterval(this.clock);
		this.second=0;
		this.elapsedTime = 0;
		this.state = -1;
		this.keyPressCounter = 0;
		control.setKeyPressCounter(0);
		this.showData();
	}
	clearInputtingArea(){
		document.getElementById("inputtingArea").value = "";
	}
	end() {
		clearInterval(this.clock);
		this.state = -1;
		this.elapsedTime = (this.elapsedTime + Date.now() - this.startTime)/1000;
		this.showData();
		console.log("end");
	}
	calculateNumberOfCharFrom(id){//[[此昰叺算舊輸入框者、當棄用
		this.text = document.getElementById(id).value;
		this.numberOfChar = this.text.length;
	}
	timeOut(){
		this.end();
		alert("计时结束");
		document.getElementById("remainingTime").value = 0;
	}
	
	calculateSpeed(){
		this.speedOfCharPerSecnod = this.text.length / this.elapsedTime;
		this.speedOfKeyPressPerSecond = this.keyPressCounter / this.elapsedTime;
	}
	
	
}

let typeTimer = null;

class Control{
	constructor() {
		this.keyPressCounter = 0;
		this.isTimerExisted = false;
		this.backspaceEvent = new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			keyCode: 8,//退格
		});
		//alert(this.isTimerExisted);
	}
	doListener(){
		document.addEventListener("keydown", this.timerControl.bind(this));//第二個參數ʸ寫this.timerControl則意昰取timerControl属性的值、若寫this.timerControl()則昰珩此函數?
		//alert(this.isTimerExisted+"2");
		/*问题是 timerControl 方法中的 this 不指向 Control 的实例。在 JavaScript 中，函数内的 this 取决于函数如何被调用，而不是它如何被定义。
您可以使用 bind 方法将 this 绑定到 Control 的实例。*/
	}
	timerControl(event){
		if(event.code === "F2"){
			//alert("F2");
			//alert(this.isTimerExisted);
			
			if(this.isTimerExisted === false){
				typeTimer = new TypeTimer();//當用戶第一次按下F2時創建對象
				//alert("typeTimer = new TypeTimer();");
				//[[爲什麼不可以直接typeTimer = new TypeTimer();
				//[[宜試單例模式
				this.isTimerExisted = true;
			}
			{
				if(typeTimer.state === -1){
					typeTimer.startTimer();
				}else if(typeTimer.state === 0){
					typeTimer.goOn();
				} else if(typeTimer.state === 1){
					typeTimer.setKeyPressCounter(this.keyPressCounter);
					typeTimer.interrupt();
				}
			}
		}
		if(typeTimer.state === 1){//當置于F2之後
			this.keyPressCounter++;
		}
		if(event.code === "Enter"){
			event. preventDefault();
			typeText.skipLines(1);
			
			//typeText.myText = typeText.myText + typeText.myTextOfSingleLine;
			//document.getElementById(newId).dispatchEvent(this.backspaceEvent);//[[??叵㢓。先珩事件ⁿ後珩換行
			
			//typeText.removeNewLine();
			//取當前聚焦ᵗid、除其類名ⁿ取其id之下標、使下標加1再附類名于前、再聚焦。此外、新設一數組以納ᵣ用戶輸入ᵗ字符、每當鍵盤`被按即...。
			//用戶已到末一行輸入框且按˪回車旹、清空內容、光標重聚焦于首、重新發送文本。
		}
		//changeColorForCurrentText("inputtingArea", "originTextDiv","green");
		
	}
	setKeyPressCounter(keyPressCounter){
		this.keyPressCounter = keyPressCounter;
	}
}


class TypeText{
	constructor() {
		this.singleUnit = '<div class="hisTextDiv" contenteditable="true"></div>\n' +
		    '\t\t<div class="myTextDiv" contenteditable="true"></div>';
		this.parentDivId = "parentTextDiv";
		this.hisTextId = "toInputToHisText";
		this.hisText = "";
		this.partOfOriginText = "";
		this.myClassName = "";
		this.hisClassName = "";
		this.myIdNumArr = [];
		this.hisIdNumArr = [];
		this.myIdStrArr = [];
		this.hisIdStrArr = [];
		this.currentIndex = 0;
		this.currentMyId = "";
		this.currentHisId = "";
		this.currentElement = null;
		//this.isIdArrayized = false;
		this.myText = "";
		this.myTextOfSingleLine = "";
		this.completedColor = "lightgreen";//green";
		this.maxLengthOfHisDiv = 55;
		this.autoChangeLine = true;
		this.currentCharToInput = "";

	}
	
	setMyClassName(myClassName){
		this.myClassName = myClassName;
	}
	setHisClassName(hisClassName){
		this.hisClassName = hisClassName;
	}
	
	setIds(){
		TypeText.setIdsForClass(this.myClassName);
		TypeText.setIdsForClass(this.hisClassName);
		this.myIdNumArr = TypeText.getIdNumArrFromClass(this.myClassName);
		this.hisIdNumArr = TypeText.getIdNumArrFromClass(this.hisClassName);
		this.myIdStrArr = TypeText.getIdStrArrFromClass(this.myClassName);
		this.hisIdStrArr = TypeText.getIdStrArrFromClass(this.hisClassName);
		this.isIdArrayized = true;
	}
	setOriginText_(){
		this.hisText = TypeText.setOriginTextFrom(this.hisTextId);
		this.hisText = this.hisText.replace(/\n/g, "");
	}
	showOriginText(){
		typeText.setOriginText_();
		if(this.maxLengthOfHisDiv === null){
			console.log("maxLength === null");
		}
		TypeText.createDuplicateUnits(this.singleUnit, this.parentDivId, (this.hisText.length/this.maxLengthOfHisDiv)+1);
		typeText.setIds();
		TypeText.showOriginText(this.hisText, this.hisClassName, this.maxLengthOfHisDiv);
		
	}
	clearCompletedPart(){
		this.getMyTextFromFullTypingArea();
		this.hisText = this.hisText.substring(this.myText.length);//[[!㢓則變ᵣhisText、蜮不善
		TypeText.showOriginText(this.hisText, this.hisClassName, this.maxLengthOfHisDiv);//不能用this.showOriginText();、詳見其實現
	}
	getCurrentIndex_(){
		this.currentIndex = TypeText.getCurrentIndexFromActiveElementId();
	}
	getCurrentMyIdAndHisId_(){
		/*this.getCurrentIndex_();
		this.currentId = this.myClassName+this.currentIndex;*/
		typeText.getCurrentIndex_();
		this.currentMyId = document.activeElement.id;
		this.currentHisId = this.hisClassName+this.currentIndex;
	}
	
	
	
	getMyTextOfSingleLineFromCurrentId_(){
		this.getCurrentMyIdAndHisId_();
		this.myTextOfSingleLine = TypeText.getPureTextById(this.currentMyId);
	}
	
	getMyTextFromFullTypingArea(){
		let singleLineStrArr = [];
		this.myText = "";
		for(let i = 0; i < this.myIdNumArr.length; i++){
			singleLineStrArr[i] = TypeText.getPureTextById(this.myIdStrArr[i]);//[[!!
			this.myText = this.myText + singleLineStrArr[i];
		}
	}
	
	clearWholeTypingArea(){
		for(let i = 0; i < this.myIdNumArr.length; i++){
			document.getElementById(this.myIdStrArr[i]).innerHTML = "";
		}
	}
	
	changeColorForCompletedText(){
		typeText.getCurrentMyIdAndHisId_();
		this.currentCharToInput = TypeText.changeColorForCurrentText(this.currentMyId, this.currentHisId, this.completedColor);
		/*let promptSpan = '<span style="color: gray; display: block;">'+m.get(this.currentCharToInput)+'</span>';
		if(m.has(this.currentCharToInput) && m.get(this.currentCharToInput) !== null){

			document.getElementById(this.currentMyId).innerHTML = document.getElementById(this.currentMyId).textContent +
				 '<span style="color: gray; display: block;">'+m.get(this.currentCharToInput)+'</span>';
		}*///㢓則span塊會多次生成、洏只需一˥。

	}
	skipLines(amountOfLines){
		typeText.currentMyId =  document.activeElement.id;
		typeText.currentIndex = TypeText.getOneIdInNum(typeText.currentMyId, typeText.myClassName);
		let newIndex = typeText.currentIndex + amountOfLines;
		let newId = TypeText.getFullIdByClassNameAndIndex(typeText.myClassName, newIndex);
		$("#"+newId).focus();
	}
	autoChangeLine(){
		this.getMyTextOfSingleLineFromCurrentId_();
		if(this.autoChangeLine === true){
			if(this.myTextOfSingleLine === this.maxLengthOfHisDiv + 1){
				this.skipLines(1);
			}
		}
	}
	
	static setIdsForClass(className){
		let elements = document.getElementsByClassName(className);
		for(let i = 0; i < elements.length; i++){
			elements[i].id = elements[i].className + i;
		}
	}
	static getCurrentIndexFromActiveElementId(){
		let currentId =  document.activeElement.id;//!!
		let currentIndex = TypeText.getOneIdInNum(currentId, typeText.myClassName);
		//console.log(currentIndex);
		return currentIndex;
	}
	static getIdNumArrFromClass(className){
		let elements = document.getElementsByClassName(className);
		let idNumArr = [];
		for(let i = 0; i < elements.length; i++){
			idNumArr[i] = i;
		}
		return idNumArr;
	}
	static getIdStrArrFromClass(className){
		let elements = document.getElementsByClassName(className);
		let idStrArr = [];
		for(let i = 0; i < elements.length; i++){
			idStrArr[i] = elements[i].id;
		}
		return idStrArr;
	}
	static getOneIdInNum(fullId, className){
		return  parseInt( fullId.substring(className.length));
	}
	static getFullIdByClassNameAndIndex(className, index){
		return className + index;
	}
	
	static setOriginTextFrom(id){
		console.log($("#" + id).val());
		return $("#" + id).val();
	}
	static showOriginText(originText, divClass, maxLengthForEachLine){
		
		var originTextOfEachLine = [];
		for(let i = 0, j = 0; j<originText.length; i++,j+=maxLengthForEachLine){
			originTextOfEachLine[i] = originText.slice(j, j+maxLengthForEachLine);
			//$("#"+divClass+i).innerHTML = originTextOfEachLine[i];//[[不能㢓寫
			$("#"+divClass+i).html(originTextOfEachLine[i]);
			//document.getElementById()
		}
	}
	static getPureTextById(id){
		return document.getElementById(id).textContent;
	}
	static removeNewline(id){
		return  TypeText.getPureTextById(id).replace(/\n/g, "");
	}
	
	static changeColorForCurrentText(myId, hisId, color){
		let wholeText = document.getElementById(hisId);
		wholeText = wholeText.textContent;
		let myLength =  document.getElementById(myId).textContent.length;
		let coloredText = "<span contenteditable='true' style='color: "+color+";'>" +  wholeText.slice(0, myLength)+ "</span>";
		let uncoloredText = wholeText.substring(myLength);
		document.getElementById(hisId).innerHTML = coloredText + uncoloredText;
		return wholeText.charAt(myLength);//返回當前方待輸入之字
	}
	
	static createDuplicateUnits(singleUnit, parentDivId, amount){
		var parentDiv = document.getElementById(parentDivId);
		for (var i = 0; i < amount; i++) {
			var newDiv = document.createElement("div");
			newDiv.innerHTML = singleUnit;
			parentDiv.appendChild(newDiv);
		}
	}
	
}
var typeText = new TypeText();
$(document).ready(function() {
	// 在页面加载完成后创建对象
	typeText.setMyClassName("myTextDiv");
	typeText.setHisClassName("hisTextDiv");
});

function OnInput (event) {//[[??
	//console.log(event.target.value);
	typeText.changeColorForCompletedText();
	$("#currentSpelling0").val(typeText.currentCharToInput);
	$("#currentSpelling1").val(m.get(typeText.currentCharToInput));
	typeText.autoChangeLine();//[[!!
}
/*// Internet Explorer
function OnPropChanged (event) {
	if (event.propertyName.toLowerCase () == "value") {
		console.log(event.srcElement.value);
	}
}*/
/*
function changeColorForCurrentText(myId, hisId, color){
	let wholeText = document.getElementById(hisId);
	wholeText = wholeText.textContent;
	let myLength =  document.getElementById(myId).value.length;
	let coloredText = "<span contenteditable='true' style='color: "+color+";'>" +  wholeText.slice(0, myLength)+ "</span>";
	let uncoloredText = wholeText.substring(myLength);
	document.getElementById(hisId).innerHTML = coloredText + uncoloredText;
}*/

/*//23.02.07-1838
function setIdsForClass(className){
	let elements = document.getElementsByClassName(className);
	for(let i = 0; i < elements.length; i++){
		elements[i].id = elements[i].className + i;
	}
}*/
/*
var originText;
function setOriginText(id){
	originText = $("#"+id).val();//!*!
	console.log(originText);
}//ok
*/


//
// function creatAllObjects(){//[[未驗
// 	if(typeTimer === null){
// 		var typeTimer = new TypeTimer();
// 	}
// 	if(control === null){
// 		var control = new Control();
// 	}
// 	if(typeText === null){
// 		var typeText = new TypeText();
// 	}
// }



