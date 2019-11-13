 
 // This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Written by Frederic PONT.
//(c) Frederic Pont 2019
 
 function showData() {

    var e = document.getElementById("ListeP1");
    var userPar1 = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("ListeP2");
    var userPar2 = e2.options[e2.selectedIndex].value;

    if (userPar1 == '-- Select value --' || userPar2 == '-- Select value --') {
        return
    }
    

    initOverlay() // initialisation of overlay xy coordinates + enable the overlay button
    //enableOverlayFileBut()
    initQuadran() // initialisation of quadran colors and coordinates
    document.title = "updating..."

    var colValues = window.colValues
    var quadran = window.quadran
    var graph1 = document.getElementById('densplot');
   
    var color1 = '#7b3294';
    var color2 = '#bcb2b2';
    var x1 = [] // user dropdown list selected coordinates
    var y1 = []

    if (window.cumulGate == true) {
        if (window.freezeGate == true) {
            var gate = window.gate
            x1 = gate[userPar1]
            y1 = gate[userPar2]  
        } else {
            gatePts()
            var gate = window.gate
            x1 = gate[userPar1]
            y1 = gate[userPar2]  
        }
    } else {
      //initTSNE()
      x1 = colValues[userPar1]
      y1 = colValues[userPar2]
    }
    
    window.densityPlot.activeX = x1
    window.densityPlot.activeY = y1
    densityPlot(x1,y1,userPar1,userPar2, color1, 'densplot')

    // when density graph is clicked
    graph1.on('plotly_click', function(eventdata){
      if (quadran == false) {
        return
      }
        quadSplit(eventdata.points[0].x.toPrecision(4),eventdata.points[0].y.toPrecision(4))
      })

    // when density graph is brushed
    graph1.on('plotly_selected', function(eventData) {
      var x = [];
      var y = [];
      var colors = [];
      // return if quadran is enabled to record the click only
      if (quadran == true) {
        return
      }

      document.title = "updating..."
      
      var nbCells = 0
      eventData.points.forEach(function(pt) {
        x.push(pt.x);
        y.push(pt.y);
        colors[pt.pointNumber] = color1;
        nbCells++
      });

      selCellNames = selectedCellNames(x, y, x1, y1)
      window.selCellNames = selCellNames
      // dictionnary cellNames => [tSNE1,tSNE2]
      CellstSNE = window.CellstSNE

      var x2 = [];
      var y2 = [];
      var L = selCellNames.length
      for(var i=0; i < L; ++i) {
        x2.push(CellstSNE[selCellNames[i]][0])
        y2.push(CellstSNE[selCellNames[i]][1])
        
      }

      plotTSNE(colValues, color2, userPar1, userPar2, x2, y2, "")
      
      // change color of selected points
      Plotly.restyle(graph1, 'marker.color', [colors], [0]);

      document.title = "Single Cell Virtual Cytometer"
      });

      document.title = "Single Cell Virtual Cytometer"
}


