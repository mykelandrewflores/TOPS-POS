<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
session_start();
date_default_timezone_set('Asia/Manila');
class backendQuery {
	public $conn;
	public function __construct() {
		$this->conn = mysqli_connect('localhost','root','','db_tops');
	}
	public function dataFetch($table) {
		$data = array();
		$sql = "SELECT * FROM ".$table;
		$query = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($query) > 0) {
			while($rows = mysqli_fetch_assoc($query)) {
				$data[] = $rows;
			}
			echo json_encode($data,JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "No data"));
		}
	}
	public function select_data($table,$where) {
		$sql = "";
		$condition ="";
		$data = array();
		foreach ($where as $key => $value) {
			$condition .= $key . "='" .$value."' AND ";
		}
		$condition = substr($condition,0,-5);
		$sql .= "SELECT * FROM ".$table." WHERE ".$condition;
		$result = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result) > 0) {
			while($rows = mysqli_fetch_assoc($result)) {
				$data[] = $rows;
			}
			echo json_encode($data,JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array(),JSON_PRETTY_PRINT);
		}
	}
	public function select_data_once($table,$where) {
		$sql = "";
		$condition ="";
		foreach ($where as $key => $value) {
			$condition .= $key . "='" .$value."' AND ";
		}
		$condition = substr($condition,0,-5);
		$sql .= "SELECT * FROM ".$table." WHERE ".$condition;
		$result = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result) > 0) {
			while($rows = mysqli_fetch_assoc($result)) {
				$array = $rows;
			}
			echo json_encode($array,JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "Failed"),JSON_PRETTY_PRINT);
		}
	}
	public function reportsPos($table, $fields ,$limit,$where) {
		$sql = "";
		$data = array();
		$condition = implode(",",array_keys($fields));
		$sql .= "SELECT ".$condition. " FROM ".$table. " WHERE " .implode(",",array_keys($where)). " = '".implode(",",array_values($where))."' LIMIT ".$limit;
		$result = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result)) {
			while ($rows = mysqli_fetch_assoc($result)) {
				$data[] = $rows;
			}
			echo json_encode($data,JSON_PRETTY_PRINT);
		}
	}
	public function insert_data($table,$fields) {
		$sql = "";
		$sql .= "INSERT INTO ".$table;
		$sql .= "(".implode(",",array_keys($fields)).") VALUES ";
		$sql .= "('".implode("','",array_values($fields))."')";
		if(mysqli_query($this->conn,$sql)) {
			echo json_encode(array("status" => "inserted successfully"),JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "insert failed"),JSON_PRETTY_PRINT);
		}
	}
	public function insert_multiple_data($table,$fields) {
		$sql = "";
		foreach ($fields as $key => $value) {
			$sql .= "INSERT INTO ".$table;
			$sql .= "(".implode(",",array_keys($fields[$key])).") VALUES";
			$sql .= "('".implode("','",array_values($value))."');";
		} if(mysqli_multi_query($this->conn,$sql)) {
			echo json_encode(array("status" => "inserted successfully"),JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "insert failed"),JSON_PRETTY_PRINT);
		}
	}
	public function update_data($table,$where,$fields) {
		$sql = '';
		$condition = '';
		$set = '';
		foreach ($where as $key => $value) {
			$condition .= $key. " = '" .$value. "' AND "; 
		}
		$condition = substr($condition, 0, -5);
		foreach ($fields as $key => $value) {
			$set .= $key. " = '".$value."', ";
		}
		$set = substr($set, 0,-2);
		$sql .= "UPDATE ".$table." SET ".$set." WHERE ".$condition;
		if(mysqli_query($this->conn,$sql)) {
			echo json_encode(array("status" => "update successfully"),JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "update failed"),JSON_PRETTY_PRINT);
		}
	}
	public function sale($table, $fields,$where) {
		$sql = "";
		$data = array();
		$condition = "";
		$set = "";
		foreach ($where as $key => $value) {
			$condition .= $key. " = " .$value. " AND "; 
		}
		$condition = substr($condition, 0, -5);
		$sql .= "SELECT ". implode(",",array_keys($fields))." FROM " .$table. " WHERE " .$condition;
		$result =mysqli_query($this->conn,$sql);
		echo $sql;
	}
	public function allreports($table, $fields,$where) {
		$sql = "";
		$data = array();
		$condition = "";
		$set = "";
		foreach ($where as $key => $value) {
			$condition .= $key. " = '" .$value. "' AND "; 
		}
		$condition = substr($condition, 0, -5);
		$sql .= "SELECT ". implode(",",array_keys($fields))." FROM " .$table. " WHERE " .$condition;
		$result =mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result)) {
			while ($rows = mysqli_fetch_assoc($result)) {
				$data[] = $rows;
			} echo json_encode($data,JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "Failed"),JSON_PRETTY_PRINT);
		}
	}
	public function dateFiltering($table,$fields,$where) {
		$sql = "";
		$data = array();
		$condition = "";
		foreach ($where as $key => $value) {
			$condition .= " '" .$value. "' AND "; 
		}
		$condition = substr($condition, 0, -5);
		$sql .= "SELECT ". implode(",",array_keys($fields))." FROM " .$table. " WHERE DATE(transaction_date) BETWEEN" .$condition;
		$result = mysqli_query($this->conn,$sql);
		while ($rows = mysqli_fetch_assoc($result)) {
			$data[] = $rows;
		} echo json_encode($data,JSON_PRETTY_PRINT);
	}
	public function todaySale($table, $fields,$where) {
		$sql = "";
		$data = array();
		$condition = "";
		$set = "";
		foreach ($where as $key => $value) {
			$condition .= $key. " = '" .$value. "' AND "; 
		}
		$condition = substr($condition, 0, -5);
		$sql .= "SELECT ". implode(",",array_keys($fields))." FROM " .$table. " WHERE  DATE(transaction_date) = CURRENT_DATE() AND " .$condition;
		$result =mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result)) {
			while ($rows = mysqli_fetch_assoc($result)) {
				$data[] = $rows;
			} echo json_encode($data,JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "Failed"),JSON_PRETTY_PRINT);
		}
	}
	public function addCart($table,$where) {
		$sql = "";
		$condition ="";
		$available = 0;
		$product_Code = array_values($where);
		foreach ($where as $key => $value) {
			$condition .= $key . "='" .$value."' AND ";
		}
		$condition = substr($condition,0,-5);
		$sql .= "SELECT * FROM ".$table." WHERE ".$condition;
		$result = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result) > 0) {
			$rows = mysqli_fetch_assoc($result);
			if($rows["product_stock"] != "0") { 
				if(isset($_SESSION['add_cart'])) {
					foreach($_SESSION['add_cart'] as $key => $value) {
						if($_SESSION['add_cart'][$key]['product_itemCode'] == $product_Code[0]) {
							$available++;
							$_SESSION['add_cart'][$key]['product_quantity'] = $_SESSION['add_cart'][$key]['product_quantity'] + 1;
						}
					}   if($available < 1) {
						$data = array("product_uniq_id" => $rows["product_uniq_id"],"product_itemCode" => $rows["product_itemCode"], "product_name" => $rows["product_name"], "product_price" => $rows["product_price"],"product_quantity" => '1',"product_discount" => $rows['product_discount'], "product_tax" => $rows['product_tax']);
						$_SESSION['add_cart'][] = $data;
					}
				} else {
					$data = array("product_uniq_id" => $rows["product_uniq_id"],"product_itemCode" => $rows["product_itemCode"], "product_name" => $rows["product_name"], "product_price" => $rows["product_price"],"product_quantity" => '1',"product_discount" => $rows['product_discount'], "product_tax" => $rows['product_tax']);
					$_SESSION['add_cart'][] = $data;
				}
				echo json_encode($_SESSION['add_cart'],JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array("status" => "No available stock"),JSON_PRETTY_PRINT);
			}
		} else {
			echo json_encode(array("status" => "No Product Found"),JSON_PRETTY_PRINT);

		} 
	}
	public function addReq($table,$where,$qty) {
		$sql = "";
		$condition ="";
		foreach ($where as $key => $value) {
			$condition .= $key . "='" .$value."' AND ";
		}
		$condition = substr($condition,0,-5);
		$sql .= "SELECT * FROM ".$table." WHERE ".$condition;
		$result = mysqli_query($this->conn,$sql);
		if(mysqli_num_rows($result) > 0) {
			$rows = mysqli_fetch_assoc($result);
			$data = array("product_uniq_id" => $rows["product_uniq_id"],"product_itemCode" => $rows["product_itemCode"], "product_type" => $rows["product_type"], "product_name" => $rows["product_name"], "product_price" => $rows["product_price"],"product_quantity" => $qty);
			$_SESSION['add_cart'][] = $data;
			echo json_encode($_SESSION['add_cart'],JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array("status" => "No Product Found"),JSON_PRETTY_PRINT);
		} 
	}
}
$obj = new backendQuery();
?>