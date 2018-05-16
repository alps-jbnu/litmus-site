

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "%(sel)s of %(cnt)s selected": [
      "%(sel)s\uac1c\uac00 %(cnt)s\uac1c \uc911\uc5d0 \uc120\ud0dd\ub428."
    ], 
    "6 a.m.": "6 gi\u1edd s\u00e1ng", 
    "6 p.m.": "\uc624\ud6c4 6\uc2dc", 
    "April": "4\uc6d4", 
    "August": "8\uc6d4", 
    "Available %s": "C\u00f3 s\u1eb5n %s", 
    "Cancel": "H\u1ee7y b\u1ecf", 
    "Choose": "Ch\u1ecdn", 
    "Choose a Date": "\uc2dc\uac04 \uc120\ud0dd", 
    "Choose a Time": "\uc2dc\uac04 \uc120\ud0dd", 
    "Choose a time": "Ch\u1ecdn gi\u1edd", 
    "Choose all": "Ch\u1ecdn t\u1ea5t c\u1ea3", 
    "Chosen %s": "Ch\u1ecdn %s", 
    "Click to choose all %s at once.": "Click \u0111\u1ec3 ch\u1ecdn t\u1ea5t c\u1ea3 %s .", 
    "Click to remove all chosen %s at once.": "Click \u0111\u1ec3 b\u1ecf ch\u1ecdn t\u1ea5t c\u1ea3 %s", 
    "December": "12\uc6d4", 
    "February": "2\uc6d4", 
    "Filter": "L\u1ecdc", 
    "Hide": "D\u1ea5u \u0111i", 
    "January": "1\uc6d4", 
    "July": "7\uc6d4", 
    "June": "6\uc6d4", 
    "March": "3\uc6d4", 
    "May": "5\uc6d4", 
    "Midnight": "N\u1eeda \u0111\u00eam", 
    "Noon": "Bu\u1ed5i tr\u01b0a", 
    "Note: You are %s hour ahead of server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ube60\ub985\ub2c8\ub2e4."
    ], 
    "Note: You are %s hour behind server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ub2a6\uc740 \uc2dc\uac04\uc785\ub2c8\ub2e4."
    ], 
    "November": "11\uc6d4", 
    "Now": "B\u00e2y gi\u1edd", 
    "October": "10\uc6d4", 
    "Remove": "X\u00f3a", 
    "Remove all": "Xo\u00e1 t\u1ea5t c\u1ea3", 
    "September": "9\uc6d4", 
    "Show": "Hi\u1ec7n ra", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Danh s\u00e1ch c\u00e1c l\u1ef1a ch\u1ecdn \u0111ang c\u00f3 %s. B\u1ea1n c\u00f3 th\u1ec3 ch\u1ecdn b\u1eb1ng b\u00e1ch click v\u00e0o m\u0169i t\u00ean \"Ch\u1ecdn\" n\u1eb1m gi\u1eefa hai h\u1ed9p.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Danh s\u00e1ch b\u1ea1n \u0111\u00e3 ch\u1ecdn %s. B\u1ea1n c\u00f3 th\u1ec3 b\u1ecf ch\u1ecdn b\u1eb1ng c\u00e1ch click v\u00e0o m\u0169i t\u00ean \"Xo\u00e1\" n\u1eb1m gi\u1eefa hai \u00f4.", 
    "Today": "H\u00f4m nay", 
    "Tomorrow": "Ng\u00e0y mai", 
    "Type into this box to filter down the list of available %s.": "B\u1ea1n h\u00e3y nh\u1eadp v\u00e0o \u00f4 n\u00e0y \u0111\u1ec3 l\u1ecdc c\u00e1c danh s\u00e1ch sau %s.", 
    "Yesterday": "H\u00f4m qua", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "B\u1ea1n \u0111\u00e3 l\u1ef1a ch\u1ecdn m\u1ed9t h\u00e0nh \u0111\u1ed9ng, v\u00e0 b\u1ea1n \u0111\u00e3 kh\u00f4ng th\u1ef1c hi\u1ec7n b\u1ea5t k\u1ef3 thay \u0111\u1ed5i n\u00e0o tr\u00ean c\u00e1c tr\u01b0\u1eddng. C\u00f3 l\u1ebd b\u1ea1n \u0111ang t\u00ecm ki\u1ebfm n\u00fat b\u1ea5m Go thay v\u00ec n\u00fat b\u1ea5m Save.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "B\u1ea1n \u0111\u00e3 l\u1ef1a ch\u1ecdn m\u1ed9t h\u00e0nh \u0111\u1ed9ng, nh\u01b0ng b\u1ea1n kh\u00f4ng l\u01b0u thay \u0111\u1ed5i c\u1ee7a b\u1ea1n \u0111\u1ebfn c\u00e1c l\u0129nh v\u1ef1c c\u00e1 nh\u00e2n \u0111\u01b0\u1ee3c n\u00eau ra. Xin vui l\u00f2ng click OK \u0111\u1ec3 l\u01b0u l\u1ea1i. B\u1ea1n s\u1ebd c\u1ea7n ph\u1ea3i ch\u1ea1y l\u1ea1i c\u00e1c h\u00e0nh \u0111\u1ed9ng.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "B\u1ea1n ch\u01b0a l\u01b0u nh\u1eefng tr\u01b0\u1eddng \u0111\u00e3 ch\u1ec9nh s\u1eeda. N\u1ebfu b\u1ea1n ch\u1ecdn h\u00e0nh \u0111\u1ed9ng n\u00e0y, nh\u1eefng ch\u1ec9nh s\u1eeda ch\u01b0a \u0111\u01b0\u1ee3c l\u01b0u s\u1ebd b\u1ecb m\u1ea5t.", 
    "one letter Friday\u0004F": "\uae08", 
    "one letter Monday\u0004M": "\uc6d4", 
    "one letter Saturday\u0004S": "\ud1a0", 
    "one letter Sunday\u0004S": "\uc77c", 
    "one letter Thursday\u0004T": "\ubaa9", 
    "one letter Tuesday\u0004T": "\ud654", 
    "one letter Wednesday\u0004W": "\uc218", 
    "time format with day\u0004%d day %h:%m:%s": [
      "%d \uc77c %h\uc2dc\uac04 %m\ubd84 %s\ucd08", 
      "%d \uc77c %h\uc2dc\uac04 %m\ubd84 %s\ucd08"
    ], 
    "time format without day\u0004%h:%m:%s": "%h:%m:%s"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[django.pluralidx(count)];
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "H:i \\N\\g\u00e0\\y d \\t\\h\u00e1\\n\\g n \\n\u0103\\m Y", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%m/%d/%Y %H:%M:%S", 
      "%m/%d/%Y %H:%M:%S.%f", 
      "%m/%d/%Y %H:%M", 
      "%m/%d/%Y", 
      "%m/%d/%y %H:%M:%S", 
      "%m/%d/%y %H:%M:%S.%f", 
      "%m/%d/%y %H:%M", 
      "%m/%d/%y"
    ], 
    "DATE_FORMAT": "\\N\\g\u00e0\\y d \\t\\h\u00e1\\n\\g n \\n\u0103\\m Y", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%m/%d/%Y", 
      "%m/%d/%y", 
      "%b %d %Y", 
      "%b %d, %Y", 
      "%d %b %Y", 
      "%d %b, %Y", 
      "%B %d %Y", 
      "%B %d, %Y", 
      "%d %B %Y", 
      "%d %B, %Y"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "H:i d-m-Y", 
    "SHORT_DATE_FORMAT": "d-m-Y", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));

