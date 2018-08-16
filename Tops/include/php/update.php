<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
if(isset($_POST['ids'])) {
	$sql = "";
	$condition = "";
	$data = json_decode($_POST['ids'], true);	
	foreach ($data as $key => $value) {
		$id = $data[$key];
		$update = mysqli_query($db,"UPDATE pos_product_transaction SET product_status = 'return' WHERE product_uniq_id = '$id' ");
	}
	echo json_encode(array('response' => 'return successfully'));
}
?>