document.addEventListener('DOMContentLoaded', function(){

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

    var btn = domify([
      '<li class=action-quote-retweet>',
      '<a role="button" class="with=icn js-action-quote" href="#">',
      '<span class="Icon Icon--reply"></span>',
      '<b>Qoute</b>',
      '</li>'].join(''));

      var containers = $$('stream-items')[0].getElementsByClassName('tweet-actions');
      slice.call(containers).forEach(function (target) {
        var t = target.getElementsByClassName('action-del-container')[0];
        target.appendChild(btn);
      });
  })(window, document);
});
