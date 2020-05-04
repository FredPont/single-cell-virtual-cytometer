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

function SVGexport(){
  alert("SVG is better supported by Firefox. Each cell will be drawn as a circle. Exporting many cells can crash the web browser.")
  if (window.clusterMap == true) {
    clustSVGexport()  // if clusters are displayed
  } else {
    mapSVGexport()
  }

}

function mapSVGexport(){

  document.title = "Exporting plot..."

  progBar() // progress bar

  data = window.tSNEdata 
  var colValues = window.colValues
  var xName = window.tsne1
  var yName = window.tsne2
  var tsne1 = colValues[xName]
  var tsne2 = colValues[yName]

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
  // replace scattergl by scatter for better image output
  newdata = removeScatterGL(data)
  
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
     ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'svg',
        height: 550,
        width: 1100,
        filename: 'newplot'
    })
    });
    document.title = "Single Cell Virtual Cytometer"
    newdata = [] // free memory
}


function PNGexport(){

  if (window.clusterMap == true) {
    clustPNGexport()
  } else if (window.quadranX.length > 0) {
    QuadMapPNGexport()  // export map with quadrant statistics
  } else {
    mapPNGexport()
  }

}

function mapPNGexport(){

  document.title = "Exporting plot..."

  progBar() // progress bar
  
  
  data = window.tSNEdata 
  var colValues = window.colValues
  var xName = window.tsne1
  var yName = window.tsne2
  var tsne1 = colValues[xName]
  var tsne2 = colValues[yName]

  // number of cells in last gate :
  let cellsInGate = window.selCellNames.length
  let cellsInGatep100 = math.round(100 * cellsInGate / window.totalCells, 1)

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
      y: 1.3,
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 1.06,
      xanchor: 'right',
      y: 0.05,
      yanchor: 'bottom',
      text: 'Gated ' + cellsInGate  + ' cells (' + cellsInGatep100 + '%)' , // print number of cells in last gate
        font: {
          family: 'Courier New, monospace',
          size: 16,
          color: '#000000'
        },
      showarrow: false
    }],
    
  };
  // replace scattergl by scatter for better image output
  newdata = removeScatterGL(data)
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
     ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'png',
        height: 1100,
        width: 2200,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"
    newdata = [] // free memory
}

