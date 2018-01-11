from django.utils import timezone

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

