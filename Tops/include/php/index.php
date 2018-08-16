<?php
include('backend.php');
$req = explode ("/",rtrim($_REQUEST["req"],"/"));
switch($_SERVER["REQUEST_METHOD"]) {
	case "GET":
	if(count($req) == 1) {
		if($req[0] == "products") {
			$where = array("product_branchName" => $_SESSION['session_account']['user_branch']);
			$obj->select_data("pos_inventory",$where);
		}
		elseif($req[0] == "mkt-products") {
			$obj->dataFetch("pos_inventory");
		}
		elseif ($req[0] == "notification") {
			$where = array("notif_branchName" => $_SESSION['session_account']['user_branch']);
			$obj->select_data("pos_notif",$where);
		}
		elseif($req[0] == "authenticate") {
			if(!empty($_SESSION['session_account'])) {
				echo json_encode($_SESSION['session_account'],JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array("status" => "session account not detected!"),JSON_PRETTY_PRINT);
			}
		} elseif($req[0] == "fetch_return") {
			$where = array("product_status" => "return");
			$obj->select_data("pos_product_transaction",$where);
		}
		elseif($req[0] == "delivery") {
			$where = array("request_branch" => $_SESSION['session_account']['user_branch'],"status" => "ongoing");
			$obj->select_data('supply_pos_request',$where);
		}
		elseif ($req[0] == "user_account") {
			if(!empty($_SESSION['session_account'])) {
				echo json_encode($_SESSION['session_account'],JSON_PRETTY_PRINT);
			}
		}
		elseif($req[0] == "fetchCart") {
			if(!empty($_SESSION['add_cart'])) {
				echo json_encode($_SESSION['add_cart'],JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array("status" => "no added products"),JSON_PRETTY_PRINT);
			}
		}
		elseif($req[0] == "suspendCart") {
			unset($_SESSION['add_cart']);
			echo json_encode(array("status" => "success!"),JSON_PRETTY_PRINT);
		}
		elseif ($req[0] == "signOut") {
			session_destroy();
			session_unset();
			echo json_encode(array("status" => "success signout!"),JSON_PRETTY_PRINT);
		} 
		elseif ($req[0] == "fetchrequest") {
			$fields = array('request_branch' => $_SESSION['session_account']['user_branch']);
			$obj->select_data_once('supply_pos_request',$fields);
		}
		elseif ($req[0] == "fetchInvoice") {
			$fields = array('transaction_branch' => $_SESSION['session_account']['user_branch']);
			$obj->select_data_once('pos_transaction',$fields);
		}
		elseif($req[0] == "today_sale") {
			$fields = array("invoice_no" => "","transaction_payment" => "","transaction_discount" => "","transaction_method" => "", "DATE(transaction_date) AS date" => "", "TIME(transaction_date) AS time" => "");
			$where = array("transaction_branch" => $_SESSION['session_account']['user_branch']);
			$obj->todaySale('pos_transaction',$fields,$where);
		}
		elseif($req[0] == "reports_r") {
			$fields = array("invoice_no" => "","transaction_payment" => "","transaction_discount" => "","transaction_method" => "", "DATE(transaction_date) AS date" => "", "TIME(transaction_date) AS time" => "");
			$where = array("transaction_branch" => $_SESSION['session_account']['user_branch']);
			$obj->allreports('pos_transaction',$fields,$where);
		}
	}
	if(count($req) == 2) {
		if($req[0] == "products") {
			$where = array("product_itemCode" => $req[1]);
			$obj->select_data("pos_inventory",$where);
		}
		elseif($req[0] == "mkt-products") {
			$where = array("product_uniq_id" => $req[1]);
			$obj->select_data("pos_inventory",$where);
		}
		elseif($req[0] == "delivery") {
			$where = array("request_id" => $req[1]);
			$obj->select_data("supply_pos_request_produc",$where);
		}
		elseif ($req[0] == "employee_manager") {
			$where = array("employee_branch" => $_SESSION['session_account']['user_branch'], "employee_usrAccess" => $_SESSION['session_account']['user_access'], "employee_pass" => $req[1]);
			$obj->select_data_once('pos_login',$where);
		}
	}
	break;
	case "POST":
	if (count($req) == 1){
		if($req[0] == "loginAccess"){
			$where = array("employee_usrname" => $_POST['username'],"employee_pass" => $_POST['password']);
			$obj->loginAccess("pos_login",$where);
		}
		elseif($req[0] == "select_event") {
			$where = array("events_id" => $_POST['events_id']);
			$obj->select_data_once("mkt_events",$where);
		}elseif ($req[0] == "update_decision") {
			$where = array('request_id' => $_POST['request_id']);
			$array = array("status" => $_POST['status'], "request_remarks" => $_POST['decision']);
			$obj->update_data("supply_pos_request",$where,$array);
		}
		elseif ($req[0] == "return_transaction") {
			$where = array("invoice_no" => $_POST['invoice_no']);
			$obj->select_data_once("pos_transaction",$where);
		}
		elseif ($req[0] == "return_transaction_prod") {
			$where = array("invoice_no" => $_POST['invoice_no'], "product_status" => 'paid');
			$obj->select_data("pos_product_transaction",$where);
		}
		elseif($req[0] == "notifStatusStock") {
			$array = array("notif_title" => "Products", "notif_subject" => $_POST['product_id'],"notif_desc" => "lorem ipsum","notif_status" => "unseen", "notif_branchName" => $_SESSION['session_account']['user_branch']);
			$obj->insert_data("pos_notif",$array);
		} elseif ($req[0] == "insert_event") {
			$array = array("events_title" => $_POST['events_title'], "events_description" => $_POST['events_description'], "events_from" => $_POST['from_date'], "events_to" => $_POST['to_date'], "events_approve" => "null", "events_place" => $_POST['events_place']);
			$obj->insert_data("mkt_events",$array);
		}
		elseif ($req[0] == "update_event") {
			$where = array('events_id' => $_POST['events_id']);
			$array = array("events_title" => $_POST['events_title'], "events_description" => $_POST['events_description'], "events_from" => $_POST['from_date'], "events_to" => $_POST['to_date'], "events_approve" => "null", "events_place" => $_POST['events_place']);
			$obj->update_data("mkt_events",$where,$array);
		}
		elseif($req[0] == "update_stock_notif") {
			$where = array("product_itemCode" => $_POST['product_id']);
			$array = array("product_status" => "notif");
			$obj->update_data("pos_inventory",$where,$array);
		} elseif ($req[0] == "update_product") {
			$where = array("product_uniq_id" => $_POST['product_uniq_id']);
			$array = array("product_discount" => $_POST['product_discount'],"product_tax" => $_POST['hidden_tax'] );
			$obj->update_data("pos_inventory",$where,$array);
		}
		elseif($req[0] == "addCart") {
			$where = array("product_itemCode" => $_POST['product_itemCode'], "product_branchName" => $_SESSION['session_account']['user_branch']);
			$obj->addCart("pos_inventory",$where);
		}
		elseif($req[0] == "reqaddCart") {
			$where = array("product_itemCode" => $_POST['product_itemCode'], "product_branchName" => $_SESSION['session_account']['user_branch']);
			$qty = $_POST['product_qty'];
			$obj->addReq("pos_inventory",$where,$qty);
		}
		elseif($req[0] == "dateFilter") {
			$from = date("Y-m-d", strtotime($_POST['from']));
			$to = date("Y-m-d", strtotime($_POST['to']));
			$fields = array("invoice_no" => "","transaction_payment" => "","transaction_discount" => "","transaction_method" => "", "DATE(transaction_date) AS date" => "", "TIME(transaction_date) AS time" => "");
			$where = array("from" => $from, "to" => $to);
			$obj->dateFiltering('pos_transaction',$fields,$where);
		}
		elseif($req[0] == "remove_product") {
			if($_POST['action'] == 'remove') {
				foreach ($_SESSION['add_cart'] as $key => $value) {
					if($_SESSION['add_cart'][$key]['product_uniq_id'] == $_POST['product_uniq_id']) {
						unset($_SESSION['add_cart'][$key]);
					}
				}
				echo json_encode(array("status" => "successfully removed"),JSON_PRETTY_PRINT);	
			}
		}
		elseif($req[0] == "update_cart") {
			foreach ($_SESSION['add_cart'] as $key => $value) {
				if($_SESSION['add_cart'][$key]['product_uniq_id'] == $_POST['product_uniq_id']) {
					$_SESSION['add_cart'][$key]['product_quantity'] = $_POST['product_quantity'];
					$_SESSION['add_cart'][$key]['product_discount'] = $_POST['product_discount'];
				}
			}
			echo json_encode(array("status" => "success update"),JSON_PRETTY_PRINT);
		}
		elseif ($req[0] == "createInvoice") {
			if(isset($_POST['transaction'])) {
				$fields = array("transaction_payment" => $_POST['total'],"transaction_method" => $_POST['invoice_method'], "transaction_branch" => $_SESSION['session_account']['user_branch']);
				$obj->insert_data('pos_transaction',$fields);
			}
		}
		elseif($req[0] == "createTransaction") {
			if(isset($_POST['transaction'])) {
				$fields = array();
				foreach($_SESSION['add_cart'] as $key => $value){
					$fields[] = array("invoice_no" => $_POST['inv_no'], "product_itemCode" => $_SESSION['add_cart'][$key]['product_itemCode'],"product_name" => $_SESSION['add_cart'][$key]['product_name'], "product_price" => $_SESSION['add_cart'][$key]['product_price'],"product_discount" => $_SESSION['add_cart'][$key]['product_discount'], "product_quantity" => $_SESSION['add_cart'][$key]['product_quantity']);
				}
				$obj->insert_multiple_data('pos_product_transaction',$fields);
			}
		}
		elseif($req[0] == "pos_reports") {
			$limit = $_POST['limit'];	
			$where = array("transaction_branch" => $_SESSION['session_account']['user_branch']);
			$fields = array("invoice_no" => "", "transaction_payment" => "", "DATE(transaction_date) AS date" => "", "TIME(transaction_date) AS time" => "");
			$obj->reportsPos('pos_transaction',$fields,$limit,$where);
		}
		elseif($req[0] == "pos_reports_search") {
			$fields = array("invoice_no" => $_POST['search']);
			$obj->select_data('pos_transaction',$fields);
		}
		elseif($req[0] == "view_invoice") {
			$fields = array("invoice_no" => $_POST['invoice_no']);
			$obj->select_data('pos_product_transaction',$fields);
		}
		elseif($req[0] == "send_request") {
			$fields = array("request_need" => $_POST['date_need'], "request_branch" => $_SESSION['session_account']['user_branch'], "request_by" => $_POST['request_by'],"status" => "Pending");
			$obj->insert_data('supply_pos_request',$fields);
			if(!empty($_SESSION['add_cart'])) {
				$fields = array();
				foreach($_SESSION['add_cart'] as $key => $value){
					$fields[] = array("request_id" => $_POST['request_no'], "product_itemCode" => $_SESSION['add_cart'][$key]['product_itemCode'],"product_name" => $_SESSION['add_cart'][$key]['product_name'], "product_price" => $_SESSION['add_cart'][$key]['product_price'], "product_quantity" => $_SESSION['add_cart'][$key]['product_quantity'], "product_branchName" => $_SESSION['session_account']['user_branch'], "remaining_qty" => $_SESSION['add_cart'][$key]['product_quantity']);
				}
				$obj->insert_multiple_data('supply_pos_request_produc',$fields);
			}
		}
	}
	break;	
	case "PUT":
	if(count($req) == 1) {
		if($req[0] == "update_notif_status") {
			$where = array("notif_status" => "unseen", "notif_branchName" => $_SESSION['session_account']['user_branch']);
			$array = array("notif_status" => "seen", "notif_branchName" => $_SESSION['session_account']['user_branch']);
			$obj->update_data("pos_notif",$where,$array);
		}
		elseif($req[0] == "qwe") {
			$_put = file_get_contents('php://input');
		}
	}
	break;	
	case "DELETE":
	break;
}
?>