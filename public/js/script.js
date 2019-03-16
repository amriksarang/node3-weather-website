// client side javascript
console.log("Client side script is loaded");



document.querySelector("form").addEventListener("submit", (e) => {
	
	e.preventDefault();
	
	let address = document.querySelector("form input").value;
	
	document.querySelector("#message-1").textContent = "Loading...";
	document.querySelector("#message-2").textContent = '' ;
	
	fetch('http://localhost:3000/weather?address='+address).then((response) => {
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