// export overlay cells from file on density plot
function PNGoverlayExport() {

  var dotsize = window.dotsize0

  document.title = "Exporting plot..."

  progBar() // progress bar
  userPar1 = window.userPar1
  userPar2 = window.userPar2

  xOverL = window.densPlotOverlayX
  yOverL = window.densPlotOverlayY

// coordinate of active plot density
  x = window.densityPlot.activeX
  y = window.densityPlot.activeY


  // if there is an overlay, cell color is grey else cells color is purple
  if ( window.overlay == true) {
    dotColor = 'rgb(182, 177, 188)'
  } else {
    dotColor = 'rgb(123,50,148)'
  }
  

  var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'points',
    marker: {
        color: dotColor,
        size: dotsize,
        opacity: 1
    },
    type: 'scatter'
    };
  var trace2 = {
    x: x,
    y: y,
    name: 'density',
    ncontours: 10,
    colorscale: 'Hot',
    reversescale: true,
    showscale: false,
    type: 'histogram2dcontour'
    };
  var trace3 = {
    x: x,
    nbinsx: 200,
    name: 'x density',
    marker: {color: 'rgb(120,89,228)'},
    yaxis: 'y2',
    type: 'histogram'
    };
  var trace4 = {
    y: y,
    nbinsy: 200,
    name: 'y density',
    marker: {color: 'rgb(223,32,153)'},
    xaxis: 'x2',
    type: 'histogram'
    };
  var trace5 = {
      x: xOverL,
      y: yOverL,
      mode: 'markers',
      name: 'points',
      marker: {
          color: 'red',
          size: dotsize,
          opacity: 1
      },
      type: 'scatter'
      };
  var data = [trace1, trace5, trace2, trace3, trace4];

  var layout = {}

  //console.log("window.quadran", window.quadran)
  if (window.quadran == true){
    xQuad = window.xQuad            // x position of quandran vertical line
    yQuad = window.yQuad            // y position of quandran vertical line
    Qprop = window.QuadPerCentage   // percentage of cells in each quadran
    Qx = window.quadranX            // x coordinates of Q1-Q4
    Qy = window.quadranY            // y coordinates of Q1-Q4
    var cellsinQ = []               // cells nb in quadran
    for (let i = 1; i < 5; i++) {
      cellsinQ.push(Qx[i].length)
      var trace5 = {
        x: Qx[i],
        y: Qy[i],
        mode: 'markers',
        name: 'points',
        marker: {
            color: layerColors[i-1],
            size: dotsize0,
            opacity: 1
        },
        type: 'scatter'
      };
      
      data.push(trace5)
    }
    




    var layout = {
      showlegend: false,
      autosize: false,
      width: 1000,
      height: 1000,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      dragmode: 'lasso',
      
       
      xaxis: {
          domain: [0, 0.85],
          showgrid : false,
          zeroline: false,
          showspikes: true,
          spikethickness: 1,
          spikedistance: 0,
          spikemode: "across",
          spikedash: "solid",
          spikesnap: "cursor",
          zeroline: true,
          title: {
              text: userPar1,
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
              }
            }
      },
      yaxis: {
          domain: [0, 0.85],
          showgrid : false,
          zeroline: false,
          showspikes: true,
          spikethickness: 1,
          spikedistance: 0,
          spikemode: "across",
          spikedash: "solid",
          spikesnap: "cursor",
          zeroline: true,
          title: {
              text: userPar2,
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
              }
            }
      },
      xaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false
      },
      yaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false
      },
      shapes: [{
        type: 'line',
        x0: xQuad,
        y0: 0,
        x1: xQuad,
        yref: 'paper',
        y1: 1,
        line: {
          color: 'grey',
          width: 1.5,
          dash: 'dot'
        }
      }, {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: yQuad,
        x1: 1,
        y1: yQuad,
        line: {
          color: 'grey',
          width: 1.5,
          dash: 'dot'
        }
      }],
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.3,
        xanchor: 'right',
        y: 0.8,
        yanchor: 'bottom',
        text: 'Q1=' + Qprop[1] + '% (' + cellsinQ[0] + ')' ,
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.55,
        xanchor: 'left',
        y: 0.8,
        yanchor: 'bottom',
        text: 'Q2=' + Qprop[2] + '% (' + cellsinQ[1] + ')',
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.55,
        xanchor: 'left',
        y: 0.1,
        yanchor: 'top',
        text: 'Q3=' + Qprop[3] + '% (' + cellsinQ[2] + ')',
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.3,
        xanchor: 'right',
        y: 0.1,
        yanchor: 'top',
        text: 'Q4=' + Qprop[4] + '% (' + cellsinQ[3] + ')',
        showarrow: false
      }]
    
    };
  } else {
    layout = {
    showlegend: false,
    autosize: false,
    width: 1000,
    height: 1000,
    margin: {t: 50},
    hovermode: 'closest',
    bargap: 0,
    dragmode: 'lasso',
    xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false,
        title: {
            text: userPar1,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
    },
    yaxis: {
        domain: [0, 0.85],
        showgrid : false,
        zeroline: false,
        title: {
            text: userPar2,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
    },
    xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
    },
    yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
    }
  };
  }
  
  // replace scattergl by scatter for better image output
  newdata = removeScatterGL(data)

  //densplot = document.getElementById('graphSVG');
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
    ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'png',
        height: 1000,
        width: 1000,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"

    newdata = [] // free memory
}

