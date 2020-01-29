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


function statistics() {
    var selCellNames = window.selCellNames  // cells names selected in gate
    x = window.densityPlot.activeX
    y = window.densityPlot.activeY
    xBrush = window.brushedX    // x coordinates of brushed cells
    yBrush =  window.brushedY // y coordinates of brushed cells
    
    // cells NB
    totalCellNb = window.totalCells
    nbCellInPlot = x.length
    nbCellInGate = selCellNames.length

    // % of cells
    p100Gate = math.round(100 *  nbCellInGate / totalCellNb,2)        // % cells in gate compared to total nb of cells in t-SNE map
    p100GatePlot = math.round(100 *  nbCellInGate / nbCellInPlot,2)   // % cells in gate compared to total nb of cells in density plot
    p100plot = math.round(100 *  nbCellInPlot / totalCellNb,2)        // % cells in density plot compared to total nb of cells in t-SNE map

    // means
    meanDPlotX = math.round(mean(x),2)        // mean of all cells in dentity plot in X
    meanDPlotY = math.round(mean(y),2)        // mean of all cells in dentity plot in Y
    meanGateX = math.round(mean(xBrush),2)    // mean of all cells in gate in X
    meanGateY = math.round(mean(yBrush),2)    // mean of all cells in gate in Y

    // medians
    medianDPlotX = math.round(median(x),2)        // median of all cells in dentity plot in X
    medianDPlotY = math.round(median(y),2)        // median of all cells in dentity plot in Y
    medianGateX = math.round(median(xBrush),2)    // median of all cells in gate in X
    medianGateY = math.round(median(yBrush),2)    // median of all cells in gate in Y

    // standard deviation
    stdDPlotX = math.round(math.std(x),2)        // std of all cells in dentity plot in X
    stdDPlotY = math.round(math.std(y),2)        // std of all cells in dentity plot in Y
    stdGateX = math.round(math.std(xBrush),2)    // std of all cells in gate in X
    stdGateY = math.round(math.std(yBrush),2)    // std of all cells in gate in Y

    // variance
    varDPlotX = math.round(math.variance(x),2)        // var of all cells in dentity plot in X
    varDPlotY = math.round(math.variance(y),2)        // var of all cells in dentity plot in Y
    varGateX = math.round(math.variance(xBrush),2)    // var of all cells in gate in X
    varGateY = math.round(math.variance(yBrush),2)    // var of all cells in gate in Y

    // coeff variation
    cvDPlotX = math.round(CoefVar(x),2)        // cv of all cells in dentity plot in X
    cvDPlotY = math.round(CoefVar(y),2)        // cv of all cells in dentity plot in Y
    cvGateX = math.round(CoefVar(xBrush),2)    // cv of all cells in gate in X
    cvGateY = math.round(CoefVar(yBrush),2)    // cv of all cells in gate in Y
    
    // store all parameters in a dict
    par = {totalCellNb: totalCellNb, 
        nbCellInPlot: nbCellInPlot,
        nbCellInGate: nbCellInGate,
        p100Gate: p100Gate,
        p100GatePlot: p100GatePlot,
        p100plot: p100plot,
        meanDPlotX: meanDPlotX,
        meanDPlotY: meanDPlotY,
        meanGateX: meanGateX,
        meanGateY: meanGateY,
        medianDPlotX: medianDPlotX,
        medianDPlotY: medianDPlotY,
        medianGateX: medianGateX,
        medianGateY: medianGateY,
        stdDPlotX: stdDPlotX,
        stdDPlotY: stdDPlotY,
        stdGateX: stdGateX,
        stdGateY: stdGateY,
        varDPlotX: varDPlotX,
        varDPlotY: varDPlotY,
        varGateX: varGateX,
        varGateY: varGateY,
        cvDPlotX: cvDPlotX,
        cvDPlotY: cvDPlotY,
        cvGateX: cvGateX,
        cvGateY: cvGateY
     }
    
     return(par)

  }

