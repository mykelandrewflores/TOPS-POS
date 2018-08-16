$(document).ready(function(){
	monthlySale();
	todaySale();
	productSold();
	var empc = $('#monthly_sale');
	function monthlySale() {
		$.ajax({
			url: ''+myurl+'/tops/include/php/total_sale_month.php',
			type: "GET",
			success : function(data){

				var month = [];
				var total = [];

				for(var i in data){
					var format_month = formatMonth(new Date(data[i].month));
					month.push(format_month);
					total.push(data[i].total);
				}
				var employeeChart = new Chart(empc, {
					type: 'line',
					data: {
						labels: month,
						datasets: [{
							label: 'Total Sale',
							data: total,
							borderWidth: 1,
							fill: false,
							backgroundColor: '#282C34',
							borderColor: '#282C34'
						}],
					},
					options: {
						title: {
							display: true,
							text: 'Monthly Sale for '+data[0].transaction_branch+''
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
									display: false
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
});