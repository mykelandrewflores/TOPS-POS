<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
$data = array();
$branch = $_SESSION['session_account']['user_branch'];
$sql = mysqli_query($db,"SELECT MONTH(DATE(transaction_date)) AS month, DAY(DATE(transaction_date)) AS day,YEAR(DATE(transaction_date)) AS year, SUM(transaction_payment) AS total FROM pos_transaction WHERE DATE(transaction_date) = CURDATE() AND transaction_branch = '$branch' ");
while($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} echo json_encode($data,JSON_PRETTY_PRINT);
?>