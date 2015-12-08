function balidatuLogin(f)
{
	var erabiltzailea = f.erabiltzailea.value.trim();
	var pasahitza = f.pasahitza.value.trim();
	
	var errorea = "";
	if(erabiltzailea==""){
		errorea = "\t--> Erabiltzaile bat sartu behar duzu\n\n";
	}else{
		//Sartutakoa emaila den begiratzen du
		if(erabiltzailea.indexOf(" ")!=-1){
			errorea = "t--> Ezin da hutsunerik egon erabilzailean\n\n"
		}else if(erabiltzailea.indexOf("@") >= 0){ 
			//emaila egokia den begiratzen du
			if(!emailaTratatu(erabiltzailea)){
				errorea = "\t--> Sartutako emaila okerra da\n\n";
			}
		}
	}
	if(pasahitza=="")
		errorea += "\t--> Pasahitza sartu behar duzu\n";
	
	if(errorea != "")
	{
		alert(errorea);
		return false;
	}else{
		//konprobatu pasahitza erabiltzaile horrena dela
		erabiltzaileEgokia(erabiltzailea,pasahitza);
		//alert("A");
		//if(document.getElementById("erantzuna").innerHTML){
		return false;
		//}
		//return true;
	}
}

function balidatuErregistratu(f)
{
	var erabiltzailea = f.erabiltzailea.value.trim();
	var emaila = f.emaila.value.trim();
	var pasahitza = f.pasahitza.value.trim();
	
	var errorea = "";
	if(erabiltzailea==""){
		errorea = "\t--> Erabiltzaile bat sartu behar duzu\n\n";
	}else{
		//Sartutakoa emaila den begiratzen du
		if(erabiltzailea.indexOf(" ")!=-1){
			errorea = "t--> Ezin da hutsunerik egon erabilzailean\n\n"
		}if((erabiltzailea.indexOf("@") != -1)||(erabiltzailea.indexOf(".")!= -1)){ 
			errorea += "\t--> Sartutako erabiltzailea okerra da \n\n";
		}
	}
	if(emaila==""){
		errorea += "\t--> Email bat sartu behar duzu\n\n";
	}else{
		//Sartutakoa emaila den begiratzen du
		if(emaila.indexOf(" ")!=-1){
			errorea = "t--> Ezin da hutsunerik egon emailean\n\n";
		}
		//emaila egokia den begiratzen du
		if(!emailaTratatu(emaila)){
			errorea = "\t--> Sartutako emaila okerra da\n\n";
		}
	}
	if(pasahitza=="")
		errorea += "\t--> Pasahitza sartu behar duzu\n";
	
	if(errorea != "")
	{
		alert(errorea);
		return false;
	}else{
		//konprobatu pasahitza erabiltzaile horrena dela
		erabiltzaileEgokiaErregistratu(erabiltzailea,emaila, pasahitza);
		//alert("A");
		//if(document.getElementById("erantzuna").innerHTML){
		return false;
		//}
		//return true;
	}
}

function emailaTratatu(emaila)
{
	//'@' bakarra dagoela ziurtatu
	if(emaila.split("@").length != 2)
		return false;
	// Ziurtatu '@' karakterea ez dela lehena
	if(emaila.indexOf("@") == 0)
		return false;
	// Ziurtatu '@' karakterearen ondoren '.' karaktereren bat badagoela
	if(emaila.lastIndexOf(".") < emaila.lastIndexOf("@"))
		return false;
	// Ziurtatu azkeneko puntuaren atzetik gutxienez beste 2 karaktere daudela
	if(emaila.lastIndexOf(".") + 2 > emaila.length - 1)
		return false;
	return true;
}

