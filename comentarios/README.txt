NAME
======
Sistema de Comentarios

VERSION
-------
1.0 - 01 June 2008

DESCRIPTION
====-------
Sistema de comentarios para añadir en tu sitio web o Blog.


SYNOPSIS
=-------
Este Widget permite que usuario puedan ingresar nombre, email y comentario para luego guardarlo en un archivo XML.
Luego, con Javascript se procede a la lectura del fichero y estos son presentados en pantalla mediante estilos CSS que permiten una agradable presentación



REQUIREMENTS
=====-------
PHP5 >= 5.0.2
Extensión DOM activada. Vienen activadas por defecto en version de PHP5 o superiores.
Extensión GD activada.


USAGE
=====
Copia y Pega las siguientes lineas de código en tu página, previamente copiado los archivos en el mismo directorio.

<div id="comments"></div>
    <div id="form-comments">
    <form method="post" action="PHP/receive.php" id="forms" >
        <div class="parag">Nombre:</div>
        <input type="text" name="name" maxlength="25" id="textname" class="textly">
        <div class="msjerror"></div><br>
        <div class="parag">Email: </div>
        <input type="text" name="correo" maxlength="35" id="textemail" class="textly">
        <div class="msjerror"></div><br>
        <div class="parag">Comentarios:</div>
        <textarea rows=15 cols=50 name="comment" id="textcomment" wrap="hard"></textarea>
        <div class="msjerror"></div><br>
        <div class="parag">Filtro AntiSpam: </div>
        <table width=50%><tr>
        <td align="left"><img src="php/captcha/captcha.php" title="antispam" alt="captcha"></td>
        <td align="right"><input type="text" size=5 maxlength=6 name="code" id="captcha"></td>
        </tr><tr><td class="msjerror" width=100% colspan="2"></td>
        </tr></table>
        <div class="sender">
        <input type="submit" name="submitter" value="ENVIAR" id="submitter" >
        </div>
        <div id="powered"><a href="http://www.jomico.com.ar" target="_blank">Powered by JoMiCos</a></div>
    </form>
    </div>
    <link rel="stylesheet" type="text/css" href="style/theme-blue.css" />
    <script src="script/ValidateForm.js"></script>

FILES
=====
demo.html                   Example Page
php/receive.php             Clase receptora de Datos y manipulación de fichero xml.
php/Time.php                Clase manejadora de time que figuran en los comentarios.
php/captcha/captcha.php     Script manejador del sistema Captcha AntiSpam
script/ValidateForm.js      Clase que valida campos ingresados y se encarga de la lectura y presentación de comentarios
style/theme-default.css     Css con estilos.
style/theme-blue.css        Css con estilos.
XML/comment-xml.xml     Fichero XML que almacena los comentarios.


CONFIG
==-------
Estas configuraciones pueden realizarse en el fichero script/ValidateForm.js
/* Parametros de Configuracion*/
var Jomico = {

    file:"XML/comment-xml.xml", //nombre del fichero XML
    element:document.getElementById("comments"), //Elemento sobre el que se van a mostrar los comentarios
    theme:"default", //Skin de colores y fuentes
    posted:"Posteado por ", //Texto que aprecerá antes del nombre
    empty:"undefined", //En caso de error la lectura del comentario
    credits:"Powered by JoMiCos", //Creditos, no borrar
    url:"http://www.jomico.com.ar", //URL de los Creditos
    maxChar:700,//Maxima cantidad de caracteres en comentario
    validateElement:function(){var div=document.createElement("DIV");document.body.appendChild(div);div.id="comments";return div}

};
LICENSE
-------
Copyright (C)2007-2008, Costas Jonathan <http://www.jomico.com.ar>
All rights reserved

Redistribution and use in source and binary forms, with or
without modification, are permitted provided that the following
conditions are met:

* Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following
disclaimer in the documentation and/or other materials provided
with the distribution.

* Neither the name of the <ORGANIZATION> nor the names of its
contributors may be used to endorse or promote products derived
from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.


COPYRIGHT
==-------
Copyright (C) 2007-2008 Costas Jonathan <http://www.jomico.com.ar>
All Rights Reserved



$Id: README,v 1.3 2008/01/20 09:58:58 Owner Exp $
