<?php 
include('../../php/connect.php');
session_start();
$branch = $_SESSION['session_account']['user_branch'];
if(isset($_GET['from']) && isset($_GET['to'])) {
	$from_date = date('Y-m-d',strtotime($_GET['from']));
	$to_date = date('Y-m-d',strtotime($_GET['to']));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="../../../img/logo.gif" />
	<link rel="stylesheet" href="../../../css/font-awesome.min.css">
	<link rel="stylesheet" href="../../../css/main.min.css" />
	<link rel="stylesheet" href="../../../css/materialize.min.css" />
	<title>Tops - Reports</title>
</head>
<body class="onload youtube-main white">
	<main class="padded mt-5">
		<div class="container main-container center">
			<div class="row">
				<div class="col s12">
					<img src="../../../img/logo.gif" class="responsive" style="width: 10%"/>
				</div>
				<h3>TOPS Retail Store</h3>
				<ul>
					<li>Located: <?php echo  $_SESSION['session_account']['user_branch']; ?></li>
					<li>Tax: 0123-1234</li>
					<li><?php echo date('M d, Y') ?></li>
				</ul>
				<div class="col s12">
					<?php 
					if(isset($_GET['from']) && isset($_GET['to'])) {
						$sum = mysqli_query($db, "SELECT SUM(transaction_payment) FROM pos_transaction WHERE transaction_branch = '$branch' AND transaction_date BETWEEN '$from_date' AND '$to_date' ");
						$total = mysqli_fetch_array($sum);
						$sql = "SELECT * FROM pos_transaction WHERE transaction_branch = '$branch' AND transaction_date BETWEEN '$from_date' AND '$to_date'";
						?>
						<h5>Summary Report for:  <?php echo date('M d, Y',strtotime($_GET['from']))?> to <?php echo date('M d, Y',strtotime($_GET['to']))?></h5>
						<?php
					}elseif(isset($_GET['today'])){
						$sum = mysqli_query($db, "SELECT SUM(transaction_payment) FROM pos_transaction WHERE DATE(transaction_date) = CURDATE() AND transaction_branch = '$branch'  ");
						$total = mysqli_fetch_array($sum);
						$sql = "SELECT * FROM pos_transaction WHERE DATE(transaction_date) = CURDATE() AND transaction_branch = '$branch' ";
					?>
					<h5>Reports of the Day </h5>
					<?php
					}else {
						$sql = "SELECT * FROM pos_transaction WHERE transaction_branch = '$branch'";
						$sum = mysqli_query($db, "SELECT SUM(transaction_payment) FROM pos_transaction WHERE transaction_branch = '$branch'");
						$total = mysqli_fetch_array($sum);
						?>
						<h5>Summary of all Reports </h5>
						<?php
					}
					?>
					<table class="table centered bordered">
						<thead>
							<tr>
								<th data-field="id">OR Code</th>
								<th data-field="name">Total Payment</th>
								<th data-field="price">Date</th>
							</tr>
						</thead>
						<tbody>
							<?php
							$result = mysqli_query($db,$sql);
							while ($rows = mysqli_fetch_array($result)) {
								?>
								<tr>
									<td><?php echo $rows[0]?></td>
									<td>P<?php echo number_format($rows[1],2)?></td>
									<td id="date"><?php echo date('M d, Y',strtotime($rows[2]));?></td>
								</tr>
								<?php
							}
							?>
							<tr>
								<td></td>
								<td><h5>Total Sale Summarry Report:</h5></td>
								<td colspan=""><h5><?php echo "P".number_format($total[0],2);?></h5></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</main>
	<script type="text/javascript" src="../../../js/jquery.min.js"></script>
	<script type="text/javascript" src="../../../js/materialize.min.js"></script>
	<script type="text/javascript" src="../../../js/initial.js"></script>
</body>
</html>