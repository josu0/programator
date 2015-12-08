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
	echo('<h2>Gustuko abisuak</h2>');
	foreach($abisuak->abisua as $abisu){
		if($abisu['gustukoDut']=="bai"){
			echo('<div class="abisua" id="'.$abisu['id'].'">');
			echo('<div id="goiburukoa">');
			echo('<div id="gaia">'.$abisu->gaia."</div>");
			echo('<div id="data">'.$abisu->hila."/".$abisu->eguna."</div>");
			echo('<div id="ordua">'.$abisu->ordua.":".$abisu->minutua."</div>");
			echo('</div>');
			echo('<div id="xehetasunak">'.$abisu->xehetasun."</div>");
			echo('</div>');
		}
	}
}
?>S