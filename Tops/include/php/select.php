<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
$data = array();
if(isset($_GET['top_seller'])) {
	$seller = $_GET['top_seller'];
	$sql = mysqli_query($db, "SELECT * FROM pos_inventory	ORDER BY product_sell ".$seller);
} elseif (isset($_GET['search_product'])) {
	$serchProduct = $_GET['search_product'];
	$sql = mysqli_query($db, "SELECT * FROM pos_inventory WHERE product_itemCode LIKE '$serchProduct%' OR product_name LIKE '$serchProduct%' OR product_branchName LIKE '%$serchProduct%'");
}
elseif (isset($_GET['fetch_events'])) {
	$sql = mysqli_query($db,"SELECT * FROM mkt_events ORDER BY events_id DESC");
}
while ($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} echo json_encode($data,JSON_PRETTY_PRINT);
?>