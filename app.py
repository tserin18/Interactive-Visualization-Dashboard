import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import (
    Flask,
    render_template,
    jsonify,
    request)

#################################################
# Database Setup
#################################################
# Create the connection engine
engine = create_engine("sqlite:///Datasets/belly_button_biodiversity.sqlite")


# Reflect Database into ORM class
Base = automap_base()
Base.prepare(engine, reflect=True)
OTU = Base.classes.otu
Samples = Base.classes.samples
Samples_metadata = Base.classes.samples_metadata

# Create our session (link) from Python to the DB
#session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# Query the database and send the jsonified results
@app.route("/names")
def names():
    conn = engine.connect()
    query = "select * from samples"
    resultset = conn.execute(query).keys()
    names = resultset[1:]
    return jsonify(names)

@app.route('/otu')
def otu():
    otu_desc =[]
    conn = engine.connect()
    query= "select lowest_taxonomic_unit_found from otu"
    resultset = conn.execute(query)
    for row in resultset:
        otu_desc.append(row[0])
    return jsonify(otu_desc)

@app.route('/metadata/<sample>')
def metadata(sample):
    conn = engine.connect()
    sample = ''.join([i for i in sample if i.isdigit()])
    query = (f"select age,bbtype,ethnicity,gender,location,sampleid from samples_metadata where sampleid = {sample}")
    resultset =  pd.read_sql(query,conn)
    return resultset.loc[0].to_json()

@app.route('/wfreq/<sample>')
def wfreq(sample):
    conn = engine.connect()
    sample = ''.join([i for i in sample if i.isdigit()])
    query = (f"select wfreq from samples_metadata where sampleid = {sample}")
    resultset =  pd.read_sql(query,conn)
    return str(resultset.loc[resultset.index[0], 'WFREQ'])

@app.route('/samples/<sample>')
def samples(sample):
    conn = engine.connect()
    query = (f"select otu_id,{sample} from samples where {sample} >0 order by {sample} desc")
    resultset = pd.read_sql(query,conn)
    otu_ids = resultset['otu_id'].tolist()
    sample_values = resultset[sample].tolist()
    result =[{"otu_ids":otu_ids ,"sample_values":sample_values }]
    return jsonify(result)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

