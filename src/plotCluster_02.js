function plotCluster(ClustName, clustNB, markerType){
    document.title = "updating..."
    progBar() // progress bar
    var colValues = window.colValues
    var xName = window.tsne1
    var yName = window.tsne2
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]
    var clusterVal = colValues[ClustName]
   
    var layerColor = ClustColors(clusterVal, clustNB)

    // Get the cluster checkbox state
    var ClustCheckBox = document.getElementById("ClustCheckBox");

    // compute the center of the clusters
    clustCenter =  ClustCenters(ClustName)
    xlabel = clustCenter[0] 
    ylabel = clustCenter[1] 
    labels = clustCenter[2]  
    
    var trace1 = {
        x: tsne1,
        y: tsne2,
        
        hovertemplate: '<i>'+ ClustName + '</i>: ' + '<b>%{text}</b>',
        type: markerType,
        mode: "markers" ,
        marker: {
          size: window.dotsizeTSNE,
          color: layerColor
        },
        text: clusterVal, // cluster nb is displayed when the mouse is over one dot
      };

    var plotAnot = {}
    if (ClustCheckBox.checked == true) {
        plotAnot = {
                x: xlabel,
                y: ylabel,
                mode: "text",
                text: labels,
                type: "scattergl",
                textfont: {
                  family: 'Courier New, monospace',
                      size: 18,
                      color: '#000000'
                }
          }
      }
      

      //setDotSize1() // set dot size of t-SNE graph
      dotsize1 = window.dotsize1
     
      var data = [trace1, plotAnot];

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
        showlegend: false,
        legend: {
          x: 1.0,
          y: 1.3
        },
        //name : "Cluster Number"
        title: "Cluster Number"
      };

      initTSNE()  // initialisation of tSNE data to avoid merging tSNE data when stack = false
      Plotly.purge('graph2');
      Plotly.react('graph2', data, layout);
      document.title = "Single Cell Virtual Cytometer"
      return [data, layout]
}


