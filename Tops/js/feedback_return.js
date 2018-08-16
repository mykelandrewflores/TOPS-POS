getItem();
getProducts();
var ids = [];
function getItem() {
	var url_string = '';
	url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("or_id");
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var sub = 0;
			var data = JSON.parse(this.response);
			document.getElementById('or_code').value  = data.invoice_no;
			document.getElementById('date_by').value  = formatDate(new Date(data.transaction_date));
			document.getElementById('total_cost').value  ='P '+ parseInt((data.transaction_payment)).toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/return_transaction',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("invoice_no="+id);
}
function getProducts() {
	var url_string = '';
	url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("or_id");
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var sub = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				body+='<tr>';
				body+='<td>'+data[i].product_itemCode+'</td>';
				body+='<td>'+data[i].product_name+'</td>';
				body+='<td>P '+parseInt(data[i].product_price).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body+='<td><input type="checkbox" class="filled-in" value="'+data[i].product_uniq_id+'"  onclick="addToCheckList(this.value)" id="checkReturn'+data[i].product_uniq_id+'" /><label for="checkReturn'+data[i].product_uniq_id+'" ></label></td>';
				body+='</tr>';
			} document.getElementById('fetch_returnItem').innerHTML = body;
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/return_transaction_prod',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("invoice_no="+id);
}
function addToCheckList(id) {
	ids.push(id);
}
function returnNow() {
	var go_string = JSON.stringify(ids)
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var sub = 0;
			var data = JSON.parse(this.response);
			window.close();
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/update.php',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("ids="+go_string);
}
function formatDate(date) {
	var monthNames = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
	];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	return monthNames[monthIndex] + ' ' + day + ', ' + year;
}