function setAction(element,method){
  var url = "https://node.kenchlightyear.com/";
  if(method==="DELETE"){
    var keyids = document.getElementsByName("keyid[]");
    var keyid;
    for(var i=0; i<keyids.length; i++){
       if(keyids[i].checked){
          keyid=keyids[i].value;
          var xhr = new XMLHttpRequest();
          xhr.open(method, url+keyid, true);
          xhr.onload = function(){
             element.form.submit();
          }
          xhr.send(null);
       }
    }
  }else if(method==="PUT"){
    var id = document.getElementsByName("id")[0].value;
    var data = {};
    data.name = document.getElementsByName("name")[0].value;
    data.pro  = document.getElementsByName("pro")[0].value;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
       element.form.submit();
    }
    xhr.send(json);
    alert(id + " " + data.name + " " + data.pro);
  }
}
