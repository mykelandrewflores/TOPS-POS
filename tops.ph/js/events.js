fetchEvents();
setInterval(function(){
	fetchEvents();
},10000);
function fetchEvents() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var body = '';
			for(var i =0; i<data.length; i++) {
				body+='	<div class="col s12 mt-5">';
				body+='<h4 class="brand-title small bold mb-0 blue-text">'+data[i].events_title+' - '+data[i].events_place+'</h4>';
				body+='<h5 class="brand-title xsmall mt-0">'+formatDate(new Date(data[i].events_from))+' - '+formatDate(new Date(data[i].events_to))+'</h5>';
				body+='<p>'+data[i].events_description+'.</p>';
				body+='</div>';
			} document.getElementById('fetch_events').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/select.php?fetch_events',true);
	http.send();
}

function formatDate(date) {
	var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	return monthNames[monthIndex] + ' ' + day + ', ' + year;
}