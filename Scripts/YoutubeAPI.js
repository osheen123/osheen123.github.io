
const baseAPI='https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=UUwafG7DfOibd4Ou5926puFQ&key=AIzaSyC4Bx68UyfZJ7YymFw-hQkwJPy4z8_6J68';

$(document).ready(function(){
    var loadershow=1;
    //$('#content-container').append('<h2>HELLO WORLD</h2>');
    $.get( baseAPI, function( data ) {        
        //console.log(data['items'])
        for (var i in data['items'])
        {
          var videoTitle= data['items'][i]['snippet']['title'];
          var videoID=data['items'][i]['snippet']['resourceId']['videoId']
          AddVideoToParent(videoTitle,videoID)
          if(loadershow==1){
            loadershow==0;
            $("#loader").hide();
          }
        }
      });
});

function AddVideoToParent(videoTitle, videoID){
  var divElement=`
  <div class="col-md-4">        
  <div class="col-xs-12 card">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/`+videoID+`?rel=0&modestbranding=0&autohide=1&showinfo=0&controls=0&autoplay=1" frameborder="0" allowfullscreen style="padding-top: 10px;"></iframe>
      </div>
      <div style="margin-top: 10px;">
        <h4><b>`+videoTitle+`</b></h4>
      </div>             
      <div onclick="location.href='https://www.youtube.com/watch?v=`+videoID+`'" class="navbar-pillet mybutton" style="text-align: center; padding: 10px; margin-bottom: 10px;">
          <b style="color: #FFFFFF">DOWNLOAD FLP</b>
      </div>
  </div>                
</div>`
$('#content-container').append(divElement)
  //console.log("Adding "+videoTitle+" "+videoID)
}
