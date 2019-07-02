var eventsModule = (function(dModule,uModule, cModule, wModule){
	var addEventListeners = function () {
		//character typing event listener

		//click on download button event listener

	};

	return{
		//initialize the test before start
		init: function (duration, textNumber) {
			//fill the list of test words dataModule
			var words=wModule.getWords(textNUmber);
			dModule.fillListOfTestWords(textNUmber,words);
			//fill the list of test words UIModule

			//set total test time from the init function

			//update time left dataModule
			
			//update time left dataModule

			//move to a new word: dataModule

			//set active word: UI Module

			//format the active word UI Module

			//focus on text input UI Module

			//set all event listeners
			addEventListeners();
		}
	};
})(dataModule,UIModule,certificateModule,wordsModule);