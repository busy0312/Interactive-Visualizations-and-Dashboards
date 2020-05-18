
//complete dropdown list
(async function testid(){
  var data =await d3.json("samples.json");
  console.log(data)
  var names= data.names.map(d=>parseInt(d));
  names.forEach(function(x){
      var idtag=document.createElement('option');
      idtag.textContent=JSON.stringify(x);
      document.querySelector('#selDataset').appendChild(idtag)
    })})()



//catch dropdown change
d3.selectAll("#selDataset").on("change", getdata);
//updatedata
async function getdata(){

  var dropdown=d3.selectAll('option');
  var ids=dropdown.property('value');
  
  var data =await d3.json("samples.json");
  var samplesdata=data.samples
  var id=samplesdata.map(d=>d)
  var newid=id.filter(d=>d.id===ids)
  newid.forEach(function(x){
    var indi_id=x.id
    var otu=x.otu_ids
    var sampleValues = x.sample_values;
    var labels = x.otu_labels;
    
   //
  //  function OTUfunction(num){
  //   return `OTU ${num}`
  //   }
var new_otu = otu.map(d=>`OTU ${d}`)

var trace1 = {
x: sampleValues.slice(0,9).reverse(),
y:new_otu.slice(0,9).reverse(),
  type: "bar",
  orientation: 'h',
  name:'Top 10 OTUs',
  text:labels.slice(0,9).reverse()
};
var data_bar = [trace1];
// Plot the chart to a div tag with id "plot"
Plotly.newPlot("bar", data_bar);

var trace2 = {
x: otu,
y: sampleValues,
text:labels,
mode: 'markers',
marker: {
size: sampleValues,
color:otu,
}
};

var data_bubble = [trace2];


Plotly.newPlot('bubble', data_bubble);

    
})
}







//     var ids=data.metadata[0].id
//     var ethnicity=data.metadata[0].ethnicity;
//     var gender=data.metadata[0].gender;
//     var age=data.metadata[0].age;
//     var location=data.metadata[0].location;
//     var bbtype=data.metadata[0].bbtype;
//     var wfreq=data.metadata[0].wfreq;
//     var info=d3.select('#sample-metadata')

//     info.append('p').text(`id: ${ids}`)
//     info.append('p').text(`ethnicity: ${ethnicity}`)
//     info.append('p').text(`gender: ${gender}`)
//     info.append('p').text(`age: ${age}`)
//     info.append('p').text(`location: ${location}`)
//     info.append('p').text(`bbtype: ${bbtype}`)
//     info.append('p').text(`wfreq: ${wfreq}`)
    




// })()

