<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
include('connect.php');
date_default_timezone_set('Asia/Manila');
$data = array();
$username = $_POST['username'];
$password = $_POST['password'];
$hash_format = "$2y$10$";
$salt_length = 22;
$sql = mysqli_query($db,"SELECT hr_employees_account.employees_id, hr_employees_account.employees_last_name, hr_employees_account.employees_first_name,hr_employees_account.employees_image,mis_accounts.password,mis_accounts.user_position,mis_accounts.user_branch,mis_accounts.user_dept, mis_accounts.status FROM hr_employees_account INNER JOIN mis_accounts ON hr_employees_account.employees_id = mis_accounts.emp_id WHERE mis_accounts.username = '$username'");
$row = mysqli_fetch_assoc($sql);
$_SESSION['session_account'] = $row;
$dbpassword = $row['password'];
$data = $row;
$salt = generate_salt($salt_length);
$format_and_salt = $hash_format . $salt;
$hash = crypt($dbpassword, $format_and_salt);
password_check($password,$dbpassword,$data);
function generate_salt($length){
	$unique_random_string = md5(uniqid(mt_rand(), true));
	$base64_string = base64_encode($unique_random_string);
	$mod_base64_string = str_replace('+', '.', $base64_string);
	$salt = substr($mod_base64_string,0,$length);
	return $salt;
}
function password_check($password, $existing_hash,$data){
	$new_hash = crypt($password, $existing_hash);
	if($new_hash === $existing_hash){
		echo json_encode($data,JSON_PRETTY_PRINT);
	}else{
		echo json_encode(array('response' => 'no account'),JSON_PRETTY_PRINT);
	}
}
?>