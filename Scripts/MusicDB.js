var musicdb=[

    { //0
        "name" : "OSHEEN - COLOURS",
        "spotify" : "https://open.spotify.com/album/1Gkcl51qySRHpXePi2pdux",
        "google" : "https://play.google.com/store/music/album/Osheen_Colours?id=Bifvarln7wgamcp2zlyjejusj6m",
        "youtube" : "https://www.youtube.com/watch?v=GdOPpVjqbHI",
        "deezer" : "https://www.deezer.com/album/60972262",
        "apple" : "https://itunes.apple.com/us/album/colours-single/1370438142?uo=4&app=music&at=1001lry3&ct=dashboard",
        "amazon" : "http://www.amazon.com/gp/product/B07CFKW283/?tag=distrokid06-20"        
    },

    { //1
        "name" : "OSHEEN - BLISS",
        "spotify" : "https://open.spotify.com/album/3X5NLbPEgiJ92q61e1sK0w",
        "google" : "https://play.google.com/store/music/album/Osheen_Bliss?id=Btw7ztcwmx6ppx7jdiketz42lru",
        "youtube" : "https://www.youtube.com/watch?v=8Gq58k2ESNQ",
        "deezer" : "https://www.deezer.com/album/60981712",
        "apple" : "https://itunes.apple.com/us/album/bliss-single/1370502692?uo=4&app=music&at=1001lry3&ct=dashboardx",
        "amazon" : "http://www.amazon.com/gp/product/B07C3CT79V/?tag=distrokid06-20"        
    },

    { //2
        "name" : "OSHEEN - AMBER",
        "spotify" : "https://open.spotify.com/album/7HpelUNOVSn24l1IMJFT7K",
        "google" : "https://play.google.com/store/music/album/Osheen_Amber?id=Bot4hyf2xh4uvq6ax5ujqsze7by",
        "youtube" : "https://www.youtube.com/watch?v=8x3fjZzwIwI",
        "deezer" : "https://www.deezer.com/album/60976132",
        "apple" : "https://itunes.apple.com/us/album/amber-single/1370470779?uo=4&app=music&at=1001lry3&ct=dashboard",
        "amazon" : "http://www.amazon.com/gp/product/B07C33NCN7/?tag=distrokid06-20"        
    },

    { //3
        "name" : "OSHEEN - EYE ON YOU",
        "spotify" : "https://open.spotify.com/album/3owJJ9zUdL71DvdWfWTChC",
        "google" : "https://play.google.com/store/music/album/Osheen_Eye_on_You_feat_Nina_Sung?id=Baoivdptrbvq7pu3zdp667i3zpq",
        "youtube" : "https://www.youtube.com/watch?v=zcG8_U789B4",
        "deezer" : "https://www.deezer.com/album/65750152",
        "apple" : "https://itunes.apple.com/us/album/eye-on-you-feat-nina-sung-single/1398594532?uo=4&app=itunes&at=1001lry3&ct=dashboard",
        "amazon" : "https://open.spotify.com/album/3owJJ9zUdL71DvdWfWTChC"        
    },

    { //4
        "name" : "OSHEEN - EYE ON YOU",
        "spotify" : "https://open.spotify.com/album/3owJJ9zUdL71DvdWfWTChC",
        "google" : "https://play.google.com/store/music/album/Osheen_Eye_on_You_feat_Nina_Sung?id=Baoivdptrbvq7pu3zdp667i3zpq",
        "youtube" : "https://www.youtube.com/watch?v=zcG8_U789B4",
        "deezer" : "https://www.deezer.com/album/65750152",
        "apple" : "https://itunes.apple.com/us/album/eye-on-you-feat-nina-sung-single/1398594532?uo=4&app=itunes&at=1001lry3&ct=dashboard",
        "amazon" : "https://open.spotify.com/album/3owJJ9zUdL71DvdWfWTChC"        
    }

    
];



$(document).ready(function(){           
    param=location.href.split("?")
    if(param.length==2){
        AddSingle(param[1].split("id=")[1])
    }
    else{
        AddVideoCards(); 
    }
    $("#loader").hide();  
});

function AddVideoCards(name,spotify,google,youtube,deezer,apple,amazon){

    for (var i in musicdb)
    {
        name = musicdb[i]["name"]
        spotify = musicdb[i]["spotify"]
        google = musicdb[i]["google"]
        youtube = musicdb[i]["youtube"]
        deezer = musicdb[i]["deezer"]
        apple = musicdb[i]["apple"]
        amazon = musicdb[i]["amazon"]            

        var divElement = `
        <div class="col-sm-6">
            <div class="row card" style="padding: 20px;">
            <div class="col-md-12" style="display: flex;justify-content: center; padding: 10px;">
                <b style="font-size: 150%">`+name+`</b>
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+amazon+`"><img style="width: 25vmin;" src="Src/amazon-music.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+apple+`"><img style="width: 25vmin;" src="Src/apple-music.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+deezer+`"><img style="width: 25vmin;" src="Src/deezer.svg"/></a>            
            </div>          
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 15px;">
                <a href="`+youtube+`"><img style="width: 25vmin;" src="Src/youtube.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 15px;">
                <a href="`+google+`"><img style="width: 25vmin;" src="Src/googleplay.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 14px;">
                <a href="`+spotify+`"><img style="width: 25vmin;" src="Src/spotify.svg"/></a>            
            </div>          
            </div>
        </div>`;

        $('#content-container').append(divElement)
    }
}

function AddSingle(i){
    name = musicdb[i]["name"]
    spotify = musicdb[i]["spotify"]
    google = musicdb[i]["google"]
    youtube = musicdb[i]["youtube"]
    deezer = musicdb[i]["deezer"]
    apple = musicdb[i]["apple"]
    amazon = musicdb[i]["amazon"]
    
    var divElement = `<div class="col-lg-2"></div>`
    divElement += `
        <div class="col-lg-8">
            <div class="row card" style="padding: 20px;">
            <div class="col-md-12" style="display: flex;justify-content: center; padding: 10px;">
                <b style="font-size: 150%">`+name+`</b>
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+amazon+`"><img style="width: 25vmin;" src="Src/amazon-music.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+apple+`"><img style="width: 25vmin;" src="Src/apple-music.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 5px;">
                <a href="`+deezer+`"><img style="width: 25vmin;" src="Src/deezer.svg"/></a>            
            </div>          
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 15px;">
                <a href="`+youtube+`"><img style="width: 25vmin;" src="Src/youtube.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 15px;">
                <a href="`+google+`"><img style="width: 25vmin;" src="Src/googleplay.svg"/></a>            
            </div>
            <div class="col-md-6" style="display: flex;justify-content: center; padding: 14px;">
                <a href="`+spotify+`"><img style="width: 25vmin;" src="Src/spotify.svg"/></a>            
            </div>          
            </div>
        </div>`;
    divElement += `<div class="col-lg-2"></div>`
    $('#content-container').append(divElement)
}
