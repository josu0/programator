<?php
session_start();
if(!($erabLista=simplexml_load_file('datuak.xml'))){
		echo('<p>Errore bat gertatu da fitxategia irakurtzean. Barkatu eragozpenak</p>');
}else{
	if(isset($_GET['id'])){
		$erabiltzailea=$_SESSION["erab"];
		$id=$_GET['id'];
		foreach($erabLista->erabiltzailea as $erabiltzaile){
			if(($erabiltzaile->izena==$erabiltzailea)||($erabiltzaile->emaila==$erabiltzailea)){
				$erabiltzaileOsoa = $erabiltzaile;
				$abisuak = $erabiltzaileOsoa->abisuak;
			}
		}
		foreach($abisuak->abisua as $abisu){
			if($abisu['id']== $id){
				if($abisu['gustukoDut']=="ez"){
					$abisu['gustukoDut']="bai";
				}else{
					$abisu['gustukoDut']="ez";
				}
			}
		}
		$erabLista->asXML('datuak.xml');
	}
}