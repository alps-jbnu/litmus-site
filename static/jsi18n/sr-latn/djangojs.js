

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
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
      "%(sel)s\uac1c\uac00 %(cnt)s\uac1c \uc911\uc5d0 \uc120\ud0dd\ub428.", 
      "%(sel)s od %(cnt)s izabrana", 
      "%(sel)s od %(cnt)s izabranih"
    ], 
    "6 a.m.": "18\u010d", 
    "6 p.m.": "\uc624\ud6c4 6\uc2dc", 
    "April": "4\uc6d4", 
    "August": "8\uc6d4", 
    "Available %s": "Dostupni %s", 
    "Cancel": "Poni\u0161ti", 
    "Choose": "Izaberi", 
    "Choose a Date": "\uc2dc\uac04 \uc120\ud0dd", 
    "Choose a Time": "\uc2dc\uac04 \uc120\ud0dd", 
    "Choose a time": "Odabir vremena", 
    "Choose all": "Izaberi sve", 
    "Chosen %s": "Izabrano \u201e%s\u201c", 
    "Click to choose all %s at once.": "Izaberite sve \u201e%s\u201c odjednom.", 
    "Click to remove all chosen %s at once.": "Uklonite sve izabrane \u201e%s\u201c odjednom.", 
    "December": "12\uc6d4", 
    "February": "2\uc6d4", 
    "Filter": "Filter", 
    "Hide": "Sakrij", 
    "January": "1\uc6d4", 
    "July": "7\uc6d4", 
    "June": "6\uc6d4", 
    "March": "3\uc6d4", 
    "May": "5\uc6d4", 
    "Midnight": "Pono\u0107", 
    "Noon": "Podne", 
    "Note: You are %s hour ahead of server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ube60\ub985\ub2c8\ub2e4."
    ], 
    "Note: You are %s hour behind server time.": [
      "Note: \uc11c\ubc84 \uc2dc\uac04\ubcf4\ub2e4 %s \uc2dc\uac04 \ub2a6\uc740 \uc2dc\uac04\uc785\ub2c8\ub2e4."
    ], 
    "November": "11\uc6d4", 
    "Now": "Trenutno vreme", 
    "October": "10\uc6d4", 
    "Remove": "Ukloni", 
    "Remove all": "Ukloni sve", 
    "September": "9\uc6d4", 
    "Show": "Poka\u017ei", 
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Ovo je lista dostupnih \u201e%s\u201c. Mo\u017eete izabrati elemente tako \u0161to \u0107ete ih izabrati u listi i kliknuti na \u201eIzaberi\u201c.", 
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Ovo je lista izabranih \u201e%s\u201c. Mo\u017eete ukloniti elemente tako \u0161to \u0107ete ih izabrati u listi i kliknuti na \u201eUkloni\u201c.", 
    "Today": "Danas", 
    "Tomorrow": "Sutra", 
    "Type into this box to filter down the list of available %s.": "Filtrirajte listu dostupnih elemenata \u201e%s\u201c.", 
    "Yesterday": "Ju\u010de", 
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Izabrali ste akciju ali niste izmenili ni jedno polje.", 
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Izabrali ste akciju ali niste sa\u010duvali promene polja.", 
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Imate nesa\u010divane izmene. Ako pokrenete akciju, izmene \u0107e biti izgubljene.", 
    "one letter Friday\u0004F": "\uae08", 
    "one letter Monday\u0004M": "\uc6d4", 
    "one letter Saturday\u0004S": "\ud1a0", 
    "one letter Sunday\u0004S": "\uc77c", 
    "one letter Thursday\u0004T": "\ubaa9", 
    "one letter Tuesday\u0004T": "\ud654", 
    "one letter Wednesday\u0004W": "\uc218", 
    "time format with day\u0004%d day %h:%m:%s": [
      "%d \uc77c %h:%m:%s", 
      "%d \uc77c %h:%m:%s"
    ]
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
    "DATETIME_FORMAT": "j. F Y. H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y. %H:%M:%S", 
      "%d.%m.%Y. %H:%M:%S.%f", 
      "%d.%m.%Y. %H:%M", 
      "%d.%m.%Y.", 
      "%d.%m.%y. %H:%M:%S", 
      "%d.%m.%y. %H:%M:%S.%f", 
      "%d.%m.%y. %H:%M", 
      "%d.%m.%y.", 
      "%d. %m. %Y. %H:%M:%S", 
      "%d. %m. %Y. %H:%M:%S.%f", 
      "%d. %m. %Y. %H:%M", 
      "%d. %m. %Y.", 
      "%d. %m. %y. %H:%M:%S", 
      "%d. %m. %y. %H:%M:%S.%f", 
      "%d. %m. %y. %H:%M", 
      "%d. %m. %y.", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "j. F Y.", 
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y.", 
      "%d.%m.%y.", 
      "%d. %m. %Y.", 
      "%d. %m. %y.", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j. F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "j.m.Y. H:i", 
    "SHORT_DATE_FORMAT": "j.m.Y.", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y."
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

