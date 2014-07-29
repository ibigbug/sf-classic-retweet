document.addEventListener('DOMContentLoaded', function(){
  document.removeEventListener('DOMContentLoaded', arguments.callee, false);
  (function(w, d, undefined){
    var slice = Array.prototype.slice;
    var temp = document.createElement('div');
    var QUOTE_CLASS = 'action-quote-container';
    function $(id) {return document.getElementById(id);}
    function $$(cls) {return document.getElementsByClassName(cls);}
    function parentUntilClass(node, cls) {
      if (!node)
        return null;
      var ret = node.parentNode;
      if (ret && ret.nodeType !== 9)
        if (ret.nodeType === 1)
          if (ret.classList.contains(cls))
              return ret;
        return parentUntilClass(ret, cls);
    }
    function domify(str) {
      // not safe
      temp.innerHTML = str;
      return temp.firstChild;
    }
    var btnStr = [
      '<li class=' + QUOTE_CLASS + '>',
      '<a role="button" class="with=icn js-action-quote" href="#">',
      '<span class="Icon Icon--reply"></span>',
      '<b>Quote RT</b>',
      '</li>'].join('');
    document.body.addEventListener('mousemove', function (event) {
      if (event.target && (event.target.classList.contains('js-stream-tweet') || event.target.classList.contains('opened-tweet'))) {
        var target = event.target;
        var container = target.getElementsByClassName('js-actions')[0];
        if (container.getElementsByClassName(QUOTE_CLASS).length > 0)
          return;
        var ref = container.getElementsByClassName('js-toggle-fav')[0];
        var quoteBtn = domify(btnStr);
        container.insertBefore(quoteBtn, ref);
      }
    }, false);
    
    document.body.addEventListener('click', function (event) {
      if (event.target && parentUntilClass(event.target, QUOTE_CLASS) && parentUntilClass(event.target, QUOTE_CLASS).classList.contains(QUOTE_CLASS)) {
        var target = event.target;
        $('global-new-tweet-button').click();
        $('global-tweet-dialog-header').innerHTML = 'Quote Retweet';
        var parent = parentUntilClass(target, 'js-stream-tweet');
        if (!parent)
          parent = parentUntilClass(target, 'opened-tweet');
        var username;
        try {
          username = parent.getElementsByClassName('username')[0].getElementsByTagName('b')[0].innerHTML;
        } catch (e) {
          username = location.pathname.substr(1);
        }
        var text = parent.getElementsByClassName('js-tweet-text')[0].innerHTML;
        text = 'RT @' + username + ': ' + text;
        var editable = $('tweet-box-global').childNodes[0];
        editable.innerHTML = text;
        cursorToStart(editable);
      }
    }, true);

    function cursorToStart(node) {
      var range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, 0);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  })(window, document);
});
