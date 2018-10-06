// Converting TeX to MathML, which can be pasted into MS Word as equation
function getMathML(jax, callback) {
	var mml;
	try {
		//  Try to produce the MathML (if an asynchronous
		//  action occurs, a reset error is thrown)
		//  Otherwise we got the MathML and call the
		//  user's callback passing the MathML.
		mml = jax.root.toMathML("");
	} catch(err) {
		if (!err.restart) {throw err} // an actual error
			//  For a delay due to file loading
			//  call this routine again after waiting for the
			//  the asynchronous action to finish.
		return MathJax.Callback.After([getMathML,jax,callback],err.restart);
	}
	//  Pass the MathML to the user's callback
	MathJax.Callback(callback)(mml);
}

function showMathMLandLaTex(latexText){
	if (latexText === ''){
		$("#latex-input").val('');
		$("#latex-output").text('');
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "latex-output"]);
		$("#mathml-output").text('');
	}else {
		$("#latex-output").text("$$" + latexText + "$$");
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "latex-output"]);
		MathJax.Hub.Queue(function(){ // callback after latex-output is rendered
			var jax = MathJax.Hub.getAllJax(document.getElementById('latex-output'))
			if (jax[0] !== undefined){
				getMathML(jax[0], function(mml){
					mml = '<?xml version="1.0"?>\n' + mml
					$("#mathml-output").text(mml)
					// change the height of the textarea to fit the content
					var height = document.getElementById('mathml-output').scrollHeight + "px";
					$("#mathml-output").css('height', height)
				});
			}
		});
	}
}

$('#latex-input').on('keyup', function(){
	showMathMLandLaTex($(this).val())
});

$('#example-btn').click(function(){
	var exampleEquations = ['E=mc^2', 
		'f(x)=\\frac{1}{1+e^{-x}}', 
		"Q_\\phi(\\mathbf{s}, \\mathbf{a}) \\leftarrow r(\\mathbf{s}, \\mathbf{a}) + \\gamma \\max_{\\mathbf{a'}} Q_\\phi(\\mathbf{s'}, \\mathbf{a'})"]
	var randomnumber = Math.floor(Math.random() * exampleEquations.length);
	var exampleEquation = exampleEquations[randomnumber];
	$('#latex-input').val(exampleEquation);
	showMathMLandLaTex(exampleEquation);
});

$('#clear-btn').click(function(){
	showMathMLandLaTex('')
});
