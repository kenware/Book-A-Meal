

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


 //dashboard js
 $("#nav2").hide();
 $(".bar1").click(function(){
  $("#nav2").show();
  $("#nav1").hide();
  
  $("#main").removeClass("main-sidebar1");
  $("#main").addClass("main-sidebar2");
 })

 $(".bar2").click(function(){
  $("#nav2").hide();
  $("#nav1").show();
  $("#main").removeClass("main-sidebar2");
  $("#main").addClass("main-sidebar1");
 })

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
