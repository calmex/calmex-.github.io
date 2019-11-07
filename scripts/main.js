var activeFilter = 'all';

$('.pp-filter-button').on('click', function(e) {
  // remove btn-primary from all buttons first
  $('.pp-filter-button').removeClass('btn-primary');
  $('.pp-filter-button').addClass('btn-outline-primary');

  // add btn-primary to active button
  var button = $(this);
  button.removeClass('btn-outline-primary');
  button.addClass('btn-primary');
  filterItems(button.data("filter"));
  e.preventDefault();
})

function filterItems(filter) {
  if(filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $('.pp-gallery .card').each(function () {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if(filter === 'all') {
      show = true;
    }
    else {
      for(var i = 0; i < groups.length; i ++) {
        if(groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);

    setTimeout(function() {
      if(show && !card.is(":visible")) {
          card.fadeIn(400)
        }
      }, 500);
  });
}

           $(document).ready(function () {
                var imgsObj = $('.amplifyImg img');//需要放大的图像
                if(imgsObj){
                    $.each(imgsObj,function(){
                        $(this).click(function(){
                            var currImg = $(this);
                            coverLayer(1);
                            var tempContainer = $('<div class=tempContainer></div>');//图片容器
                            with(tempContainer){//width方法等同于$(this)
                                appendTo("body");
                                var windowWidth=$(window).width();
                                var windowHeight=$(window).height();
                                //获取图片原始宽度、高度
                                var orignImg = new Image();
                                orignImg.src =currImg.attr("src") ;
                                var currImgWidth= orignImg.width;
                                var currImgHeight = orignImg.height;
                                if(currImgWidth<windowWidth){//为了让图片不失真，当图片宽度较小的时候，保留原图
                                    if(currImgHeight<windowHeight){
                                        var topHeight=(windowHeight-currImgHeight)/2;
                                        if(topHeight>35){/*此处为了使图片高度上居中显示在整个手机屏幕中：因为在android,ios的微信中会有一个title导航，35为title导航的高度*/
                                            topHeight=topHeight-35;
                                            css('top',topHeight);
                                        }else{
                                            css('top',0);
                                        }
                                        html('<img border=0 src=' + currImg.attr('src') + '>');
                                    }else{
                                        css('top',0);
                                        html('<img border=0 src=' + currImg.attr('src') + ' height='+windowHeight+'>');
                                    }
                                }else{
                                    var currImgChangeHeight=(currImgHeight*windowWidth)/currImgWidth;
                                    if(currImgChangeHeight<windowHeight){
                                        var topHeight=(windowHeight-currImgChangeHeight)/2;
                                        if(topHeight>35){
                                            topHeight=topHeight-35;
                                            css('top',topHeight);
                                        }else{
                                            css('top',0);
                                        }
                                        html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+';>');
                                    }else{
                                        css('top',0);
                                        html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+'; height='+windowHeight+'>');
                                    }
                                }
                            }
                            tempContainer.click(function(){
                                $(this).remove();
                                coverLayer(0);
                            });
                        });
                    });
                }
                else{
                    return false;
                }
                //使用禁用蒙层效果
                function coverLayer(tag){
                    with($('.over')){
                        if(tag==1){
                            css('height',$(document).height());
                            css('display','block');
                            css('opacity',1);
                            css("background-color","#FFFFFF");
                            css("background-color","rgba(0,0,0,0.7)" );  //蒙层透明度
                        }
                        else{
                            css('display','none');
                        }
                    }
                }
            });
