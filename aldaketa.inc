<?php

// Aldaketa datu basean gorde. Errorerik ezean true itzultzen du eta false bestela.
function gorde_aldaketa($hila, $eguna, $ordua, $minutu, $gaia, $xehetasun, $emaila)
{
	session_start();
	if(!($erabLista=simplexml_load_file('datuak.xml'))){
		echo('<p>Errore bat gertatu da fitxategia irakurtzean. Barkatu eragozpenak</p>');
	}else{
		$erabiltzailea=$_SESSION["erab"];
		foreach($erabLista->erabiltzailea as $erabiltzaile){
			if(($erabiltzaile->izena==$erabiltzailea)||($erabiltzaile->emaila==$erabiltzailea)){
				$erabiltzaileOsoa = $erabiltzaile;
			}
		}
		$id = "a" . ((int) substr($erabiltzaileOsoa->abisuak['azkenid'], 1) + 1); // Kalkulatu iruzkin berriaren identifikadorea
		$berria=$erabiltzaileOsoa->abisuak->addChild('abisua');	// Sortu 'aldaketa' etiketa.
		$berria['id']=$id;
		$berria['gustukoDut']="ez";
		$berria->addChild('hila', $hila);	// Sortu 'aldaketa' etiketa barruko etiketak.
		$berria->addChild('eguna', $eguna);
		$berria->addChild('ordua', $ordua);
		$berria->addChild('minutua', $minutu);
		$berria->addChild('gaia', $gaia);
		$berria->addChild('xehetasun', $xehetasun);
		//$berria->addAttribute('erakutsi',$emaila?'ez':'bai');
		$erabiltzaileOsoa->abisuak['azkenid']=$id;	// Eguneratu erroko 'azkenid' atributua.
		return $erabLista->asXML('datuak.xml');	// Gorde aldaketak fitxategian.
	}
}
?>
