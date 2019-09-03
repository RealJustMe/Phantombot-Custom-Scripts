import copy
import os
import re
from argparse import ArgumentParser

argparser = ArgumentParser(
    description='Compare lang/english with a translation')
argparser.add_argument(
    'language', default='german', nargs='?', metavar='LANGUAGE')
args = argparser.parse_args()

language = args.language
base_path = os.path.dirname(os.path.realpath(__file__))
english_path = os.path.join(base_path, '..', 'lang', 'english')
language_path = os.path.join(base_path, '..', 'lang', language)
string_regex = '\$\.lang\.register\(\'([^\']*)'


print('== Comparing english language files with %s translation ==' % language)

# Load english files
english_files = dict()
for path, dirnames, filenames in os.walk(english_path):
    for filename in filenames:
        file_absolute = os.path.join(path, filename)
        file_path = file_absolute[len(english_path):]
        english_files[file_path] = []
        with open(file_absolute) as file:
            for line in file:
                for result in re.findall(string_regex, line):
                    english_files[file_path].append(result)

# Load translated files
translated_files = dict()
for path, dirnames, filenames in os.walk(language_path):
    for filename in filenames:
        file_absolute = os.path.join(path, filename)
        file_path = file_absolute[len(language_path):]
        translated_files[file_path] = []
        with open(file_absolute) as file:
            for line in file:
                for result in re.findall(string_regex, line):
                    translated_files[file_path].append(result)

# Check for untranslated files
untranslated_files = list(english_files.keys())
for file in translated_files:
    if file in untranslated_files:
        untranslated_files.remove(file)
if untranslated_files:
    print('\n= Untranslated files =')
    for file in sorted(untranslated_files):
        print(file)

# Check for missing lines in translation
untranslated_lines = copy.deepcopy(english_files)
for file in untranslated_files:
    del untranslated_lines[file]
for file in untranslated_lines:
    for line in translated_files[file]:
        if line in translated_files[file] and line in untranslated_lines[file]:
            untranslated_lines[file].remove(line)
for file in sorted(untranslated_lines):
    if untranslated_lines[file]:
        print('\n= Untranslated lines in %s =' % file)
        for line in untranslated_lines[file]:
            print(line)

# Check for leftover translation files
leftover_files = list(translated_files.keys())
for file in english_files:
    if file in leftover_files:
        leftover_files.remove(file)
if leftover_files:
    print('\n= Leftover files =')
    for file in sorted(leftover_files):
        print(file)

# Check for leftover lines in translation
leftover_lines = copy.deepcopy(translated_files)
for file in leftover_files:
    del leftover_lines[file]
for file in leftover_lines:
    for line in english_files[file]:
        if line in english_files[file] and line in leftover_lines[file]:
            leftover_lines[file].remove(line)
for file in sorted(leftover_lines):
    if leftover_lines[file]:
        print('\n= Leftover lines in %s =' % file)
        for line in leftover_lines[file]:
            print(line)

print('\ndone.')
