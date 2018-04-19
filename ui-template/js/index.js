

$(window).ready(function(){

  var navpos = $("#myTopnav").offset().top;
  $(window).scroll(function(){
      //echo("here");
      var windpos = $(window).scrollTop();
      if (windpos>navpos){
      $("#myTopnav").addClass("fixed-top");
      }else{
      $("#myTopnav").removeClass("fixed-top");
      }
   })
   //dashboard modal js
   $(".modal-order").hide()
   $(".remove-modal").click(function(){
     $(".modal-order").hide();
   })
   $(".order").click(function(){
     $(".modal-order").show()
   })
  
 //dashboard js and admin js
 $(".timeline-container").hide();//dashboard timeline
 $("#nav2").hide();
 $(".bar1").click(function(){
   $("#notification").addClass("bar2");//dashboard timeline
  $("#notification").removeClass("bar1");//dashboard timeline
  
  $("#nav2").show(300000);
  $("#nav1").hide(300000);
  $(".timeline-container").show(300000);//dashboard timeline
  
  $("#main").removeClass("main-sidebar1");
  $("#main").addClass("main-sidebar2");
  
 })

 $(".bar2").click(function(){
   $("#notification").addClass("bar1");//dashboard timeline
  $("#notification").removeClass("bar2");//dashboard timeline
  
  $("#nav2").hide(300000);
  $("#nav1").show(300000);
  $("#main").removeClass("main-sidebar2");
  $("#main").addClass("main-sidebar1");
  $(".timeline-container").hide(300000);

  

 })
 

//popover javascript
 $(".p-dash").hide()
 $(".dashboard").hover(function(){
  $(".p-dash").show()
 })
 $(".dashboard").mouseleave(function(){
  $(".p-dash").hide()
 })

 $(".p-all").hide()
 $(".all-meal").hover(function(){
  $(".p-all").show()
 })
 $(".all-meal").mouseleave(function(){
  $(".p-all").hide()
 })

 $(".p-set").hide()
 $(".set-meal").hover(function(){
  $(".p-set").show()
 })
 $(".set-meal").mouseleave(function(){
  $(".p-set").hide()
 })

 $(".p-add").hide()
 $(".add-meal").hover(function(){
  $(".p-add").show()
 })
 $(".add-meal").mouseleave(function(){
  $(".p-add").hide()
 })

 $(".p-out").hide()
 $(".logout").hover(function(){
  $(".p-out").show()
 })
 $(".logout").mouseleave(function(){
  $(".p-out").hide()
 })

 $(".p-notif").hide()
 $(".notif").hover(function(){
  $(".p-notif").show()
 })
 $(".notif").mouseleave(function(){
  $(".p-notif").hide()
 })

})
function myFunction() {
   var x = document.getElementById("myTopnav");
   if (x.className === "nav fixed-top") {
     x.className += " responsive";
   } else if(x.className === "nav") {
    x.className += " responsive2";
   } else if(x.className === "nav responsive"||x.className === "nav responsive2") {
    x.className = "nav";
   }
   else{
    x.className = "nav fixed-top";
   }
}
