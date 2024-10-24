<?php
    include '../auth/criar-bd.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    header("Access-Control-Allow-Headers: X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    session_set_cookie_params([
        'lifetime' => 0,
        'domain' => "",
        'httponly' => false,
        'path' => '/',
        'samesite' => 'lax',
        'secure' => 'false'
    ]);
    
    session_start();
    

    if($_SERVER['REQUEST_METHOD'] === 'POST') {

        switch ($_SERVER['REQUEST_URI']) {
            case '/php/mail/mail.php/code/confirmar':

                $body = json_decode(file_get_contents('php://input'), true);

                if (verificarCodigoEmail(intval(floatval($body['code']))) === true) {

                    echo json_encode(["confirmação" => true], JSON_UNESCAPED_UNICODE);
                    unset($_SESSION['code']);

                } else {

                    echo json_encode(["confirmação" => false, 'motivo' => 'código difere do código enviado por email']);
                }
                
                break;

            case '/php/mail/mail.php/code/requerir':

                if (isset($_SESSION['code'])) {
                    echo json_encode(['status' => 'código já enviado']);
                } else {
                $body = json_decode(file_get_contents('php://input'), true);
                $code = mt_rand(100000,999999); 
                $message = "Olá, seja muito bem-vindo/a a plataforma BeautyQueens! Para finalizar o cadastro, por favor insira o seguinte código na página de verificação: " . $code;
                mandarEmail($body['email'], 'Código de verificação', $message, $code);
                echo json_encode(["status" => 'código enviado']);
                }
                break;

            case '/php/mail/mail.php/check':
                $conn = conectarBanco();
                create_tables($conn);
                $body = json_decode(file_get_contents('php://input'), true);
                $email = $body['email'];
    
                $st = $conn -> prepare("SELECT pessoa_id FROM pessoa WHERE email = (?)");
    
                $st -> bind_param("s", $email);
                $st -> execute();
                        
                $result = $st -> get_result();
                
                if ($result -> num_rows != 0) {
    
                    echo json_encode(['redirect' => false]);
    
                } else {
    
                     echo json_encode(['redirect' => true, 'to' => 'index']);
    
                }
    
                break;
            
            default:
                echo json_encode("URI não encontrada.");
        
        }
            
    
    } elseif($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $body = json_decode(file_get_contents('php://input'), true);
        $code = mt_rand(100000,999999);
        $message = "Olá, seja muito bem-vindo/a a plataforma BeautyQueens! Para finalizar o cadastro, por favor insira o seguinte código na página de verificação: " . $code;
        mandarEmail($body['email'], 'Código de verificação', $message, $code);
        echo json_encode(['status' => 'enviado']);

    } else {

        echo json_encode(["status" => 'metodo nao autorizado']);

    }

    function mandarEmail($to, $subject, $message, $codigo=0) {

        $headers = "From: beauttyqueens@gmail.com";

        if ($codigo != 0) {

            $_SESSION['code'] = $codigo;

        }
        

        mail($to, $subject, $message, $headers);
        
    }
    
    function verificarCodigoEmail($codigo) {
        
        if ($codigo === $_SESSION['code']) {

            return true;

        } else {

            return false;

        }

    }


?>