function plotTSNE(colValues, color2, userPar1, userPar2, x2, y2, legend){
    var xName = window.tsne1
    var yName = window.tsne2
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]
    var layerColor = genColors()
    

    if (legend == "") {
      legend = userPar1 + " + " + userPar2
    }

    var trace1 = {
        x: tsne1,
        y: tsne2,
        type: 'scattergl',
        mode: "markers" ,
        name : xName + " - " + yName,
        marker: {color: color2, size: window.dotsizeTSNE}
      };

      //setDotSize1() // set dot size of t-SNE graph
      dotsize1 = window.dotsize1
      var trace2 = {
        x: x2,
        y: y2,
        type: 'scattergl',
        mode: "markers",
        name : legend, 
        marker: {
          color: layerColor,
          size: dotsize1,
          opacity: 1
        }
      };
      var data = [trace1, trace2];
      // var data = [trace2];

      var layout = {
        width: 1000,
        height: 550,
        xaxis: {
          showgrid : false,
          zeroline: false,
          range: [Math.min(tsne1), Math.max(tsne1)],
          title: {
            text: xName,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
        },
        yaxis: {
          showgrid : false,
          zeroline: false,
          range: [Math.min(tsne2), Math.max(tsne2)],
          title: {
            text: yName,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
        },
        showlegend: true,
        legend: {
          x: 1.0,
          y: 1.3
        },
        
        //title:'t-SNE plot'
      };

      // plot t-SNE map
      if (window.stack == true) {
        // when window.stackNB == 1 the tSNE is plotted in grey one time with the 1st quadran
        // then the next 3 quadrants are ploted alone
        if(window.quadran == true && window.cumulGate == true && window.stackNB == 1){
          // plot trace1 = tSNE + trace2 = 1st quadrant
          Plotly.plot('graph2', [trace1, trace2], layout);
          window.stackNB++
        } else {
          Plotly.plot('graph2', [trace2], layout);
          window.stackNB++
        }
          
      } else {
          initTSNE()  // initialisation of tSNE data to avoid merging tSNE data when stack = false
          Plotly.purge('graph2');
          Plotly.react('graph2', data, layout);
      }
      
      storeTSNEdata(color2, userPar1, userPar2, x2, y2, layerColor)

}

// this function store the data to build the t-SNE graph in SVG
function storeTSNEdata(color2, userPar1, userPar2, x2, y2, layerColor) {

    var ws = window.stack
    var wts = window.tSNEdata
    var colValues = window.colValues
    var xName = window.tsne1
    var yName = window.tsne2
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]
    var tSNEdotsize = window.dotsizeTSNE

    window.tSNEcolors.push(layerColor)

    var trace1 = {
        x: tsne1,
        y: tsne2,
        type: 'scattergl',
        mode: "markers" ,
        name : xName + " - " + yName,
        marker: {color: color2, size: tSNEdotsize}
      };

      //setDotSize1() // set dot size of t-SNE graphe
      dotsize1 = window.dotsize1
      var trace2 = {
        x: x2,
        y: y2,
        type: 'scattergl',
        mode: "markers",
        name : userPar1 + " + " + userPar2, 
        marker: {
          color: layerColor,
          size: dotsize1,
          opacity: 1
        }
      };
    // if stack is on we increase the number of stored data
    if ( ws == true && wts.length > 0) {
        wts.push(trace2)
    } else {
        wts.push(trace1, trace2)
    } 

    //window.tSNEdata = removeScatterGL(wts)
    window.tSNEdata = removeDupStacks(wts)
    //console.log(window.tSNEdata)
}

// replot tSNE plot to change dot size
function refreshTSNE(){

  document.title = "updating..."

  progBar() // progress bar
  
  var data = window.tSNEdata 
  var colValues = window.colValues
  var xName = window.tsne1
  var yName = window.tsne2
  var tsne1 = colValues[xName]
  var tsne2 = colValues[yName]
  var dotsize1 = window.dotsize1 
  var tSNEdotsize = window.dotsizeTSNE

  var layout = {
    width: 1100,
    height: 550,
    xaxis: {
      showgrid : false,
      zeroline: false,
      range: [Math.min(tsne1), Math.max(tsne1)],
      title: {
        text: xName,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#000000'
        }
      }
    },
    yaxis: {
      showgrid : false,
      zeroline: false,
      range: [Math.min(tsne2), Math.max(tsne2)],
      title: {
        text: yName,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#000000'
        }
      }
    },
    showlegend: true,
    legend: {
      x: 1.0,
      y: 1.3
    },
    
  };

  //
  data[0].marker.size = tSNEdotsize;
  // change dot size for all data except t-SNE
  var L = data.length
  for (let i = 1; i < L; i++) {
    data[i].marker.size = dotsize1;
  }

  
  Plotly.purge('graph2')
  Plotly.react('graph2', data, layout);
  //Plotly.newPlot('graph2', data, layout);

  document.title = "Single Cell Virtual Cytometer"

}



function deleteTrace(){
  //Plotly.deleteTraces('densplot', 0);
  Plotly.purge('densplot')
};

function deleteTracetSNE(){
  //Plotly.deleteTraces('graph2', 0);
  Plotly.purge('graph2')
};


function setDotSize0() {
  //progBar() // progress bar
  var e = document.getElementById("dotSize0");
  var dotsize0 = e.options[e.selectedIndex].value;
  window.dotsize0 = dotsize0
 
  if (window.quadran == true) {
    refreshdensityPlotQuadran()
  } else if (window.overlay == true) {
    refreshDensityPlot()
  } else {
    showData()
  }
}

// dot size of cells layers over tSNE
function setDotSize1() {
  //progBar() // progress bar
  var e = document.getElementById("dotSize1");
  var dotsize1 = e.options[e.selectedIndex].value;
  window.dotsize1 = dotsize1 
  refreshTSNE()
}

// dot size of  all cells tSNE
function setDotSizeTSNE() {
  //progBar() // progress bar
  var e = document.getElementById("dotSizeTSNE");
  var dotsizeTSNE = e.options[e.selectedIndex].value;
  window.dotsizeTSNE = dotsizeTSNE 
  refreshTSNE()
}

