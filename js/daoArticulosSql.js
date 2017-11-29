"use strict";
(function() {
    if (window["openDatabase"]) {
 
    var base = null, NOMBRE_DE_BASE = "Dango", VERSION = "2.0",
        DESCRIPCION = "Ejemplo", LONGITUD = 3000000; 
    addEventListener("DOMContentLoaded", abreBd, false);
   
    evtAgregaArticulo.observa(agrega);
    evtBorraArticulo.observa(borra);
    evtModificaArticulo.observa(modifica);
  }
  
  function agrega(articulo) {
    base.transaction(function(transaccion) {
      transaccion.executeSql(
          "INSERT INTO Articulo(clave, nombre, tiempo, precio, fecha, subtotal)\n\
 VALUES (?,?,?,?,?,?)", [
            articulo["clave"], articulo["nombre"], articulo["tiempo"], articulo["precio"], articulo["fecha"], articulo["subtotal"]]);
    }, error, buscaInstancias);
  }
 
  function borra(articulo) {
    base.transaction(function(transaccion) {
      transaccion.executeSql(
          "DELETE FROM Articulo WHERE clave= ?", [articulo["clave"]]);
    }, error, buscaInstancias);
  }
  
  function modifica(articulo) {
    base.transaction(function(transaccion) {
      transaccion.executeSql(
          "UPDATE Articulo SET tiempo= ?, fecha= ?, subtotal= ? WHERE clave= ?", [
            articulo["tiempo"], articulo["fecha"], articulo["subtotal"], articulo["clave"]]);
    }, error, buscaInstancias);
  }
  
  function abreBd() {
    base = openDatabase(NOMBRE_DE_BASE, "", DESCRIPCION, LONGITUD);
    if (base.version === VERSION) {
      buscaInstancias();
    } else {
     
      base.changeVersion("", VERSION, eliminaYCreaTablaArticulo, error,
          buscaInstancias);
    }
  }
  function eliminaYCreaTablaArticulo(transaccion) {
    // Elimina tablas y luego las crea.  Al terminar, invoca buscaInstancias.
    transaccion.executeSql("DROP TABLE IF EXISTS Articulo", [], creaTablaArticulo);
  }
  function creaTablaArticulo(transaccion) {
    transaccion.executeSql(
        "CREATE TABLE Articulo(clave TEXT PRIMARY KEY,\n\
        nombre TEXT, tiempo TEXT, precio TEXT, fecha TEXT, subtotal TEXT)",
        []);
  }
  function buscaInstancias() {
    base.readTransaction(function(transaccion) {
      transaccion.executeSql("SELECT * FROM Articulo ORDER BY clave", [],
          procesaInstancias);
    }, error);
  }
  function procesaInstancias(transaccion, resultado) {
    var renglones = resultado.rows;
    // Notifica que va a iniciar un listado.
    evtIniciaListado.dispara();
    for (var i = 0, longitud = renglones.length; i < longitud; i++) {
      evtElementoDeListado.dispara(renglones.item(i));
    }
    evtListadoTerminado.dispara();
  }
  function error(evento) {
    evtError.dispara(evento.message);
  }
}());