function ClustColors(clusterVal, clustNB) {
  var dataPoints = clusterVal.length
  var uniqueVal = Array.from(new Set(clusterVal))
  var clustLen = uniqueVal.length
  var colBG = "#bcb2b2"

  var paletteArray = [["#FF0000FF", "#FF9900FF", "#CCFF00FF", "#33FF00FF", "#00FF66FF", "#00FFFFFF", "#0066FFFF", "#3300FFFF", "#CC00FFFF", "#FF0099FF"],
["#FF0000FF", "#FF4D00FF", "#FF9900FF", "#FFE500FF", "#CCFF00FF", "#80FF00FF", "#33FF00FF", "#00FF19FF", "#00FF66FF", "#00FFB2FF", "#00FFFFFF", "#00B3FFFF", "#0066FFFF", "#001AFFFF", "#3300FFFF", "#7F00FFFF", "#CC00FFFF", "#FF00E6FF", "#FF0099FF", "#FF004DFF"],
["#FF0000FF", "#FF3300FF", "#FF6600FF", "#FF9900FF", "#FFCC00FF", "#FFFF00FF", "#CCFF00FF", "#99FF00FF", "#66FF00FF", "#33FF00FF", "#00FF00FF", "#00FF33FF", "#00FF66FF", "#00FF99FF", "#00FFCCFF", "#00FFFFFF", "#00CCFFFF", "#0099FFFF", "#0066FFFF", "#0033FFFF", "#0000FFFF", "#3300FFFF", "#6600FFFF", "#9900FFFF", "#CC00FFFF", "#FF00FFFF", "#FF00CCFF", "#FF0099FF", "#FF0066FF", "#FF0033FF"],
["#FF0000FF", "#FF2600FF", "#FF4D00FF", "#FF7300FF", "#FF9900FF", "#FFBF00FF", "#FFE500FF", "#F2FF00FF", "#CCFF00FF", "#A6FF00FF", "#80FF00FF", "#59FF00FF", "#33FF00FF", "#0DFF00FF", "#00FF19FF", "#00FF40FF", "#00FF66FF", "#00FF8CFF", "#00FFB2FF", "#00FFD9FF", "#00FFFFFF", "#00D9FFFF", "#00B3FFFF", "#008CFFFF", "#0066FFFF", "#0040FFFF", "#001AFFFF", "#0D00FFFF", "#3300FFFF", "#5900FFFF", "#7F00FFFF", "#A600FFFF", "#CC00FFFF", "#F200FFFF", "#FF00E6FF", "#FF00BFFF", "#FF0099FF", "#FF0073FF", "#FF004DFF", "#FF0026FF"],
["#FF0000FF", "#FF1F00FF", "#FF3D00FF", "#FF5C00FF", "#FF7A00FF", "#FF9900FF", "#FFB800FF", "#FFD600FF", "#FFF500FF", "#EBFF00FF", "#CCFF00FF", "#ADFF00FF", "#8FFF00FF", "#70FF00FF", "#52FF00FF", "#33FF00FF", "#14FF00FF", "#00FF0AFF", "#00FF29FF", "#00FF47FF", "#00FF66FF", "#00FF85FF", "#00FFA3FF", "#00FFC2FF", "#00FFE0FF", "#00FFFFFF", "#00E0FFFF", "#00C2FFFF", "#00A3FFFF", "#0085FFFF", "#0066FFFF", "#0047FFFF", "#0029FFFF", "#000AFFFF", "#1400FFFF", "#3300FFFF", "#5200FFFF", "#7000FFFF", "#8F00FFFF", "#AD00FFFF", "#CC00FFFF", "#EB00FFFF", "#FF00F5FF", "#FF00D6FF", "#FF00B8FF", "#FF0099FF", "#FF007AFF", "#FF005CFF", "#FF003DFF", "#FF001FFF"],
["#FF0000FF", "#FF1900FF", "#FF3300FF", "#FF4D00FF", "#FF6600FF", "#FF8000FF", "#FF9900FF", "#FFB300FF", "#FFCC00FF", "#FFE500FF", "#FFFF00FF", "#E6FF00FF", "#CCFF00FF", "#B3FF00FF", "#99FF00FF", "#80FF00FF", "#66FF00FF", "#4DFF00FF", "#33FF00FF", "#1AFF00FF", "#00FF00FF", "#00FF19FF", "#00FF33FF", "#00FF4CFF", "#00FF66FF", "#00FF80FF", "#00FF99FF", "#00FFB3FF", "#00FFCCFF", "#00FFE5FF", "#00FFFFFF", "#00E6FFFF", "#00CCFFFF", "#00B2FFFF", "#0099FFFF", "#0080FFFF", "#0066FFFF", "#004CFFFF", "#0033FFFF", "#0019FFFF", "#0000FFFF", "#1900FFFF", "#3300FFFF", "#4C00FFFF", "#6600FFFF", "#8000FFFF", "#9900FFFF", "#B300FFFF", "#CC00FFFF", "#E600FFFF", "#FF00FFFF", "#FF00E6FF", "#FF00CCFF", "#FF00B3FF", "#FF0099FF", "#FF0080FF", "#FF0066FF", "#FF004DFF", "#FF0033FF", "#FF001AFF"],
["#FF0000FF", "#FF1600FF", "#FF2C00FF", "#FF4200FF", "#FF5700FF", "#FF6D00FF", "#FF8300FF", "#FF9900FF", "#FFAF00FF", "#FFC500FF", "#FFDB00FF", "#FFF000FF", "#F8FF00FF", "#E2FF00FF", "#CCFF00FF", "#B6FF00FF", "#A0FF00FF", "#8AFF00FF", "#75FF00FF", "#5FFF00FF", "#49FF00FF", "#33FF00FF", "#1DFF00FF", "#07FF00FF", "#00FF0FFF", "#00FF24FF", "#00FF3AFF", "#00FF50FF", "#00FF66FF", "#00FF7CFF", "#00FF92FF", "#00FFA8FF", "#00FFBDFF", "#00FFD3FF", "#00FFE9FF", "#00FFFFFF", "#00E9FFFF", "#00D3FFFF", "#00BDFFFF", "#00A8FFFF", "#0092FFFF", "#007CFFFF", "#0066FFFF", "#0050FFFF", "#003AFFFF", "#0024FFFF", "#000FFFFF", "#0700FFFF", "#1D00FFFF", "#3300FFFF", "#4900FFFF", "#5F00FFFF", "#7500FFFF", "#8A00FFFF", "#A000FFFF", "#B600FFFF", "#CC00FFFF", "#E200FFFF", "#F800FFFF", "#FF00F0FF", "#FF00DBFF", "#FF00C5FF", "#FF00AFFF", "#FF0099FF", "#FF0083FF", "#FF006DFF", "#FF0057FF", "#FF0042FF", "#FF002CFF", "#FF0016FF"],
["#FF0000FF", "#FF1300FF", "#FF2600FF", "#FF3900FF", "#FF4D00FF", "#FF6000FF", "#FF7300FF", "#FF8600FF", "#FF9900FF", "#FFAC00FF", "#FFBF00FF", "#FFD200FF", "#FFE600FF", "#FFF900FF", "#F2FF00FF", "#DFFF00FF", "#CCFF00FF", "#B9FF00FF", "#A6FF00FF", "#93FF00FF", "#80FF00FF", "#6CFF00FF", "#59FF00FF", "#46FF00FF", "#33FF00FF", "#20FF00FF", "#0DFF00FF", "#00FF06FF", "#00FF1AFF", "#00FF2DFF", "#00FF40FF", "#00FF53FF", "#00FF66FF", "#00FF79FF", "#00FF8CFF", "#00FF9FFF", "#00FFB3FF", "#00FFC6FF", "#00FFD9FF", "#00FFECFF", "#00FFFFFF", "#00ECFFFF", "#00D9FFFF", "#00C6FFFF", "#00B2FFFF", "#009FFFFF", "#008CFFFF", "#0079FFFF", "#0066FFFF", "#0053FFFF", "#0040FFFF", "#002DFFFF", "#0019FFFF", "#0006FFFF", "#0D00FFFF", "#2000FFFF", "#3300FFFF", "#4600FFFF", "#5900FFFF", "#6C00FFFF", "#8000FFFF", "#9300FFFF", "#A600FFFF", "#B900FFFF", "#CC00FFFF", "#DF00FFFF", "#F200FFFF", "#FF00F9FF", "#FF00E5FF", "#FF00D2FF", "#FF00BFFF", "#FF00ACFF", "#FF0099FF", "#FF0086FF", "#FF0073FF", "#FF0060FF", "#FF004CFF", "#FF0039FF", "#FF0026FF", "#FF0013FF"],
["#FF0000FF", "#FF1100FF", "#FF2200FF", "#FF3300FF", "#FF4400FF", "#FF5500FF", "#FF6600FF", "#FF7700FF", "#FF8800FF", "#FF9900FF", "#FFAA00FF", "#FFBB00FF", "#FFCC00FF", "#FFDD00FF", "#FFEE00FF", "#FFFF00FF", "#EEFF00FF", "#DDFF00FF", "#CCFF00FF", "#BBFF00FF", "#AAFF00FF", "#99FF00FF", "#88FF00FF", "#77FF00FF", "#66FF00FF", "#55FF00FF", "#44FF00FF", "#33FF00FF", "#22FF00FF", "#11FF00FF", "#00FF00FF", "#00FF11FF", "#00FF22FF", "#00FF33FF", "#00FF44FF", "#00FF55FF", "#00FF66FF", "#00FF77FF", "#00FF88FF", "#00FF99FF", "#00FFAAFF", "#00FFBBFF", "#00FFCCFF", "#00FFDDFF", "#00FFEEFF", "#00FFFFFF", "#00EEFFFF", "#00DDFFFF", "#00CCFFFF", "#00BBFFFF", "#00AAFFFF", "#0099FFFF", "#0088FFFF", "#0077FFFF", "#0066FFFF", "#0055FFFF", "#0044FFFF", "#0033FFFF", "#0022FFFF", "#0011FFFF", "#0000FFFF", "#1100FFFF", "#2200FFFF", "#3300FFFF", "#4400FFFF", "#5500FFFF", "#6600FFFF", "#7700FFFF", "#8800FFFF", "#9900FFFF", "#AA00FFFF", "#BB00FFFF", "#CC00FFFF", "#DD00FFFF", "#EE00FFFF", "#FF00FFFF", "#FF00EEFF", "#FF00DDFF", "#FF00CCFF", "#FF00BBFF", "#FF00AAFF", "#FF0099FF", "#FF0088FF", "#FF0077FF", "#FF0066FF", "#FF0055FF", "#FF0044FF", "#FF0033FF", "#FF0022FF", "#FF0011FF"],
["#FF0000FF", "#FF0F00FF", "#FF1F00FF", "#FF2E00FF", "#FF3D00FF", "#FF4D00FF", "#FF5C00FF", "#FF6B00FF", "#FF7A00FF", "#FF8A00FF", "#FF9900FF", "#FFA800FF", "#FFB800FF", "#FFC700FF", "#FFD600FF", "#FFE500FF", "#FFF500FF", "#FAFF00FF", "#EBFF00FF", "#DBFF00FF", "#CCFF00FF", "#BDFF00FF", "#ADFF00FF", "#9EFF00FF", "#8FFF00FF", "#80FF00FF", "#70FF00FF", "#61FF00FF", "#52FF00FF", "#42FF00FF", "#33FF00FF", "#24FF00FF", "#14FF00FF", "#05FF00FF", "#00FF0AFF", "#00FF1AFF", "#00FF29FF", "#00FF38FF", "#00FF47FF", "#00FF57FF", "#00FF66FF", "#00FF75FF", "#00FF85FF", "#00FF94FF", "#00FFA3FF", "#00FFB3FF", "#00FFC2FF", "#00FFD1FF", "#00FFE0FF", "#00FFF0FF", "#00FFFFFF", "#00F0FFFF", "#00E0FFFF", "#00D1FFFF", "#00C2FFFF", "#00B2FFFF", "#00A3FFFF", "#0094FFFF", "#0085FFFF", "#0075FFFF", "#0066FFFF", "#0057FFFF", "#0047FFFF", "#0038FFFF", "#0029FFFF", "#0019FFFF", "#000AFFFF", "#0500FFFF", "#1400FFFF", "#2400FFFF", "#3300FFFF", "#4200FFFF", "#5200FFFF", "#6100FFFF", "#7000FFFF", "#8000FFFF", "#8F00FFFF", "#9E00FFFF", "#AD00FFFF", "#BD00FFFF", "#CC00FFFF", "#DB00FFFF", "#EB00FFFF", "#FA00FFFF", "#FF00F5FF", "#FF00E6FF", "#FF00D6FF", "#FF00C7FF", "#FF00B8FF", "#FF00A8FF", "#FF0099FF", "#FF008AFF", "#FF007AFF", "#FF006BFF", "#FF005CFF", "#FF004CFF", "#FF003DFF", "#FF002EFF", "#FF001FFF", "#FF000FFF"],
["#FF0000FF", "#FF0E00FF", "#FF1C00FF", "#FF2A00FF", "#FF3800FF", "#FF4600FF", "#FF5300FF", "#FF6100FF", "#FF6F00FF", "#FF7D00FF", "#FF8B00FF", "#FF9900FF", "#FFA700FF", "#FFB500FF", "#FFC300FF", "#FFD100FF", "#FFDF00FF", "#FFEC00FF", "#FFFA00FF", "#F6FF00FF", "#E8FF00FF", "#DAFF00FF", "#CCFF00FF", "#BEFF00FF", "#B0FF00FF", "#A2FF00FF", "#94FF00FF", "#86FF00FF", "#79FF00FF", "#6BFF00FF", "#5DFF00FF", "#4FFF00FF", "#41FF00FF", "#33FF00FF", "#25FF00FF", "#17FF00FF", "#09FF00FF", "#00FF05FF", "#00FF13FF", "#00FF20FF", "#00FF2EFF", "#00FF3CFF", "#00FF4AFF", "#00FF58FF", "#00FF66FF", "#00FF74FF", "#00FF82FF", "#00FF90FF", "#00FF9EFF", "#00FFACFF", "#00FFB9FF", "#00FFC7FF", "#00FFD5FF", "#00FFE3FF", "#00FFF1FF", "#00FFFFFF", "#00F1FFFF", "#00E3FFFF", "#00D5FFFF", "#00C7FFFF", "#00B9FFFF", "#00ACFFFF", "#009EFFFF", "#0090FFFF", "#0082FFFF", "#0074FFFF", "#0066FFFF", "#0058FFFF", "#004AFFFF", "#003CFFFF", "#002EFFFF", "#0020FFFF", "#0013FFFF", "#0005FFFF", "#0900FFFF", "#1700FFFF", "#2500FFFF", "#3300FFFF", "#4100FFFF", "#4F00FFFF", "#5D00FFFF", "#6B00FFFF", "#7900FFFF", "#8600FFFF", "#9400FFFF", "#A200FFFF", "#B000FFFF", "#BE00FFFF", "#CC00FFFF", "#DA00FFFF", "#E800FFFF", "#F600FFFF", "#FF00FAFF", "#FF00ECFF", "#FF00DFFF", "#FF00D1FF", "#FF00C3FF", "#FF00B5FF", "#FF00A7FF", "#FF0099FF", "#FF008BFF", "#FF007DFF", "#FF006FFF", "#FF0061FF", "#FF0053FF", "#FF0046FF", "#FF0038FF", "#FF002AFF", "#FF001CFF", "#FF000EFF"],
["#FF0000FF", "#FF0D00FF", "#FF1900FF", "#FF2600FF", "#FF3300FF", "#FF4000FF", "#FF4D00FF", "#FF5900FF", "#FF6600FF", "#FF7300FF", "#FF8000FF", "#FF8C00FF", "#FF9900FF", "#FFA600FF", "#FFB300FF", "#FFBF00FF", "#FFCC00FF", "#FFD900FF", "#FFE500FF", "#FFF200FF", "#FFFF00FF", "#F2FF00FF", "#E6FF00FF", "#D9FF00FF", "#CCFF00FF", "#BFFF00FF", "#B3FF00FF", "#A6FF00FF", "#99FF00FF", "#8CFF00FF", "#80FF00FF", "#73FF00FF", "#66FF00FF", "#59FF00FF", "#4DFF00FF", "#40FF00FF", "#33FF00FF", "#26FF00FF", "#1AFF00FF", "#0DFF00FF", "#00FF00FF", "#00FF0DFF", "#00FF19FF", "#00FF26FF", "#00FF33FF", "#00FF40FF", "#00FF4CFF", "#00FF59FF", "#00FF66FF", "#00FF73FF", "#00FF80FF", "#00FF8CFF", "#00FF99FF", "#00FFA6FF", "#00FFB3FF", "#00FFBFFF", "#00FFCCFF", "#00FFD9FF", "#00FFE5FF", "#00FFF2FF", "#00FFFFFF", "#00F2FFFF", "#00E6FFFF", "#00D9FFFF", "#00CCFFFF", "#00BFFFFF", "#00B2FFFF", "#00A6FFFF", "#0099FFFF", "#008CFFFF", "#0080FFFF", "#0073FFFF", "#0066FFFF", "#0059FFFF", "#004CFFFF", "#0040FFFF", "#0033FFFF", "#0026FFFF", "#0019FFFF", "#000DFFFF", "#0000FFFF", "#0D00FFFF", "#1900FFFF", "#2600FFFF", "#3300FFFF", "#4000FFFF", "#4C00FFFF", "#5900FFFF", "#6600FFFF", "#7300FFFF", "#8000FFFF", "#8C00FFFF", "#9900FFFF", "#A600FFFF", "#B300FFFF", "#BF00FFFF", "#CC00FFFF", "#D900FFFF", "#E600FFFF", "#F200FFFF", "#FF00FFFF", "#FF00F2FF", "#FF00E6FF", "#FF00D9FF", "#FF00CCFF", "#FF00BFFF", "#FF00B3FF", "#FF00A6FF", "#FF0099FF", "#FF008CFF", "#FF0080FF", "#FF0073FF", "#FF0066FF", "#FF0059FF", "#FF004DFF", "#FF0040FF", "#FF0033FF", "#FF0026FF", "#FF001AFF", "#FF000DFF"],
["#FF0000FF", "#FF0C00FF", "#FF1800FF", "#FF2300FF", "#FF2F00FF", "#FF3B00FF", "#FF4700FF", "#FF5200FF", "#FF5E00FF", "#FF6A00FF", "#FF7600FF", "#FF8100FF", "#FF8D00FF", "#FF9900FF", "#FFA500FF", "#FFB100FF", "#FFBC00FF", "#FFC800FF", "#FFD400FF", "#FFE000FF", "#FFEB00FF", "#FFF700FF", "#FBFF00FF", "#EFFF00FF", "#E4FF00FF", "#D8FF00FF", "#CCFF00FF", "#C0FF00FF", "#B4FF00FF", "#A9FF00FF", "#9DFF00FF", "#91FF00FF", "#85FF00FF", "#7AFF00FF", "#6EFF00FF", "#62FF00FF", "#56FF00FF", "#4BFF00FF", "#3FFF00FF", "#33FF00FF", "#27FF00FF", "#1BFF00FF", "#10FF00FF", "#04FF00FF", "#00FF08FF", "#00FF14FF", "#00FF1FFF", "#00FF2BFF", "#00FF37FF", "#00FF43FF", "#00FF4EFF", "#00FF5AFF", "#00FF66FF", "#00FF72FF", "#00FF7EFF", "#00FF89FF", "#00FF95FF", "#00FFA1FF", "#00FFADFF", "#00FFB8FF", "#00FFC4FF", "#00FFD0FF", "#00FFDCFF", "#00FFE7FF", "#00FFF3FF", "#00FFFFFF", "#00F3FFFF", "#00E7FFFF", "#00DCFFFF", "#00D0FFFF", "#00C4FFFF", "#00B8FFFF", "#00ADFFFF", "#00A1FFFF", "#0095FFFF", "#0089FFFF", "#007EFFFF", "#0072FFFF", "#0066FFFF", "#005AFFFF", "#004EFFFF", "#0043FFFF", "#0037FFFF", "#002BFFFF", "#001FFFFF", "#0014FFFF", "#0008FFFF", "#0400FFFF", "#1000FFFF", "#1B00FFFF", "#2700FFFF", "#3300FFFF", "#3F00FFFF", "#4B00FFFF", "#5600FFFF", "#6200FFFF", "#6E00FFFF", "#7A00FFFF", "#8500FFFF", "#9100FFFF", "#9D00FFFF", "#A900FFFF", "#B400FFFF", "#C000FFFF", "#CC00FFFF", "#D800FFFF", "#E400FFFF", "#EF00FFFF", "#FB00FFFF", "#FF00F7FF", "#FF00EBFF", "#FF00E0FF", "#FF00D4FF", "#FF00C8FF", "#FF00BCFF", "#FF00B1FF", "#FF00A5FF", "#FF0099FF", "#FF008DFF", "#FF0081FF", "#FF0076FF", "#FF006AFF", "#FF005EFF", "#FF0052FF", "#FF0047FF", "#FF003BFF", "#FF002FFF", "#FF0023FF", "#FF0018FF", "#FF000CFF"],
["#FF0000FF", "#FF0B00FF", "#FF1600FF", "#FF2100FF", "#FF2C00FF", "#FF3700FF", "#FF4200FF", "#FF4D00FF", "#FF5700FF", "#FF6200FF", "#FF6D00FF", "#FF7800FF", "#FF8300FF", "#FF8E00FF", "#FF9900FF", "#FFA400FF", "#FFAF00FF", "#FFBA00FF", "#FFC500FF", "#FFD000FF", "#FFDB00FF", "#FFE500FF", "#FFF000FF", "#FFFB00FF", "#F8FF00FF", "#EDFF00FF", "#E2FF00FF", "#D7FF00FF", "#CCFF00FF", "#C1FF00FF", "#B6FF00FF", "#ABFF00FF", "#A0FF00FF", "#95FF00FF", "#8AFF00FF", "#80FF00FF", "#75FF00FF", "#6AFF00FF", "#5FFF00FF", "#54FF00FF", "#49FF00FF", "#3EFF00FF", "#33FF00FF", "#28FF00FF", "#1DFF00FF", "#12FF00FF", "#07FF00FF", "#00FF04FF", "#00FF0FFF", "#00FF19FF", "#00FF24FF", "#00FF2FFF", "#00FF3AFF", "#00FF45FF", "#00FF50FF", "#00FF5BFF", "#00FF66FF", "#00FF71FF", "#00FF7CFF", "#00FF87FF", "#00FF92FF", "#00FF9DFF", "#00FFA8FF", "#00FFB3FF", "#00FFBDFF", "#00FFC8FF", "#00FFD3FF", "#00FFDEFF", "#00FFE9FF", "#00FFF4FF", "#00FFFFFF", "#00F4FFFF", "#00E9FFFF", "#00DEFFFF", "#00D3FFFF", "#00C8FFFF", "#00BDFFFF", "#00B3FFFF", "#00A8FFFF", "#009DFFFF", "#0092FFFF", "#0087FFFF", "#007CFFFF", "#0071FFFF", "#0066FFFF", "#005BFFFF", "#0050FFFF", "#0045FFFF", "#003AFFFF", "#002FFFFF", "#0024FFFF", "#0019FFFF", "#000FFFFF", "#0004FFFF", "#0700FFFF", "#1200FFFF", "#1D00FFFF", "#2800FFFF", "#3300FFFF", "#3E00FFFF", "#4900FFFF", "#5400FFFF", "#5F00FFFF", "#6A00FFFF", "#7500FFFF", "#8000FFFF", "#8A00FFFF", "#9500FFFF", "#A000FFFF", "#AB00FFFF", "#B600FFFF", "#C100FFFF", "#CC00FFFF", "#D700FFFF", "#E200FFFF", "#ED00FFFF", "#F800FFFF", "#FF00FBFF", "#FF00F0FF", "#FF00E6FF", "#FF00DBFF", "#FF00D0FF", "#FF00C5FF", "#FF00BAFF", "#FF00AFFF", "#FF00A4FF", "#FF0099FF", "#FF008EFF", "#FF0083FF", "#FF0078FF", "#FF006DFF", "#FF0062FF", "#FF0057FF", "#FF004DFF", "#FF0042FF", "#FF0037FF", "#FF002CFF", "#FF0021FF", "#FF0016FF", "#FF000BFF"],
["#FF0000FF", "#FF0A00FF", "#FF1400FF", "#FF1F00FF", "#FF2900FF", "#FF3300FF", "#FF3D00FF", "#FF4700FF", "#FF5200FF", "#FF5C00FF", "#FF6600FF", "#FF7000FF", "#FF7A00FF", "#FF8500FF", "#FF8F00FF", "#FF9900FF", "#FFA300FF", "#FFAD00FF", "#FFB800FF", "#FFC200FF", "#FFCC00FF", "#FFD600FF", "#FFE000FF", "#FFEB00FF", "#FFF500FF", "#FFFF00FF", "#F5FF00FF", "#EBFF00FF", "#E0FF00FF", "#D6FF00FF", "#CCFF00FF", "#C2FF00FF", "#B8FF00FF", "#ADFF00FF", "#A3FF00FF", "#99FF00FF", "#8FFF00FF", "#85FF00FF", "#7AFF00FF", "#70FF00FF", "#66FF00FF", "#5CFF00FF", "#52FF00FF", "#47FF00FF", "#3DFF00FF", "#33FF00FF", "#29FF00FF", "#1FFF00FF", "#14FF00FF", "#0AFF00FF", "#00FF00FF", "#00FF0AFF", "#00FF14FF", "#00FF1FFF", "#00FF29FF", "#00FF33FF", "#00FF3DFF", "#00FF47FF", "#00FF52FF", "#00FF5CFF", "#00FF66FF", "#00FF70FF", "#00FF7AFF", "#00FF85FF", "#00FF8FFF", "#00FF99FF", "#00FFA3FF", "#00FFADFF", "#00FFB8FF", "#00FFC2FF", "#00FFCCFF", "#00FFD6FF", "#00FFE0FF", "#00FFEBFF", "#00FFF5FF", "#00FFFFFF", "#00F5FFFF", "#00EBFFFF", "#00E0FFFF", "#00D6FFFF", "#00CCFFFF", "#00C2FFFF", "#00B8FFFF", "#00ADFFFF", "#00A3FFFF", "#0099FFFF", "#008FFFFF", "#0085FFFF", "#007AFFFF", "#0070FFFF", "#0066FFFF", "#005CFFFF", "#0052FFFF", "#0047FFFF", "#003DFFFF", "#0033FFFF", "#0029FFFF", "#001FFFFF", "#0014FFFF", "#000AFFFF", "#0000FFFF", "#0A00FFFF", "#1400FFFF", "#1F00FFFF", "#2900FFFF", "#3300FFFF", "#3D00FFFF", "#4700FFFF", "#5200FFFF", "#5C00FFFF", "#6600FFFF", "#7000FFFF", "#7A00FFFF", "#8500FFFF", "#8F00FFFF", "#9900FFFF", "#A300FFFF", "#AD00FFFF", "#B800FFFF", "#C200FFFF", "#CC00FFFF", "#D600FFFF", "#E000FFFF", "#EB00FFFF", "#F500FFFF", "#FF00FFFF", "#FF00F5FF", "#FF00EBFF", "#FF00E0FF", "#FF00D6FF", "#FF00CCFF", "#FF00C2FF", "#FF00B8FF", "#FF00ADFF", "#FF00A3FF", "#FF0099FF", "#FF008FFF", "#FF0085FF", "#FF007AFF", "#FF0070FF", "#FF0066FF", "#FF005CFF", "#FF0052FF", "#FF0047FF", "#FF003DFF", "#FF0033FF", "#FF0029FF", "#FF001FFF", "#FF0014FF", "#FF000AFF"],
["#FF0000FF", "#FF0A00FF", "#FF1300FF", "#FF1D00FF", "#FF2600FF", "#FF3000FF", "#FF3900FF", "#FF4300FF", "#FF4D00FF", "#FF5600FF", "#FF6000FF", "#FF6900FF", "#FF7300FF", "#FF7C00FF", "#FF8600FF", "#FF8F00FF", "#FF9900FF", "#FFA300FF", "#FFAC00FF", "#FFB600FF", "#FFBF00FF", "#FFC900FF", "#FFD200FF", "#FFDC00FF", "#FFE600FF", "#FFEF00FF", "#FFF900FF", "#FCFF00FF", "#F2FF00FF", "#E9FF00FF", "#DFFF00FF", "#D6FF00FF", "#CCFF00FF", "#C2FF00FF", "#B9FF00FF", "#AFFF00FF", "#A6FF00FF", "#9CFF00FF", "#93FF00FF", "#89FF00FF", "#80FF00FF", "#76FF00FF", "#6CFF00FF", "#63FF00FF", "#59FF00FF", "#50FF00FF", "#46FF00FF", "#3DFF00FF", "#33FF00FF", "#29FF00FF", "#20FF00FF", "#16FF00FF", "#0DFF00FF", "#03FF00FF", "#00FF06FF", "#00FF10FF", "#00FF1AFF", "#00FF23FF", "#00FF2DFF", "#00FF36FF", "#00FF40FF", "#00FF49FF", "#00FF53FF", "#00FF5CFF", "#00FF66FF", "#00FF70FF", "#00FF79FF", "#00FF83FF", "#00FF8CFF", "#00FF96FF", "#00FF9FFF", "#00FFA9FF", "#00FFB3FF", "#00FFBCFF", "#00FFC6FF", "#00FFCFFF", "#00FFD9FF", "#00FFE2FF", "#00FFECFF", "#00FFF5FF", "#00FFFFFF", "#00F5FFFF", "#00ECFFFF", "#00E2FFFF", "#00D9FFFF", "#00CFFFFF", "#00C6FFFF", "#00BCFFFF", "#00B2FFFF", "#00A9FFFF", "#009FFFFF", "#0096FFFF", "#008CFFFF", "#0083FFFF", "#0079FFFF", "#0070FFFF", "#0066FFFF", "#005CFFFF", "#0053FFFF", "#0049FFFF", "#0040FFFF", "#0036FFFF", "#002DFFFF", "#0023FFFF", "#0019FFFF", "#0010FFFF", "#0006FFFF", "#0300FFFF", "#0D00FFFF", "#1600FFFF", "#2000FFFF", "#2900FFFF", "#3300FFFF", "#3D00FFFF", "#4600FFFF", "#5000FFFF", "#5900FFFF", "#6300FFFF", "#6C00FFFF", "#7600FFFF", "#8000FFFF", "#8900FFFF", "#9300FFFF", "#9C00FFFF", "#A600FFFF", "#AF00FFFF", "#B900FFFF", "#C200FFFF", "#CC00FFFF", "#D600FFFF", "#DF00FFFF", "#E900FFFF", "#F200FFFF", "#FC00FFFF", "#FF00F9FF", "#FF00EFFF", "#FF00E5FF", "#FF00DCFF", "#FF00D2FF", "#FF00C9FF", "#FF00BFFF", "#FF00B6FF", "#FF00ACFF", "#FF00A3FF", "#FF0099FF", "#FF008FFF", "#FF0086FF", "#FF007CFF", "#FF0073FF", "#FF0069FF", "#FF0060FF", "#FF0056FF", "#FF004CFF", "#FF0043FF", "#FF0039FF", "#FF0030FF", "#FF0026FF", "#FF001DFF", "#FF0013FF", "#FF000AFF"],
["#FF0000FF", "#FF0900FF", "#FF1200FF", "#FF1B00FF", "#FF2400FF", "#FF2D00FF", "#FF3600FF", "#FF3F00FF", "#FF4800FF", "#FF5100FF", "#FF5A00FF", "#FF6300FF", "#FF6C00FF", "#FF7500FF", "#FF7E00FF", "#FF8700FF", "#FF9000FF", "#FF9900FF", "#FFA200FF", "#FFAB00FF", "#FFB400FF", "#FFBD00FF", "#FFC600FF", "#FFCF00FF", "#FFD800FF", "#FFE100FF", "#FFEA00FF", "#FFF300FF", "#FFFC00FF", "#F9FF00FF", "#F0FF00FF", "#E7FF00FF", "#DEFF00FF", "#D5FF00FF", "#CCFF00FF", "#C3FF00FF", "#BAFF00FF", "#B1FF00FF", "#A8FF00FF", "#9FFF00FF", "#96FF00FF", "#8DFF00FF", "#84FF00FF", "#7BFF00FF", "#72FF00FF", "#69FF00FF", "#60FF00FF", "#57FF00FF", "#4EFF00FF", "#45FF00FF", "#3CFF00FF", "#33FF00FF", "#2AFF00FF", "#21FF00FF", "#18FF00FF", "#0FFF00FF", "#06FF00FF", "#00FF03FF", "#00FF0CFF", "#00FF15FF", "#00FF1EFF", "#00FF27FF", "#00FF30FF", "#00FF39FF", "#00FF42FF", "#00FF4BFF", "#00FF54FF", "#00FF5DFF", "#00FF66FF", "#00FF6FFF", "#00FF78FF", "#00FF81FF", "#00FF8AFF", "#00FF93FF", "#00FF9CFF", "#00FFA5FF", "#00FFAEFF", "#00FFB7FF", "#00FFC0FF", "#00FFC9FF", "#00FFD2FF", "#00FFDBFF", "#00FFE4FF", "#00FFEDFF", "#00FFF6FF", "#00FFFFFF", "#00F6FFFF", "#00EDFFFF", "#00E4FFFF", "#00DBFFFF", "#00D2FFFF", "#00C9FFFF", "#00C0FFFF", "#00B7FFFF", "#00AEFFFF", "#00A5FFFF", "#009CFFFF", "#0093FFFF", "#008AFFFF", "#0081FFFF", "#0078FFFF", "#006FFFFF", "#0066FFFF", "#005DFFFF", "#0054FFFF", "#004BFFFF", "#0042FFFF", "#0039FFFF", "#0030FFFF", "#0027FFFF", "#001EFFFF", "#0015FFFF", "#000CFFFF", "#0003FFFF", "#0600FFFF", "#0F00FFFF", "#1800FFFF", "#2100FFFF", "#2A00FFFF", "#3300FFFF", "#3C00FFFF", "#4500FFFF", "#4E00FFFF", "#5700FFFF", "#6000FFFF", "#6900FFFF", "#7200FFFF", "#7B00FFFF", "#8400FFFF", "#8D00FFFF", "#9600FFFF", "#9F00FFFF", "#A800FFFF", "#B100FFFF", "#BA00FFFF", "#C300FFFF", "#CC00FFFF", "#D500FFFF", "#DE00FFFF", "#E700FFFF", "#F000FFFF", "#F900FFFF", "#FF00FCFF", "#FF00F3FF", "#FF00EAFF", "#FF00E1FF", "#FF00D8FF", "#FF00CFFF", "#FF00C6FF", "#FF00BDFF", "#FF00B4FF", "#FF00ABFF", "#FF00A2FF", "#FF0099FF", "#FF0090FF", "#FF0087FF", "#FF007EFF", "#FF0075FF", "#FF006CFF", "#FF0063FF", "#FF005AFF", "#FF0051FF", "#FF0048FF", "#FF003FFF", "#FF0036FF", "#FF002DFF", "#FF0024FF", "#FF001BFF", "#FF0012FF", "#FF0009FF"],
["#FF0000FF", "#FF0800FF", "#FF1100FF", "#FF1900FF", "#FF2200FF", "#FF2B00FF", "#FF3300FF", "#FF3C00FF", "#FF4400FF", "#FF4D00FF", "#FF5500FF", "#FF5E00FF", "#FF6600FF", "#FF6F00FF", "#FF7700FF", "#FF8000FF", "#FF8800FF", "#FF9100FF", "#FF9900FF", "#FFA200FF", "#FFAA00FF", "#FFB300FF", "#FFBB00FF", "#FFC400FF", "#FFCC00FF", "#FFD500FF", "#FFDD00FF", "#FFE500FF", "#FFEE00FF", "#FFF700FF", "#FFFF00FF", "#F7FF00FF", "#EEFF00FF", "#E5FF00FF", "#DDFF00FF", "#D4FF00FF", "#CCFF00FF", "#C3FF00FF", "#BBFF00FF", "#B3FF00FF", "#AAFF00FF", "#A2FF00FF", "#99FF00FF", "#91FF00FF", "#88FF00FF", "#80FF00FF", "#77FF00FF", "#6EFF00FF", "#66FF00FF", "#5DFF00FF", "#55FF00FF", "#4DFF00FF", "#44FF00FF", "#3CFF00FF", "#33FF00FF", "#2AFF00FF", "#22FF00FF", "#1AFF00FF", "#11FF00FF", "#08FF00FF", "#00FF00FF", "#00FF08FF", "#00FF11FF", "#00FF1AFF", "#00FF22FF", "#00FF2AFF", "#00FF33FF", "#00FF3CFF", "#00FF44FF", "#00FF4DFF", "#00FF55FF", "#00FF5EFF", "#00FF66FF", "#00FF6FFF", "#00FF77FF", "#00FF80FF", "#00FF88FF", "#00FF91FF", "#00FF99FF", "#00FFA2FF", "#00FFAAFF", "#00FFB3FF", "#00FFBBFF", "#00FFC3FF", "#00FFCCFF", "#00FFD5FF", "#00FFDDFF", "#00FFE5FF", "#00FFEEFF", "#00FFF7FF", "#00FFFFFF", "#00F7FFFF", "#00EEFFFF", "#00E5FFFF", "#00DDFFFF", "#00D4FFFF", "#00CCFFFF", "#00C3FFFF", "#00BBFFFF", "#00B2FFFF", "#00AAFFFF", "#00A2FFFF", "#0099FFFF", "#0090FFFF", "#0088FFFF", "#0080FFFF", "#0077FFFF", "#006FFFFF", "#0066FFFF", "#005DFFFF", "#0055FFFF", "#004CFFFF", "#0044FFFF", "#003CFFFF", "#0033FFFF", "#002AFFFF", "#0022FFFF", "#0019FFFF", "#0011FFFF", "#0008FFFF", "#0000FFFF", "#0800FFFF", "#1100FFFF", "#1900FFFF", "#2200FFFF", "#2A00FFFF", "#3300FFFF", "#3C00FFFF", "#4400FFFF", "#4C00FFFF", "#5500FFFF", "#5E00FFFF", "#6600FFFF", "#6F00FFFF", "#7700FFFF", "#8000FFFF", "#8800FFFF", "#9100FFFF", "#9900FFFF", "#A200FFFF", "#AA00FFFF", "#B300FFFF", "#BB00FFFF", "#C400FFFF", "#CC00FFFF", "#D500FFFF", "#DD00FFFF", "#E600FFFF", "#EE00FFFF", "#F700FFFF", "#FF00FFFF", "#FF00F7FF", "#FF00EEFF", "#FF00E6FF", "#FF00DDFF", "#FF00D4FF", "#FF00CCFF", "#FF00C3FF", "#FF00BBFF", "#FF00B2FF", "#FF00AAFF", "#FF00A1FF", "#FF0099FF", "#FF0090FF", "#FF0088FF", "#FF0080FF", "#FF0077FF", "#FF006FFF", "#FF0066FF", "#FF005EFF", "#FF0055FF", "#FF004CFF", "#FF0044FF", "#FF003CFF", "#FF0033FF", "#FF002BFF", "#FF0022FF", "#FF0019FF", "#FF0011FF", "#FF0008FF"],
["#FF0000FF", "#FF0800FF", "#FF1000FF", "#FF1800FF", "#FF2000FF", "#FF2800FF", "#FF3000FF", "#FF3800FF", "#FF4000FF", "#FF4800FF", "#FF5100FF", "#FF5900FF", "#FF6100FF", "#FF6900FF", "#FF7100FF", "#FF7900FF", "#FF8100FF", "#FF8900FF", "#FF9100FF", "#FF9900FF", "#FFA100FF", "#FFA900FF", "#FFB100FF", "#FFB900FF", "#FFC100FF", "#FFC900FF", "#FFD100FF", "#FFD900FF", "#FFE100FF", "#FFEA00FF", "#FFF200FF", "#FFFA00FF", "#FCFF00FF", "#F4FF00FF", "#ECFF00FF", "#E4FF00FF", "#DCFF00FF", "#D4FF00FF", "#CCFF00FF", "#C4FF00FF", "#BCFF00FF", "#B4FF00FF", "#ACFF00FF", "#A4FF00FF", "#9CFF00FF", "#94FF00FF", "#8CFF00FF", "#84FF00FF", "#7BFF00FF", "#73FF00FF", "#6BFF00FF", "#63FF00FF", "#5BFF00FF", "#53FF00FF", "#4BFF00FF", "#43FF00FF", "#3BFF00FF", "#33FF00FF", "#2BFF00FF", "#23FF00FF", "#1BFF00FF", "#13FF00FF", "#0BFF00FF", "#03FF00FF", "#00FF05FF", "#00FF0DFF", "#00FF15FF", "#00FF1EFF", "#00FF26FF", "#00FF2EFF", "#00FF36FF", "#00FF3EFF", "#00FF46FF", "#00FF4EFF", "#00FF56FF", "#00FF5EFF", "#00FF66FF", "#00FF6EFF", "#00FF76FF", "#00FF7EFF", "#00FF86FF", "#00FF8EFF", "#00FF96FF", "#00FF9EFF", "#00FFA6FF", "#00FFAEFF", "#00FFB7FF", "#00FFBFFF", "#00FFC7FF", "#00FFCFFF", "#00FFD7FF", "#00FFDFFF", "#00FFE7FF", "#00FFEFFF", "#00FFF7FF", "#00FFFFFF", "#00F7FFFF", "#00EFFFFF", "#00E7FFFF", "#00DFFFFF", "#00D7FFFF", "#00CFFFFF", "#00C7FFFF", "#00BFFFFF", "#00B7FFFF", "#00AEFFFF", "#00A6FFFF", "#009EFFFF", "#0096FFFF", "#008EFFFF", "#0086FFFF", "#007EFFFF", "#0076FFFF", "#006EFFFF", "#0066FFFF", "#005EFFFF", "#0056FFFF", "#004EFFFF", "#0046FFFF", "#003EFFFF", "#0036FFFF", "#002EFFFF", "#0026FFFF", "#001EFFFF", "#0015FFFF", "#000DFFFF", "#0005FFFF", "#0300FFFF", "#0B00FFFF", "#1300FFFF", "#1B00FFFF", "#2300FFFF", "#2B00FFFF", "#3300FFFF", "#3B00FFFF", "#4300FFFF", "#4B00FFFF", "#5300FFFF", "#5B00FFFF", "#6300FFFF", "#6B00FFFF", "#7300FFFF", "#7B00FFFF", "#8400FFFF", "#8C00FFFF", "#9400FFFF", "#9C00FFFF", "#A400FFFF", "#AC00FFFF", "#B400FFFF", "#BC00FFFF", "#C400FFFF", "#CC00FFFF", "#D400FFFF", "#DC00FFFF", "#E400FFFF", "#EC00FFFF", "#F400FFFF", "#FC00FFFF", "#FF00FAFF", "#FF00F2FF", "#FF00EAFF", "#FF00E1FF", "#FF00D9FF", "#FF00D1FF", "#FF00C9FF", "#FF00C1FF", "#FF00B9FF", "#FF00B1FF", "#FF00A9FF", "#FF00A1FF", "#FF0099FF", "#FF0091FF", "#FF0089FF", "#FF0081FF", "#FF0079FF", "#FF0071FF", "#FF0069FF", "#FF0061FF", "#FF0059FF", "#FF0051FF", "#FF0048FF", "#FF0040FF", "#FF0038FF", "#FF0030FF", "#FF0028FF", "#FF0020FF", "#FF0018FF", "#FF0010FF", "#FF0008FF"],
["#FF0000FF", "#FF0800FF", "#FF0F00FF", "#FF1700FF", "#FF1F00FF", "#FF2600FF", "#FF2E00FF", "#FF3600FF", "#FF3D00FF", "#FF4500FF", "#FF4D00FF", "#FF5400FF", "#FF5C00FF", "#FF6300FF", "#FF6B00FF", "#FF7300FF", "#FF7A00FF", "#FF8200FF", "#FF8A00FF", "#FF9100FF", "#FF9900FF", "#FFA100FF", "#FFA800FF", "#FFB000FF", "#FFB800FF", "#FFBF00FF", "#FFC700FF", "#FFCF00FF", "#FFD600FF", "#FFDE00FF", "#FFE500FF", "#FFED00FF", "#FFF500FF", "#FFFC00FF", "#FAFF00FF", "#F2FF00FF", "#EBFF00FF", "#E3FF00FF", "#DBFF00FF", "#D4FF00FF", "#CCFF00FF", "#C4FF00FF", "#BDFF00FF", "#B5FF00FF", "#ADFF00FF", "#A6FF00FF", "#9EFF00FF", "#96FF00FF", "#8FFF00FF", "#87FF00FF", "#80FF00FF", "#78FF00FF", "#70FF00FF", "#69FF00FF", "#61FF00FF", "#59FF00FF", "#52FF00FF", "#4AFF00FF", "#42FF00FF", "#3BFF00FF", "#33FF00FF", "#2BFF00FF", "#24FF00FF", "#1CFF00FF", "#14FF00FF", "#0DFF00FF", "#05FF00FF", "#00FF03FF", "#00FF0AFF", "#00FF12FF", "#00FF1AFF", "#00FF21FF", "#00FF29FF", "#00FF30FF", "#00FF38FF", "#00FF40FF", "#00FF47FF", "#00FF4FFF", "#00FF57FF", "#00FF5EFF", "#00FF66FF", "#00FF6EFF", "#00FF75FF", "#00FF7DFF", "#00FF85FF", "#00FF8CFF", "#00FF94FF", "#00FF9CFF", "#00FFA3FF", "#00FFABFF", "#00FFB3FF", "#00FFBAFF", "#00FFC2FF", "#00FFC9FF", "#00FFD1FF", "#00FFD9FF", "#00FFE0FF", "#00FFE8FF", "#00FFF0FF", "#00FFF7FF", "#00FFFFFF", "#00F7FFFF", "#00F0FFFF", "#00E8FFFF", "#00E0FFFF", "#00D9FFFF", "#00D1FFFF", "#00C9FFFF", "#00C2FFFF", "#00BAFFFF", "#00B2FFFF", "#00ABFFFF", "#00A3FFFF", "#009CFFFF", "#0094FFFF", "#008CFFFF", "#0085FFFF", "#007DFFFF", "#0075FFFF", "#006EFFFF", "#0066FFFF", "#005EFFFF", "#0057FFFF", "#004FFFFF", "#0047FFFF", "#0040FFFF", "#0038FFFF", "#0030FFFF", "#0029FFFF", "#0021FFFF", "#0019FFFF", "#0012FFFF", "#000AFFFF", "#0003FFFF", "#0500FFFF", "#0D00FFFF", "#1400FFFF", "#1C00FFFF", "#2400FFFF", "#2B00FFFF", "#3300FFFF", "#3B00FFFF", "#4200FFFF", "#4A00FFFF", "#5200FFFF", "#5900FFFF", "#6100FFFF", "#6900FFFF", "#7000FFFF", "#7800FFFF", "#8000FFFF", "#8700FFFF", "#8F00FFFF", "#9600FFFF", "#9E00FFFF", "#A600FFFF", "#AD00FFFF", "#B500FFFF", "#BD00FFFF", "#C400FFFF", "#CC00FFFF", "#D400FFFF", "#DB00FFFF", "#E300FFFF", "#EB00FFFF", "#F200FFFF", "#FA00FFFF", "#FF00FCFF", "#FF00F5FF", "#FF00EDFF", "#FF00E6FF", "#FF00DEFF", "#FF00D6FF", "#FF00CFFF", "#FF00C7FF", "#FF00BFFF", "#FF00B8FF", "#FF00B0FF", "#FF00A8FF", "#FF00A1FF", "#FF0099FF", "#FF0091FF", "#FF008AFF", "#FF0082FF", "#FF007AFF", "#FF0073FF", "#FF006BFF", "#FF0063FF", "#FF005CFF", "#FF0054FF", "#FF004CFF", "#FF0045FF", "#FF003DFF", "#FF0036FF", "#FF002EFF", "#FF0026FF", "#FF001FFF", "#FF0017FF", "#FF000FFF", "#FF0008FF"]]

  // choose the smallest palette as possible in the paletteArray
  L = paletteArray.length
  
  selectedPalette = paletteArray[L-1] // select the largest palette by default
  for (var i = 0; i < L; i++){
    if (clustLen <= paletteArray[i].length) {
      //console.log(clustLen,paletteArray[i].length)
      selectedPalette = paletteArray[i]
      break
    }
  }
  
  // built a layer color of the same size than the data (clusters) to display
  layerColor = Array(dataPoints);
  for (var i = 0; i < dataPoints; i++){
    clustNum = clusterVal[i]
    if (clustNB >= 0){
      if (clustNum == clustNB ){
        layerColor[i] = '#7b3294'
      } else {
        layerColor[i] = colBG
      }
    } else {
      layerColor[i] = selectedPalette[clustNum]
    }
    
  }

  //var palette = ["#000000", "#000033", "#000066", "#000099", "#0000cc", "#0000ff", "#003300", "#003333", "#003366", "#003399", "#0033cc", "#0033ff", "#006600", "#006633", "#006666", "#006699", "#0066cc", "#0066ff", "#009900", "#009933", "#009966", "#009999", "#0099cc", "#0099ff", "#00cc00", "#00cc33", "#00cc66", "#00cc99", "#00cccc", "#00ccff", "#00ff00", "#00ff33", "#00ff66", "#00ff99", "#00ffcc", "#00ffff", "#330000", "#330033", "#330066", "#330099", "#3300cc", "#3300ff", "#333300", "#333333", "#333366", "#333399", "#3333cc", "#3333ff", "#336600", "#336633", "#336666", "#336699", "#3366cc", "#3366ff", "#339900", "#339933", "#339966", "#339999", "#3399cc", "#3399ff", "#33cc00", "#33cc33", "#33cc66", "#33cc99", "#33cccc", "#33ccff", "#33ff00", "#33ff33", "#33ff66", "#33ff99", "#33ffcc", "#33ffff", "#660000", "#660033", "#660066", "#660099", "#6600cc", "#6600ff", "#663300", "#663333", "#663366", "#663399", "#6633cc", "#6633ff", "#666600", "#666633", "#666666", "#666699", "#6666cc", "#6666ff", "#669900", "#669933", "#669966", "#669999", "#6699cc", "#6699ff", "#66cc00", "#66cc33", "#66cc66", "#66cc99", "#66cccc", "#66ccff", "#66ff00", "#66ff33", "#66ff66", "#66ff99", "#66ffcc", "#66ffff", "#990000", "#990033", "#990066", "#990099", "#9900cc", "#9900ff", "#993300", "#993333", "#993366", "#993399", "#9933cc", "#9933ff", "#996600", "#996633", "#996666", "#996699", "#9966cc", "#9966ff", "#999900", "#999933", "#999966", "#999999", "#9999cc", "#9999ff", "#99cc00", "#99cc33", "#99cc66", "#99cc99", "#99cccc", "#99ccff", "#99ff00", "#99ff33", "#99ff66", "#99ff99", "#99ffcc", "#99ffff", "#cc0000", "#cc0033", "#cc0066", "#cc0099", "#cc00cc", "#cc00ff", "#cc3300", "#cc3333", "#cc3366", "#cc3399", "#cc33cc", "#cc33ff", "#cc6600", "#cc6633", "#cc6666", "#cc6699", "#cc66cc", "#cc66ff", "#cc9900", "#cc9933", "#cc9966", "#cc9999", "#cc99cc", "#cc99ff", "#cccc00", "#cccc33", "#cccc66", "#cccc99", "#cccccc", "#ccccff", "#ccff00", "#ccff33", "#ccff66", "#ccff99", "#ccffcc", "#ccffff", "#ff0000", "#ff0033", "#ff0066", "#ff0099", "#ff00cc", "#ff00ff", "#ff3300", "#ff3333", "#ff3366", "#ff3399", "#ff33cc", "#ff33ff", "#ff6600", "#ff6633", "#ff6666", "#ff6699", "#ff66cc", "#ff66ff", "#ff9900", "#ff9933", "#ff9966", "#ff9999", "#ff99cc", "#ff99ff", "#ffcc00", "#ffcc33", "#ffcc66", "#ffcc99", "#ffcccc", "#ffccff", "#ffff00", "#ffff33", "#ffff66", "#ffff99", "#ffffcc", "#ffffff"]
  //var stackColor = ["#7b3294", "red", "blue", "green", "#FFD700", "#FF00FF", "#20B2AA", "#800000", "#00CED1", "#FA8072"]

  return layerColor
}

