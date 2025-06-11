<?php
include("db.php");
session_start();
$user_id = $_SESSION['user_id'];
$video_id = $_POST['video_id'] ?? 0;

// Check today’s download count
$res = $conn->query("SELECT COUNT(*) as cnt FROM user_downloads WHERE user_id = $user_id AND download_date = CURDATE()");
$row = $res->fetch_assoc();

if ($row['cnt'] >= 1) {
  echo json_encode(["status" => "limit"]);
} else {
  $conn->query("INSERT INTO user_downloads (user_id, video_id, download_date) VALUES ($user_id, $video_id, CURDATE())");
  echo json_encode(["status" => "success", "file" => "videos/sample.mp4"]);
}
