'''
Generate English stopwords. 
'''
import json
from nltk.corpus import stopwords
# print stopwords.words('english')
json.dump(stopwords.words('english'), 
	open('../assets/stop_words.json', 'wb'))