// format stat parmeters in a string to print
  function formatStat() {
    var p = statistics()
    var e = document.getElementById("ListeP1");
    var userPar1 = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("ListeP2");
    var userPar2 = e2.options[e2.selectedIndex].value;

    if (userPar1 == '-- Select value --' || userPar2 == '-- Select value --') {
        return
    }

    str = ['scVirtual Cytometer Statistics',
            '------------------------------',
            '',
            `User parameters`,
            '---------------',
            `X parameter: ${userPar1}`,
            `Y parameter: ${userPar2}`,
            '',
            `Number of cells`,
            '---------------',
            `Total number of cells           : ${p["totalCellNb"]}`,
            `Number of cells in density plot : ${p["nbCellInPlot"]}`,
            `Number of cells in gate         : ${p["nbCellInGate"]}`,
            '',
            `% of cells`,
            '----------',
            `% cells in density plot / Total number of cells   : ${p["p100plot"]}`,
            `% cells in gate / Total number of cells           : ${p["p100Gate"]}`,
            `% cells in gate / number of cells in density plot : ${p["p100GatePlot"]}`,
            '',
            `Means`,
            '----------',
            `Mean of X cells in dentity plot : ${p["meanDPlotX"]}`,
            `Mean of Y cells in dentity plot : ${p["meanDPlotY"]}`,
            `Mean of X cells in gate         : ${p["meanGateX"]}`,
            `Mean of Y cells in gate         : ${p["meanGateY"]}`,
            '',
            `Medians`,
            '----------',
            `Median of X cells in dentity plot : ${p["medianDPlotX"]}`,
            `Median of Y cells in dentity plot : ${p["medianDPlotY"]}`,
            `Median of X cells in gate         : ${p["medianGateX"]}`,
            `Median of Y cells in gate         : ${p["medianGateY"]}`,
            '',
            `Standard deviation`,
            '----------',
            `SD of X cells in dentity plot : ${p["stdDPlotX"]}`,
            `SD of Y cells in dentity plot : ${p["stdDPlotY"]}`,
            `SD of X cells in gate         : ${p["stdGateX"]}`,
            `SD of Y cells in gate         : ${p["stdGateY"]}`,
            '',
            `Variance`,
            '----------',
            `VAR of X cells in dentity plot : ${p["varDPlotX"]}`,
            `VAR of Y cells in dentity plot : ${p["varDPlotY"]}`,
            `VAR of X cells in gate         : ${p["varGateX"]}`,
            `VAR of Y cells in gate         : ${p["varGateY"]}`,
            '',
            `Coefficient of Variation`,
            '----------',
            `CV of X cells in dentity plot : ${p["cvDPlotX"]}`,
            `CV of Y cells in dentity plot : ${p["cvDPlotY"]}`,
            `CV of X cells in gate         : ${p["cvGateX"]}`,
            `CV of Y cells in gate         : ${p["cvGateY"]}`,
    ].join('\n');

    return str
  }


