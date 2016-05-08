'''
Parse the XML file exported from Endnote and write to json.
The XML is exported with output style "Show All Fields"
'''
from collections import OrderedDict
import xmltodict, json

o = xmltodict.parse(open('../assets/publications.xml', 'rb').read())
records = o['xml']['records']['record']
keys_to_exclude = ('database', 'rec-number', 'source-app', 'foreign-keys', 'ref-type')
doi_base_url = 'http://dx.doi.org/'

def extract_text(d):
	'''
	To recursively extract the value from '#text' fields to simplify the parsed XML. 
	'''
	if isinstance(d, OrderedDict):
		if 'style' in d:
			text = d['style']['#text']
		else:
			if len(d) > 1: # more then 1 key:value pair
				text = OrderedDict()
				for key in d.keys():
					text[key] = extract_text(d[key])
			elif len(d) == 1: # unpack dictionary if only one key:value pair
				text = extract_text(d.values()[0])
		
	else: # d is a list of dicts
		text = []
		for d_ in d:
			text_ = extract_text(d_)
			text.append(text_)

	return text


records_cleaned = []
for record in o['xml']['records']['record']:
	# Extract texts 
	record = {key: extract_text(val) for key, val 
		in record.items() if key not in keys_to_exclude}
	# add doi field
	if 'electronic-resource-num' in record:
		if record['electronic-resource-num'].startswith(doi_base_url):
			doi = record['electronic-resource-num'].strip(doi_base_url)
		else:
			doi = record['electronic-resource-num']
	else:	
		doi = record['accession-num'].strip('doi:')
	record['doi'] = doi
	records_cleaned.append(record)


json.dump(records_cleaned, open('../assets/publications.json', 'wb'), 
	indent=4, sort_keys=True)