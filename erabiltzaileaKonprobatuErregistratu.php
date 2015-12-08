<?php
	session_start();
	$emailEgokia=true;
	$erabiltzaileEgokia=true;
	if(!file_exists('datuak.xml')){
		echo('<p>Arazoa fitxategia irakurtzean</p>');
	}
	else{
		$erabLista=simplexml_load_file("datuak.xml");
		$erabiltzailea=$_GET['erabiltzailea'];
		$emaila=$_GET['emaila'];
		$pasahitza=$_GET['pasahitza'];
		foreach($erabLista->erabiltzailea as $erabiltzaile){
			if(((string)$erabiltzaile->izena==$erabiltzailea)){
				$erabiltzaileEgokia=false;
			}
			if(((string)$erabiltzaile->emaila==$emaila)){
				$emailEgokia=false;
			}
		}
		if(!$erabiltzaileEgokia){
			echo("\t$erabiltzailea erabiltzailea jada exixtitzen da\n");
		}else if(!$emailEgokia){
			echo("\t$emaila emaila duen erabiltzaile bat jada existitzen da\n");
		}else{
			$_SESSION["erab"]=$erabiltzailea;
			$berria=$erabLista->addChild('erabiltzailea');
			$berria->addChild('izena',$erabiltzailea);
			$berria->addChild('emaila',$emaila);
			$berria->addChild('pasahitza',$pasahitza);
			$berria->addChild('abisuak');
			$berria->abisuak['azkenid']="a0";
			$erabLista->asXML('datuak.xml');
		}

	}
?>