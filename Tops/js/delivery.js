fetchDelivery();
function fetchDelivery() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var body = '';
			var input = '';
			for(var i = 0; i<data.length; i++) {
				if(data[i].request_desc != '') {
					body += '<tr class="red-text">';
					body +='<td>'+data[i].request_id+'</td>';
					body +='<td>'+data[i].request_by+'</td>';
					body +='<td>'+formatDate(new Date(data[i].request_date))+'</td>';
					body +='<td>'+data[i].request_need+'</td>';
					body +='<td><a href="#orReciept" onclick="viewDelivery('+data[i].request_id+',\'' + data[i].request_desc + '\')" class="modal-trigger"><i class="fa fa-pencil-square-o dark-text" aria-hidden="true"></i></a></td>';
					body +='</tr>';	
				} else {
					body += '<tr>';
					body +='<td>'+data[i].request_id+'</td>';
					body +='<td>'+data[i].request_by+'</td>';
					body +='<td>'+formatDate(new Date(data[i].request_date))+'</td>';
					body +='<td>'+data[i].request_need+'</td>';
					body +='<td><a href="#orReciept" onclick="viewDelivery('+data[i].request_id+',\'' + data[i].request_desc + '\')" class="modal-trigger"><i class="fa fa-pencil-square-o dark-text" aria-hidden="true"></i></a></td>';
					body +='</tr>';
				}
			} document.getElementById('fetch_delivery').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/delivery',true);
	http.send();
}
function viewDelivery(id,desc) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var body = '';
			var hidden = '';
			for(var i = 0; i<data.length; i++) {
				body += '<tr>';
				body +='<td>'+data[i].product_name+'</td>';
				body +='<td>'+data[i].product_price+'</td>';
				body +='<td>'+data[i].product_quantity+'PC(s)</td>';
				body +='<td>'+data[i].product_sent+'PC(s)</td>';
				body +='</tr>';
			}
			if(desc == '' ) {
				hidden = '<button  class="btn waves-effect waves-light modal-close modal-action" onclick="inventory('+id+')" style="background-color: #2b2d42"><i class="fa fa-archive" aria-hidden="true"></i> Inventory</button>';
			} else {
				document.getElementById('hidden_wizard').innerHTML = '<a  href="#!" class="btn waves-effect waves-light modal-close modal-action" onclick="decision('+id+')" style="background-color: #2b2d42">Decision</a>';
				hidden = '<button disabled class="btn waves-effect waves-light modal-close modal-action" onclick="inventory('+id+')" style="background-color: #2b2d42"><i class="fa fa-archive" aria-hidden="true"></i> Inventory</button>';
			}
			document.getElementById('footer_button').innerHTML = hidden;
			document.getElementById('request_desc').value = desc;
			document.getElementById('fetch_item').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/delivery/'+id+'',true);
	http.send();
}
function inventory(id) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			alert(data.status);
			fetchDelivery();
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/update_inventory.php?id='+id+'',true);
	http.send();
}
function decision(id){
	var proccess = confirm('Are you sure do you want to continue the Request');
	var decision = '';
	var status = 'Pending';
	if(proccess == true) {
		decision = 'Yes';
	} else {
		decision = 'No';
	}
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			alert(data.status);
			fetchDelivery();
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/update_decision',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("request_id="+id+"&decision="+decision+"&status="+status);
}
setInterval(function() {
	fetchDelivery();
}, 10000);