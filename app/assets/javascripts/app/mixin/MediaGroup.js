Ext.define('App.mixin.MediaGroup', function() {

  $(document).on('click', '#video-link-1', function() {
    $('#video-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#video-list video').trigger('pause').hide();
    $('#video-1').show();
  });

  $(document).on('click', '#video-link-2', function() {
    $('#video-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#video-list video').trigger('pause').hide();
    $('#video-2').show();
  });

  $(document).on('click', '#video-link-3', function() {
    $('#video-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#video-list video').trigger('pause').hide();
    $('#video-3').show();
  });

  $(document).on('click', '#video-link-4', function() {
    $('#video-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#video-list video').trigger('pause').hide();
    $('#video-4').show();
  });

  $(document).on('click', '#image-link-1', function() {
    $('#image-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#image-list img').hide();
    $('#image-1').show();
  });

  $(document).on('click', '#image-link-2', function() {
    $('#image-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#image-list img').hide();
    $('#image-2').show();
  });

  $(document).on('click', '#image-link-3', function() {
    $('#image-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#image-list img').hide();
    $('#image-3').show();
  });

  $(document).on('click', '#image-link-4', function() {
    $('#image-selector a').removeClass('selected');
    $(this).addClass('selected');
    $('#image-list img').hide();
    $('#image-4').show();
  });

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

  $(document).on('click', '.pip-container img.forward-layer', function(){
    $(".backward-layer").removeClass("backward-layer").addClass("forward-layer");
    $(this).addClass("backward-layer").removeClass("forward-layer");
  });

  $(document).on('click', '.pip-container video.forward-layer', function(e){
    var video = e.target;

    var mediagroup = $(video).attr('xmediagroup');
    $('video[xmediagroup=' + mediagroup + ']').not(video).each(function(){
      $(this).prop('controls', false);
      $(this).removeClass("backward-layer").addClass("forward-layer");
    });

    $(video).prop('controls', true);
    $(this).addClass("backward-layer").removeClass("forward-layer");
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

