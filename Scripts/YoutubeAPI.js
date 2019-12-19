
const baseAPI='https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=UUwafG7DfOibd4Ou5926puFQ&key=AIzaSyC4Bx68UyfZJ7YymFw-hQkwJPy4z8_6J68';

var pageToken="0";
var scrolltokenarray=[]

$(document).ready(function(){   
    YoutubeAPI();    
});

$(window).scroll(function() {  
  if($(window).scrollTop() + $(window).height() >= $(document).height()-250){     
      if(!scrolltokenarray.includes(pageToken) && pageToken!=undefined) {
        //alert(pageToken)
        YoutubeAPI()
        scrolltokenarray.push(pageToken)
      }      
      // $(document).height()x
  }
});

function YoutubeAPI(){
  var requestAPI=baseAPI
  if((pageToken!=undefined && pageToken!="0"))
    requestAPI=baseAPI+"&pageToken="+pageToken   
  $.get( requestAPI, function( data ) {        
    pageToken=data['nextPageToken']
    for (var i in data['items'])
    {      
      try
      {
        var videoTitle= data['items'][i]['snippet']['title'];
        var videoID=data['items'][i]['snippet']['resourceId']['videoId']
        var videoThumbnail=data['items'][i]['snippet']['thumbnails']['maxres']['url']
        AddVideoToParent(videoTitle,videoID,videoThumbnail)      
        if(pageToken==undefined)
        {          
          $("#loader").hide();
        }                  
      }catch(e){}      
    }
  });
}


function AddVideoToParent(videoTitle, videoID, videoThumbnail){ 
  var divElement=`
  <div class="col-sm-4">        
  <div class="col-xs-12 card">
      <div class="embed-responsive embed-responsive-16by9" onclick="location.href='https://www.youtube.com/watch?v=`+videoID+`'">
        <img class="embed-responsive-item" src="`+videoThumbnail+`" frameborder="0" allowfullscreen style="padding-top: 10px; cursor: pointer;"></img>
      </div>
      <div style="margin-top: 10px; height:50px;">
        <h5><b>`+videoTitle+`</b></h5>
      </div>             
      <div onclick="location.href='https://www.youtube.com/watch?v=`+videoID+`'" class="navbar-pillet mybutton" style="text-align: center; padding: 10px; margin-bottom: 10px;cursor: pointer;">
          <b style="color: #FFFFFF;">DOWNLOAD FLP</b>
      </div>
  </div>                
</div>`
$('#content-container').append(divElement)
  //console.log("Adding "+videoTitle+" "+videoID)
}
