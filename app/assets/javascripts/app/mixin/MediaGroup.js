Ext.define('App.mixin.MediaGroup', function() {
  $.createEventCapturing = (function () {
    var special = $.event.special;
    return function (names) {
      if (!document.addEventListener) {
        return;
      }
      if (typeof names == 'string') {
        names = [names];
      }
      $.each(names, function (i, name) {
        var handler = function (e) {
          e = $.event.fix(e);

          return $.event.dispatch.call(this, e);
        };
        special[name] = special[name] || {};
        if (special[name].setup || special[name].teardown) {
          return;
        }
        $.extend(special[name], {
          setup: function () {
            this.addEventListener(name, handler, true);
          },
          teardown: function () {
            this.removeEventListener(name, handler, true);
          }
        });
      });
    };
  })();

  $.createEventCapturing(['play', 'pause', 'seeked']);

  $(document).on('click', '.pip-container img.forward-layer', function(e){
    var img = e.target;

    var mediagroup = $(img).attr('xmediagroup');
    $('img[xmediagroup=' + mediagroup + ']').not(img).each(function(){
      $(this).removeClass("backward-layer").addClass("forward-layer");
    });

    $(img).addClass("backward-layer").removeClass("forward-layer");
  });

  $(document).on('click', '.pip-container video.forward-layer', function(e){
    var video = e.target;

    var mediagroup = $(video).attr('xmediagroup');
    $('video[xmediagroup=' + mediagroup + ']').not(video).each(function(){
      $(this).prop('controls', false);
      $(this).removeClass("backward-layer").addClass("forward-layer");
    });

    $(video).prop('controls', true);
    $(video).addClass("backward-layer").removeClass("forward-layer");
  });

  $(document).on('play', 'video.backward-layer', function(e) {
    var video = e.target;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
        this.currentTime = video.currentTime;
        this.play();
    });
  });

  $(document).on('pause', 'video.backward-layer', function(e) {
    var video = e.target;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
        this.pause();
        this.currentTime = video.currentTime;
    });
  });

  $(document).on('seeked', 'video.backward-layer', function(e) {
    var video = e.target;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
      this.currentTime = video.currentTime;
    });
  });

  return {
  };

}());

