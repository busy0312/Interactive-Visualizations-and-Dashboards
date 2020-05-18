


(async function data(){
        var data =await d3.json("samples.json");
        var names= data.names.map(d=>parseInt(d));
        names.forEach(function(x){
            var idtag=document.createElement('option');
            idtag.textContent=JSON.stringify(x);
            document.querySelector('#selDataset').appendChild(idtag)
        })

          var otu = data.samples[0].otu_ids;
          var sampleValues = data.samples[0].sample_values;
          var labels = data.samples[0].otu_labels;
          var ids=data.metadata[0].id
          var ethnicity=data.metadata[0].ethnicity;
          var gender=data.metadata[0].gender;
          var age=data.metadata[0].age;
          var location=data.metadata[0].location;
          var bbtype=data.metadata[0].bbtype;
          var wfreq=data.metadata[0].wfreq;
          var info=d3.select('#sample-metadata')

          info.append('p').text(`id: ${ids}`)
          info.append('p').text(`ethnicity: ${ethnicity}`)
          info.append('p').text(`gender: ${gender}`)
          info.append('p').text(`age: ${age}`)
          info.append('p').text(`location: ${location}`)
          info.append('p').text(`bbtype: ${bbtype}`)
          info.append('p').text(`wfreq: ${wfreq}`)
          

    // get all label's names
          function OTUfunction(num){
            return `OTU ${num}`
            }
          var new_otu = otu.map(OTUfunction)
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


})()

init()






// (async function newplot(option_id){
//     var data = await d3.json("samples.json");
//    // set up all the variables that are going to use
//     var ids=data.metadata.id;
//     var ethnicity=data.metadata.ethnicity;
//     var gender=data.metadata.gender;
//     var age=data.metadata.age;
//     var location=data.metadata.location;
//     var bbtype=data.metadata.bbtype;
//     var wefreq=data.metadata.wefreq;
//     var otu = data.samples[0].otu_ids;
//     var sampleValues = data.samples[0].sample_values;
//     var labels = data.samples[0].otu_labels;
//     console.log(data)
    
//     function info(ids,ethnicity,gender,age,location,bbtype,wefreq){
//       var info=d3.selectAll("#sample-metadata");
//       var detail;
//       for (var i=0;i<153;i++){
//         detail=info.append('li')
//       detail.text(`id: ${ids[i]}`);
//       detail.text(`enthnicity: ${ethnicity[i]}`);
//       detail.text(`gender: ${gender[i]}`);
//       detail.text(`age: ${age[i]}`);
//       detail.text(`location: ${location[i]}`);
//       detail.text(`bbtype: ${bbtype[i]}`);
//       detail.text(`wefreq: ${wefreq[i]}`);
//       }
      
    
//     }
    

//     // get all label's names
//     function OTUfunction(num){
//         return `OTU ${num}`
//         }
//     var new_otu = otu.map(OTUfunction)
//     var trace1 = {
//     x: sampleValues.slice(0,9).reverse(),
//     y:new_otu.slice(0,9).reverse(),
//       type: "bar",
//       orientation: 'h',
//       name:'Top 10 OTUs',
//       text:labels.slice(0,9).reverse()
//     };
//     var data_bar = [trace1];
//     // Plot the chart to a div tag with id "plot"
//     Plotly.newPlot("bar", data_bar);

//     var trace2 = {
//       x: otu,
//       y: sampleValues,
//       text:labels,
//       mode: 'markers',
//       marker: {
//         size: sampleValues,
//         color:otu,
//       }
//     };
    
//     var data_bubble = [trace2];
    
    
//     Plotly.newPlot('bubble', data_bubble);




//   })()
  
 