// compute mean of an array
// credits https://www.jstips.co/en/javascript/array-average-and-median/
  function mean(arr){
    let sum = arr.reduce((previous, current) => current += previous);
    let avg = sum / arr.length;
    return avg
  }

  // coefficient variation = SD/mean
  function CoefVar(arr) {
      cv = 0
      var m = mean(arr)
      if (m != 0 ){
        cv = math.std(arr)/m
      } else {
          cv = "NA"
      }
      return cv
  }


  // statistics for quadrants
  function Quadstats() {

    Qx = window.quadranX           // x coordinates of Q1-Q4
    Qy = window.quadranY           // y coordinates of Q1-Q4
    Qnames = window.quadranNames   // cell names of quadrant Q1-Q4

    //var selCellNames = window.selCellNames  // cells names selected in gate
    x = window.densityPlot.activeX
    y = window.densityPlot.activeY
    
    // cells NB
    totalCellNb = window.totalCells
    nbCellInPlot = x.length
    CellInQ = Array(5).fill(0)
    p100CellInQ = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        CellInQ[i] = Qnames[i].length                                   // number of cells in each quadrant
        p100CellInQ[i] = math.round(100 * CellInQ[i] / nbCellInPlot,2)   // % cells in each quadrant compared to total nb of cells in t-SNE map
    }
  
    // means
    meanQuadX = Array(5).fill(0)
    meanQuadY = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        meanQuadX[i] = math.round(mean(Qx[i]),2)    // mean of all cells in quandrant i in X
        meanQuadY[i] = math.round(mean(Qy[i]),2)    // mean of all cells in quandrant i in Y
    }

    // medians
    medianQuadX = Array(5).fill(0)
    medianQuadY = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        medianQuadX[i] = math.round(median(Qx[i]),2)    // median of all cells in quandrant i in X
        medianQuadY[i] = math.round(median(Qy[i]),2)    // median of all cells in quandrant i in Y
    }

    // standard deviation
    stdQuadX = Array(5).fill(0)
    stdQuadY = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        stdQuadX[i] = math.round(math.std(Qx[i]),2)    // median of all cells in quandrant i in X
        stdQuadY[i] = math.round(math.std(Qy[i]),2)    // median of all cells in quandrant i in Y
    }

    
    // variance
    varQuadX = Array(5).fill(0)
    varQuadY = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        varQuadX[i] = math.round(math.variance(Qx[i]),2)    // var of all cells in quandrant i in X
        varQuadY[i] = math.round(math.variance(Qy[i]),2)    // var of all cells in quandrant i in Y
    }

    // coeff variation
    cvQuadX = Array(5).fill(0)
    cvQuadY = Array(5).fill(0)
    for (let i = 1; i < 5; i++) {
        cvQuadX[i] = math.round(CoefVar(Qx[i]),2)    // var of all cells in quandrant i in X
        cvQuadY[i] = math.round(CoefVar(Qy[i]),2)    // var of all cells in quandrant i in Y
    }
    
    // store all parameters in a dict
    par = {totalCellNb: totalCellNb, 
        nbCellInPlot: nbCellInPlot,
        CellInQ: CellInQ,
        p100CellInQ: p100CellInQ,
        meanQuadX: meanQuadX,
        meanQuadY: meanQuadY,
        medianQuadX: medianQuadX,
        medianQuadY: medianQuadY,
        stdQuadX: stdQuadX,
        stdQuadY: stdQuadY,
        varQuadX: varQuadX,
        varQuadY: varQuadY,
        cvQuadX: cvQuadX,
        cvQuadY: cvQuadY
     }
    
     return(par)
  }

  function formatQuadStat() {
    var p = Quadstats()
    var e = document.getElementById("ListeP1");
    var userPar1 = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("ListeP2");
    var userPar2 = e2.options[e2.selectedIndex].value;

    if (userPar1 == '-- Select value --' || userPar2 == '-- Select value --') {
        return
    }

    str = ['scVirtual Cytometer Statistics',
            '------------------------------',
            '',
            `User parameters`,
            '---------------',
            `X parameter: ${userPar1}`,
            `Y parameter: ${userPar2}`,
            '',
            `Number of cells`,
            '---------------',
            `Total number of cells           : ${p["totalCellNb"]}`,
            `Number of cells in density plot : ${p["nbCellInPlot"]}`,
            format4Quad("Number of cells in quadrant", p["CellInQ"]),
            '',
            `% of cells`,
            '----------',
            format4Quad("% cells in quadrant", p["p100CellInQ"]),
            '',
            `Means`,
            '----------',
            format4Quad("Mean of X cells in quadrant", p["meanQuadX"]),
            format4Quad("Mean of Y cells in quadrant", p["meanQuadY"]),
            '',
            `Medians`,
            '----------',
            format4Quad("Median of X cells in quadrant", p["medianQuadX"]),
            format4Quad("Median of Y cells in quadrant", p["medianQuadY"]),
            '',
            `Standard deviation`,
            '----------',
            format4Quad("SD of X cells in quadrant", p["stdQuadX"]),
            format4Quad("SD of Y cells in quadrant", p["stdQuadY"]),
            '',
            `Variance`,
            '----------',
            format4Quad("VAR of X cells in quadrant", p["varQuadX"]),
            format4Quad("VAR of Y cells in quadrant", p["varQuadY"]),
            '',
            `Coefficient of Variation`,
            '----------',
            format4Quad("CV of X cells in quadrant", p["cvQuadX"]),
            format4Quad("CV of Y cells in quadrant", p["cvQuadY"])
    ].join('\n');
   
    return str
  }

// format the output of one parameter for the 4 quadrants
// for example :
// Number of cells in quadrant 1 : 1932
// Number of cells in quadrant 2 : 2767
// Number of cells in quadrant 3 : 1403
// Number of cells in quadrant 4 : 1674
  function format4Quad(text, Qarray) {
      str = []
      for (let i = 1; i < 5; i++) {
        str.push(`${text} ${i} : ${Qarray[i]}`) 
    }
      return str.join("\n")
  }