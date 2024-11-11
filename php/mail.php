

<?php
// SMTP server configuration
$smtpServer = 'smtp.gmail.com'; 
$smtpPort = 465; 
$smtpUsername = 'www.glksnadarzyn@gmail.pl'; 
$smtpPassword = 'GlksHaslo12#'; 

// Sender's email address
$fromEmail = 'WebMail <www.glksnadarzyn@gmail.com>';

// Recipient's email address
$toEmail = 'karol.ziolo10@gmail.com';

// Email subject and message
$name = $_POST['name'];
$email = $_POST['email'];
$subject = 'New Contact';
$message = "Name: " . $name . "\r\nEmail: " . $email . "\r\nMessage: " . $_POST['message'];

// Create email headers
$headers = "From: $fromEmail\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

// Verify reCAPTCHA response
$recaptcha_secret = '6LcMa3sqAAAAAKvuOS5w_UbIWeX-PWJyFHy35GDV';
$recaptcha_response = $_POST['g-recaptcha-response'];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_response,
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$result_json = json_decode($result, true);

// Attempt to send the email
if ($result_json['success']) {
    // Attempt to send the email
    if (mail($toEmail, $subject, $message, $headers, "-f$fromEmail")) {
        echo "<script>
        alert('Email został pomyślnie wysłany!');
        window.location.href='../index.html';
        </script>";
    } else {
        echo "<script>
        alert('Email nie został wysłany!');
        window.location.href='../index.html';
        </script>";
    }
} else {
    // reCAPTCHA verification failed
    // Redirect or display an error message
    echo "<script>
    alert('Błąd weryfikacji reCAPTCHA. Spróbuj ponownie.');
    window.location.href='../index.html';
    </script>";
}
?>
