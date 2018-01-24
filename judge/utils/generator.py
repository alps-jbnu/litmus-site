from django.forms import TextInput
from django.utils import timezone
from django.utils.html import format_html
from django.utils.safestring import mark_safe

import random, time

def make_seed():
    seed = long(time.time())
    return seed

def make_alpha(upper=True, length=2):
    ch = 'A' if upper else 'a' 
    return "".join([chr(ord(ch)+random.randint(0, 25)) for _ in range(length)])

def make_key(seed=None):
    random.seed(seed or make_seed())

    now = timezone.now()
    yy = str(now.year)[2:]
    mm = "{:02d}".format(now.month)
    dd = "{:02d}".format(now.day)
    code = make_alpha()
    return "{}{}".format(yy+mm+dd, code)

def make_section_key(seed=None):
    random.seed(seed or make_seed())

    now = timezone.now()
    yy = str(now.year)
    code = make_alpha()
    return "{}{}".format(yy, code)

fruits = [u'acerola', u'apple', u'apricots', u'avocado', u'banana', u'blackcurrant', u'blueberries', u'breadfruit', u'cantaloupe', u'carambola', u'cherimoya', u'cherries', u'clementine', u'coconut-meat', u'cranberries', u'custard-apple', u'date-fruit', u'durian', u'elderberries', u'feijoa', u'figs', u'gooseberries', u'grapefruit', u'grapes', u'guava', u'honeydew-melon', u'jackfruit', u'java-plum', u'jujube-fruit', u'kiwifruit', u'kumquat', u'lemon', u'lime', u'longan', u'loquat', u'lychee', u'mandarin', u'mango', u'mangosteen', u'mulberries', u'nectarine', u'olives', u'orange', u'papaya', u'passion-fruit', u'peaches', u'pear', u'persimmon', u'pineapple', u'pitanga', u'plantain', u'plums', u'pomegranate', u'pomme', u'prickly-pear', u'prunes', u'pummelo', u'quince', u'raspberries', u'rhubarb', u'rose-apple', u'sapodilla', u'sapote', u'soursop', u'strawberries', u'sugar-apple', u'tamarind', u'tangerine', u'watermelon']

def make_random_fruit(seed=None):
    random.seed(seed or make_seed())
    return random.choice(fruits)


class GenerateRandomFruitTextInput(TextInput):
    def render(self, name, value, attrs=None):
        text = super(TextInput, self).render(name, value, attrs)
        return mark_safe(text +
            '''\
<a href="#" onclick="return false;" class="button" id="id_{0}_regen">Generate</a>
<script type="text/javascript">
(function ($) {{
    $(document).ready(function () {{
        $('#id_{0}_regen').click(function () {{
            var fruits = {1};
            var key = fruits[Math.floor(Math.random() * fruits.length)];
            $('#id_{0}').val(key);
        }});
    }});
}})(django.jQuery);
</script>
'''.format(name, [str(x) for x in fruits] or []))

