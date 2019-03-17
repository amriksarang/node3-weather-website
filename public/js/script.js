// client side javascript

document.querySelector("form").addEventListener("submit", (e) => {
	
	e.preventDefault();
	
	let address = document.querySelector("form input").value;
	
	document.querySelector("#message-1").textContent = "Loading...";
	document.querySelector("#message-2").textContent = '' ;
	
	fetch('/weather?address='+address).then((response) => {
		response.json().then( (data) => {
			if(data.error){
				document.querySelector("#message-1").textContent = data.error;
			}else{
				document.querySelector("#message-1").textContent = data.location;
				document.querySelector("#message-2").textContent = data.forecast;
			}
		})
	});	
});
