// BINARY TREE CODE
var Node = function(name) {
    this.name = name;
    this.left = null;
    this.right = null;
    this.col = null;
    this.row = null;
    this.pv = null;
};

var numPlayer;
var dataT = {
    "class": "go.TreeModel",
    "nodeDataArray": [
    ]
}

var createArrayWithEmptyAndNodes = function(list) {
    numPlayer = list.length;//Length of people 
    var exponent = -1;//Exponent
    var m = (2 * (numPlayer - Math.pow(2, exponent))) - numPlayer; // # of nodes
    var nodeList = [];
    for(var x = m; x > 0; x--) {
        nodeList.push(new Node(""))
    }

    for(var c = 0;c<numPlayer;c++) {
        nodeList.push(new Node(list[c]))
    }
    makeTree(nodeList)
}

var makeTree = function(list) {
    var maxCol;
    var newBinaryTree = []
    for(var i = 0; i < list.length - numPlayer; i++) {
        var currentNode = list[i];
        currentNode.left = list[2 * i + 1].name;
        currentNode.right = list[2 * i + 2].name;
        newBinaryTree.push(currentNode)
    }
    list.length = 0;

    for(var i = 0; i <newBinaryTree.length;i++)
    {
        var temp = newBinaryTree[i]
        temp.col = Math.floor(Math.log2(i+1));
        maxCol = Math.floor(Math.log2(i+1));
    }
    var currentCol = 0;
    while(currentCol <= maxCol)
    {
        var parentValue = 0;
        var pairCounter = 0;
        var parentRow = 0;
        for(var i = 0;i < newBinaryTree.length;i++)
        {
            if(newBinaryTree[i].col == currentCol)
            {
                newBinaryTree[i].row = parentRow;
                parentRow = parentRow + 1;
                if(pairCounter === 0 || pairCounter === 1)
                {
                    newBinaryTree[i].pv = parentValue;
                    pairCounter = pairCounter + 1;
                }
                else
                {
                    pairCounter = 1;
                    parentValue = parentValue + 1;
                    newBinaryTree[i].pv = parentValue;
                }
            }
        }
        currentCol = currentCol + 1
    }
    prepareJSONForGoJS(newBinaryTree)
}

function prepareJSONForGoJS(list){
    var x = 0;
    for(var i = 0;i<list.length;i++)
    {
        var goJsFormat = {
          "key": list[i].col + "-" + list[i].row,
          "parent": (list[i].col - 1) + "-" + list[i].pv,
          "parentNumber": x,
          "player1": null,
          "player2": null
        };
        if(list[i].left == "")
        {
          goJsFormat.player1 = list[i].right;
          goJsFormat.player2 = list[i].left;
        }else{
          goJsFormat.player1 = list[i].left,
          goJsFormat.player2 = list[i].right
        }

        dataT.nodeDataArray.push(goJsFormat)
        if(x == 0){
            x = 1;
        }else{
            x = 0;
        }
    }
    makeModel(dataT);
}