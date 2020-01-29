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



function upload(name) {
    progBar() // progress bar
    exportAlert()
    selectedCells = window.selCellNames
    selectedCells = selectedCells.join('\n')
    var a = document.createElement("a");
    document.body.appendChild(a)
    var file = new Blob([selectedCells], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.style.display = "none";
    a.click();
    document.body.removeChild(a);
}

function exportAlert() {
  if (window.stack == true) {
    alert("Only the last stack layer will be exported !");
  }
}

function exportQuadranCells(name) {

  Qx = window.quadranX            // x coordinates of Q1-Q4
  Qy = window.quadranY            // y coordinates of Q1-Q4
  Qnames = window.quadranNames    // cell names of quadrant Q1-Q4

  progBar() // progress bar
  
  var output = [] // array of rows of cell names X Y separated by tab
  for (let i = 1; i < 5; i++) {
    for (let j = 0; j < Qnames[i].length ; j++) {
      output.push(["Q" + i , Qnames[i][j], Qx[i][j], Qy[i][j]].join('\t'))
      //console.log(i,j,Qnames[i][j], Qx[i][j], Qy[i][j])
    }
  }
  table = output.join('\n')

  var a = document.createElement("a");
  document.body.appendChild(a)
  var file = new Blob([table], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.style.display = "none";
  a.click();
  document.body.removeChild(a);
}

function exportStatistics(name) {

  progBar() // progress bar

  var table = ""

  if (window.quadran == true) {
    table = formatQuadStat()
  } else {
    table = formatStat()
  }

  var a = document.createElement("a");
  document.body.appendChild(a)
  var file = new Blob([table], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.style.display = "none";
  a.click();
  document.body.removeChild(a);
}