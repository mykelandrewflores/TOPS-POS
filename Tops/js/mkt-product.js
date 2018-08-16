producsData();
topSellerGraph('ASC')
function producsData() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var total_stocks = 0;
			var total_gross = 0;
		 	var total_discount = 0;
		 	var total_tax = 0;
		 	var total_netPrice = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				total_stocks += parseInt(data[i].product_stock);
				total_gross += parseInt(data[i].product_price);
				total_discount += parseInt(data[i].product_discount);
				total_tax += parseInt(data[i].product_tax);
				var product_name = data[i].product_name;
				var product_branch = data[i].product_branchName;
				var percent = 0;
				var result = 0;
				var discount = 0;
				percent += parseInt(data[i].product_discount);
				result += parseFloat(percent) / 100.0;
				discount = parseInt(data[i].product_price) * result;
				var tax = parseInt(data[i].product_price) * data[i].product_tax;
				body += '<tr>';
				body +='<td>'+data[i].product_itemCode+'</td>';
				body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
				body +='<td>'+product_branch+'</td>';
				body +='<td>'+data[i].product_stock+'PC(s)</td>';
				body +='<td>P'+parseInt(data[i].product_price).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].product_discount+'%</td>';
				body +='<td>P'+parseInt(tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>P'+(parseInt(data[i].product_price) - discount + tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				total_netPrice += parseInt(data[i].product_price) - discount + tax;
				body +='<td><a href="#open_product" class="blue-text modal-trigger"" onclick="showProduct('+data[i].product_uniq_id+',\'' + data[i].product_itemCode + '\',\'' + data[i].product_name + '\',\'' + data[i].product_price + '\',\'' + data[i].product_discount + '\',\'' + data[i].product_tax + '\','+(parseInt(data[i].product_price) - discount + tax)+')"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>';
				body +='<tr>';
			} body+='<tr><td></td><td></td><td><b>Overall Total</b>:</td><td>'+total_stocks+'PC(s)</td><td>P'+total_gross.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td>'+total_discount+'%</td><td>P'+total_tax.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td><h5 class="red-text">P'+total_netPrice.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</h5></td><td></td></tr>';
			document.getElementById('productsFetch').innerHTML = body;

		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/mkt-products',true);
	http.send();
}
function showProduct(id, itemCode,name,price,discount,tax,net) {
	document.getElementById('product_uniq_id').value = id;
	document.getElementById('product_itemCode').value = itemCode;
	document.getElementById('product_name').value = name;
	document.getElementById('product_price').value = price;
	document.getElementById('product_discount').value = discount;
	document.getElementById('product_tax').value = tax;
	document.getElementById('hidden_tax').value = tax;
	document.getElementById('net_price').value ='P '+ parseInt(net).toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
}
function computeProduct(price,discount,tax) {
	var total_net = 0;
	var percent = parseInt(discount);
	var result = parseFloat(percent) / 100.0;
	var tax_result = parseFloat(tax) / 100.0;
	var compute_discount = price * result;
	var tax_set = parseInt(price) * tax_result;
	total_net = (parseInt(price) - parseInt(compute_discount)) + tax_set;
	document.getElementById('hidden_tax').value = tax_result;
	document.getElementById('net_price').value = 'P '+ parseInt(total_net).toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
}
function changeSeller(value) {
	topSellerGraph(value);
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var total_stocks = 0;
			var total_gross = 0;
		 	var total_discount = 0;
		 	var total_tax = 0;
		 	var total_netPrice = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				total_stocks += parseInt(data[i].product_stock);
				total_gross += parseInt(data[i].product_price);
				total_discount += parseInt(data[i].product_discount);
				total_tax += parseInt(data[i].product_tax);
				var product_name = data[i].product_name;
				var product_branch = data[i].product_branchName;
				var percent = 0;
				var result = 0;
				var discount = 0;
				percent += parseInt(data[i].product_discount);
				result += parseFloat(percent) / 100.0;
				discount = parseInt(data[i].product_price) * result;
				var tax = parseInt(data[i].product_price) * data[i].product_tax;
				body += '<tr>';
				body +='<td>'+data[i].product_itemCode+'</td>';
				body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
				body +='<td>'+product_branch+'</td>';
				body +='<td>'+data[i].product_stock+'PC(s)</td>';
				body +='<td>P'+parseInt(data[i].product_price).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].product_discount+'%</td>';
				body +='<td>P'+parseInt(tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>P'+(parseInt(data[i].product_price) - discount + tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				total_netPrice += parseInt(data[i].product_price) - discount + tax;
				body +='<td><a href="#open_product" class="blue-text modal-trigger"" onclick="showProduct('+data[i].product_uniq_id+',\'' + data[i].product_itemCode + '\',\'' + data[i].product_name + '\',\'' + data[i].product_price + '\',\'' + data[i].product_discount + '\',\'' + data[i].product_tax + '\','+(parseInt(data[i].product_price) - discount + tax)+')"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>';
				body +='<tr>';
			} body+='<tr><td></td><td></td><td><b>Overall Total</b>:</td><td>'+total_stocks+'PC(s)</td><td>P'+total_gross.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td>'+total_discount+'%</td><td>P'+total_tax.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td><h5 class="red-text">P'+total_netPrice.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</h5></td><td></td></tr>';
			document.getElementById('productsFetch').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/select.php?top_seller='+value,true);
	http.send();
}
function serchProduct(value) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var total_stocks = 0;
			var total_gross = 0;
		 	var total_discount = 0;
		 	var total_tax = 0;
		 	var total_netPrice = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				total_stocks += parseInt(data[i].product_stock);
				total_gross += parseInt(data[i].product_price);
				total_discount += parseInt(data[i].product_discount);
				total_tax += parseInt(data[i].product_tax);
				var product_name = data[i].product_name;
				var product_branch = data[i].product_branchName;
				var percent = 0;
				var result = 0;
				var discount = 0;
				percent += parseInt(data[i].product_discount);
				result += parseFloat(percent) / 100.0;
				discount = parseInt(data[i].product_price) * result;
				var tax = parseInt(data[i].product_price) * data[i].product_tax;
				body += '<tr>';
				body +='<td>'+data[i].product_itemCode+'</td>';
				body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
				body +='<td>'+product_branch+'</td>';
				body +='<td>'+data[i].product_stock+'PC(s)</td>';
				body +='<td>P'+parseInt(data[i].product_price).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].product_discount+'%</td>';
				body +='<td>P'+parseInt(tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>P'+(parseInt(data[i].product_price) - discount + tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				total_netPrice += parseInt(data[i].product_price) - discount + tax;
				body +='<td><a href="#open_product" class="blue-text modal-trigger"" onclick="showProduct('+data[i].product_uniq_id+',\'' + data[i].product_itemCode + '\',\'' + data[i].product_name + '\',\'' + data[i].product_price + '\',\'' + data[i].product_discount + '\',\'' + data[i].product_tax + '\','+(parseInt(data[i].product_price) - discount + tax)+')"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>';
				body +='<tr>';
			} body+='<tr><td></td><td></td><td><b>Overall Total</b>:</td><td>'+total_stocks+'PC(s)</td><td>P'+total_gross.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td>'+total_discount+'%</td><td>P'+total_tax.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td><h5 class="red-text">P'+total_netPrice.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</h5></td><td></td></tr>';
			document.getElementById('productsFetch').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/select.php?search_product='+value,true);
	http.send();
}
function topSellerGraph(value) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var sell = [];
			var product_name = [];
			for(var i = 0; i<data.length;i++){
				sell.push(data[i].product_sell);
				product_name.push(data[i].product_name);
			}
			var barChartData = {
				labels: product_name,
				datasets: [{
					label: 'Top Seller',
					backgroundColor: '#2B2D42',
					data: sell,
					borderColor: 'transparent'
				}]

			};
			var ctxx = document.getElementById("top_seller_graph");
			var myChart = new Chart(ctxx, {
				type: 'horizontalBar',
				data: barChartData,
				options: {
					title: {
						display: true,
						text: 'Highest Seller and Low Seller'
					},
					legend: {
						position: 'bottom'
					},
					scales: {
						yAxes: [{
							ticks: { beginAtZero: true },
							gridLines: { display: true }
						}],
						xAxes: [{
							gridLines: { display: false }
						}]
					}
				}
			});
		}
	} 
	http.open("GET",''+myurl+'/tops/include/php/select.php?top_seller='+value,true);
	http.send();
}
$(document).ready(function(){
	$('#productForm').submit(function(e){
		e.preventDefault();
		var form = $(this).serialize();
		var http = new XMLHttpRequest();	
		http.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				producsData();
				Materialize.toast('Udpate Product Successfully!', 3000)
			} 
		}
		http.open("POST",''+myurl+'/tops/include/php/pos/update_product',true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.send(form);
	});
});