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


function densityPlot(x,y,userPar1,userPar2,dotColor, plotID) {

    var density_dot_min = 500
    window.cellsInPlot = x.length
    dotsize0 = window.dotsize0
   
    var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'points',
    marker: {
        color: dotColor,
        size: dotsize0,
        opacity: 1
    },
    type: 'scattergl'
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

    // remove contour when the number of dot is low (<density_dot_min)
    if (x.length < density_dot_min) {
      trace2 = {}
    } else {
      ncontour = 20
    }



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

    

    var data = [trace2, trace3, trace4, trace1];
    var xlegend = "" // name of x parameter + nb of cells
    var layout = {
    showlegend: false,
    autosize: false,
    width: 550,
    height: 550,
    margin: {t: 50},
    hovermode: 'closest',
    bargap: 0,
    dragmode: 'select',
    xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        showspikes: true,
        spikethickness: 1,
        spikedistance: 0,
        spikemode: "across",
        spikedash: "solid",
        spikesnap: "cursor",
        zeroline: true,
        title: {
            text: xlegend.concat(userPar1, " (", window.cellsInPlot, " cells)"),
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#000000'
            }
          }
    },
    yaxis: {
        domain: [0, 0.85],
        showgrid: false,
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
    }
    };
    //Plotly.newPlot('tester', data, layout);
    
    densplot = document.getElementById(plotID);
    Plotly.purge(densplot);

    // store user parameters to be able to overlay a cell file
    window.userPar1 = userPar1
    window.userPar2 = userPar2
    Plotly.react(densplot, data, layout, {responsive: true})
    //Plotly.plot(densplot, data, layout, {responsive: true})
}

// density plot with quandrant overlayed
function densityPlotQuadran(x,y,userPar1,userPar2,dotColor, plotID, xQuad, yQuad, Qprop, Qx, Qy) {

    //console.log("plot x", x, "plot y", y)
    //setDotSize0() // set dot size of graphe 0
    dotsize0 = window.dotsize0
    layerColors = window.tSNEcolors // colors of the layers in tSNE map
    
   
    var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'points',
    marker: {
        color: dotColor,
        size: dotsize0,
        opacity: 1
    },
    type: 'scattergl'
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

    var data = [trace2, trace3, trace4, trace1];
    var cellsinQ = [] // cells nb in quadran
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
        type: 'scattergl'
      };
      
      data.push(trace5)
    }
    

    

    var layout = {
    showlegend: false,
    autosize: false,
    width: 550,
    height: 550,
    margin: {t: 50},
    hovermode: 'closest',
    bargap: 0,
    dragmode: 'lasso',
    hoverlabel: false,
     
    xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        showspikes: true,
        showticklabels: true,
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
        showgrid: false,
        showspikes: true,
        showticklabels: true,
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
    //Plotly.newPlot('tester', data, layout);
    
    densplot = document.getElementById(plotID);
    Plotly.purge(densplot);

    // store user parameters to be able to overlay a cell file
    window.userPar1 = userPar1
    window.userPar2 = userPar2
    Plotly.react(densplot, data, layout, {responsive: true})
    //Plotly.plot(densplot, data, layout, {responsive: true})
}

function refreshDensityPlot() {

  //var dotsize = window.dotsize0

  document.title = "updating..."
  var plotID = 'densplot'
  var graph2 = document.getElementById('graph2');

  progBar() // progress bar
  userPar1 = window.userPar1
  userPar2 = window.userPar2

// coordinate of active plot density
  x = window.densityPlot.activeX
  y = window.densityPlot.activeY

  // coordinate of overlay file
  xOverL = window.densPlotOverlayX
  yOverL = window.densPlotOverlayY

  // if there is an overlay, cell color is grey else cells color is purple
  // console.log(typeof xOverL, xOverL)
  if (window.overlay == true) {
    dotColor = 'rgb(182, 177, 188)' // grey
  } else {
    dotColor = 'rgb(123,50,148)' // purple
  }
  
  dotsize0 = window.dotsize0
 
  var trace1 = {
  x: x,
  y: y,
  mode: 'markers',
  name: 'points',
  marker: {
      color: dotColor,
      size: dotsize0,
      opacity: 1
  },
  type: 'scattergl'
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

  

  var data = [trace2, trace3, trace4, trace1];

  // if there is an overlay, overlay trace 5 id added to data
  if (window.overlay == true) {
    var trace5 = {
    x: xOverL,
    y: yOverL,
    mode: 'markers',
    name: 'points',
    marker: {
        color: 'red',
        size: dotsize0,
        opacity: 1
    },
    type: 'scattergl'
    };
    data.push(trace5)
  } 

  var layout = {
  showlegend: false,
  autosize: false,
  width: 550,
  height: 550,
  margin: {t: 50},
  hovermode: 'closest',
  bargap: 0,
  dragmode: 'lasso',
  xaxis: {
      domain: [0, 0.85],
      showgrid: false,
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
      showgrid: false,
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
  }
  };
  
  densplot = document.getElementById(plotID);
  Plotly.purge(densplot);
  Plotly.react(densplot, data, layout, {responsive: true})
  //Plotly.plot(densplot, data, layout, {responsive: true})

  document.title = "Single Cell Virtual Cytometer"
}

function refreshdensityPlotQuadran() {

  document.title = "updating..."
  var plotID = 'densplot'
  var dotColor = '#7b3294';
  progBar() // progress bar
  userPar1 = window.userPar1
  userPar2 = window.userPar2

// coordinate of active plot density
  x = window.densityPlot.activeX
  y = window.densityPlot.activeY

  xQuad =	window.xQuad 	//	 x position of quandran vertical line
  yQuad =	window.yQuad 	//	 y position of quandran vertical line
  Qprop =	window.QuadPerCentage 	//	 percentage of cells in each quadran
  Qx =	window.quadranX 	//	 x coordinates of Q1-Q4
  Qy =	window.quadranY 	//	 y coordinates of Q1-Q4
 
  //console.log("plot x", x, "plot y", y)
  //setDotSize0() // set dot size of graphe 0
  dotsize0 = window.dotsize0
  layerColors = window.tSNEcolors // colors of the layers in tSNE map
  
 
  var trace1 = {
  x: x,
  y: y,
  mode: 'markers',
  name: 'points',
  marker: {
      color: dotColor,
      size: dotsize0,
      opacity: 1
  },
  type: 'scattergl'
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

  var data = [trace2, trace3, trace4, trace1];
  var cellsinQ = [] // cells nb in quadran
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
      type: 'scattergl'
    };
    
    data.push(trace5)
  }
  

  

  var layout = {
  showlegend: false,
  autosize: false,
  width: 550,
  height: 550,
  margin: {t: 50},
  hovermode: 'closest',
  bargap: 0,
  dragmode: 'lasso',
  
   
  xaxis: {
      domain: [0, 0.85],
      showgrid: false,
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
      showgrid: false,
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
  //Plotly.newPlot('tester', data, layout);
  
  densplot = document.getElementById(plotID);
  Plotly.purge(densplot);

  // store user parameters to be able to overlay a cell file
  window.userPar1 = userPar1
  window.userPar2 = userPar2
  
  Plotly.react(densplot, data, layout, {responsive: true})
  //Plotly.plot(densplot, data, layout, {responsive: true})
  document.title = "Single Cell Virtual Cytometer"
}