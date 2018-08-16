authen();
userAccount();
function authen() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			if(data.status == "session account not detected!") {
				alert("Session Expired!");
				window.location.href = ''+myurl+'/tops/';	
			} else {
				document.getElementById("branchOut").innerHTML ='Branch: ' + data.user_branch;
			}
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/authenticate',true);
	http.send();
}
function userAccount() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
				document.getElementById('userOut').innerHTML = data.employees_first_name +' '+ data.employees_last_name;
				document.getElementById("employeeImg").src = 'data:image/jpg;base64,' + data.employees_image;
				document.getElementById("employeeOptionImg").src = 'data:image/jpg;base64,' + data.employees_image;	

				document.getElementById("request_branch").value =data.user_branch;
				document.getElementById("request_by").value = data.employees_first_name +' '+ data.employees_last_name;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/user_account',true);
	http.send();	
}
function signOut() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			window.location.href = ''+myurl+'/tops-portal/';
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/signOut',true);
	http.send();
}