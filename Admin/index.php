<?php

require '../session_start.php';
if(!isset($_SESSION['server'])) {

	header("location: ../login.php");
} 
 ?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" type="text/css" href="../bootstrap.css">
	<link rel="stylesheet" type="text/css" href="fon/css/all.css">
	 <link rel="stylesheet" href="Circular/font.css">
	<link rel="stylesheet" type="text/css" href="styles.css">


	<title>EasyCafe Admin</title>
	<style type="text/css">
#index_body {
	margin-bottom:80px;
}

	</style>

</head>
<body>


<div id="nav_root"></div>

<div class="row" id="index_body">
	<div class="col-3" id="sideBar"></div>
	<div class="col-9 mt-3 " id="body">
<!-- 		<div id="first_row"></div>
		<div id="second_row"></div> -->

		
	

	</div>
</div>
<div id="footer"></div>
<footer class="footer w-100 py-2 text-center ">
	

		<script type="text/javascript" src="../jquery.min.js"></script>

		<script type="text/javascript" src="../bootstrap.min.js"></script>

		<script src="react.js"></script>
		<script src="react-dom.js"></script>
       <script src="canvasjs.min.js"> </script>
		<script src="app.js" type="module"></script>
</body>