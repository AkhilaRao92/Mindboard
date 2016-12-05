
(function(){
	//console.log("Here");
	//console.log($('#signup-form'));
	
	$('#signup-form').on('submit',function(event){
		console.log('submitting');
		event.preventDefault();
		$.post('/signup',$(this).serialize(),function(data){
			console.log(data);
		});
	});

	$('#signin-form').on('submit',function(){
		console.log("signing in!")
		event.preventDefault();
		$.post('/signin',$(this).serialize(),function(data){
			console.log(data)
		})
	})

})();
