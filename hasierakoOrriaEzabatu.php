<?php
session_start();
if(!($erabLista=simplexml_load_file('datuak.xml'))){
		echo('<p>Errore bat gertatu da fitxategia irakurtzean. Barkatu eragozpenak</p>');
}else{
	$erabiltzailea=$_SESSION["erab"];
	foreach($erabLista->erabiltzailea as $erabiltzaile){
		if(($erabiltzaile->izena==$erabiltzailea)||($erabiltzaile->emaila==$erabiltzailea)){
			$erabiltzaileOsoa = $erabiltzaile;
			$abisuak = $erabiltzaileOsoa->abisuak;
		}
	}
	echo('<h2>Ezabatu</h2>');
	foreach($abisuak->abisua as $abisu){
		echo('<div class="klikagarria" id="'.$abisu['id'].'" onclick="javascript:abisuaEzabatu(\''.$abisu['id'].'\');">');
		echo('<div id="goiburukoa">');
		echo('<div id="gaia">'.$abisu->gaia."</div>");
		echo('<div id="data">'.$abisu->hila."/".$abisu->eguna."</div>");
		echo('<div id="ordua">'.$abisu->ordua.":".$abisu->minutua."</div>");
		echo('</div>');
		echo('<div id="xehetasunak">'.$abisu->xehetasun."</div>");
		echo('</div>');
	}
}
?>