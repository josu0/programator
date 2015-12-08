<?php
	session_start();
	$erabiltzaileAurkitua=false;
	$pasahitzEgokia=false;
	if(!file_exists('datuak.xml')){
		echo('<p>Arazoa fitxategia irakurtzean</p>');
	}
	else{
		$erabLista=simplexml_load_file("datuak.xml");
		$erabiltzailea=$_GET['erabiltzailea'];
		$pasahitza=$_GET['pasahitza'];

		foreach($erabLista->erabiltzailea as $erabiltzaile){
			if(((string)$erabiltzaile->izena==$erabiltzailea)||((string)$erabiltzaile->emaila==$erabiltzailea)){
				$erabiltzaileAurkitua=true;
				if((string)$erabiltzaile->pasahitza==$pasahitza){
					$pasahitzEgokia=true;
					$_SESSION["erab"]=$erabiltzailea;
				}
			}
		}
		
		if(!$erabiltzaileAurkitua){
			echo("\t$erabiltzailea erabiltzailea ez da existitzen\n");
		}else{
			if(!$pasahitzEgokia){
				echo("\tPasahitza okerra da\n");
			}
		}
	}		
?>
