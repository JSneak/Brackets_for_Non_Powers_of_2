var $ = go.GraphObject.make;  // for conciseness in defining templates
myDiagram =
  $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
    {
      initialContentAlignment: go.Spot.Center,  // center the content
      "textEditingTool.starting": go.TextEditingTool.SingleClick,
      "textEditingTool.textValidation": isValidScore,
      layout: $(go.TreeLayout, { angle: 180 }),
      "undoManager.isEnabled": true
    });
// validation function for editing text
function isValidScore(textblock, oldstr, newstr) {
  if (newstr === "") return true;
  var num = parseInt(newstr, 10);
  return !isNaN(num) && num >= 0 && num < 1000;
}
// define a simple Node template
myDiagram.nodeTemplate =
  $(go.Node, "Auto",
    { selectable: false },
    $(go.Shape, "rectangle",
      { fill: '#8C8C8C', stroke: null },//#8C8C8C
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")),
    $(go.Panel, "Table",
      $(go.RowColumnDefinition, { column: 0, separatorStroke: "red" }),
      $(go.RowColumnDefinition, { column: 1, separatorStroke: "red", background: "#BABABA" }),
      $(go.RowColumnDefinition, { row: 0, separatorStroke: "red" }),
      $(go.RowColumnDefinition, { row: 1, separatorStroke: "red" }),
      $(go.TextBlock, "",
        { row: 0,
          wrap: go.TextBlock.None, margin: 5, width: 90,
          isMultiline: false, textAlign: 'left',
          font: '10pt  Segoe UI,sans-serif', stroke: 'blue' },
        new go.Binding("text", "player1").makeTwoWay()),
      $(go.TextBlock, "",
        { row: 1,
          wrap: go.TextBlock.None, margin: 5, width: 90,
          isMultiline: false, textAlign: 'left',
          font: '10pt  Segoe UI,sans-serif', stroke: 'white' },
        new go.Binding("text", "player2").makeTwoWay()),
      $(go.TextBlock, "",
        { column: 1, row: 0,
          wrap: go.TextBlock.None, margin: 2, width: 25,
          isMultiline: false, editable: true, textAlign: 'center',
          font: '10pt  Segoe UI,sans-serif', stroke: 'black' },
        new go.Binding("text", "score1").makeTwoWay()),
      $(go.TextBlock, "",
        { column: 1, row: 1,
          wrap: go.TextBlock.None, margin: 2, width: 25,
          isMultiline: false, editable: true, textAlign: 'center',
          font: '10pt  Segoe UI,sans-serif', stroke: 'black' },
        new go.Binding("text", "score2").makeTwoWay())
    )
  );
// define the Link template
myDiagram.linkTemplate =
  $(go.Link,
    { routing: go.Link.Orthogonal,
      selectable: false },
    $(go.Shape, { strokeWidth: 2, stroke: 'white' }));

function checkWinner(model)
{
  model.addChangedListener(function(e) {
  if(e.Tm == "score1" || e.Tm == "score2")
  {
    if(e.object.parent == "-1-0")
    {
      if(e.object.score1 && e.object.score2 != undefined || "")
        console.log(e.object)
    }
  }
  if (e.propertyName !== 'score1' && e.propertyName !== 'score2') return;
  var data = e.object;
  if (isNaN(data.score1) || isNaN(data.score2)) return;
  var parent = myDiagram.findNodeForKey(data.parent);
  if (parent === null) return;
  var playerName = parseInt(data.score1) > parseInt(data.score2) ? data.player1 : data.player2;
  if (parseInt(data.score1) === parseInt(data.score2)) playerName = "";
  myDiagram.model.setDataProperty(parent.data, (data.parentNumber === 0 ? "player1" : "player2"), playerName);
  });
}