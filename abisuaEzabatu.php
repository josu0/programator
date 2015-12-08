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
		echo('<h2>Ezabatu</h2>');
		$borratua=false;
		foreach($abisuak->abisua as $abisu){
			if($abisu['id']== $id){
				$abisuaBorratzeko=$abisu;
				$azkenid = "a" . ((int) substr($erabiltzaileOsoa->abisuak['azkenid'], 1)-1);
				$abisuak['azkenid']=$azkenid;
				$borratua = true;
			}else{
				if($borratua){
					$id = "a" . ((int) substr($abisu['id'], 1) - 1);
					$abisu['id']=$id;
				}
			}
		}
		unset($abisuaBorratzeko[0]);
		$erabLista->asXML('datuak.xml');
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
}
?>