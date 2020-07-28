<?php
$email_to = 'here@your.mail';

if (isset($_REQUEST['send_mail'])) {
	
	if (isset($_REQUEST['form_type']) && $_REQUEST['form_type'] == 'reservation') {
		$form_date = htmlspecialchars($_REQUEST['form_date']);
		$form_time = htmlspecialchars($_REQUEST['form_time']);
		$form_guests = htmlspecialchars($_REQUEST['form_guests']);
		$form_name = htmlspecialchars($_REQUEST['form_name']);
		$form_email = htmlspecialchars($_REQUEST['form_email']);
		$form_phone = htmlspecialchars($_REQUEST['form_phone']);
		$form_text = htmlspecialchars($_REQUEST['form_text']);

		$form_subject = 'Restbeef Table Reservation Request';
		
		if (empty($form_date) || empty($form_time) || empty($form_guests) || empty($form_name) || empty($form_email) || empty($form_phone) || empty($form_text)) {
			die ('Please fill in all required fields! form_date:' . $form_date . '; form_time:' . $form_time .'; form_guests:'. $form_guests .'; form_name:'. $form_name .'; form_email: '. $form_email .'; form_phone:'. $form_phone .'; form_text:'. $form_text);
		}

		$message = "
		Name: ".$form_name."<br><br>
		Phone: ".$form_name."<br><br>
		E-mail: ".$form_email."<br><br>
		Reservation Date: ".$form_email."<br><br>
		Reservation Time: ".$form_email."<br><br>
		Guests Number: ".$form_email."<br><br>
		Comment: ".$form_text;
		
		$headers = 'From: '. $form_email . "\r\n" .
			'MIME-Version: 1.0' . "\r\n" .
			'Content-type: text/html; charset=utf-8' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
		
	} else {
		$form_name = htmlspecialchars($_REQUEST['form_name']);
		$form_email = htmlspecialchars($_REQUEST['form_email']);
		$form_text = htmlspecialchars($_REQUEST['form_text']);
		$form_subject = 'Restbeef Contact Form Subject';
		
		if (empty($form_name) || empty($form_email) || empty($form_text)) {
			die ('Please fill in all required fields!');
		}
		
		$message = "
		Name: ".$form_name."<br><br>
		E-mail: ".$form_email."<br><br>
		Comment: ".$form_text;
		
		$headers = 'From: '. $form_email . "\r\n" .
			'MIME-Version: 1.0' . "\r\n" .
			'Content-type: text/html; charset=utf-8' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
	}
	
	if(mail($email_to, $form_subject, $message, $headers)) {
		echo 'Done! Thank You!';
	}
}
