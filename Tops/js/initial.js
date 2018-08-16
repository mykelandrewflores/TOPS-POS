var myurl = 'http://localhost';
$(document).ready(function(){
	$('select').material_select();
	$('.tooltipped').tooltip({delay: 50});
	$('.modal').modal();
	$('.button-collapse').sideNav({ menuWidth: 300,edge: 'left',closeOnClick: true,draggable: true,});
	$('.dropdown-button').dropdown({ belowOrigin: true,constrainWidth: false,gutter: 10 });
	$('.datepicker').pickadate({ selectMonths: true, selectYears: 15,today: 'Today',clear: 'Clear', close: 'Ok',closeOnSelect: false });
	$('#toggleNav').click(function(){
		$('#nav-logo').fadeIn(1000).toggleClass('hide');
		$('#slide-out').toggleClass('fixed');
		$('header').toggleClass('padded');
		$('main').toggleClass('padded');
	});
	$('#logo').removeClass('scale-out').addClass('scale-in');
	$('#search').keypress( function(e){
		var key = e.which;
		if (key == 13) {
			$('#time-in-result').removeClass('scale-out').addClass('scale-in');
		}
	});
});