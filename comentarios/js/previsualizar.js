
    /********************************************/
    /********************************************/
    /************JavaScript Document*************/
    /***************BaluArt.net******************/
    /********Previsualizar Comentarios***********/
    /********************************************/
    /********************************************/

/*Tutorial: http://www.baluart.net/articulo/286/previsualizacion-de-comentarios-con-javascript.php*/
/*Ejemplo en online: http://www.baluart.net/ejemplos/art286/*/

window.onload = window_onload;

function window_onload(){

    // Asigna valores por defecto

    if(document.getElementById('baluform'))
    {
        if(document.getElementById('email_com').value == "") document.getElementById('email_com').value = "Correo electrónico";
        if(document.getElementById('author_com').value == "") document.getElementById('author_com').value = "Nombre";
        if(document.getElementById('url_com').value == "") document.getElementById('url_com').value = "http://";

    document.getElementById('baluform').onsubmit = function()
    {
        if(document.getElementById('email_com').value == "Correo electrónico")
        {
            document.getElementById('email_com').value = "";
        }
        if(document.getElementById('author_com').value == "Nombre")
        {
            document.getElementById('author_com').value = "";
        }
        if(document.getElementById('url_com').value == "http://")
        {
            document.getElementById('url_com').value = "";
        }
        rememberMe(document.getElementById('baluform'));
    }

    // Muestra valores

    document.getElementById('email_com').onfocus = function()
    {
        if(this.value == "Correo electrónico"){this.value = "";}
    };

    document.getElementById('author_com').onfocus = function()
    {
        if(this.value == "Nombre"){this.value = "";}
    };

    document.getElementById('email_com').onblur = function()
    {
        if(this.value == ""){this.value = "Correo electrónico";}
    };

    document.getElementById('author_com').onblur = function()
    {
        if(this.value == ""){this.value = "Nombre";}
    };

    document.getElementById('url_com').onblur = function()
    {
        if(this.value == ""){this.value = "http://";}
    };

}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Previsualizar Comentario
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

    // Previsualizar comentario y fecha
    var cs = document.getElementById('comments');
    var bp = document.getElementById('btn_previsualizar');
    if(cs != null && bp != null )
    {
        var nc = document.createElement('div');
        nc.className = 'comment'; // nombre de la clase CSS
        nc.style.display = 'none';
        nc.id = 'livepreview';
        var cmd = document.createElement('div');
        cmd.className = 'commentmetadata';
        var cpt = document.createElement('span');
        cpt.className = 'poster';
        cpt.id = 'previewAutor';
        var cpd = document.createElement('span');
        cpd.className = 'postdate';

        var dt = new Date();
        var ms = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre",
                           "Diciembre");
        var hr = (dt.getHours()==0?12:(dt.getHours()>12?dt.getHours()-12:dt.getHours()));
        cpd.innerHTML = dt.getDate() + ' de ' + ms[dt.getMonth()] + ' del ' + dt.getFullYear() + '<br/>' + (hr<10?'0':'') + hr + ':'                                     + (dt.getMinutes()<10?'0':'') + dt.getMinutes() + ' ' + (dt.getHours()<12?'a.m.':'p.m.');
        cmd.appendChild(cpt);
        cmd.appendChild(cpd);
        nc.appendChild(cmd);

    //Previsualiza el texto del comentario - Crea div commenttext

        var cmt = document.createElement('div');
        cmt.className = 'commenttext';
        cmt.style.minHeight = '40px';
        cmt.id = 'commenttext';
        nc.appendChild(cmt);

        cs.appendChild(nc);
        bp.onclick=function()
        {
            var el = document.getElementById('livepreview');
            el.style.display = 'block';
            window.scroll(0, 99999);
            document.getElementById("commenttext").style.backgroundColor = "transparent";
            return false;
        }

        var txt = document.getElementById("text_com");
        var auth = document.getElementById("author_com");
        var url_com = document.getElementById("url_com");
        txt.onkeyup=function()
        {
            var lp = document.getElementById("commenttext");
            lp.innerHTML = '<p>' + this.value.replace(/\n/g, "<br />") + '</p>';
        }
        setPreviewMetaData();
        url_com.onkeyup=setPreviewMetaData;
        auth.onkeyup=setPreviewMetaData;
    }
}

    // Previsualiza el Autor y la URL

    function setPreviewMetaData()
    {
        var auth = document.getElementById("author_com");
        var url_com = document.getElementById("url_com");
        var pre = '', post = '';
        if(url_com.value.length > 0 )
        {
            pre = '<a href="'+url_com.value+'">';
            post = '</a>';
        }
        var lp = document.getElementById("previewAutor");
        lp.innerHTML = pre + auth.value + post;
    }
