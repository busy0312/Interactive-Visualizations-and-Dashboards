
// //complete dropdown list
(async function testid() {
    var data = await d3.json("samples.json");
    console.log(data)
    var names = data.names.map(d => parseInt(d));
    names.forEach(function (x) {
        var idtag = document.createElement('option');
        idtag.textContent = JSON.stringify(x);
        document.querySelector('#selDataset').appendChild(idtag)
    })
    // call out init data
    var dropdown = d3.selectAll('option');
    var ids = dropdown.property('value');
    getdata(ids)
    getinfo(ids)
})()


//catch dropdown change
d3.selectAll("#selDataset").on("change", handlechange)

function handlechange() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input value from the form
    var chooseid = d3.select("#selDataset").node().value;
    console.log(chooseid);
    // clear the input value
    d3.select("#selDataset").node().value = " ";
    // show the id 
    d3.select("#selDataset").node().value = `${chooseid}`;
    // Build the plot with the new data
    // Pull out new demo_info
    getdata(chooseid);
    getinfo(chooseid);
}




//updatedata
async function getdata(chooseid) {
    var data = await d3.json("samples.json");
    var samplesdata = data.samples
    var id = samplesdata.map(d => d)
    var newid = id.filter(d => d.id === chooseid)
    //loop through to get all the otu_data
    newid.forEach(function (x) {
        var indi_id = x.id
        var otu = x.otu_ids
        var sampleValues = x.sample_values;
        var labels = x.otu_labels;
        var new_otu = otu.map(d => `OTU ${d}`)

        //create a bar chart
        var trace1 = {
            x: sampleValues.slice(0, 9).reverse(),
            y: new_otu.slice(0, 9).reverse(),
            type: "bar",
            orientation: 'h',
            name: 'Top 10 OTUs',
            text: labels.slice(0, 9).reverse()
        };
        var data_bar = [trace1];
        Plotly.newPlot("bar", data_bar);

        //create the bubble chart
        var trace2 = {
            x: otu,
            y: sampleValues,
            text: labels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otu,
            }
        };
        var data_bubble = [trace2];
        Plotly.newPlot('bubble', data_bubble);
    })
}

// the function to get individual information
async function getinfo(chooseid) {
    var data = await d3.json("samples.json");
    var metadata = data.metadata;
    var new_metadata = metadata.map(d => d);
    var new_meta_id = new_metadata.filter(d => d.id === parseInt(chooseid));
    new_meta_id.forEach(function (info) {
        var ids = info.id
        var ethnicity = info.ethnicity;
        var gender = info.gender;
        var age = info.age;
        var location = info.location;
        var bbtype = info.bbtype;
        var wfreq = info.wfreq
        var demo_info = d3.select('#sample-metadata')
        //clean out 
        demo_info.html("")
        //append new data
        demo_info.append('p').text(`id: ${ids}`)
        demo_info.append('p').text(`ethnicity: ${ethnicity}`)
        demo_info.append('p').text(`gender: ${gender}`)
        demo_info.append('p').text(`age: ${age}`)
        demo_info.append('p').text(`location: ${location}`)
        demo_info.append('p').text(`bbtype: ${bbtype}`)
        demo_info.append('p').text(`wfreq: ${wfreq}`)

    })
}







