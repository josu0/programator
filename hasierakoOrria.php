<?php
	session_start();
	if($_SESSION["erab"]==""){
		header('Location: login.html');
	}else{
		$erabiltzailea=$_SESSION["erab"];
	}
	if(!($erabLista=simplexml_load_file('datuak.xml'))){
		$continue=false;
		echo('<p>Errore bat gertatu da fitxategia irakurtzean. Barkatu eragozpenak</p>');
	}else{
		$continue=true;
		foreach($erabLista->erabiltzailea as $erabiltzaile){
			if(($erabiltzaile->izena==$erabiltzailea)||($erabiltzaile->emaila==$erabiltzailea)){
				$erabiltzaileOsoa = $erabiltzaile;
				$abisuak = $erabiltzaileOsoa->abisuak;
			}
		}
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Programator</title>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" href="estiloa.css" type="text/css" />
    <script type="text/javascript" src="funtzioak.js"></script>
  </head>
  <body>
    <div id="menua">
      <ul id="menukoLista">
      <?php
      	echo('<li><span class="erabiltzailea">'.$erabiltzaileOsoa->izena.'</span></li>');
	  ?>
        <li><a href="aldaketak.html">Berria gehitu</a></li>
        <li><a id="zureAbisuakBotoia" href="hasierakoOrria.php">Zure abisuak</a></li>
        <li><a id="ezabatuBotoia" href="javascript:hasierakoOrriaEzabatu();">Ezabatu</a></li>
        <li><a id="gustukoAbisuakBotoia" href="javascript:gustukoenOrria();">Gustuko Abisuak</a></li>
        <li><a id="saioaBukatuBotoia" href="saioaBukatu.php">Saioa Bukatu</a></li>        
      </ul> 
    </div>
<?php
	if($continue){
		echo('<div id="zureAbisuak">');
		echo('<h2>Zure abisuak</h2>');
		$kop=1;
		foreach($abisuak->abisua as $abisu){
			echo('<div class="abisua" id="'.$abisu['id'].'">');
			echo('<div id="goiburukoa">');
			echo('<div id="gaia">'.$abisu->gaia."</div>");
			echo('<div id="data">'.$abisu->hila."/".$abisu->eguna."</div>");
			echo('<div id="ordua">'.$abisu->ordua.":".$abisu->minutua."</div>");
			echo('</div>');
			echo('<div id="xehetasunak">'.$abisu->xehetasun."</div>");
			if($abisu['gustukoDut']=="ez"){
				echo('<a class="gustukoDutBotoia" id="gustukoDutBotoia'.$kop.'" href="javascript:gustukoDut(\''.$abisu['id'].'\');" style="background:#555; color:black;">Gustuko dut</a>');
			}else{
				echo('<a class="gustukoDutBotoia" id="gustukoDutBotoia'.$kop.'" href="javascript:gustukoDut(\''.$abisu['id'].'\');" style="background:#0099FF; color:white;">Gustuko dut</a>');
			}	
			echo('</div>');
			$kop++;
		}
		echo('</div>');
	}
?>
  </body>
</html>