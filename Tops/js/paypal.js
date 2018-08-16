		paypal.Button.render({
		        env: 'sandbox', 
		        style: {
		        	label: '',
		            fundingicons: true, 
		            branding: true,
		            size:  'small', 
		            shape: 'rect',   
		            color: 'silver'  
		        },
		        client: {
		        	sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
		        	production: '<insert production client id>'
		        },
		        payment: function(data, actions) {
		        	var hidden = document.getElementById('total_total').value;
		        	console.log(hidden)
		        	return actions.payment.create({
		        		transactions: [
		        		{
		        			amount: { total: ''+hidden+'', currency: 'PHP' }
		        		}
		        		]
		        	});
		        },
		        onAuthorize: function(data, actions) {
		        	return actions.payment.execute().then(function() {
		        		var hidden = document.getElementById('total_total').value;
		        		window.alert('Payment Complete!');
		        		invoiceSet(hidden);
		        		paymentDone(hidden);
		        		invoiceOut();
		        		fetchReciept();
		        		updateInventory()
		        		$(document).ready(function(){
				    $('#done').modal('open');
				});
		        		fetchCart();
		        	});
		        }
		    }, '#paypal-button-container');