<?php

$jsonData = file_get_contents('php://input');

$results = json_decode($jsonData, true);
$graphCoolEndPoint = 'https://api.graph.cool/simple/v1/cjosmtbbkjl0a01018lkzssjd';

header_remove();

// copy sensor data values to values array
foreach ($results["sensordatavalues"] as $sensordatavalues) {
    $values[$sensordatavalues["value_type"]] = $sensordatavalues["value"];
}

if (!isset($values["SDS_P1"])) {
    $values["SDS_P1"] = 0;
}
if (!isset($values["SDS_P2"])) {
    $values["SDS_P2"] = 0;
}
if (!isset($values["BME280_temperature"])) {
    $values["BME280_temperature"] = 0;
}
if (!isset($values["BME280_humidity"])) {
    $values["BME280_humidity"] = 0;
}
if (!isset($values["BME280_pressure"])) {
    $values["BME280_pressure"] = 0;
}

$now = new DateTime('UTC');
$date = $now->format(DateTime::ISO8601);

$query = <<<'GRAPHQL'
mutation SetWeather($humidity: Float, $pressure: Float, $sbsP1: Float, $sbsP2: Float, $temperature: Float, $date: DateTime) {
   createWeather (humidity: $humidity, pressure: $pressure, sbsP1: $sbsP1, sbsP2: $sbsP2, temperature: $temperature, date: $date) {
    id
  }
}
GRAPHQL;

function graphql_query($endpoint, $query, $variables = [], $token = null)
{
    $headers = ['Content-Type: application/json', 'User-Agent: GraphQL client'];
    if (null !== $token) {
        $headers[] = "Authorization: bearer $token";
    }

    if (false === $data = @file_get_contents($endpoint, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => $headers,
                'content' => json_encode(['query' => $query, 'variables' => $variables]),
            ]
        ]))) {
        $error = error_get_last();
        throw new \ErrorException($error['message'], $error['type']);
    }

    return json_decode($data, true);
}


graphql_query($graphCoolEndPoint, $query, [
    'humidity' => (float)$values["BME280_humidity"],
    'pressure' => (float)$values["BME280_pressure"],
    'sbsP1' => (float)$values["SDS_P1"],
    'sbsP2' => (float)$values["SDS_P2"],
    'temperature' => (float)$values["BME280_temperature"],
    'date' => $date
]);

?>