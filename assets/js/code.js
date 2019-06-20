var myModule=(function () {
	//private members
	var x = 1;
	var car={
		make:'Audi',
		model: 'A3'
	};

	//public members

	return {
		f1: function () {
			return x;
		},
		f2: function () {
			return {
				make:car.make,
				model: car.model
			};
		}
	};
})();

console.log(myModule.f1());
console.log(myModule.f2());
myModule.f2().model='A6';
console.log(myModule.f2());
// lfd
