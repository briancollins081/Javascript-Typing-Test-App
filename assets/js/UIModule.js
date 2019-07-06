var UIModule = (function () {
	//classes used to select HTML elements
	var DOMElements={
		//indicators test control
		timeLeft: document.getElementById('timeLeft'),
		wpm: document.getElementById('wpm'),
		wpmChange: document.getElementById('wpmChange'),
		cpm: document.getElementById('cpm'),
		cpmChange: document.getElementById('cpmChange'),
		accuracy: document.getElementById('accuracy'),
		accuracyChange: document.getElementById('accuracyChange'),
		textInput: document.getElementById('input'),
		nameInput: document.getElementById('nameInput'),
		content: document.getElementById("content"),
		activeWord: '',
		modal: $('#myModal')
	};

	var spiltArray = function(string){
		return string.split('');
	};
	var addSpace = function(array) {
		array.push(' ');
		return array;
	};
	var addSpanTags = function(array) {
		return array.map(function (currentChar) {
			return '<span>'+currentChar+'</span>';
		});
	};
	var addWordSpanTags=function (array) {
		array.push('</span>');
		array.unshift('<span>');
		return array;
	};
	var joinEachWord=function (array) {
		return array.join('');
	};
	var userValue;
	var returnCharClass = function (currentCharacter, index) {
		return 	(index < userValue.length)?(currentCharacter == userValue[index] ? 'correctCharacter':'wrongCharacter'):'0';
	};
	var updateChange = function (value, changeElement) {
		//class decision to add to change element
		//decide the html content to insert
		var classToAdd, html;
		[classToAdd, html] = (value >= 0)?['scoreUp','+'+value]:['scoreDown', value];
		//add % to the change element
		if(changeElement == DOMElements.accuracyChange){
			html+= '%';
		}
		//update change elements
		changeElement.innerHTML=html;
		//style the element
		changeElement.removeAttribute('class');
		changeElement.className = classToAdd;

		//fade element
		fadeElement(changeElement);
	};
	var fadeElement=function (element) {
		element.style.opacity = 1;
		setTimeout(function () {
			element.style.opacity=0.8;
		},100);
	}

	return{
		// get DOM elements
		getDOMElements: function () {
			return {
				textInput:DOMElements.textInput
			};
		},
		//indicators - test control
		updateTimeLeft: function (x) {
			DOMElements.timeLeft.innerHTML=x;
		},

		//results
		updateResults: function (results) {
			//update wpm
			DOMElements.wpm.innerHTML = results.wpm;
			//update cpm
			DOMElements.cpm.innerHTML = results.cpm;
			//update accuracy
			DOMElements.accuracy.innerHTML = results.accuracy + '%';
			//update UI change elements
			updateChange(results.wpmChange, DOMElements.wpmChange);
			updateChange(results.cpmChange, DOMElements.cpmChange);
			updateChange(results.accuracyChange, DOMElements.accuracyChange);
		},
		fillModal: function (wpm) {
			
			var html = '<div><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute!</p><img/ src="img/%image%" alt="%alt%"></div>';

		},
		showModal: function () {
			DOMElements.modal.modal('show');
		},

		//user input
		inputFocus: function () {
			DOMElements.textInput.focus();
		},
		isNameEmpty: function () {
			
		},
		flagNameInput: function () {
			
		},
		spacePressed: function (event) {
			return event.data == " ";
		},
		enterPressed: function (lineReturn) {
			return DOMElements.textInput.value.includes(lineReturn+' ');
		},
		emptyInput: function () {
			DOMElements.textInput.value="";
		},
		getTypedWord: function () {
			//console.log(DOMElements.textInput.value);
			return DOMElements.textInput.value;
		},
		
		//test words
		fillContent: function (array,lineReturn) {
			var content=array.map(spiltArray);
			// console.log(content);
			content=content.map(addSpace);
			//console.log(content);
			content=content.map(addSpanTags);
			// console.log(content);
			content=content.map(addWordSpanTags);
			//console.log(content);
			// join each word
			content=content.map(joinEachWord);
			// console.log(content);
			content=content.join('');
			// console.log(content);

			// replace all line returns chars with HTML entities
			//content=content.replace('<span>|</span>','<span>&crarr;</span>');
			content=content.split('<span>'+lineReturn+'</span>').join('<span>&crarr;</span>');

			//fill content box
			DOMElements.content.innerHTML=content;
		},
		formatWord: function (wordObject) {
			var activeWord = DOMElements.activeWord;
			//highlight it
			activeWord.className = 'activeWord';
			//format individual chars
			var correctValue = wordObject.value.correct;
			userValue = wordObject.value.user;
			
			var classes = Array.prototype.map.call(correctValue, returnCharClass);
			//get active word
			var activeWord = DOMElements.activeWord;
			var characters = activeWord.children;

			// add class to children
			for(var i=0; i<characters.length; i++){
				characters[i].removeAttribute('class');
				characters[i].className = classes[i];
			}
		},
		setActiveWord: function (index) {
			DOMElements.activeWord = DOMElements.content.children[index];
		},
		deactivateCurrentWord: function () {
			DOMElements.activeWord.removeAttribute('class');

		},
		scroll: function () {
			var activeWord=DOMElements.activeWord;
			var top1=activeWord.offsetTop;
			var top2=DOMElements.content.offsetTop;
			var diff=top1-top2;
			/*Scroll content box*/
			DOMElements.content.scrollTop=diff - 40;
		}
	}
	
})();