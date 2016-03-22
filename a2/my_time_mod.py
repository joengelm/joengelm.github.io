from __future__ import division
import csv
import sys
from collections import defaultdict

IN_FILENAME = 'time_usage.csv'
OUT_FILENAME = 'fixed_time_usage.csv'

with open(IN_FILENAME, 'r') as infile:
    reader = csv.reader(infile)
    next(reader)
    with open(OUT_FILENAME, 'w') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['day', 'start', 'end', 'code', 'duration'])
        for activity in reader:
            start_hour = int(activity[1].split(':')[0])
            start_min = int(activity[1].split(':')[1])
            end_hour = int(activity[2].split(':')[0])
            end_min = int(activity[2].split(':')[1])

            if end_hour != 23 and end_min != 59:
                if end_min == 0:
                    end_hour -= 1
                    end_min = 59
                else:
                    end_min -= 1

            duration = (end_hour - start_hour) * 60 + (end_min - start_min)
            activity.append(duration)

            code = activity[3]
            if len(code) == 1:
                code = 't0' + code
            else:
                code = 't' + code

            activity[3] = code
            writer.writerow(activity)

