<?php 

 require 'connection.php';
 $sql="SELECT * FROM `url_table` ";
 $urlresult=$con->query($sql);
 $row=$urlresult->fetch_assoc();

  $phone=trim($_POST['phone1']);
  $phone=substr($phone, 1);

  $phone='254'.$phone;

  $total=$_POST['total'];



 $url1=$row['url'];
function sendpayment($phone,$amount,$url1){
$proxy = '';
//access token

$consumerkey='hMgQoKy9sbF9fi4ZLz9hXJ3u7aYT3tnR';
$consumersecret='t4l3932VP0ohjBRe';

$headers=['Content-Type:application/json; charset=utf8'];

$accesstoken_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

$curl=curl_init($accesstoken_url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_PROXY, $proxy);
curl_setopt($curl,CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl,CURLOPT_HEADER, false);
curl_setopt($curl,CURLOPT_USERPWD, $consumerkey.':'.$consumersecret);

$result=curl_exec($curl);
$status=curl_getinfo($curl,CURLINFO_HTTP_CODE);

$result=json_decode($result);
$access_token=$result->access_token;

curl_close($curl);


//initializing the transaction

//defining variables

$url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
$BusinessShortCode='174379';
$Timestamp='20'.date("ymdhis");

$PartyA=$phone;//phone
 
$CallBackURL="{$url1}/Denis/callback.php";
$AccountReference='';
$TransactionDesc='';

$passkey='bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
$Password=base64_encode($BusinessShortCode.$passkey.$Timestamp);
$Amount=$amount;
$AccountReference='food service';
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$access_token)); //setting custom header


$curl_post_data = array(
  //Fill in the request parameters with valid values
  'BusinessShortCode' => $BusinessShortCode,
  'Password' => $Password,
  'Timestamp' => $Timestamp,
  'TransactionType' => 'CustomerPayBillOnline',
  'Amount' => $Amount,
  'PartyA' => $PartyA,
  'PartyB' => $BusinessShortCode,
  'PhoneNumber' => $PartyA,

  'CallBackURL' => $CallBackURL,
  'AccountReference' => $AccountReference,
  'TransactionDesc' => 'cart payment '
);

$data_string = json_encode($curl_post_data);
curl_setopt($curl, CURLOPT_PROXY, $proxy);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);

$curl_response = curl_exec($curl);

print_r($curl_response) ;


  }

require 'delete.php';
$payments=sendpayment($phone,$total,$url1);




?>