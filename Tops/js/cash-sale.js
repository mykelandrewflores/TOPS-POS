fetchCart();
fetchReciept();
invoiceOut();
var search = document.getElementById("search");
search.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {
		validate(e);
		this.value = '';
	} });
function validate(e) {
	var text = e.target.value;
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			fetchCart();
			fetchReciept();
			if(data.status == "No available stock") {
				Materialize.toast('No available stock', 4000)
			}
			else if(data.status == "No Product Found") {
				Materialize.toast('No Product Found', 4000)	
			} 
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/addCart',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("product_itemCode="+text);
}
function fetchCart() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = "";
			var total = 0;
			var over_tax = 0;
			var discount = 0;
			var tax = 0;
			var data = JSON.parse(this.response);
			if(data.status == "no added products") {
				body+='<tr><td colspan="7">No product added</td></tr>';
			} else {
				for(var i = 0; i<data.length; i++) {
					tax = data[i].product_tax;
					var percent = 0;
					var result = 0;
					var total_disc = 0;
					var sub = 0;
					var taxable = 0;
					percent += parseInt(data[i].product_discount);
					result += parseFloat(percent) / 100.0;
					var product_name = data[i].product_name;
					taxable += parseInt(data[i].product_price) * tax;
					over_tax += parseInt(data[i].product_quantity) * taxable;
					sub += (parseInt(data[i].product_price)) * parseInt(data[i].product_quantity);
					total_disc += parseInt(sub) * result;
					body += '<tr>';
					body +='<td>'+data[i].product_itemCode+'</td>';
					body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
					body +='<td>P'+(parseInt(data[i].product_price) + taxable)+'</td>';
					body +='<td>'+data[i].product_discount+'%</td>';
					body +='<td>'+data[i].product_quantity+'</td>';
					body +='<td>P'+(sub - total_disc).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
					body +='<td><a href="#edit" onclick="editProduct(\''+data[i].product_name+'\','+data[i].product_uniq_id+','+data[i].product_price+','+data[i].product_quantity+','+data[i].product_discount+')" class="modal-trigger tooltipped black-text" data-position="top" data-delay="50" data-tooltip="Edit this product"><i class="fa fa-pencil" aria-hidden="true"></i></a> | <a href="#!" onclick="deleteProduct('+data[i].product_uniq_id+')" class="tooltipped black-text" data-position="top" data-delay="50" data-tooltip="Remove this product"><i class="fa fa-close" aria-hidden="true"></i></a></td>';
					body +='<tr>';
					total += parseInt(data[i].product_price) * parseInt(data[i].product_quantity);
					discount += sub - total_disc;
				} document.getElementById('suspend').innerHTML = '<a onclick="suspendFunc()" id="suspend_button" class="btn  waves-effect waves-light" style="background-color: #2b2d42;border-radius: 30px">Suspend</a>';
			} var vat = total * tax;
			var total_total = discount + vat;
			document.getElementById('total_total').value = total_total;
			document.getElementById('hidden_total').value = total_total;
			document.getElementById("cartDatas").innerHTML = body;
			document.getElementById('numberCart').innerHTML = Object.keys(data).length;
			document.getElementById('tax').innerHTML ='P'+ over_tax.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('subtotal').innerHTML ='P'+ discount.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('total').innerHTML = 'P' + (discount + vat).toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('total_payment').innerHTML = '<b>Payment Amount</b>: P' + (discount + vat).toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetchCart',true);
	http.send();
}
function deleteProduct(id) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			fetchCart();
			fetchReciept();
			Materialize.toast('Successfully Removed!', 3000)
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/remove_product',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("action=remove&product_uniq_id="+id);
}
function editProduct(name,id,price,qty,discount) {
	document.getElementById('edit_name').value = name;
	document.getElementById('edit_price').value ='P'+ price;
	document.getElementById('edit_qty').value = qty;
	document.getElementById('edit_disc').value = discount;
	document.getElementById('hidden_id').value = id;
}
function editQty() {
	var id = document.getElementById('hidden_id').value;
	var quantity = document.getElementById('edit_qty').value;
	var discount = document.getElementById('edit_disc').value;
	var password = document.getElementById('validate').value;
	if(quantity == 0 || quantity == '' || discount == '' || password == '') {
		alert("Some Fields are Required!");
	} else {	
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.response);
				if(data.status == 'Failed') {
					document.getElementById('validate').value = '';
					alert('Wrong Password!');
				} else {
					var http2 = new XMLHttpRequest();
					http2.onreadystatechange = function() {
						if(this.readyState == 4 && this.status == 200) {
							var data = JSON.parse(this.response);
							fetchCart();
							fetchReciept();
							document.getElementById('validate').value = '';
						} 
					}
					http2.open("POST",''+myurl+'/tops/include/php/pos/update_cart',true);
					http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					http2.send("product_uniq_id="+id+"&product_quantity="+quantity+"&product_discount="+discount);
				}
			} 
		}
		http.open("GET",''+myurl+'/tops/include/php/pos/employee_manager/'+password+'',true);
		http.send();	
	}
}

function fetchReciept() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = "";
			var total = 0;
			var sub = 0;
			var data = JSON.parse(this.response);
			for(var i=0; i<data.length; i++) {
				var tax = 0;
				var product_name = data[i].product_name;
				tax += parseInt(data[i].product_price) * 0.2;
				body +='<tr>';
				body +='<td>'+product_name.substring(0,15)+"..."+'</td>';
				body +='<td>'+data[i].product_quantity+'</td>';
				body +='<td>'+((parseInt(data[i].product_price) * parseInt(data[i].product_quantity)) + tax)+'</td>';
				sub += (parseInt(data[i].product_price) * parseInt(data[i].product_quantity)) + tax;
			} document.getElementById('list_reciept').innerHTML = body;
			document.getElementById('dateTime').innerHTML = formatDate(new Date());
			document.getElementById('total_reciept').innerHTML ='Total:  P'+ sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('subtotalReciept').innerHTML = sub.toLocaleString(undefined,  { minimumFractionDigits: 2 }  );
			document.getElementById('numberCartReciept').innerHTML = Object.keys(data).length;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetchCart',true);
	http.send();
}
function invoiceOut() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			document.getElementById('inv_no').value = parseInt(data.invoice_no) + 1;
			document.getElementById('invoice_no_rec').innerHTML = data.invoice_no;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetchInvoice',true);
	http.send();
}
function formatDate(date) {
	var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
var hidden = false;