function balidatuAldaketak(f)
{
	//balioak irakurri
	var hila = parseInt(f.hila.value);
	var eguna = parseInt(f.eguna.value);
	var ordua = parseInt(f.ordua.value);
	var minutu = parseInt(f.minutu.value);
	var gaia = f.gaia.value;
	var xehetasun = f.xehetasun.value;

	var errorea = "";
	
	//konprobatu ea hilabeterik sartu den eta hilabetea sartu bada zenbaki bat dela egiaztatu
	if(isNaN(hila)){
		errorea += "\tHilabeteak 1-etik 12-rako zenbakiren bat izan behar du\n";
	}
	//konprobatu ea egunik sartu den eta eguna sartu bada zenbaki bat dela egiaztatu
	if(isNaN(eguna)){
		errorea += "\tEgunak 1-etik hilabetearen araberako zenbakiren bat izan behar du\n";
	}
	//konprobatu ea ordurik sartu den eta ordua sartu bada zenbaki bat dela egiaztatu
	if(isNaN(ordua)){
		errorea += "\tOrduak 0-tik 23-rako zenbakiren bat izan behar du\n";
	}
	//konprobatu ea minuturik sartu den eta minutua sartu bada zenbaki bat dela egiaztatu
	if(isNaN(minutu)){
		errorea += "\tMinutuak 0-tik 59-rako zenbakiren bat izan behar du\n";
	}

	/*if(hila.toString().length==1 || eguna.toString().length==1 || ordua.toString().length==1 || minutu.toString().length==1)
		errorea += "\tProgramator-ek ez ditu bat luzerako karaketereak onartzen, 0 jarri aurretik mesedez\n";*/
	//konprobatu ea hilabetea 1 eta 12 artekoa den
	if(hila > 12 || hila <= 0)
		errorea += "\tHilabete okerra sartu duzu\n";

	//konprobatu urtarrilak, martxoak, maiatzak, uztailak, abuztuak, urriak eta abenduak 31 egun baino gutxiago dituztela
	if(hila == 1 || hila == 3 || hila == 5 || hila == 7 || hila == 8 || hila == 10 || hila == 12){
		if(eguna > 31 || eguna <= 0)
			errorea += "\tHilabete horiek ez dituzte 31 egun baino gehiago\n";
	}	

	//konprobatu apirilak, ekainak, irailak eta azaroak 30 egun baino gutxiago dituztela
	if(hila == 4 || hila == 6 || hila == 9 || hila == 11){
		if(eguna > 30 || eguna <= 0)
			errorea += "\tHilabete horiek ez dituzte 30 egun baino gehiago\n"
	}

	//konprobatu otsailak 28 egun dituela, bisurteak kontuan hartu gabe
	if(hila == 2){
		if(eguna > 28 || eguna <= 0)
			errorea += "\tOtsailak 28 egun soilik ditu\n"
	}

	//konprobatu ea ordua okerra den
	if(ordua > 23)
		errorea += "\tOrdua desegokia da\n";

	//konprobatu ea minutua okerra den
	if(minutu > 59)
		errorea += "\tMinutuak desegokiak dira\n";

	//konprobatu ea gairen bat sartu den
	if(gaia == "")
		errorea += "\tGairen bat sartu behar duzu\n";
	
	//konprobatu ea xehetasunen bat sartu den
	if(xehetasun == "")
		errorea += "\tXehetasun bat sartu behar duzu\n";
	
	
	if(errorea != "")
	{
		alert(errorea);
		return false;
	}
	else
		//alert("Ondo sartu dira datuak");
		return true;
}


function erabiltzaileEgokia(erabiltzailea, pasahitza) { 
	// Sortu XMLHttpRequest objektu bat (nabigatzailearen arabera modu ezberdina). 
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	//Asinkronoa da, izan ere bestela funtzioak eremua begiratzean, oraindik ezer ez dagoenez oker exekutatzen da
	xhr.open('GET', 'erabiltzaileaKonprobatu.php?erabiltzailea='+erabiltzailea+'&pasahitza='+pasahitza, true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			//if(xhr.responseText==""){
			//	window.locationf="hasierakoOrria.php";
			//}else{
				//var a = (string)xhr.responseText;
				//alert(a);
				document.getElementById("erantzuna").innerHTML="";
				document.getElementById("erantzuna").innerHTML=xhr.responseText;
				if(document.getElementById("erantzuna").innerHTML==""){
					window.location="hasierakoOrria.php";
				}
			//}
		} 
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}

function erabiltzaileEgokiaErregistratu(erabiltzailea, emaila, pasahitza) { 
	// Sortu XMLHttpRequest objektu bat (nabigatzailearen arabera modu ezberdina). 
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	//Asinkronoa da, izan ere bestela funtzioak eremua begiratzean, oraindik ezer ez dagoenez oker exekutatzen da
	xhr.open('GET', 'erabiltzaileaKonprobatuErregistratu.php?erabiltzailea='+erabiltzailea+'&emaila='+emaila+'&pasahitza='+pasahitza, true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			//if(xhr.responseText==""){
			//	window.locationf="hasierakoOrria.php";
			//}else{
				//var a = (string)xhr.responseText;
				//alert(a);
				document.getElementById("erantzunaErregistratu").innerHTML="";
				document.getElementById("erantzunaErregistratu").innerHTML=xhr.responseText;
				if(document.getElementById("erantzunaErregistratu").innerHTML==""){
					window.location="hasierakoOrria.php";
				}
			//}
		} 
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}

