document.addEventListener('DOMContentLoaded', function(){
  document.removeEventListener('DOMContentLoaded', arguments.callee, false);
  (function(w, d, undefined){
    var slice = Array.prototype.slice;
    var temp = document.createElement('div');
    var QUOTE_CLASS = 'action-quote-container';
    function $(id) {return document.getElementById(id);}
    function $$(cls) {return document.getElementsByClassName(cls);}
    function parentUntilClass(node, cls) {
      if (node == document)
        return document;
      if (!node.parentNode)
        return document;
      if (!node.parentNode.classList) {
        console.log(node.parentNode);
        return parentUntilClass(node.parentNode, cls);
      }
      if (node.parentNode.classList.contains(cls))
        return node.parentNode;
      return parentUntilClass(node.parentNode, cls);
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
      if (event.target && event.target.classList.contains('tweet')) {
        var target = event.target;
        var container = target.getElementsByClassName('tweet-actions')[0];
        if (container.getElementsByClassName(QUOTE_CLASS).length > 0)
          return;
        var ref = container.getElementsByClassName('action-fav-container')[0];
        var quoteBtn = domify(btnStr);
        container.insertBefore(quoteBtn, ref);
      }
    }, false);
    
    document.body.addEventListener('click', function (event) {
      if (event.target && parentUntilClass(event.target, QUOTE_CLASS).classList.contains(QUOTE_CLASS)) {
        var target = event.target;
        $('global-new-tweet-button').click();
        $('global-tweet-dialog-header').innerHTML = 'Quote Retweet';
        debugger;
        var parent = parentUntilClass(target, 'content');
        var username = parent.getElementsByClassName('username')[0].getElementsByTagName('b')[0].innerHTML;
        var text = parent.getElementsByClassName('tweet-text')[0].innerHTML;
        text = 'RT @' + username + ':' + text;
        $('tweet-box-global').childNodes[0].innerHTML = text;
      }
    }, true);
  })(window, document);
});
