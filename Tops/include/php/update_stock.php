<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
include('connect.php');
$branch = $_SESSION['session_account']['user_branch'];
$condition = '';
$total = 0;
foreach ($_SESSION['add_cart'] as $key => $value) {
	$product_itemCode =  $_SESSION['add_cart'][$key]['product_itemCode'];
	$product_total =  $_SESSION['add_cart'][$key]['product_price'];
	$product_qty = $_SESSION['add_cart'][$key]['product_quantity'];
	$update = mysqli_query($db,"UPDATE pos_inventory SET product_stock = product_stock - '$product_qty' WHERE product_itemCode = '$product_itemCode' ");
	$total = $total + $product_total;
} 
$set = mysqli_query($db, "UPDATE accounting_budget SET budget_payment = budget_payment + $total WHERE budget_id = '1' ");
echo json_encode(array("status" => "update stock successfully"),JSON_PRETTY_PRINT);
$set1 = mysqli_query($db, "UPDATE accounting_income SET income_amount = income_amount + $total WHERE income_id = '34' ");
?>