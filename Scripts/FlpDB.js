var flpdb ={
    "Alr19Aya2UQ" :{
        "name" : "MAKE POP/ROCK TRACK IN 12 MINUTES [FL STUDIO]",
        "flp" : "http://contoso.com"
    },
    "o5tovCGo8DM" : {
        "name" : "Producing An EDM Drop (Start To Finish)",
        "flp" : "http://google.com"
    }
}

var yt=0;
var ins=0;
var fb=0;

$(document).ready(function(){ 
    param=location.href.split("?")
    if(param.length==2){                  
        x = param[1].split("id=")[1]
        if(flpdb[x]===undefined){
            $('#content-container').html('<div class="col-md-4"></div><div class="col-md-4"style="text-align: center;"><b>FLP NOT RELEASED YET, WRITE TO osheen.mix@gmail.com</b></div><div class="col-md-4"></div>')
            $("#loader").hide(); 
        }
        else{
            $("#loader").hide();  
            $("#urlyt").attr("src", "https://i.ytimg.com/vi/"+x+"/maxresdefault.jpg");
            $("#textyt").text(flpdb[x]["name"]);
        }
    }
    else{
        $('#content-container').hide()
    }        
});

$("#youtubeButton").click(function(){
    if(yt==0){
        var win = window.open('https://youtube.com/osheen', '_blank');
        win.focus();
        yt=1
        $("#youtubeText").addClass("strike");
        enable()
    }        
})

$("#facebookButton").click(function(){
    if(fb==0){
        var win = window.open('https://www.facebook.com/osheenmusic/', '_blank');
        win.focus();
        fb=1
        $("#facebookText").addClass("strike");
        enable()
    }    
})

$("#instagramButton").click(function(){
    if(ins==0){
        var win = window.open('https://www.instagram.com/osheenkhare/', '_blank');
        win.focus();
        ins=1
        $("#instagramText").addClass("strike");
        enable()
    }    
})

function enable(){
    if(ins+yt+fb==3){
        $("#downloadText").text("DOWNLOAD FLP")
        $("#downloadButton").css("background","#000000")
        $("#append1").append('<h6><b>Since all these projects are free downloads, consider supporting me on PAYPAL (optional). Please check the FLP usage guidelines as well. </b></h6>')
        $("#append2").append('<a href="https://paypal.me/osheenyt"><div style="cursor: pointer;  padding: 10px; background: #0070ba;" class="text"><b>PAYPAL</b></div></a><a href="/usage"><div style="cursor: pointer;  background: #4d576b; padding: 10px;" class="text"><b>USAGE</b></div></a>')
    }    
}

$("#downloadButton").click(function(){
    if(ins+yt+fb==3){
        var win = window.open(flpdb[x]["flp"], '_blank');
        win.focus();                
    }
    else{
        alert("SOCIAL LINKS FOLLOW PENDING")
    }
})

