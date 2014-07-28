document.addEventListener('DOMContentLoaded', function(){
  document.removeEventListener('DOMContentLoaded', arguments.callee, false);
  (function(w, d, undefined){
    var slice = Array.prototype.slice;
    var temp = document.createElement('div');
    function $(id) {return document.getElementById(id);}
    function $$(cls) {return document.getElementsByClassName(cls);}
    function domify(str) {
      // not safe
      temp.innerHTML = str;
      return temp.firstChild;
    }

    var btnStr = [
      '<li class=action-quote-container>',
      '<a role="button" class="with=icn js-action-quote" href="#">',
      '<span class="Icon Icon--reply"></span>',
      '<b>QT Retweet</b>',
      '</li>'].join('');
    document.body.addEventListener('mouseover', function (event) {
      if (event.target && event.target.classList.contains('tweet')) {
        var target = event.target;
        var container = target.getElementsByClassName('tweet-actions')[0];
        if (container.getElementsByClassName('action-quote-container').length > 0)
          return;
        var ref = container.getElementsByClassName('action-fav-container')[0];
        var quoteBtn = domify(btnStr);
        container.insertBefore(quoteBtn, ref);
      }

    }, false);
  })(window, document);
});
