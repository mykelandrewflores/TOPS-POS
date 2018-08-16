fetch_all_reports();
function fetch_all_reports() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var   sub= 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				var discount = data[i].transaction_discount;
				var payment = parseInt(data[i].transaction_payment);
				body += '<tr>';
				body +='<td>'+data[i].invoice_no+'</td>';
				body +='<td>'+formatDate(new Date(data[i].date))+'</td>';
				body +='<td>'+data[i].time+'</td>';
				body +='<td>P'+payment.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ); +'</td>';
				body +='<td>'+discount.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'%</td>';
				body +='<td>P'+(payment - discount).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].transaction_method+'</td>';
				body +='<td><a href="#orReciept" onclick="viewInvoice('+data[i].invoice_no+',\'' + formatDate(new Date(data[i].date)) + '\',\'' + data[i].time + '\')" class="modal-trigger"><i class="fa fa-pencil-square-o dark-text" aria-hidden="true"></i></a></td>';
				body +='</tr>';	
				sub += payment;
			} document.getElementById('fetch_reports').innerHTML = body;
			document.getElementById('total_sale_heads').innerHTML = '<h5 class="right" style="font-weight: 300;color:#d90429">Total Sale: <span style="color:#2b2d42">P'+sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</span></h5>';	
			document.getElementById('test').href = 'http://localhost/tops/include/pages/inventory/print_report.php';		
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/reports_r',true);
	http.send();
}
function filterDate() {
	var from = document.getElementById('from_date').value;
	var to = document.getElementById('to_date').value;
	if(from != '' && to != '' && from < to) {
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var body = '';
				var   sub= 0;
				var data = JSON.parse(this.response);
				for(var i = 0; i<data.length; i++) {
					var discount = data[i].transaction_discount;
					var payment = parseInt(data[i].transaction_payment);
					body += '<tr>';
					body +='<td>'+data[i].invoice_no+'</td>';
					body +='<td>'+formatDate(new Date(data[i].date))+'</td>';
					body +='<td>'+data[i].time+'</td>';
					body +='<td>P'+payment.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ); +'</td>';
					body +='<td>'+discount.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'%</td>';
					body +='<td>P'+(payment - discount).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
					body +='<td>'+data[i].transaction_method+'</td>';
					body +='<td><a href="#orReciept" onclick="viewInvoice('+data[i].invoice_no+',\'' + formatDate(new Date(data[i].date)) + '\',\'' + data[i].time + '\')" class="modal-trigger"><i class="fa fa-pencil-square-o dark-text" aria-hidden="true"></i></a></td>';
					body +='</tr>';
					sub += payment;
				} document.getElementById('fetch_reports').innerHTML = body;
				document.getElementById('total_sale_heads').innerHTML = '<h5 class="right" style="font-weight: 300;color:#d90429">Total Sale: <span style="color:#2b2d42">P'+sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</span></h5>';	
				document.getElementById('test').href = 'http://localhost/tops/include/pages/inventory/print_report.php?from='+from+'&to='+to+'';		
			} 
		}
		http.open("POST",''+myurl+'/tops/include/php/pos/dateFilter',true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.send("from="+from+"&to="+to);
	} else {
		alert('Both Field are have an error');
	}
}
function returnItem(id) {
	window.open('feedback-return.html?or_id='+id, '_blank', 'toolbar=yes,top=150,left=200,width=580,height=500');
}
function viewInvoice(id,ddtime,time) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var sub = 0;
			var data = JSON.parse(this.response);
			var invoice_no = data[0].invoice_no;
			for(var i =0; i<data.length; i++) {
				sub += parseInt(data[i].product_price) * parseInt(data[i].product_quantity);
				body+= '<tr>';
				body+='<td>'+data[i].product_name+'</td>';
				body+='<td>'+data[i].product_quantity+'</td>';
				body+='</tr>';
			} document.getElementById('fetch_reciept').innerHTML = body;
			document.getElementById('hidden_or').value = invoice_no;
			document.getElementById('date_transaction').innerHTML = ddtime +', '+ time;
			document.getElementById('invoice_no').innerHTML = invoice_no;
			document.getElementById('no_cart').innerHTML = Object.keys(data).length;
			document.getElementById('branch_reciept').innerHTML = 'Located: '+ data[0].product_branch;
			document.getElementById('sub_total_reciept').innerHTML = sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('total_reciept').innerHTML ='P'+ sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/return_transaction_prod',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("invoice_no="+id);
}

function todaySale() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var sub = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				var discount = data[i].transaction_discount;
				var payment = parseInt(data[i].transaction_payment);
				body += '<tr>';
				body +='<td>'+data[i].invoice_no+'</td>';
				body +='<td>'+formatDate(new Date(data[i].date))+'</td>';
				body +='<td>'+data[i].time+'</td>';
				body +='<td>P'+payment.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ); +'</td>';
				body +='<td>'+discount.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'%</td>';
				body +='<td>P'+(payment - discount).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].transaction_method+'</td>';
				body +='<td><a href="#orReciept" onclick="viewInvoice('+data[i].invoice_no+',\'' + formatDate(new Date(data[i].date)) + '\',\'' + data[i].time + '\')" class="modal-trigger"><i class="fa fa-pencil-square-o dark-text" aria-hidden="true"></i></a></td>';
				body +='</tr>';
				sub += payment;
			} document.getElementById('fetch_reports').innerHTML = body;
			document.getElementById('total_sale_heads').innerHTML = '<h5 class="right" style="font-weight: 300;color:#d90429">Total Sale: <span style="color:#2b2d42">P'+sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</span></h5>';	
			document.getElementById('test').href = 'http://localhost/tops/include/pages/inventory/print_report.php?today';
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/today_sale',true);
	http.send();
}
function printReport(e) {
	var link = document.getElementById('test').href;
	window.open(link, '_blank', 'toolbar=yes,top=150,left=300,width=1080,height=720');
	e.preventDefault();
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