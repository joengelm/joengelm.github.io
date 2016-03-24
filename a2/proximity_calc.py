from __future__ import division
import csv
import sys
from collections import defaultdict

base_filename = sys.argv[1]
comp_filename = sys.argv[2]

base = {}
comp = {}
total_diff = 0.0

with open(base_filename, 'r') as basefile:
    base_reader = csv.DictReader(basefile)
    for b in base_reader:
        base[b['code']] = b
    with open(comp_filename, 'r') as compfile:
        comp_reader = csv.DictReader(compfile)
        for c in comp_reader:
            comp[c['code']] = c
        for activity in set(base.keys() + comp.keys()):
            base_percent = base.get(activity, dict()).get('percent', 0.0)
            comp_percent = comp.get(activity, dict()).get('percent', 0.0)
            total_diff += ((float(comp_percent) - float(base_percent)) ** 4) / 1000

print total_diff