function hasierakoOrriaEzabatu(){
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	//Asinkronoa da, izan ere bestela funtzioak eremua begiratzean, oraindik ezer ez dagoenez oker exekutatzen da
	xhr.open('GET','hasierakoOrriaEzabatu.php', true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			//if(xhr.responseText==""){
			//	window.locationf="hasierakoOrria.php";
			//}else{
				//var a = (string)xhr.responseText;
				//alert(a);
			document.getElementById("ezabatuBotoia").style.background="#555";
			document.getElementById("ezabatuBotoia").style.color="white";
			document.getElementById("zureAbisuakBotoia").style.background="Lavender";
			document.getElementById("zureAbisuakBotoia").style.color="black";
			document.getElementById("gustukoAbisuakBotoia").style.background="Lavender";
			document.getElementById("gustukoAbisuakBotoia").style.color="black";
			document.getElementById("zureAbisuak").innerHTML="";
			document.getElementById("zureAbisuak").innerHTML=xhr.responseText;
			//}
		} 
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}

function abisuaEzabatu(id){
    if(confirm("Ziur zaude iruzkina ezabatu nahi duzula?")){
        // Sortu XMLHttpRequest objektu bat (nabigatzailearen arabera modu ezberdina). 
		var xhr; 
		if(XMLHttpRequest) 
			xhr = new XMLHttpRequest(); 
		else 
			xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
		 
		// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
		xhr.open('GET', 'abisuaEzabatu.php?id='+id, true); 
		// Eskaeraren egoera aldatutakoan egin beharrekoa. 
		xhr.onreadystatechange = function() 
		{ 
			// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
			if(xhr.readyState == 4 && xhr.status == 200){
				document.getElementById("zureAbisuak").innerHTML="";
				document.getElementById("zureAbisuak").innerHTML=xhr.responseText;
			}
		} 
		xhr.send('');	// Bidali AJAX eskaera.
    }

}

function gustukoDut(id){
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	xhr.open('GET', 'gustukoDut.php?id='+id, true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			var botoiId="gustukoDutBotoia";
			botoiId = botoiId.concat(id.substring(1,2));
			if(document.getElementById(botoiId).style.color=="black"){
				document.getElementById(botoiId).style.color="white";
				document.getElementById(botoiId).style.background="#0099FF";
			}else{
				document.getElementById(botoiId).style.color="black";
				document.getElementById(botoiId).style.background="#555";
			}
		}
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}

function gustukoenOrria(){
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	xhr.open('GET', 'gustukoAbisuak.php', true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			document.getElementById("ezabatuBotoia").style.background="Lavender";
			document.getElementById("ezabatuBotoia").style.color="black";
			document.getElementById("zureAbisuakBotoia").style.background="Lavender";
			document.getElementById("zureAbisuakBotoia").style.color="black";
			document.getElementById("gustukoAbisuakBotoia").style.background="#555";
			document.getElementById("gustukoAbisuakBotoia").style.color="white";
			document.getElementById("zureAbisuak").innerHTML="";
			document.getElementById("zureAbisuak").innerHTML=xhr.responseText;
		}
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}

function erregistratu(){
	var xhr; 
	if(XMLHttpRequest) 
		xhr = new XMLHttpRequest(); 
	else 
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	 
	// Adierazi erabiliko den metodoa (GET), URLa (parametro eta guzti) eta eskaera asinkronoa izango den ala ez (true). 
	xhr.open('GET', 'erregistratu.php', true); 
	// Eskaeraren egoera aldatutakoan egin beharrekoa. 
	xhr.onreadystatechange = function() 
	{ 
		// Egoera egokia bada (4 eta 200) dagokion elementuan idatzi zerbitzaritik jasotako testua. 
		if(xhr.readyState == 4 && xhr.status == 200){
			document.getElementById("erregistratu").innerHTML="";
			document.getElementById("erregistratu").innerHTML=xhr.responseText;
		}
	} 
	xhr.send('');	// Bidali AJAX eskaera.
}
