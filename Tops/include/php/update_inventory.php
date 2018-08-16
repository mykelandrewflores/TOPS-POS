<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
include('connect.php');
$branch = $_SESSION['session_account']['user_branch'];
$id = $_GET['id'];
$sql = mysqli_query($db,"SELECT * FROM supply_pos_request_produc WHERE request_id = '$id' ");
while($rows = mysqli_fetch_assoc($sql)) {
	$product_itemCode = $rows['product_itemCode'];
	$product_quantity = $rows['product_quantity'];
	$update = mysqli_query($db, "UPDATE pos_inventory SET product_stock = product_stock + $product_quantity WHERE product_itemCode = '$product_itemCode' ");
} $update_inventory = mysqli_query($db, "UPDATE supply_pos_request SET status = 'Delivered' WHERE request_id = '$id' ");

echo json_encode(array("status" => "inventory successfully!"),JSON_PRETTY_PRINT);
?>