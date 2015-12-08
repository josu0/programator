<?php
	require_once('aldaketa.inc');
	//Jaso formularioko balioak eta testuei hasierako eta amaierako hutsuneak kendu (trim).
	$hila=trim($_POST['hila']);
	$eguna=trim($_POST['eguna']);
	$ordua=trim($_POST['ordua']);
	$minutu=trim($_POST['minutu']);
	$gaia=trim($_POST['gaia']);
	$xehetasun=trim($_POST['xehetasun']);
	$emaila=isset($_POST['emaila']);

	//Balidatu formularioko datuak.
	$errorea='';
	if(!gorde_aldaketa($hila, $eguna, $ordua, $minutu, $gaia, $xehetasun, $emaila))	// Gorde aldaketa datu basean (XML fitxategia).
		$errorea = '<li>Ezin izan da aldaketa datu basean gorde.</li>';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<?php
		if($errorea!='')
			echo '<title>Errorea aldaketa berria jasotzean</title>';
	?>
		<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
	</head>
	<body>
	<?php
		if($errorea != '')
		{
			echo('<h1>Errore bat gertatu da aldaketa gordetzean.</h1>');
			echo("<ul>$errorea</ul>");
		}
		else
		{
			header('Location: hasierakoOrria.php');
		}
	?>
		<a href="aldaketak.html">Saiatu Berriro</a>
		<a href="hasierakoOrria.php">Hasierako orria</a>
	</body>
</html>