function genColors() {

    var palette = ["#000000", "#000033", "#000066", "#000099", "#0000cc", "#0000ff", "#003300", "#003333", "#003366", "#003399", "#0033cc", "#0033ff", "#006600", "#006633", "#006666", "#006699", "#0066cc", "#0066ff", "#009900", "#009933", "#009966", "#009999", "#0099cc", "#0099ff", "#00cc00", "#00cc33", "#00cc66", "#00cc99", "#00cccc", "#00ccff", "#00ff00", "#00ff33", "#00ff66", "#00ff99", "#00ffcc", "#00ffff", "#330000", "#330033", "#330066", "#330099", "#3300cc", "#3300ff", "#333300", "#333333", "#333366", "#333399", "#3333cc", "#3333ff", "#336600", "#336633", "#336666", "#336699", "#3366cc", "#3366ff", "#339900", "#339933", "#339966", "#339999", "#3399cc", "#3399ff", "#33cc00", "#33cc33", "#33cc66", "#33cc99", "#33cccc", "#33ccff", "#33ff00", "#33ff33", "#33ff66", "#33ff99", "#33ffcc", "#33ffff", "#660000", "#660033", "#660066", "#660099", "#6600cc", "#6600ff", "#663300", "#663333", "#663366", "#663399", "#6633cc", "#6633ff", "#666600", "#666633", "#666666", "#666699", "#6666cc", "#6666ff", "#669900", "#669933", "#669966", "#669999", "#6699cc", "#6699ff", "#66cc00", "#66cc33", "#66cc66", "#66cc99", "#66cccc", "#66ccff", "#66ff00", "#66ff33", "#66ff66", "#66ff99", "#66ffcc", "#66ffff", "#990000", "#990033", "#990066", "#990099", "#9900cc", "#9900ff", "#993300", "#993333", "#993366", "#993399", "#9933cc", "#9933ff", "#996600", "#996633", "#996666", "#996699", "#9966cc", "#9966ff", "#999900", "#999933", "#999966", "#999999", "#9999cc", "#9999ff", "#99cc00", "#99cc33", "#99cc66", "#99cc99", "#99cccc", "#99ccff", "#99ff00", "#99ff33", "#99ff66", "#99ff99", "#99ffcc", "#99ffff", "#cc0000", "#cc0033", "#cc0066", "#cc0099", "#cc00cc", "#cc00ff", "#cc3300", "#cc3333", "#cc3366", "#cc3399", "#cc33cc", "#cc33ff", "#cc6600", "#cc6633", "#cc6666", "#cc6699", "#cc66cc", "#cc66ff", "#cc9900", "#cc9933", "#cc9966", "#cc9999", "#cc99cc", "#cc99ff", "#cccc00", "#cccc33", "#cccc66", "#cccc99", "#cccccc", "#ccccff", "#ccff00", "#ccff33", "#ccff66", "#ccff99", "#ccffcc", "#ccffff", "#ff0000", "#ff0033", "#ff0066", "#ff0099", "#ff00cc", "#ff00ff", "#ff3300", "#ff3333", "#ff3366", "#ff3399", "#ff33cc", "#ff33ff", "#ff6600", "#ff6633", "#ff6666", "#ff6699", "#ff66cc", "#ff66ff", "#ff9900", "#ff9933", "#ff9966", "#ff9999", "#ff99cc", "#ff99ff", "#ffcc00", "#ffcc33", "#ffcc66", "#ffcc99", "#ffcccc", "#ffccff", "#ffff00", "#ffff33", "#ffff66", "#ffff99", "#ffffcc", "#ffffff"]
    var stackColor = ["#7b3294", "red", "blue", "green", "#FFD700", "#FF00FF", "#20B2AA", "#800000", "#00CED1", "#FA8072"]
    var L = stackColor.length
    if (window.stackNB > L) {
        rand = getRandomInt(0, palette.length)
        layerColor = palette[rand]
    } else {
        layerColor = stackColor[window.stackNB]
    }
    return layerColor
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// replace scattergl by scatter for image saving
function removeScatterGL(data) {
  var newDat = data
  //console.log(data)
  var L = newDat.length
  for (let i = 0; i < L; i++) {
    
    if (newDat[i].type == "scattergl") {
      newDat[i].type = "scatter"
    }
    
  }
  return newDat
}

// when tSNE graph is refreshed unwanted scatterGL trace is store by storeTSNEdata() and stacks are duplicated
function removeDupStacks(data) {
  var xy = {};  // dictionnay of [xy]
  var newDat = []
  var L = data.length
  for (let i = 0; i < L; i++) {
    
    if ([data[i].x, data[i].y] in xy) {
      continue ;
    } else {
      xy[[data[i].x, data[i].y]] = true
      newDat.push(data[i])
    }
    
  }
  return newDat
}