// export overlay cells from file on density plot
function SVGoverlayExport() {

  var dotsize = window.dotsize0

  document.title = "Exporting plot..."

  progBar() // progress bar
  userPar1 = window.userPar1
  userPar2 = window.userPar2

  xOverL = window.densPlotOverlayX
  yOverL = window.densPlotOverlayY

// coordinate of active plot density
  x = window.densityPlot.activeX
  y = window.densityPlot.activeY


  // if there is an overlay, cell color is grey else cells color is purple
  if ( window.overlay == true) {
    dotColor = 'rgb(182, 177, 188)'
  } else {
    dotColor = 'rgb(123,50,148)'
  }
  

  var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'points',
    marker: {
        color: dotColor,
        size: dotsize,
        opacity: 1
    },
    type: 'scatter'
    };
  var trace2 = {
    x: x,
    y: y,
    name: 'density',
    ncontours: 10,
    colorscale: 'Hot',
    reversescale: true,
    showscale: false,
    type: 'histogram2dcontour'
    };
  var trace3 = {
    x: x,
    nbinsx: 200,
    name: 'x density',
    marker: {color: 'rgb(120,89,228)'},
    yaxis: 'y2',
    type: 'histogram'
    };
  var trace4 = {
    y: y,
    nbinsy: 200,
    name: 'y density',
    marker: {color: 'rgb(223,32,153)'},
    xaxis: 'x2',
    type: 'histogram'
    };
  var trace5 = {
      x: xOverL,
      y: yOverL,
      mode: 'markers',
      name: 'points',
      marker: {
          color: 'red',
          size: dotsize,
          opacity: 1
      },
      type: 'scatter'
      };
  var data = [trace1, trace5, trace2, trace3, trace4];

  var layout = {}

  //console.log("window.quadran", window.quadran)
  if (window.quadran == true){
    xQuad = window.xQuad            // x position of quandran vertical line
    yQuad = window.yQuad            // y position of quandran vertical line
    Qprop = window.QuadPerCentage   // percentage of cells in each quadran
    Qx = window.quadranX            // x coordinates of Q1-Q4
    Qy = window.quadranY            // y coordinates of Q1-Q4
    var cellsinQ = []               // cells nb in quadran
    for (let i = 1; i < 5; i++) {
      cellsinQ.push(Qx[i].length)
      var trace5 = {
        x: Qx[i],
        y: Qy[i],
        mode: 'markers',
        name: 'points',
        marker: {
            color: layerColors[i-1],
            size: dotsize0,
            opacity: 1
        },
        type: 'scatter'
      };
      
      data.push(trace5)
    }
    




    var layout = {
      showlegend: false,
      autosize: false,
      width: 1000,
      height: 1000,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      dragmode: 'lasso',
      
       
      xaxis: {
          domain: [0, 0.85],
          showgrid : false,
          zeroline: false,
          showspikes: true,
          spikethickness: 1,
          spikedistance: 0,
          spikemode: "across",
          spikedash: "solid",
          spikesnap: "cursor",
          zeroline: true,
          title: {
              text: userPar1,
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
              }
            }
      },
      yaxis: {
          domain: [0, 0.85],
          showgrid : false,
          zeroline: false,
          showspikes: true,
          spikethickness: 1,
          spikedistance: 0,
          spikemode: "across",
          spikedash: "solid",
          spikesnap: "cursor",
          zeroline: true,
          title: {
              text: userPar2,
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
              }
            }
      },
      xaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false
      },
      yaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false
      },
      shapes: [{
        type: 'line',
        x0: xQuad,
        y0: 0,
        x1: xQuad,
        yref: 'paper',
        y1: 1,
        line: {
          color: 'grey',
          width: 1.5,
          dash: 'dot'
        }
      }, {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: yQuad,
        x1: 1,
        y1: yQuad,
        line: {
          color: 'grey',
          width: 1.5,
          dash: 'dot'
        }
      }],
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.3,
        xanchor: 'right',
        y: 0.8,
        yanchor: 'bottom',
        text: 'Q1=' + Qprop[1] + '% (' + cellsinQ[0] + ')' ,
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.55,
        xanchor: 'left',
        y: 0.8,
        yanchor: 'bottom',
        text: 'Q2=' + Qprop[2] + '% (' + cellsinQ[1] + ')',
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.55,
        xanchor: 'left',
        y: 0.1,
        yanchor: 'top',
        text: 'Q3=' + Qprop[3] + '% (' + cellsinQ[2] + ')',
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 0.3,
        xanchor: 'right',
        y: 0.1,
        yanchor: 'top',
        text: 'Q4=' + Qprop[4] + '% (' + cellsinQ[3] + ')',
        showarrow: false
      }]
    
    };
  } else {
    layout = {
    showlegend: false,
    autosize: false,
    width: 1000,
    height: 1000,
    margin: {t: 50},
    hovermode: 'closest',
    bargap: 0,
    dragmode: 'lasso',
    xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false,
        title: {
            text: userPar1,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
    },
    yaxis: {
        domain: [0, 0.85],
        showgrid : false,
        zeroline: false,
        title: {
            text: userPar2,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
    },
    xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
    },
    yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
    }
  };
  }
  
  // replace scattergl by scatter for better image output
  newdata = removeScatterGL(data)

  //densplot = document.getElementById('graphSVG');
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
    ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'svg',
        height: 1000,
        width: 1000,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"

    newdata = [] // free memory
}

function clustPNGexport(){
  document.title = "Exporting plot..."

  progBar() // progress bar

  // replace scattergl by scatter for better image output
  var dataLayout = initMapCluster('scatter')
  var newdata = dataLayout[0]
  var layout = dataLayout[1]
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
     ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'png',
        height: 1100,
        width: 2200,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"
    newdata = [] // free memory
}

