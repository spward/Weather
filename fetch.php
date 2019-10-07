<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//Set your token:
$token = 'bc127eb7f4dcb8d2897349e8f637aec5';

// Recieve the latitude and longitude and set the variables
$lat = isset($_GET['lat']) ? $_GET['lat'] : false;
$long = isset($_GET['long']) ? $_GET['long'] : false;


//Set url, %s will be replaced later:
$url = sprintf('https://api.darksky.net/forecast/%s/%s,%s', $token, $lat, $long);

//Set url, pass in params:
$request_uri = sprintf($url, $token);
//Try to fetch:
$response = file_get_contents($request_uri);

//Set content-type to application/json for the client to expect a JSON response:
header('Content-type: application/json');

//Output the response and kill the scipt:
exit($response);
