<?php
// payment.php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["status" => "error", "message" => "Invalid request"]);
  exit;
}

include("db.php"); // Your DB connection

$user_id = 1; // Replace with session-based user ID
$plan = $data['plan'];
$amount = $data['amount'];
$payment_id = $data['payment_id'];

$duration = match($plan) {
  "Bronze" => 7,
  "Silver" => 10,
  "Gold" => 9999, // effectively unlimited
  default => 5
};

$expires_on = date("Y-m-d H:i:s", strtotime("+30 days"));

$stmt = $conn->prepare("INSERT INTO user_plans (user_id, plan_id, purchase_date, expires_on) VALUES (?, (SELECT id FROM plans WHERE name = ?), NOW(), ?)");
$stmt->bind_param("iss", $user_id, $plan, $expires_on);
$stmt->execute();

// Send invoice email (use PHPMailer)
mail("user@example.com", "Payment Received",
  "Thank you! Your payment of ₹$amount for the $plan plan was successful.\n\nInvoice ID: $payment_id",
  "From: noreply@myvideosite.com");

echo json_encode(["status" => "success", "message" => "Plan updated"]);

