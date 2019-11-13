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



// open a file on the disk and extract data and colnames in dictionnary "colValues"
        
var openFile = function() {
    var input = document.getElementById("input_file").files[0]
    
    progBar() // progress bar

    initStack() // var initialisation

    setFileName(input.name) // set filename in html page

    
    var reader = new FileReader();
    var colValues = {}  // dictionnary colnames -> array of data values
    //var cellNames = []
    var col1 = ""       // name of the 1st column containing cell names
    // fill colValues with data from file
    reader.onload = function(){
        
            var text = reader.result                // read all file in one string
            var fileLines = text.split("\n")        // array of all lines
            var fileLength = fileLines.length
            var header = fileLines[0].split("\t")   // column names
            header = shortColNames(header, 40)      // short colnames
            var headerLength = header.length
            col1 = header[0]
       
            for (var l = 1; l < fileLength -1; l++) {     // fileLength -1 because header was removed     
                var curRow = fileLines[l].split("\t")  
    
                for (var c = 0; c < headerLength; c++) {
                    // first column with cell names : do not parse floats
                    if( c == 0){
                        if ( !(header[c] in colValues)) { // test if key does not exist
                            var colArray = new Array()
                            colArray.push(curRow[c])
                            colValues[header[c]] = colArray
                        } else {  
                            colValues[header[c]].push(curRow[c])  
                        } 
                    } else {
                       if ( !(header[c] in colValues)) { // test if key does not exist
                            var colArray = new Array()
                            colArray.push(parseFloat(curRow[c]))
                            colValues[header[c]] = colArray
                        } else {  
                            colValues[header[c]].push(parseFloat(curRow[c]))  
                        }  
                    }
                    
                }
            }
    
            // show the dropdown lists
            
            showLists(header)
            
            window.colValues = colValues
            window.cellNames = colValues[col1] // all cells names
            
            var CellNames = window.cellNames
            // get x,y column names
            var [xName, yName] = xyColNames(header)
            var tsne1 = colValues[xName]
            var tsne2 = colValues[yName]
            // dictionnary cellNames => [tSNE1,tSNE2]
            CellstSNE = DicoCelltSNE(tsne1, tsne2, CellNames)
            window.CellstSNE = CellstSNE
            window.tsne1 = xName
            window.tsne2 = yName 
            window.cellsInPlot = (fileLength-2) // -1 remove header of the file -1 last newline
            window.totalCells =  (fileLength-2) // initial nb of cells
    };

    setTimeout(function(){ 
       reader.readAsText(input);  
       document.getElementById("input_file").value = null // reset openfile button
    },1000)
    
    return
};


// show the dropdown lists
function showLists(header){
    var d=document.FormP1.ListeP1;
    var d2=document.FormP2.ListeP2; 
    var d3=document.FormP3.Xmap; 
    var d4=document.FormP4.Ymap; 
    var L =  header.length
    for (var i=1; i < L; i++){ //remove first column with cells ID
        d.length++; 
        d.options[i].text = header[i].replace(/_/g, " ");  // replace _ by space
        d.options[i].value = header[i]
        d2.length++;
        d2.options[i].text = header[i].replace(/_/g, " "); // replace _ by space
        d2.options[i].value = header[i]
        d3.length++;
        d3.options[i].text = header[i].replace(/_/g, " "); // replace _ by space
        d3.options[i].value = header[i]
        d4.length++;
        d4.options[i].text = header[i].replace(/_/g, " "); // replace _ by space
        d4.options[i].value = header[i]
    }

    // var d2=document.FormP2.ListeP2; 
    // for (var i=1; i < L; i++){ //remove first column with cells ID
    //     d2.length++; 
    //     d2.options[i].text = header[i].replace(/_/g, " "); // replace _ by space
    //     d2.options[i].value = header[i]
    // }  
} 


// get tSNE or UMAP column names = last two colums by default
function xyColNames(header) {
    hMax = header.length -1
    var x = header[hMax-1]
    var y = header[hMax]
    return [x, y]
}


function DicoCelltSNE(tsne1, tsne2, CellNames){
    CellstSNE = {}
    var L = tsne1.length
    for(var i=0; i < L; ++i) {
        CellstSNE[CellNames[i]] = [tsne1[i], tsne2[i]]
    }
    return CellstSNE
}


// shortColNames truncate the colNames to avoid very large colnames in dropdown lists of GUI
function shortColNames(colnames, strLength) {
    var shortColNames = []
    var L = colnames.length
    for (var i=0; i < L; i++){
        if (colnames[i].length > strLength) {
            short = colnames[i].substring(0, strLength) + "..."; 
            shortColNames.push(short)
        } else {
            shortColNames.push(colnames[i])
        }
        
    }  
    return shortColNames
}

// change filename in interface
function setFileName(fn) {
    fn1 = `Active File : ${fn}`
    document.getElementById("filename").innerHTML = fn1
}

function enableButton(id) {
    //b = document.getElementById(id)
    //console.log(b)
    document.getElementById(id).classList.remove('disabled')
}

