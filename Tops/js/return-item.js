fetch_return();
function fetch_return() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var body = '';
			var   sub= 0;
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				body += '<tr>';
				body +='<td>'+data[i].product_itemCode+'</td>';
				body +='<td>'+data[i].product_name+'</td>';
				body +='<td>'+data[i].product_price+'</td>';
				body +='<td>'+formatDate(new Date(data[i].date_return))+'</td>';
				body +='</tr>';	
			} document.getElementById('fetch_data').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/fetch_return',true);
	http.send();
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