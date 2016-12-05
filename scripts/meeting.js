(function(){
	// $("#title").css({"width":$(window).innerWidth() + "px"})

	$('#meeting-id').on('submit',function(){
		console.log("submitting")
		$.post('/meeting-handler',$(this).serialize(),function(data){
			console.log("joined meeting")
		})
	})
})();