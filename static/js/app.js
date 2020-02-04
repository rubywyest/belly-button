// Fetch the JSON data 
// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

function setSelectNames(names) {
  var sel = document.getElementById('selDataset');

  names.forEach(name => {
    // create new option element
    var opt = document.createElement('option');
    // create text node to add to option element (opt)
    opt.appendChild( document.createTextNode(name) );
    // set value property of opt
    opt.value = name; 
    // add opt to end of select box (sel)
    sel.appendChild(opt); 
    
  });

}

function buildPlot() {
      
    // Fetch the JSON data and build the plot
    d3.json("samples.json").then(function(data) {
        console.log(data);
//      compData = data;
        // Grab values from the response json object to build the plots
      var names = data.names;
      var id = data.samples.otu_ids;
      var label = data.samples.otu_labels;
      var value = data.samples.sample_values;
      
    // Print the data for each day
        console.log(names);
        setSelectNames(names);

  
    });
  }

  buildPlot()
  
  function optionChanged(testSubjectId) {
    console.log("this is the value you selected ikn the drop down:", testSubjectId);

    d3.json("samples.json").then(function(data) {
//      compData = data;
      // Grab values from the response json object to build the plots
      console.log("this is the data from json file:", data)      
       
      
      sampleDataForSubject = data.samples.find(function(element) { 
        return element.id == testSubjectId; 
     }); 
     console.log("selected ", sampleDataForSubject);
  
     // Let's get the first 10 OTU's on console
     var otu_ids;
     if (sampleDataForSubject.otu_ids.length > 10) {
          otu_ids = sampleDataForSubject.otu_ids.slice(0,9)
     }  else {
          otu_ids = sampleDataForSubject.otu_ids
     }

  // Convert OTU id's into string
     var otu_strings = []
     otu_ids.forEach(elem =>{
         stringOTU = 'OTU-' + elem;
         otu_strings.push(stringOTU);
     });

     var samples_values;
     if (sampleDataForSubject.sample_values.length > 10) {
          samples_values = sampleDataForSubject.sample_values.slice(0,9)
     }  else {
          samples_values = sampleDataForSubject.sample_values
     }     
  
     var otu_labels;
     if (sampleDataForSubject.otu_labels.length > 10) {
          otu_labels = sampleDataForSubject.otu_labels.slice(0,9)
     }  else {
      otu_labels = sampleDataForSubject.otu_labels
     }     

     var trace1 = {
      type: 'bar',
      y: otu_strings,
      x: samples_values,
      text: otu_labels,
      orientation: 'h',
      transforms: [{
       type: 'sort',
       target: 'x',
       order: 'decending'
      }]
    };
    var dataBar = [trace1]
    console.log("final plot data", dataBar);

    Plotly.newPlot('bar', dataBar);   
 


    otu_ids = sampleDataForSubject.otu_ids
    samples_values = sampleDataForSubject.sample_values

    var trace1 = {
        x: otu_ids,
        y: samples_values,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: samples_values
        }
      };
      
      var dataBubble = [trace1];
            
      Plotly.newPlot('bubble', dataBubble);


      meta_data = data.metadata.find(function(element) { 
        return element.id == testSubjectId; 
     }); 
     console.log("selected ", meta_data);
     var sel = document.getElementById('sample-metadata');
    //  ps = sel.getElementsByTagName('p')
     while (sel.hasChildNodes()) {
        sel.removeChild(sel.lastChild);
    }
    // create new option element
     var wfreq;  
     Object.keys(meta_data).forEach(elem=> {
         console.log(elem, meta_data[elem]);
         var opt = document.createElement('p');
         // create text node to add to option element (opt)
         if (elem === 'wfreq') {
           wfreq = meta_data[elem];
         }
         opt.appendChild(document.createTextNode(elem + ":" + meta_data[elem]) );
         // add opt to end of select box (sel)
         sel.appendChild(opt); 
       })

       console.log("the wfreq is:", wfreq);

       var data = [
        {
          domain: { x: [1, 1], y: [1, 1] },
          value: wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
          }
        }
      ];
      
      var layout = { width: 400, height: 400, margin: { t: 1, b: 0 } };
      Plotly.newPlot('gauge', data, layout);



    });
  }

