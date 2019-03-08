/*
Author: Jiafeng Zhou
Date: Mar 05, 2019
Email: zhoujiafeng1044@gmail.com
*/
loadContent(0,0);




function getCurrentContent(){
  listItems = document.querySelectorAll('.menu ul li');
  for (let i = 0; i < listItems.length; i++) {
    /*alert (listItems[i].textContent);*/
    if ($(listItems[i]).hasClass('clicked')){
      flag = 1;
      return i;
    }
  }

}



function getCurrentPage(){
  paginationItems = document.querySelectorAll('.pagination li a');

  for (let i = 0; i < paginationItems.length; i++) {
    /*alert (listItems[i].textContent);*/
    if ($(paginationItems[i]).hasClass('active')){
      flag = 1;
      return i;
    }
  }

}


/*------------load content------------*/
function loadContent(param,page){


  var currentContent = getCurrentContent();
  var currentPage = getCurrentPage();



  /*-----avoid duplicate loading*/
  var countPerPage = 20;
  if (param === 0 && (currentContent != param || currentPage != (page+1) || page === 0) ){/*latest*/
  /*if (param == 0 & $('#category1').children().length == 0){*/
    var contentLists = document.getElementById("category1");

    $(contentLists).empty();

    for (let i = 0; i < countPerPage; i++){


    /*--------------------  use proxy to read JSON ----------------------*/
    

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = "https://ign-apis.herokuapp.com/content?startIndex="+(page*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      var msg = JSON.parse(contents);


      var entry = document.createElement('div');
      entry.className = 'entry';
      contentLists.appendChild(entry);

      var imagediv = document.createElement('div');
      imagediv.className = 'imagediv';
      entry.appendChild(imagediv);



      if (msg.data[i].contentType === 'video'){
        var duration = 0;
        if (msg.data[i].metadata.duration < 60){
          duration = "0:"+msg.data[i].metadata.duration;
        }
        else{
          if (msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60)<10){
            duration = Math.floor(msg.data[i].metadata.duration/60)+":0"
              +(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
          }
          else{
            duration = Math.floor(msg.data[i].metadata.duration/60)+":"+(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
          }
        }       
        
        var timeLength = document.createElement('p');
        timeLength.className = 'timeLength';
        timeLength.innerHTML = "<i class='fas fa-play-circle'></i>&nbsp&nbsp"+duration;
        imagediv.appendChild(timeLength);
      }


      var hyperlink = document.createElement('a');
      hyperlink.setAttribute('href','javascript:void(0)');
      imagediv.appendChild(hyperlink);

      
      var image = document.createElement('img');
      image.src = msg.data[i].thumbnails[0].url;
      image.setAttribute('srcset',msg.data[i].thumbnails[0].url+" "
        +msg.data[i].thumbnails[0].width*4+"w, "
        +msg.data[i].thumbnails[1].url+" "
        +msg.data[i].thumbnails[1].width*4+"w, "
        +msg.data[i].thumbnails[2].url+" "
        +msg.data[i].thumbnails[2].width*4+"w");
      /*
      image.height = msg.data[i].thumbnails[0].height;
      image.width = msg.data[i].thumbnails[0].width;*/
      /*
      image.setAttribute('max-width',msg.data[i].thumbnails[0].width);
      image.setAttribute('max-height',msg.data[i].thumbnails[0].height);
      */
      /*image.width = '100%';*/
      /*image.height = 'auto';*/
      hyperlink.appendChild(image);
 

      var description = document.createElement('div');
      description.className = 'description';
      entry.appendChild(description);


/*-------calculate time-----------*/
      var dateInfo = Date.parse(msg.data[i].metadata.publishDate);
      dateInfo = Math.abs(new Date()-dateInfo);

      if (dateInfo/1000 < 60){
        dateInfo = Math.floor(dateInfo/1000) + "s";
      }
      else{
        if (dateInfo/(1000*60) < 60){
          dateInfo = Math.floor(dateInfo/(1000*60)) + "m";
        }
        else{
          if (dateInfo/(1000*60*60) < 24) {
            dateInfo = Math.floor(dateInfo/(1000*60*60)) + "h";
          }
          else{
            if (dateInfo/(1000*60*60*24) < 365){
              dateInfo = Math.floor(dateInfo/(1000*60*60*24)) + "d";
            }
            else{
              dateInfo = Math.floor(dateInfo/(1000*60*60*24*365)) + "y";
            }
          }
        }
      }

/*-------------------------------*/
      
      

      var id =  msg.data[i].contentId;

      var url = "https://ign-apis.herokuapp.com/comments?ids="+id; // site that doesn’t send Access-Control-*

      fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then(response => response.text())
      .then(contents => {
        var commentMsg = JSON.parse(contents);




        var hyperlink = document.createElement('a');
        hyperlink.setAttribute('href','javascript:void(0)');
        description.appendChild(hyperlink);



        if (commentMsg.content[0].count == 0){
          var datecomment = document.createElement('p');
          datecomment.className = 'datecomment';
          datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" ;
          hyperlink.appendChild(datecomment);
        }
        else{
          var datecomment = document.createElement('p');
          datecomment.className = 'datecomment';
          datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" 
            + commentMsg.content[0].count;
          hyperlink.appendChild(datecomment);
        }

          var url = "https://ign-apis.herokuapp.com/content?startIndex="+(page*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

          fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
          .then(response => response.text())
          .then(contents => {
            var msg = JSON.parse(contents);




            var hyperlink = document.createElement('a');
            hyperlink.setAttribute('href','javascript:void(0)');
            description.appendChild(hyperlink);

            var headline = document.createElement('p');
            headline.className = 'headline';
            if (msg.data[i].contentType === 'video'){
              headline.innerHTML = msg.data[i].metadata.title;

/*
              var duration = 0;
              if (msg.data[i].metadata.duration < 60){
                duration = "0:"+msg.data[i].metadata.duration;
              }
              else{
                  if (msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60)<10){
                    duration = Math.floor(msg.data[i].metadata.duration/60)+":0"
                      +(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
                  }
                  else{
                    duration = Math.floor(msg.data[i].metadata.duration/60)+":"+(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
                  }
                
              }
              var timeLength = document.createElement('p');
              timeLength.className = 'timeLength';
              timeLength.innerHTML = "<i class='fas fa-play-circle'></i>&nbsp&nbsp"+duration;
              imagediv.appendChild(timeLength);
              */



            }
            else{
              headline.innerHTML = msg.data[i].metadata.headline;
            }
            hyperlink.appendChild(headline);
          })

      
      })


        
    })


  }





    
  }
  else{/*videos*/
    if (param == 1 && (currentContent != param || currentPage != (page+1) || page === 0) ){


      var startIndex = 0;
      var recordedEntry = 0;


      var contentLists = document.getElementById("category2");

      $(contentLists).empty();




      for (let startIndex = 0; startIndex < 15; startIndex++){
        



        for (let i = 0; i < countPerPage; i++){



    /*--------------------  use proxy to read JSON ----------------------*/
    

          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          var url = "https://ign-apis.herokuapp.com/content?startIndex="+(startIndex*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

          fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
          .then(response => response.text())
          .then(contents => {
            /*
            alert(startIndex);
            */
            var msg = JSON.parse(contents);

          
            

            if (recordedEntry >= (page+1)*countPerPage){
              return;
            }



            if (msg.data[i].contentType === 'video'){

              recordedEntry += 1;
              


              if (recordedEntry >= page*countPerPage){


              var entry = document.createElement('div');
              entry.className = 'entry';
              contentLists.appendChild(entry);

              var imagediv = document.createElement('div');
              imagediv.className = 'imagediv';
              entry.appendChild(imagediv);




              var duration = 0;
              if (msg.data[i].metadata.duration < 60){
                duration = "0:"+msg.data[i].metadata.duration;
              }
              else{
                if (msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60)<10){
                  duration = Math.floor(msg.data[i].metadata.duration/60)+":0"
                    +(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
                }
                else{
                  duration = Math.floor(msg.data[i].metadata.duration/60)+":"+(msg.data[i].metadata.duration-60*Math.floor(msg.data[i].metadata.duration/60));
                }
              }       
        
              var timeLength = document.createElement('p');
              timeLength.className = 'timeLength';
              timeLength.innerHTML = "<i class='fas fa-play-circle'></i>&nbsp&nbsp"+duration;
              imagediv.appendChild(timeLength);
      


              var hyperlink = document.createElement('a');
              hyperlink.setAttribute('href','javascript:void(0)');
              imagediv.appendChild(hyperlink);

      
              var image = document.createElement('img');
              image.src = msg.data[i].thumbnails[0].url;
              image.setAttribute('srcset',msg.data[i].thumbnails[0].url+" "
                +msg.data[i].thumbnails[0].width*4+"w, "
                +msg.data[i].thumbnails[1].url+" "
                +msg.data[i].thumbnails[1].width*4+"w, "
                +msg.data[i].thumbnails[2].url+" "
                +msg.data[i].thumbnails[2].width*4+"w");
    
              hyperlink.appendChild(image);
 

              var description = document.createElement('div');
              description.className = 'description';
              entry.appendChild(description);


/*-------calculate time-----------*/
              var dateInfo = Date.parse(msg.data[i].metadata.publishDate);
              dateInfo = Math.abs(new Date()-dateInfo);

              if (dateInfo/1000 < 60){
                dateInfo = Math.floor(dateInfo/1000) + "s";
              }
              else{
                if (dateInfo/(1000*60) < 60){
                  dateInfo = Math.floor(dateInfo/(1000*60)) + "m";
                }
                else{
                  if (dateInfo/(1000*60*60) < 24) {
                    dateInfo = Math.floor(dateInfo/(1000*60*60)) + "h";
                  }
                  else{
                    if (dateInfo/(1000*60*60*24) < 365){
                      dateInfo = Math.floor(dateInfo/(1000*60*60*24)) + "d";
                    }
                    else{
                      dateInfo = Math.floor(dateInfo/(1000*60*60*24*365)) + "y";
                    }
                  }
                }
              }

/*-------------------------------*/
      
      

              var id =  msg.data[i].contentId;

              var url = "https://ign-apis.herokuapp.com/comments?ids="+id; // site that doesn’t send Access-Control-*

              fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
              .then(response => response.text())
              .then(contents => {
                var commentMsg = JSON.parse(contents);




                var hyperlink = document.createElement('a');
                hyperlink.setAttribute('href','javascript:void(0)');
                description.appendChild(hyperlink);



                if (commentMsg.content[0].count == 0){
                  var datecomment = document.createElement('p');
                  datecomment.className = 'datecomment';
                  datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" ;
                  hyperlink.appendChild(datecomment);
                }
                else{
                  var datecomment = document.createElement('p');
                  datecomment.className = 'datecomment';
                  datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" 
                    + commentMsg.content[0].count;
                  hyperlink.appendChild(datecomment);
                }

                var url = "https://ign-apis.herokuapp.com/content?startIndex="+(startIndex*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

                fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                .then(response => response.text())
                .then(contents => {
                  var msg = JSON.parse(contents);




                  var hyperlink = document.createElement('a');
                  hyperlink.setAttribute('href','javascript:void(0)');
                  description.appendChild(hyperlink);

                  var headline = document.createElement('p');
                  headline.className = 'headline';

                  headline.innerHTML = msg.data[i].metadata.title;
                  /*if (msg.data[i].contentType === 'video'){
                    headline.innerHTML = msg.data[i].metadata.title;
                  }
                  else{
                    headline.innerHTML = msg.data[i].metadata.headline;
                  }*/

                  hyperlink.appendChild(headline);
                })

      
              })


            }/*if recorded > page*countPerPage*/
            }/*if (is(video))*/
          })

        }/*for*/
        
      }/*for startIndex*/


    }/*if param = 1*/






    else{/*----param = 2---*//*articles*/








          if (param == 2 && (currentContent != param || currentPage != (page+1) || page === 0) ){


      var startIndex = 0;
      var recordedEntry = 0;


      var contentLists = document.getElementById("category3");

      $(contentLists).empty();




      for (let startIndex = 0; startIndex < 15;startIndex++){
        



        for (let i = 0; i < countPerPage; i++){



    /*--------------------  use proxy to read JSON ----------------------*/
    

          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          var url = "https://ign-apis.herokuapp.com/content?startIndex="+(startIndex*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

          fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
          .then(response => response.text())
          .then(contents => {
            var msg = JSON.parse(contents);

          
            

            if (recordedEntry >= (page+1)*countPerPage){
              return;
            }



            if (msg.data[i].contentType === 'article'){

              recordedEntry += 1;
              


              if (recordedEntry >= page*countPerPage){


              var entry = document.createElement('div');
              entry.className = 'entry';
              contentLists.appendChild(entry);

              var imagediv = document.createElement('div');
              imagediv.className = 'imagediv';
              entry.appendChild(imagediv);




              
      


              var hyperlink = document.createElement('a');
              hyperlink.setAttribute('href','javascript:void(0)');
              imagediv.appendChild(hyperlink);

      
              var image = document.createElement('img');
              image.src = msg.data[i].thumbnails[0].url;

      
              image.setAttribute('srcset',msg.data[i].thumbnails[0].url+" "
                +msg.data[i].thumbnails[0].width*4+"w, "
                +msg.data[i].thumbnails[1].url+" "
                +msg.data[i].thumbnails[1].width*4+"w, "
                +msg.data[i].thumbnails[2].url+" "
                +msg.data[i].thumbnails[2].width*4+"w");
    
              hyperlink.appendChild(image);
 

              var description = document.createElement('div');
              description.className = 'description';
              entry.appendChild(description);


/*-------calculate time-----------*/
              var dateInfo = Date.parse(msg.data[i].metadata.publishDate);
              dateInfo = Math.abs(new Date()-dateInfo);

              if (dateInfo/1000 < 60){
                dateInfo = Math.floor(dateInfo/1000) + "s";
              }
              else{
                if (dateInfo/(1000*60) < 60){
                  dateInfo = Math.floor(dateInfo/(1000*60)) + "m";
                }
                else{
                  if (dateInfo/(1000*60*60) < 24) {
                    dateInfo = Math.floor(dateInfo/(1000*60*60)) + "h";
                  }
                  else{
                    if (dateInfo/(1000*60*60*24) < 365){
                      dateInfo = Math.floor(dateInfo/(1000*60*60*24)) + "d";
                    }
                    else{
                      dateInfo = Math.floor(dateInfo/(1000*60*60*24*365)) + "y";
                    }
                  }
                }
              }

/*-------------------------------*/
      
      

              var id =  msg.data[i].contentId;

              var url = "https://ign-apis.herokuapp.com/comments?ids="+id; // site that doesn’t send Access-Control-*

              fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
              .then(response => response.text())
              .then(contents => {
                var commentMsg = JSON.parse(contents);




                var hyperlink = document.createElement('a');
                hyperlink.setAttribute('href','javascript:void(0)');
                description.appendChild(hyperlink);



                if (commentMsg.content[0].count == 0){
                  var datecomment = document.createElement('p');
                  datecomment.className = 'datecomment';
                  datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" ;
                  hyperlink.appendChild(datecomment);
                }
                else{
                  var datecomment = document.createElement('p');
                  datecomment.className = 'datecomment';
                  datecomment.innerHTML = dateInfo + "&nbsp &#183 &nbsp <i class='far fa-comment'></i>&nbsp" 
                    + commentMsg.content[0].count;
                  hyperlink.appendChild(datecomment);
                }

                var url = "https://ign-apis.herokuapp.com/content?startIndex="+(startIndex*countPerPage)+"&count="+countPerPage; // site that doesn’t send Access-Control-*

                fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
                .then(response => response.text())
                .then(contents => {
                  var msg = JSON.parse(contents);




                  var hyperlink = document.createElement('a');
                  hyperlink.setAttribute('href','javascript:void(0)');
                  description.appendChild(hyperlink);

                  var headline = document.createElement('p');
                  headline.className = 'headline';
/*
                  if (msg.data[i].contentType === 'video'){
                    headline.innerHTML = msg.data[i].metadata.title;
                  }
                  else{
                    headline.innerHTML = msg.data[i].metadata.headline;
                  }*/
                  headline.innerHTML = msg.data[i].metadata.headline;
                  
                  hyperlink.appendChild(headline);
                })

      
              })


            }/*if recorded > page*countPerPage*/
            }/*if (is(article))*/
          })

        }/*for*/
        
      }/*for startIndex*/





    }
  }

  
}

}






/*------------------change content when certain menu list item is clicked------*/
function changeContent(param){

  paginationItems = document.querySelectorAll('.pagination li a');;

  if (param === 0){
    document.getElementById("category1").style.display = "inline-block";
    document.getElementById("category2").style.display = "none";
    document.getElementById("category3").style.display = "none";
    loadContent(0,0);

    for (let i = 0; i < paginationItems.length; i++) {
   
        if (i === 1){
          paginationItems[i].classList.add("active");
        }
        else {
          paginationItems[i].classList.remove("active");
        }
    }

    
  }
  else{
    if (param === 1){
      document.getElementById("category1").style.display = "none";
      document.getElementById("category2").style.display = "inline-block";
      document.getElementById("category3").style.display = "none";
      loadContent(1,0);


      for (let i = 0; i < paginationItems.length; i++) {
   
        if (i === 1){
          paginationItems[i].classList.add("active");
        }
        else {
          paginationItems[i].classList.remove("active");
        }
      }



      
    }
    else{
      document.getElementById("category1").style.display = "none";
      document.getElementById("category2").style.display = "none";
      document.getElementById("category3").style.display = "inline-block";
      loadContent(2,0);


      for (let i = 0; i < paginationItems.length; i++) {
   
        if (i === 1){
          paginationItems[i].classList.add("active");
        }
        else {
          paginationItems[i].classList.remove("active");
        }
      }



      
    }
  }
}





/*------------------- check whether menu list item is clicked --------*/
function clickedChange(param){
  listItems = document.querySelectorAll('.menu ul li');
  for (let i = 0; i < listItems.length; i++) {
    /*alert (listItems[i].textContent);*/
    if (i === param){
      listItems[i].classList.add("clicked");
      listItems[i].classList.remove("listItem");
      changeContent(param);
    }
    else {
      listItems[i].classList.remove("clicked");
      listItems[i].classList.add("listItem");
    }
  }
}





/*---------------------------pagination--------------------*/
function pagination(page){
  paginationItems = document.querySelectorAll('.pagination li a');

  var currentContent = getCurrentContent();


  if (page === -1){
    var currentPage = getCurrentPage();
    if (currentPage === 1){

    }
    else{
      loadContent(currentContent,(currentPage-2));
      paginationItems[currentPage].classList.remove("active");
      paginationItems[currentPage-1].classList.add("active");
      
    }
    return;
  }
  else{
    if (page === -2){
      var currentPage = getCurrentPage();
      if (currentPage === 15){

      }
      else{
        loadContent(currentContent,currentPage);
        paginationItems[currentPage].classList.remove("active");
        paginationItems[currentPage+1].classList.add("active");
        
      }
      return;
    }
    else{

      for (let i = 0; i < paginationItems.length; i++) {
   
        if (i === page){
          loadContent(currentContent,(page-1));
          paginationItems[i].classList.add("active");
          
        }
        else {
          paginationItems[i].classList.remove("active");
        }
      }
    }
  }

}