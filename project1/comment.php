<?php 

function getUserCity() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $url = "http://ip-api.com/json/$ip";
    $data = json_decode(file_get_contents($url), true);
    return $data['city'] ?? 'Unknown';
}

?>