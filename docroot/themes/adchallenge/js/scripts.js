(function ($, Drupal, window, document) {
  "use strict";
  var self = {};

  Drupal.behaviors.adChallengeBase = {
    attach: function (context, settings) {
      self.anchorTo(0);
    }
  };

  self.anchorTo = function (offset) {
    // get ID/hash from url
    var current_hash = window.location.hash;
    if ($(current_hash).length > 0) {
      self.scrollToElement($(current_hash));
    }

    $('a[href*="#"]').once('scrollable-anchor').each(function () {
      $(this).click(function (e) {
        // Get ID from url.
        var id = e.target.href.substring(e.target.href.indexOf("#") + 1),
          hash = '#' + id,
          target = $(hash);

        if (target.length > 0) {
          self.scrollToElement(target);
          // Change url without refresh.
          document.location.hash = hash;
        }
      });
    });
  };

  self.scrollToElement = function (el) {
    var offset = self.calculateOffset() + el.offset().top;
    $('html, body').animate({
      scrollTop: offset
    }, 1000);
  };

  self.calculateOffset = function () {
    var selectors = {
        admin_toolbar: $('#toolbar-bar'),
        admin_toolbar_tabs: $('#toolbar-item-administration-tray')
      },
      adminHeight = selectors.admin_toolbar.length ? selectors.admin_toolbar.outerHeight() + selectors.admin_toolbar_tabs.outerHeight() : 0,
      header = $('.region-header'),
      offset = 0;

    if (header.css('position') === 'fixed') {
      offset = 103 + adminHeight + header.innerHeight(); // compensate for fixed header height
    }
    // need negative value for the scroll calculations
    offset = -(offset);

    return offset;
  };

})(jQuery, Drupal, window, document);
