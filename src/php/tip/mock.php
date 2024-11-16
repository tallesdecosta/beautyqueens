<?php
$mockData = [
    'tonalidade' => 'branca',
    'cicatriz' => 'sim',
    'texto' => 'Hydrate your skin daily.',
];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $mockData['tonalidade'] = $_POST['tonalidade'] ?? $mockData['tonalidade'];
    $mockData['cicatriz'] = $_POST['cicatriz'] ?? $mockData['cicatriz'];
    $mockData['texto'] = $_POST['texto'] ?? $mockData['texto'];
}

header('Content-Type: application/json');
echo json_encode($mockData);
?>
