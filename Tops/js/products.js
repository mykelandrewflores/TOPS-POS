producsData();
setInterval(function(){
producsData();
},5000)
function producsData() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var output_discount = 0;
			var output_tax = 0;
			var output_total = 0;
			var output_cost = 0;
			var output_stock = 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				var product_name = data[i].product_name;
				var percent = 0;
				var result = 0;
				var discount = 0;
				output_stock += parseInt(data[i].product_stock);
				output_cost += parseInt(data[i].product_price);
				percent += parseInt(data[i].product_discount);
				result += parseFloat(percent) / 100.0;
				discount = parseInt(data[i].product_price) * result;
				output_discount += parseInt(data[i].product_discount);
				var tax = parseInt(data[i].product_price) * data[i].product_tax;
				output_tax += parseInt(data[i].product_price) * data[i].product_tax;
				body += '<tr>';
				body +='<td>'+data[i].product_itemCode+'</td>';
				body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
				body +='<td>'+data[i].product_stock+'PC(s)</td>';
				body +='<td>P'+parseInt(data[i].product_price).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>'+data[i].product_discount+'%</td>';
				body +='<td>P'+parseInt(tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<td>P'+(parseInt(data[i].product_price) - discount + tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body +='<tr>';
				output_total += parseInt(data[i].product_price) - discount + tax;
			}
			body+='<tr><td></td><td><b>Overall Total:</b></td><td>'+output_stock+'PC(s)</td><td>P'+parseInt(output_cost).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td> '+parseInt(output_discount)+'%</td><td>P '+parseInt(output_tax).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td><td><h4 class="red-text">P'+parseInt(output_total).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</h4></td></tr>'
			document.getElementById('productsFetch').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/products',true);
	http.send();
}