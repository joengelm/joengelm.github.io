from __future__ import division
import csv
import sys
from collections import defaultdict

base_filename = sys.argv[1]
comp_filename = sys.argv[2]
out_filename = 'diff_' + comp_filename

base = {}
comp = {}
lines = []

with open(base_filename, 'r') as basefile:
    base_reader = csv.DictReader(basefile)
    for b in base_reader:
        base[b['code']] = b
    with open(comp_filename, 'r') as compfile:
        comp_reader = csv.DictReader(compfile)
        for c in comp_reader:
            comp[c['code']] = c
        with open(out_filename, 'w') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['code', 'percent', 'diff'])
            for activity in set(base.keys() + comp.keys()):
                base_percent = base.get(activity, dict()).get('percent', 0.0)
                comp_percent = comp.get(activity, dict()).get('percent', 0.0)
                diff = float(comp_percent) / 100 - float(base_percent) / 100

                lines.append([activity, float(comp_percent)] + ['{:.2%}'.format(diff)[:-1]])

            print lines
            lines = sorted(lines, key=lambda line: -line[1])

            for line in lines:
                writer.writerow(line)
