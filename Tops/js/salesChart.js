$(document).ready(function(){
	saleBranch();
	mothlySale();
	todaySale();
	productSold();
	var sale_canvas = $('#branch_sale');
	function saleBranch() {
		$.ajax({
			url: ''+myurl+'/tops/include/php/sale_branch.php',
			type: "GET",
			success : function(data){
				var branch = [];
				var total = [];
				for(var i in data){
					total.push(data[i].transaction);
					branch.push(data[i].transaction_branch);
				}
				var sale = new Chart(sale_canvas, {
					type: 'doughnut',
					data: {
						labels: branch,
						datasets: [{
							label: 'Total Sale',
							data: total,
							borderWidth: 1,
							fill: false,
							backgroundColor: ['#8D99AE','#d90429']
						}],
					},
					options: {}
				});
			}
		});
	}
	function mothlySale() {
		$.ajax({
			url: ''+myurl+'/tops/include/php/monthly_branch.php',
			type: "GET",
			success : function(data){
				var month = [];
				var total = [];
				var total_olongapo = [];
				var total_quezon	 = [];
				var branch = [];
				for(var i = 0;i<data.length; i++){
					var format_month = formatMonth(new Date(data[i].month));
					month.push(format_month);
					total.push(data[i].total);
					branch.push(data[i].transaction_branch);
					if(data[i].transaction_branch ==  'TOP`S OLONGAPO') {
						total_olongapo.push(data[i].total);
					} else if(data[i].transaction_branch ==  'TOP`S Quezon City') {
						total_quezon.push(data[i].total);
					}
				}
				var minusMonth = [];
				$.each(month, function(i, el){
					if($.inArray(el, minusMonth) === -1) minusMonth.push(el);
				});
				var barChartData = {
					labels: minusMonth,
					datasets: [{
						label: 'TOPS Olongapo',
						backgroundColor: 'rgba(141,153,174,0.1)',
						data: total_olongapo,
						borderColor: 'rgba(141,153,174)'
					}, {
						label: 'TOPS Quezon City',
						backgroundColor: 'rgba(43,45,66, 0.1)',
						data: total_quezon,
						borderColor: 'rgba(43,45,66, 1)'
					},]
				};

				var montly_sale = document.getElementById("monthly_branch");
				var monthly = new Chart(montly_sale, {
					type: 'line',
					data: barChartData,
					options: {
						title: {
							display: true,
							text: 'Monthly Sale of Every Branch'
						},
						legend: {
							position: 'bottom'
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									display: true
								}
							}],
							xAxes: [{
								gridLines: {
									display: false
								}
							}]
						}
					}
				});
			}
		});
	}
	function formatMonth(date) {
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
		return monthNames[monthIndex];
	}
});
function todaySale() {
	$.ajax({
		url:''+myurl+'/tops/include/php/today_sale.php',
		method: 'GET',
		dataType: 'JSON',
		success:function(data) {
			var body = '';
			if(data[0].month == null) {
				body+='<span class="count-number dark-text">P'+0+'</span>';
			} else{
				for(var i =0; i<data.length; i++) {
					var total = data[i].total;
					body+='<span class="count-number dark-text">P'+total.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</span>';
				}	
			}
			$('#today_sale_output').html(body);
		}
	})
}
function productSold() {
	$.ajax({
		url:''+myurl+'/tops/include/php/product_sold.php',
		method: 'GET',
		dataType: 'JSON',
		success:function(data) {
			var body = '';
			for(var i =0; i<data.length; i++) {
				var quantity = data[i].quantity;
				body+='<span class="count-number dark-text">'+quantity+'</span>';
			}$('#product_sold_output').html(body);
		}
	});
}