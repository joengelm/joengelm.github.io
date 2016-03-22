from __future__ import division
import csv
import sys
from collections import defaultdict

FILENAME = 'fixed_time_usage.csv'

labels_to_desc = {'t01': 'Personal Care',
                  't02': 'Household Activities',
                  't03': 'Caring for HH Members',
                  't04': 'Caring for NonHH Members',
                  't05': 'Work',
                  't06': 'Education',
                  't07': 'Consumer Purchases',
                  't08': 'Professional Services',
                  't09': 'Household Services',
                  't10': 'Government Services',
                  't11': 'Eating & Drinking',
                  't12': 'Socializing, Relaxing, and Leisure',
                  't13': 'Sports & Exercise',
                  't14': 'Religious Activities',
                  't15': 'Volunteer Activities',
                  't16': 'Telephone Calls',
                  't18': 'Travel',
                  't50': 'n/a'}
activities = defaultdict(int)

with open(FILENAME, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for activity in reader:
        activities[activity['code']] += int(activity['duration']) + 1

s = 0
for act, dur in activities.iteritems():
    print labels_to_desc[act] + ': ' + str(dur / 21938)
    s += dur
print 'Total: ' + str(s)
