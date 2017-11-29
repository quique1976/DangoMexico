"use strict";
var evtIniciaListado = new Evento(),
    evtElementoDeListado = new Evento(),
    evtListadoTerminado = new Evento(),
    evtAgregaArticulo = new Evento(),
    evtBorraArticulo = new Evento(),
    evtModificaArticulo = new Evento(),
    pretotal=0,
    forma = document.getElementById("forma"),
    salida = document.getElementById("salida"),
    nuevo = document.getElementById("nuevo"),
    txtPrec= forma["precio"],
    txtCant= forma["tiempo"],
    total = 0,
    txtFecha = forma["fecha"];
   
    forma["Registrar"].addEventListener("click", agregaArticulo, false);
    forma["Borrar"].addEventListener("click", borraArticulo, false);
    forma["nombre"].addEventListener("change", validaNombre, false);
    forma["Modificar"].addEventListener("click", modificaArticulo, false);
    validaNombre();
    muestraInfo();
    
function muestraInfo() {
  nuevo.style.display= "block";
}

function validaNombre() {
    if (forma["nombre"].value === "Paquete Diamante") {
      forma["clave"].value = "1135";
      forma["precio"].value = "1500";
    }
    if (forma["nombre"].value === "Paquete Gold") {
      forma["clave"].value = "1248";
      forma["precio"].value = "1250";
    }
    if (forma["nombre"].value === "Paquete Platino") {
      forma["clave"].value = "1352";
      forma["precio"].value = "1000";
    }
    if (forma["nombre"].value === "Paquete Bronce") {
      forma["clave"].value = "1467";
      forma["precio"].value = "800";
    }
  }
   
function agregaArticulo() {
  var fecha= new Date(txtFecha.value),
          mes=fecha.getMonth()+1,
          dia=fecha.getDate()+1,
          anio=fecha.getFullYear();
  
  var preu= new Number((txtPrec.value)*(txtCant.value));
  
  pretotal=preu;
          
  total= total + pretotal;
    
  var articulo = {   
    "clave": forma["clave"].value.trim(),
    "nombre": forma["nombre"].value.trim(),
    "tiempo": forma["tiempo"].value.trim(),
    "precio": "$" + forma["precio"].value.trim(),
    "fecha" : dia +"-"+mes+"-"+anio,
    "subtotal": "$"+ pretotal
  };
  
  salida.textContent= "$" + total+".00";
  evtAgregaArticulo.dispara(articulo);
  
}

function borraArticulo() {
  var articulo = {   
    "clave": forma["clave"].value.trim()
  };
  total= total - pretotal;
  if(total<=0){total=0;}
  salida.textContent= "$" + total+".00";
  evtBorraArticulo.dispara(articulo);
}

function modificaArticulo(){
  var fecha= new Date(txtFecha.value),
          mes=fecha.getMonth()+1,
          dia=fecha.getDate()+1,
          anio=fecha.getFullYear();
  
  var preu= new Number((txtPrec.value)*(txtCant.value));
    
  var articulo = {   
    "clave": forma["clave"].value.trim(),
    "tiempo": forma["tiempo"].value.trim(),
    "fecha" : dia +"-"+mes+"-"+anio,
    "subtotal": "$"+ preu
  };
  
  pretotal = preu - pretotal;
  total = total + pretotal;
  salida.textContent= "$" + total+".00";
  evtModificaArticulo.dispara(articulo);

}

(function(document) {
  var listado = document.getElementById("listado"),
      listadoHtml = null;   
  
  evtIniciaListado.observa(function() {
    listadoHtml = ""; //La pone en blanco
    limpia(); //limpia los cuadros de texto
  });
  evtElementoDeListado.observa(function(articulo) {   
    listadoHtml += "<tr><td class='numero'>"
        + codificaHtml(articulo["clave"])
        + "</td><td>" + codificaHtml(articulo["nombre"] ? articulo["nombre"].toString() : "")
        + "</td><td>" + codificaHtml(articulo["tiempo"])+ " meses"
        + "</td><td>" + codificaHtml(articulo["precio"])
        + "</td><td>" + codificaHtml(articulo["fecha"])
        + "</td><td>" + codificaHtml(articulo["subtotal"])+"</td></tr>";
  });
  evtListadoTerminado.observa(function() {
    listado.innerHTML = listadoHtml;
    listadoHtml = null; 
  });
  function limpia() {
    forma["clave"].value = "";
    forma["nombre"].value = "";
    forma["tiempo"].value = "";
    forma["precio"].value = "";
    forma["fecha"].value = "";
    
  }
}(window.document));
