/**
* @author Costas Jonathan Miguel
* @website www.JoMiCo.com.ar
* @copyright 2008
* @Licence GPL v3.0
*/

/* Parametros de Configuracion*/
var Jomico = {

    ile:"XML/comment-xml.xml", //nombre del fichero XML
    element:document.getElementById("comments"), //Elemento sobre el que se van a mostrar los comentarios
    theme:"default", //Skin de colores y fuentes
    posted:"Posteado por ", //Texto que aprecerá antes del nombre
    empty:"undefined", //En caso de error la lectura del comentario
    credits:"Powered by JoMiCos", //Creditos, no borrar
    url:"http://www.jomico.com.ar", //URL de los Creditos
    maxChar:700,//Maxima cantidad de caracteres en comentario
    validateElement:function(){var div=document.createElement("DIV");document.body.appendChild(div);div.id="comments";return div}

};
//Init
init(Jomico.element?Jomico.element:Jomico.validateElement);
//Error
checkError(location.href);
// ValidateForm Class
var ValidateForm = function(pelement){
    this.pelement = pelement;
    this.msj0 = " vacio o incorrecto";
    this.msj1 = " excede la cantidad de caracteres permitidos";
    this.msj2 = "Debe ingresar texto que observa en la imagen";
    //Validacion de Campos
    this.retorno = this.validateAll();

}
//validateAll function
ValidateForm.prototype.validateAll = function(){
    var security = (typeof this.pelement == "object")?true:false;
    //Validate Name
    var field_name = document.getElementById("textname");
    if(field_name){var b0 = this.vName(field_name);}else{alert("Error en validacion de Nombre");}
    //Validacion de texto comentario
    var field_comment = document.getElementById("textcomment");
    if(field_comment){var b1 = this.vComment(field_comment);}else{alert("Error en validacion de Comentario");}
    //VAlidacion de Captcha
    var field_captcha = document.getElementById("captcha");
    if(field_captcha){var b2 = this.vCaptcha(field_captcha);}else{alert("Error en validacion de Captcha");}
    //Indico estado de validacion
    return (b0&&b1&&b2)?true:false;

}
//Validacion de Nombre
ValidateForm.prototype.vName = function(element){
    var bid = "";
    //Validate
    var bool = element.value?true:false;
    //Msj
    bool?"":this.sError(element,"nombre".concat(this.msj0));

    return bool;
}
//Validacion de EMail
ValidateForm.prototype.vMail = function(element){
    var bid = "";
    //Validate for empty field
    var bool = element.value?true:false;
    bool?"":this.sError(element,"email".concat(this.msj0));
    //Buscar por validacion de email
    if(!bool){}

    return bool;
}
//Validacion de Comentario
ValidateForm.prototype.vComment = function(element){
    var maxChar = Jomico.maxChar;
    //Validate for empty field
    var bool = element.value?true:false;
    bool?"":this.sError(element,"Comentario".concat(this.msj0));
    //Validacion por cantidad de caracteres
    if(bool){
        var bool = element.value.length<=maxChar?true:false;
        bool?"":this.sError(element,"Comentario".concat(this.msj1));
    }
    return bool;
}
//Validacion de Captcha
ValidateForm.prototype.vCaptcha = function(element){
    //Validate
    var bool = element.value?true:false;
    //Msj
    bool?"":this.sError(element,(this.msj2));

    return bool;
}
//Formato de Error
ValidateForm.prototype.sError = function(pelement,dato){
    try{var element = pelement.nextSibling.nextSibling;}
    catch(e){/*Captcha*/if(pelement.parentNode.nodeName=="TD"){
        this.sCaptcha(pelement.parentNode);return true;};}
    //Agrego bordes identificativos
    pelement.style.borderColor = "#FF3300";
    //Security
    if(element.nodeName=="DIV" && element.className=="msjerror"){
        element.className = "msjErrorv";
        var text = document.createTextNode(dato);
        element.appendChild(text);
    }else{return false;}
}
ValidateForm.prototype.sCaptcha = function(pelement){
    var element = (pelement.parentNode.nextSibling.childNodes[0]);
    if(element.nodeName == "TD" && element.className == "msjerror"){
        element.className = "msjErrorv";
        var text = document.createTextNode(this.msj2);
        element.appendChild(text);
    }else
        return false;
}
ValidateForm.prototype.getReturn = function(){
    return this.retorno;
}
document.getElementById("forms").onsubmit = function(){
    var validate = new ValidateForm(this);
    //Se envia??
    if(validate.getReturn())this.submit();else return false;
}
document.getElementById("textcomment").onkeyup = function(){
}
//Apertura y lectura de Sistema XML
function init(element){
    createBrand();
    xmlDoc = loadXMLDoc(Jomico.file);

    if(xmlDoc){
        //Carga de nodos
        var name = (xmlDoc.getElementsByTagName("name"));
        var dates = (xmlDoc.getElementsByTagName("date"));
        var comment = (xmlDoc.getElementsByTagName("comment"));
        var posted = Jomico.posted;
        //Ciclo de lectura
        for(var i = (name.length-1); i >= 0; i--){
            //Names & Dates
            var texto = name[i].childNodes[0]?name[i].childNodes[0].nodeValue:Jomico.empty;
            var fecha = dates[i].childNodes[0]?dates[i].childNodes[0].nodeValue:Jomico.empty;
            var name_content = document.createElement("DIV");
            element.appendChild(name_content);
            var text = document.createTextNode(posted.concat(texto).concat(" on ").concat(fecha));
            name_content.appendChild(text);
            name_content.className = "cm_header";
            //Comment
            var commentText = comment[i].childNodes[0]?comment[i].childNodes[0].nodeValue:Jomico.empty;
            var div_comm = document.createElement("PRE")
            element.appendChild(div_comm);
            var text = document.createTextNode(commentText);
            div_comm.appendChild(text);
            div_comm.className = "cm_body";
        }
        //Css Load - Funcion Para cargar Css
        insertCss();

    }else{
        return false;
    }
}
//Corregir Captura de Error
function checkError(hostname){
    var father = Jomico.element;var v=false;
    var split0 = hostname.split("?");
    //var split1 = split0[1]?split0[1].split("="):[];
    //if(split1[0] == "msj"){v = (split1[1]==25)?true:false;}
    var p0 = (split0[1])?split0[1].indexOf("msj"):-1;
    if(p0!=-1){var value=split0[1].substr(p0+4,2);v = (value=="25")?true:false;}
    if(v){createDiv(father,"ERROR EN CODIGO");}
}
function insertCss(){
    if(Jomico.theme != "default"){
        var link = document.getElementsByTagName("link");
        for(var i=0; i < link.length; i++){
            if(link[i].href.indexOf("theme-default")!= -1){
                link[i].href = "style/theme-".concat(Jomico.theme).concat(".css");

            }
        }
        return true;
    }
}
function createBrand(){
    var cell = document.getElementById("powered");
    var brand0=Jomico.url?Jomico.url:"http://www.jomico.com.ar";
    var brand1=Jomico.credits?Jomico.credits:"Powered by Jomicos";
    if(cell == null){
        var div = document.createElement("DIV");document.getElementById("forms").appendChild(div);div.id = "powered";
    }
    var cell=document.getElementById("powered");var a = cell.getElementsByTagName("a");
    if(a.length>0){
        for(i=0;i<a.length;i++){if(a[i].href.indexOf("jomico.com.ar")==-1){a[i].href=brand0;a[i].childNodes[0].nodeValue=brand1;}}
    }else{
        var a=document.createElement("a");cell.appendChild(a);var text=document.createTextNode(brand1);
        a.appendChild(text);a.href=Jomico.url;
    }
}

/*Load XML to external file*/
function loadXMLDoc(dname)
{
try{ //IE
   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
}catch(e){
  try{ //Firefox, Mozilla, Opera, etc.
    xmlDoc=document.implementation.createDocument("","",null);
  }catch(e) {alert("Navegador incompatible para la apertura de archivo");}
}
try{//Load File
    xmlDoc.async = false;
    xmlDoc.load(dname);
    return(xmlDoc);
}catch(e) {alert("Imposible apertura de fichero");}
    return(null);
}
function createDiv(element,msj){
    var div = document.createElement("DIV");
    element.appendChild(div);
    //ATTR
    div.className = "emerge";
    var text = document.createTextNode(msj);
    div.appendChild(text);
}
