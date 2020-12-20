var data;
var reference = document.querySelector("#references");
var endpoint = document.querySelector("#endpoints");
var defParam = '<div class="input-group-prepend"><span class="input-group-text param" id="inputGroup-sizing-default">Default</span></div><input type="text" class="form-control input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled>'
var query = document.getElementById("query");
var path = document.getElementById("path");
var url = document.getElementById("url");
var header = document.getElementById("header");

function createList(){
    for (var key of Object.keys(data)) {
        var listItem = document.createElement("OPTION");
        listItem.innerText = key;
        listItem.value = key;
        listItem.classList.add("listItem");
  
         reference.appendChild(listItem);
    }
}


    fetch("https://api.jsonbin.io/b/5fddee7921e08a5a59893c03/1", {
        "method": "GET"
        
    })
    .then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        this.data = data;
        console.log(this.data)
        createList();
    })
    .catch(function (error) {
        console.log(error.message);
    });

reference.addEventListener("change",function(){
    if(reference.value!="Choose..."){
       var arr = data[reference.value].endpoints.endpoint;
       console.log(arr);

       for(var i=0;i<arr.length;i++){
            var listItem = document.createElement("OPTION");
      listItem.innerText = arr[i];
      listItem.value = arr[i];
      document.querySelector("#baseUrl").placeholder =  data[reference.value].info.baseUrl
      document.querySelector(".ref-description").innerHTML = data[reference.value].info.description 
      listItem.classList.add("listItem");
      
      endpoint.appendChild(listItem);
        }
    }

})

endpoint.addEventListener("change",function(){
    var end = data[reference.value].endpoints[endpoint.value]
    if(endpoint.value!="Choose..."){
        document.querySelector("#oauth").placeholder =  end.Oauth;
        document.querySelector(".end-description").innerHTML = end.description
        createReqParams();
        createCode();
     }
})

function createReqParams(){
    var end = data[reference.value].endpoints[endpoint.value].requestParams;
    createQueryParams(end);
    createHeaderParams(end);
    createPathParams(end);
}

function createQueryParams(end){
    var container = document.querySelector(".query-param")

    if(end.query){
        var type = "query";
        createParamValue(end.query,type);
    }
    else{
        container.innerHTML = '<h4 class="notFound">No query parameters</h4>'
    }
}


function createHeaderParams(end){
    var container = document.querySelector(".header-param")

    if(end.header){
        var type = "header";
        createParamValue(end.header,type);
    }
    else{
        container.innerHTML = '<h4 class="notFound">No Header parameters</h4>' 
    }
}

function createPathParams(end){
    var container = document.querySelector(".path-param")
    if(end.path){
        var type = "path";
        createParamValue(end.path,type);
    }
    else{
    container.innerHTML = '<h4 class="notFound">No path parameters</h4>'
    }
}

function createParamValue(paramData,type){
    var container = document.querySelector("."+type+"-param")
    container.innerHTML =""
    for (var key of Object.keys(paramData)) {
        var paramItem = document.createElement("DIV");
        paramItem.innerHTML = defParam;
        paramItem.classList.add(key);
        paramItem.classList.add(type);
        paramItem.classList.add("paramContainer");
        var paramdes = document.createElement("P");
        paramdes.classList.add(key);
        paramdes.classList.add(type);
        paramdes.classList.add("paramDes")
        container.appendChild(paramItem);
        container.appendChild(paramdes);
        document.querySelector("."+key+"."+type+ " .param").innerHTML = key
        document.querySelector("."+key+"."+type +" .input").value = paramData[key].description
        
    }
}

function createCode(){
    var end = data[reference.value].endpoints[endpoint.value];
    url.innerHTML =  end.endpoint;
    createHeader(end.requestParams);
    createQuery(end.requestParams);
    createPath(end.requestParams);

}

function createHeader(params){
if(params.header){
    var temp="";
    for (var key of Object.keys(params.header)){
        temp+=(key+":"+ params.header[key].description)
    }
    header.innerHTML=temp;
}
}

function createQuery(params){
    if(params.query){
        var temp="";
        var flag=0;
        for (var key of Object.keys(params.query)){
            if(flag)
                temp+="&";

            temp+=(key+"="+"("+params.query[key].description+")")
            flag =1;
        }
        
        query.innerHTML=temp;
    }
    }
    function createPath(params){
        if(params.path){
            var temp="";
            var flag=0;
            for (var key of Object.keys(params.path)){
                if(flag)
                    temp+="/";
    
                temp+=("{"+key+"}")
                flag =1;
            }
            
            path.innerHTML=temp;
        }
        }