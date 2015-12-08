<?php
	echo('<div class="login">');
    echo('<form method="post">');
	echo('<p>Erabiltzailea</p>');
    echo('<div><input type="text" name="erabiltzailea" value="" /></div>');
    echo('<p>Email-a</p>');
    echo('<div><input type="text" name="emaila" value="" /></div>');
	echo('<p>Pasahitza</p>');
    echo('<div><input type="password" name="pasahitza" value="" /></div>');
    echo('<div id="erantzunaErregistratu" class="erantzuna"></div>');
    echo('<p class="submit">');
    echo('<input type="submit" class="botoia" value="Erregistratu" onclick="return balidatuErregistratu(this.form);" />');
    echo('</p>');
    echo('</form>');
    echo('</div>');
?>