// function that export t-SNE map with Quad statistics
function QuadMapPNGexport(){

  document.title = "Exporting plot..."

  progBar() // progress bar

  // compute Quad statistics
  Qnames = window.quadranNames   // cell names of quadrant Q1-Q4

  //var selCellNames = window.selCellNames  // cells names selected in gate
  //x = window.densityPlot.activeX
  //y = window.densityPlot.activeY

  Qprop = window.QuadPerCentage
  // cells NB
  //totalCellNb = window.totalCells
  
  //nbCellInPlot = x.length
  CellInQ = Array(5).fill(0)
  p100CellInQ = Array(5).fill(0)
  for (let i = 1; i < 5; i++) {
      CellInQ[i] = Qnames[i].length                                   // number of cells in each quadrant
      //p100CellInQ[i] = math.round(100 * CellInQ[i] / nbCellInPlot,2)   // % cells in each quadrant compared to total nb of cells in t-SNE map
  }
  
  
  data = window.tSNEdata
  var colValues = window.colValues
  var xName = window.tsne1
  var yName = window.tsne2
  var tsne1 = colValues[xName]
  var tsne2 = colValues[yName]

  // insert quadrant number Qi in the legend folowed by the xy parameters of the density plot
  for (let i = 1; i <= 4; i++) {
    data[i].name =  "Q" + i + " (" + data[i].name + ")"
  }

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
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 1.,
      xanchor: 'left',
      y: 0.19,
      yanchor: 'bottom',
      text: 'Q1=' + Qprop[1] + '% (' + CellInQ[1] + ')' ,
      showarrow: false
    }, {
      xref: 'paper',
      yref: 'paper',
      x: 1.,
      xanchor: 'left',
      y: 0.16,
      yanchor: 'bottom',
      text: 'Q2=' + Qprop[2] + '% (' + CellInQ[2] + ')',
      showarrow: false
    }, {
      xref: 'paper',
      yref: 'paper',
      x: 1.,
      xanchor: 'left',
      y: 0.13,
      yanchor: 'bottom',
      text: 'Q3=' + Qprop[3] + '% (' + CellInQ[3] + ')',
      showarrow: false
    }, {
      xref: 'paper',
      yref: 'paper',
      x: 1.,
      xanchor: 'left',
      y: 0.1,
      yanchor: 'bottom',
      text: 'Q4=' + Qprop[4] + '% (' + CellInQ[4] + ')',
      showarrow: false
    }]
    
  };
  // replace scattergl by scatter for better image output
  newdata = removeScatterGL(data)
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
     ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'png',
        height: 1100,
        width: 2200,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"
    newdata = [] // free memory
}

function clustSVGexport(){
  document.title = "Exporting plot..."

  progBar() // progress bar

  // replace scattergl by scatter for better image output
  var dataLayout = initMapCluster('scatter')
  var newdata = dataLayout[0]
  var layout = dataLayout[1]
  Plotly.purge('graphSVG')
  Plotly.plot(
    'graphSVG',
    newdata,
    layout
     ).then(function(gd) {
    Plotly.downloadImage(gd, {
        format: 'svg',
        height: 1100,
        width: 2200,
        filename: 'newplot'
    })
    });
    
    document.title = "Single Cell Virtual Cytometer"
    newdata = [] // free memory
}

// progress bar
function progBar() {
  var progressbar = {
    // le noeud html de la barre de progression
    //node : document.querySelector("pb1"),
    node : document.getElementById("pb1"),
      
    // le pas de progression
    step : 10,
      
    // un jeton pour différencier les différents processus
    token : null,
      
    // assigne la valeur value à la barre de progression
    set : function( value ){
        this.node.value =  value;
        //this.node.textContent = value + " %";
    },
      
    // le fonction récursive qui joue la progression
    play : function( value, token){
      
        if( token != this.token){
          // si on a lancé un autre processus, on abandonne celui-ci
            return;
        }
        if( value <= 100 ){
          this.set( value );
          // on appelle le pas suivant avec le setTimeout
          var next = function(){ progressbar.play( value + progressbar.step , token);};
          setTimeout( next, 120);
        } else {
          document.getElementById("pb1").style.visibility = "hidden";
        }
       
    },
      
    begin : function( value ){
      
      // on démarre une progression, on crée un jeton pour différencier ce processus des autres
      var token = Math.random();
      this.token = token;
      this.play( 0, token);
    }
      
  } // fin progressbar

  document.getElementById("pb1").style.visibility = "visible";
  progressbar.begin(0);
  
}  
//