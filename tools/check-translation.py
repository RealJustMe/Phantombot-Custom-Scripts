import os
from argparse import ArgumentParser

argparser = ArgumentParser(
    description='Compare lang/english with a translation')
argparser.add_argument('language', metavar='LANGUAGE')
args = argparser.parse_args()
language = args.language
language_folder = 'lang/%s' % language

print('== Comparing english language files with %s translation ==' % language)

# Load file lists
english_files = []
for path, dirnames, filenames in os.walk('lang/english'):
    for filename in filenames:
        english_files.append(
            os.path.join(path, filename)[len('lang/english'):])

translated_files = []
for path, dirnames, filenames in os.walk(language_folder):
    for filename in filenames:
        translated_files.append(
            os.path.join(path, filename)[len(language_folder):])

# Check for untranslated files
english_remaining = english_files.copy()
for file in translated_files:
    if file in english_remaining:
        english_remaining.remove(file)
if english_remaining:
    print('\n= Untranslated files =')
    for file in english_remaining:
        print(file)

# TODO Check for missing lines in translation

# Check for leftover translations
translated_remaining = translated_files.copy()
for file in english_files:
    if file in translated_remaining:
        translated_remaining.remove(file)
if translated_remaining:
    print()
    print('= Leftover files =')
    for file in english_remaining:
        print(file)

# TODO Check for leftover lines in translation

print('\ndone.')
