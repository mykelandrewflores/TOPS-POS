<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
$data = array();
$sql = mysqli_query($db,"SELECT SUM(transaction_payment) AS transaction,transaction_branch FROM pos_transaction GROUP BY transaction_branch");
while($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} echo json_encode($data,JSON_PRETTY_PRINT);
?>