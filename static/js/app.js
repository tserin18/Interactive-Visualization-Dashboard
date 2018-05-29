function init() {
    plot_sample_pie("BB_940") 
    plot_sample_bubble("BB_940")
  }

base_url = "http://127.0.0.1:5000";


window.onload = function () {
    url = base_url + "/names"
    d3.json(url, function (error, response) {
        if (error) {
            console.log("d3.json failed.")
            print("d3.json failed.")
            return console.warn(error);
        }

        d3.select("#dropdown-menu")
            .selectAll("option")
            .data(response)
            .enter()
            .append("option")
            .text(function (d) { return d; })
            .attr("class", "text-center");
    });
}

function optionChanged(sample) {
    select_sample_metadata(sample)
    plot_sample_pie(sample) 
    plot_sample_bubble(sample)
}

function select_sample_metadata(sample) {

    url = base_url + "/metadata/" + sample

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        metadata_list = []
        metadata_list.push("Age: " + response["AGE"])
        metadata_list.push("Type: " + response["BBTYPE"])
        metadata_list.push("Ethnicity: " + response["ETHNICITY"])
        metadata_list.push("Gender: " + response["GENDER"])
        metadata_list.push("Location: " + response["LOCATION"])
        metadata_list.push("Sample ID: " + response["SAMPLEID"])

        d3.selectAll(".list-group")
            .selectAll("li")
            .data(metadata_list)
            .text(function (d) { return d; })
    }
    )
} 

function plot_sample_bubble(sample) {

    url = base_url + "/samples/" + sample

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        var trace1 = {
            x: response[0]["otu_ids"],
            y: response[0]["sample_values"],
            mode: 'markers',
            marker: {
                size: response[0]["sample_values"]
            }
        };

        var data = [trace1];

        var layout = {
            showlegend: false,
            xaxis: { title: 'Operational Taxonomic Unit', range: [0, 3675] },
            yaxis: { title: 'Values' },
            autosize: false,
            height: 500,
            width:  1000
        };

        Plotly.newPlot('bubble_chart', data, layout);
    });
}

function plot_sample_pie(sample) {

    url = base_url + "/samples/" + sample

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }
        data_dict = {}
        data_dict["values"] = response[0]["otu_ids"]
        data_dict["labels"] = response[0]["sample_values"]
        data_dict["type"] = "pie"
        data = [data_dict]

        var layout = {
            margin: { t: 0, l: 0 }
        };

        Plotly.newPlot('pie_chart', data, layout);
    });
}

init();

