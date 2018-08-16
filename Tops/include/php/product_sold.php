<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
$data = array();
$branch = $_SESSION['session_account']['user_branch'];
$sql = mysqli_query($db,"SELECT SUM(product_quantity) as quantity FROM pos_product_transaction WHERE DATE(product_date) = CURDATE()");
while($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} echo json_encode($data,JSON_PRETTY_PRINT);
?>