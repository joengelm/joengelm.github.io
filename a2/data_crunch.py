from __future__ import division
import csv
import sys
from collections import defaultdict

labels_to_desc = {'t01': 'Personal Care',
                  't02': 'Household',
                  't03': 'Caring for HH Members',
                  't04': 'Caring for NonHH Members',
                  't05': 'Work',
                  't06': 'Education',
                  't07': 'Consumerism',
                  't08': 'Professional Services',
                  't09': 'Household Services',
                  't10': 'Government Services',
                  't11': 'Eating & Drinking',
                  't12': 'Socializing & Relaxing',
                  't13': 'Exercise',
                  't14': 'Religious Activities',
                  't15': 'Volunteer Activities',
                  't16': 'Telephone Calls',
                  't18': 'Travel',
                  't50': 'n/a'}
labels = defaultdict(list)
persons = []

def init(filename):
    with open(filename, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for field in reader.fieldnames:
            if field[0] == 't':
                labels[field[0:3]].append(field)
        for person in reader:
            persons.append(person)
            for label in labels:
                s = 0
                for field in labels[label]:
                    s += int(person[field])
                person[label] = s

def persons_who(**kwargs):
    for person in persons:
        passes = True
        for key, val in kwargs.iteritems():
            if person[key] != val:
                passes = False
                break
        if passes:
            yield person

init(sys.argv[1])
pers = list(persons_who(t13=0, Sex='Male', TESCHLVL='1'))
print len(pers)
if len(pers) != 0:
    lab = defaultdict(float)
    for label in labels:
        for per in pers:
            lab[label] += (per[label] / 1440) / len(pers)
        print labels_to_desc[label] + ',{:.2%}'.format(lab[label])

    s = 0
    for label in labels:
        s += lab[label]
    print s



