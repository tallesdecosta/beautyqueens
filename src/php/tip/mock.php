<?php
session_start();

$mockData = [
    "tip" => "Stay hydrated and take care of your skin!"
];

header("Content-Type: application/json");
echo json_encode($mockData);
?>