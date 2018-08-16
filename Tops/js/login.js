  document.addEventListener('DOMContentLoaded', function () {
  	checkSession();
  	var login = function(e) {
  		e.preventDefault();
  		var loginForm = $('#loginForm').serialize();
  		e.preventDefault();
  		if(document.getElementById("username").value !=  '' && document.getElementById("password").value !=  '' ) {
  			var http = new XMLHttpRequest();
  			http.onreadystatechange = function() {
  				if(this.readyState == 4 && this.status == 200) {
  					var access = JSON.parse(this.response);
  					if(access.response == 'no account') {
  						Materialize.toast('No Account Found!', 1500);    
  						return false;
  					} else if(access.user_position == 'admin' && access.user_dept == 'FinanceAndAccounting' && access.user_branch == 'Main') {
  						window.location.href = ''+myurl+'/finance_dept/super_user/svpanel.html';
  						
  					} else if(access.user_position == 'supervisor' && access.user_dept == 'PointOfSale' && access.user_branch == 'TOP`S OLONGAPO') {
  						window.location.href = ''+myurl+'/tops/include/pages/inventory/';
  					} else if(access.user_position == 'employee' && access.user_dept == 'PointOfSale' && access.user_branch == 'TOP`S OLONGAPO') {
  						window.location.href = ''+myurl+'/tops/include/pages/pos/';
  					}
  					else if(access.user_position == 'admin' && access.user_dept == 'Marketing' && access.user_branch == 'Main') {
  						window.location.href = ''+myurl+'/tops/include/pages/marketing/';
  					}
  				} 
  			}
  			http.open("POST",''+myurl+'/tops/include/php/login.php',true);
  			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  			http.send(loginForm);
  		}
  		else {
  			Materialize.toast('Both Fields are Required!', 1000);    
  		}
  	}
  	document.getElementById("loginForm").addEventListener('submit', login, false);
  	function checkSession() {
  		var http = new XMLHttpRequest();
  		http.onreadystatechange = function() {
  			if(this.readyState == 4 && this.status == 200) {
  				var access = JSON.parse(this.response);
  				if(access.user_position == 'supervisor') {
  					window.location.href = ''+myurl+'/tops/include/pages/inventory/';
  				}
  				else if(access.user_position == 'cashier') {
  					window.location.href = ''+myurl+'/tops/include/pages/pos/'; 
  				}
  				else if(access.user_position == 'Marketing') {
  					window.location.href = ''+myurl+'/tops/include/pages/marketing/'; 
  				}
  			} 
  		}
  		http.open("GET",''+myurl+'/tops/include/php/pos/authenticate',true);
  		http.send();
  	}
  });