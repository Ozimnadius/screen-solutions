<? header('Content-Type: application/json'); ?>
<?/* require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php"); */?>

<? if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $status = false;
    $error = '';
//    $status = send();
    $status = true;

    echo json_encode(array(
        'status' => $status,
        'error' => $error
    ));
    exit();
};

?>

<? function send()
{

    $params = json_decode($_POST["params"], true);
    $message = "";
    ob_start();
    foreach ($params['FIELDS'] as $key => $value):?>
        <p><?= $value ?>: <?= $_POST[$key] ?></p>
    <?endforeach;
    $message = ob_get_clean();

    $result = \Bitrix\Main\Mail\Event::send([
        "EVENT_NAME" => $params['EVENT_NAME'],
        "LID" => "s1",
        "C_FIELDS" => [
            'FORM_NAME' => $params["FORM_NAME"],
            'MESSAGE' => $message,
        ]
    ]);
    return !empty($result->getid());
}

?>