// this function compute the center of each cluster as if it was a rectangle
// and take the median(xmin,xmax) and the median(ymin,ymax) as the center and
// return an array with the centers
function ClustCenters(ClustName) {
  var colValues = window.colValues
  var xName = window.tsne1
  var yName = window.tsne2
  var tsne1 = colValues[xName]
  var tsne2 = colValues[yName]
  var clusterVal = colValues[ClustName]

  // create empty dict of cluster dict of objects. cluster value => cluster object
  var uniqueVal = Array.from(new Set(clusterVal))
  var clustLen = uniqueVal.length
  var dict = {};

  for (var i = 0; i < clustLen; i++){
    dict[uniqueVal[i]] = {x:[], y:[], xcenter:null, ycenter:null }
  }

  // fill dict of cluster objets
  L = clusterVal.length
  for (var i = 0; i < L; i++){
    x = tsne1[i]
    y = tsne2[i]
    clustN = clusterVal[i]
    dict[clustN].x.push(x)
    dict[clustN].y.push(y)
  }
  // iterate over dict to compute the median of x,y
  // and store the results in x,y, clustnb array to be plotted
  //var CenterClust = {};
  x = [];
  y = [];
  labels = [];
  Object.keys(dict).forEach(function(key) {
      x.push(median(dict[key].x))
      y.push(median(dict[key].y))
      labels.push(key)
    //CenterClust[key] = {xcenter: median(dict[key].x), ycenter: median(dict[key].y)} ;
  });
  //console.log(CenterClust)
  return [x,y,labels]
}

