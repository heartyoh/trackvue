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

  $(document).on('click', function(e) {
    var video = e.target;

    if(video.nodeName != 'VIDEO')
      return;

    var mediagroup = $(video).attr('xmediagroup');
    $('video[xmediagroup=' + mediagroup + ']').not(video).each(function(){
      $(this).attr('controls', false);
    });

    $(video).attr('controls', true);
  });

  $(document).on('play', function(e) {
    var video = e.target;

    if(!$(video).attr('controls'))
      return;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
        this.currentTime = video.currentTime;
        this.play();
    });
  });

  $(document).on('pause', function(e) {
    var video = e.target;

    if(!$(video).attr('controls'))
      return;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
        this.pause();
        this.currentTime = video.currentTime;
    });
  });

  $(document).on('seeked', function(e) {
    var video = e.target;

    if(!$(video).attr('controls'))
      return;

    var mediagroup = $(video).attr('xmediagroup');
    $('video,audio[xmediagroup=' + mediagroup + ']').not(video).each(function(){
        this.currentTime = video.currentTime;
    });
  });

  return {
  };

}());

