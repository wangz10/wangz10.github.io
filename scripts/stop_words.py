'''
Generate English stopwords. 
'''
import json
# from nltk.corpus import stopwords
# print stopwords.words('english')
# json.dump(stopwords.words('english'), 
# 	open('../assets/stop_words.json', 'wb'))

# Get stopwords from https://github.com/igorbrigadir/stopwords
import urllib2
stopwords = []
f = urllib2.urlopen('https://raw.githubusercontent.com/igorbrigadir/stopwords/master/en/atire_puurula.txt')
for line in f:
	stopwords.append(line.strip())

print len(stopwords)
json.dump(stopwords, 
	open('../assets/stopwords.json', 'wb'))
