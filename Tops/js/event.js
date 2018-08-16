$(document).ready(function(){
	$('#eventForm').submit(function(e){
		e.preventDefault();
		var form = $(this).serialize();
		if(document.getElementById('from_date').value > document.getElementById('to_date').value) {
			Materialize.toast('Failed Dates',3000);
		} else if( document.getElementById('from_date').value == '' ||  document.getElementById('to_date').value == '' ) {
			Materialize.toast('Failed Dates are Required',3000);
		} else {
			var http = new XMLHttpRequest();
			http.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					var data = JSON.parse(this.response);
					if(data.status == 'inserted successfully') {
						Materialize.toast('Events Successfully',3000);
						$('#eventForm')[0].reset();
						fetchEvents();
					}
				} 
			}
			http.open("POST",''+myurl+'/tops/include/php/pos/insert_event',true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.send(form);
		}
	});
	$('#eventFormEdit').submit(function(e){
		e.preventDefault();
		var form = $(this).serialize();
		if(document.getElementById('edit_from_date').value > document.getElementById('edit_to_date').value) {
			Materialize.toast('Failed Dates',3000);
		} else if( document.getElementById('edit_from_date').value == '' ||  document.getElementById('edit_to_date').value == '' ) {
			Materialize.toast('Failed Dates are Required',3000);
		} else {
			var http = new XMLHttpRequest();
			http.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					var data = JSON.parse(this.response);
					if(data.status == 'update successfully') {
						Materialize.toast('Event Edited Successfully',3000);
						$('#eventFormEdit')[0].reset();
						fetchEvents();
					}
				} 
			}
			http.open("POST",''+myurl+'/tops/include/php/pos/update_event',true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.send(form);
		}
	});
});
fetchEvents();
function fetchEvents() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var body = '';
			for(var i =0; i<data.length; i++) {
				body+='<tr>';
				body+='<td>'+data[i].events_title+'</td>';
				body+='<td>'+(data[i].events_description).substring(0,15)+'...</td>';
				body+='<td>'+data[i].events_place+'</td>';
				body+='<td>'+formatDate(new Date(data[i].events_from))+'</td>';
				body+='<td>'+formatDate(new Date(data[i].events_to))+'</td>';
				body+='<td>'+formatDate(new Date(data[i].events_timestamp))+'</td>';
				body+='<td><a href="#events_modal" class="blue-text modal-trigger" onclick="eventView('+data[i].events_id+')">Edit Event</a></td>';
				body+='</tr>';
			} document.getElementById('fetch_events').innerHTML = body;
		} 
	}
	http.open("GET",''+myurl+'/tops/include/php/select.php?fetch_events',true);
	http.send();
}
function eventView(id) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			var body = '';
				document.getElementById('events_id').value = id;
				document.getElementById('events_title').value = data.events_title;
				document.getElementById('events_description').value = data.events_description;
				document.getElementById('events_place').value = data.events_place;
				document.getElementById('edit_from_date').value = data.events_from;
				document.getElementById('edit_to_date').value = data.events_to;
			
		} 
	}
	http.open("POST",''+myurl+'/tops/include/php/pos/select_event',true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("events_id="+id);

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