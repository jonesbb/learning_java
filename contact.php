<?php

	//****************************************************
	$your_site_name = "Byron Jones"; // please change!
	$your_email = "bj6610@gmail.com"; // please change!
	//****************************************************

	// post vars
	$the_message = isset($_POST['message']) ? $_POST['message'] : "";

	// check post values
	if (strlen(trim($the_message)) < 1) {
		$error['message'] = true;
	}

	if (preg_match('/[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2,4}/im', $the_message, $matches)) {
		$the_email = $matches[0];
	} else {
		$error['email'] = true;
	}

	if (!isset($error)) {

			// all ok! you can add your contact functional here.

			// contact details vars: $the_email $the_message

			// an email example:
			$header  = "MIME-Version: 1.0\r\n";
			$header .= "Content-type: text/html; charset=utf-8\r\n";
			$header .= "From:".$the_email."\r\n";
			//	 to			  subject								message				header
			$result = mail($your_email, "New Message from ".$your_site_name, nl2br($the_message), $header);

			if (!$result)
				return;
	}
?>
<p><strong>Thank you</strong>. Your Message has been Sent.</p>
<p>We will respond to you shortly if your message requires a response.</p>
