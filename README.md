# Interactive-Visualization-Dashboard

## Analysis of Source Data

### Analysis of metadata_columns.csv

* This file appears to be the table definition for the belly_button_biodiversity_metadata.csv.</li>

* It will be utilized in pgAdmin to create the biodiversity_metadata table in the belly_button of the postgres database.

### Analysis of belly_button_biodiversity_metadata.csv
* This contains the attributes of the test subjects.
* It will be used for for populating the biodiversity_metadata table in the belly_button schema of the postgres database.
* If the SAMPLEID row values are prepended with "BB_", they correspond to the column names of the belly_button_biodiversity_samples.csv file.
* The row number will be used as an index into the array of samples in the belly_button_biodiversity_samples data.

### Analysis of belly_button_biodiversity_samples.csv
* OTU is Opterational Taxonomic Unit.  
* It is an operational definition used to classify groups of closely related subjects.
* This table contains number of observations per tuple of OTU and Subject.
* It will be used to create table belly_button.biodiversity_samples.

### Analysis of belly_button_biodiversity_otu_id.csv
* This source contains the descriptions of the diseases.
* It is keyed by the samme otu_id found in the belly_button.biodiversity_samples table.
* It will be used to create the belly_button.biiodiversity_otu_id table.

### Representative State Transfer (REST) Queries
```python
@app.route('/names')
    """Returns List of sample names."""
```

```python
@app.route('/otu')
    """Returns List of OTU descriptions."""
```

```python
@app.route('/metadata/<sample>')
    """Returns MetaData for a given sample.
      Args: Sample in the format: `BB_940`"""
```

```python
@app.route('/wfreq/<sample>')
    """ReturnsWeekly Washing Frequency as a number
    Args: Sample in the format: `BB_940`"""
```
```python
@app.route('/samples/<sample>')
    """Return a list of dictionaries containing sorted lists  for `otu_ids`
    and `sample_values`"""
```
### app.py
* Respond to the REST requests.
* Access data with sqlite and SQLAlchemy


    

    
