fetchNotif();
productsNotif();
function fetchNotif() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		var body_notif = '';
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				body_notif += '<li class="collection-item avatar notif-collection unread">';
				body_notif += '<img src="../../../img/notif/'+data[i].notif_img+'" alt="" class="circle">';
				body_notif += '<span class="title pb-0 grey-text">'+data[i].notif_title+'</span>';
				body_notif += '<p class="truncate">'+data[i].notif_subject+'</p>';
				body_notif += '<span class="grey-text">'+formatDate(new Date(data[i].notif_date_time))+'</span></li>';
			}
			var count = data.filter(function(v) {
				return v.notif_status == 'unseen'
			}).length;
			if(count != 0) {
				document.getElementById('notif_label').innerHTML = '<span class="badge c-badge new red" id="count_notif" data-badge-caption=""></span>';
				document.getElementById("count_notif").innerHTML = count;
			} else {
				if(document.getElementById('count_notif')  != null ) {
					document.getElementById('count_notif').remove();
				}
			}
			document.getElementById("notif").innerHTML = body_notif;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/notification',true);
	http.send();	
}
function updateNotif() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			fetchNotif()
		} 
	}
	http.open("PUT",''+myurl+'/tops/include/php/pos/update_notif_status',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("update");
}
function productsNotif() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			for(var i = 0; i<data.length; i++) {
				if(data[i].product_stock == 0 && data[i].product_status == '0') {
					productsUpdateNotif(data[i].product_itemCode);
				}
			}
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/pos/products',true);
	http.send();
}
function productsUpdateNotif(id) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var http2 = new XMLHttpRequest();
			http2.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {} 
			}
			http2.open("POST",''+myurl+'/tops/include/php/pos/update_stock_notif',true);
			http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http2.send("product_id="+id);
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/notifStatusStock',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("product_id="+id);
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

setInterval(function() {
	fetchNotif();
	productsNotif();
}, 10000);
