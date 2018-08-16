fetchReq()
reqData()
function reqData() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			document.getElementById('request_no').value = parseInt(data.request_id) + 1;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetchrequest',true);
	http.send(); 
}
function sendReq() {
	if(document.getElementById('date_need').value != '') {
		var form = $('#send_form_request').serialize();
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				Materialize.toast('Request  Successfully!', 3000)
				fetchReq();
				reqData();
				suspendReq();
				document.getElementById('date_need').value = '';
				document.getElementById('product_code').value = '';
			} 
		}
		http.open("POST",''+myurl+'/tops/include/php/pos/send_request',true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.send(form); 
	} else {
		alert('fields require!');
	}
}
function addRequest() {
	var code = document.getElementById('product_code').value; 
	var qty = document.getElementById('product_qty').value;
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			fetchReq();
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/reqaddCart',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("product_itemCode="+code+"&product_qty="+qty);
}
function fetchReq() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';  
			var data = JSON.parse(this.response);
			if(data.status == "no added products") {
				body+='<tr><td colspan="6">No product added</td></tr>';
			} else {
				for(var i = 0; i<data.length;i++) {
					var product_name = data[i].product_name;
					body+='<tr>';
					body+='<td>'+data[i].product_itemCode+'</td>';
					body+='<td>'+product_name.substring(0,15)+"..."+'</td>';
					body+='<td>'+data[i].product_quantity+'</td>';
				}
			} document.getElementById('fetch_req').innerHTML = body;
			document.getElementById('div_send').innerHTML = '<button onclick="sendReq()" id="send_request" type="button" class="btn btn-lg primary right">Send Request</button><a href="#!" id="suspend_button" onclick="suspendReq()"  class="btn btn-lg primary right">Suspend</a>'; 
		}
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetchCart',true);
	http.send();
}
function suspendReq() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			fetchReq();
			document.getElementById('suspend_button').remove();
			document.getElementById('send_request').remove();
			Materialize.toast('Suspend Successfully!', 3000)
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/suspendCart',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("suspend");
}