// ========================================================
// median calculation
// credits : https://stackoverflow.com/questions/45309447/calculating-median-javascript
function median(arr) {
    const L = arr.length, halfL = L/2;
    if (L % 2 == 1)
       return quickselect(arr, halfL);
    else
       return 0.5 * (quickselect(arr, halfL - 1) + quickselect(arr, halfL));
 }
 
 function quickselect(arr, k) {
    // Select the kth element in arr
    // arr: List of numerics
    // k: Index
    // return: The kth element (in numerical order) of arr
    if (arr.length == 1)
       return arr[0];
    else {
       const pivot = arr[0];
       const lows = arr.filter((e)=>(e<pivot));
       const highs = arr.filter((e)=>(e>pivot));
       const pivots = arr.filter((e)=>(e==pivot));
       if (k < lows.length) // the pivot is too high
          return quickselect(lows, k);
       else if (k < lows.length + pivots.length)// We got lucky and guessed the median
          return pivot;
       else // the pivot is too low
          return quickselect(highs, k - lows.length - pivots.length);
    }
 }
// ========================================================

// plot genes levels in cluster map
 function plotGene(ClustName, markerType){
    document.title = "updating..."
    progBar() // progress bar
    var colValues = window.colValues
    var xName = window.tsne1
    var yName = window.tsne2
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]
    var clusterVal = colValues[ClustName]
   
    //var layerColor = ClustColors(clusterVal, clustNB)

    var trace1 = {
        x: tsne1,
        y: tsne2,
        type: markerType,
        mode: "markers" ,
        marker: {
          size: window.dotsizeTSNE,
          color: clusterVal,
          //colorscale: 'Jet',
          autocolorscale: true
        },
        //text: clusterVal, // cluster nb is displayed when the mouse is over one dot
        name : ClustName
      };

      //setDotSize1() // set dot size of t-SNE graph
      dotsize1 = window.dotsize1
     
      //var data = [trace1, trace2];
      var data = [trace1];

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

      initTSNE()  // initialisation of tSNE data to avoid merging tSNE data when stack = false
      Plotly.purge('graph2');
      Plotly.react('graph2', data, layout);
      document.title = "Single Cell Virtual Cytometer"
      return [data, layout]
}