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
    var m = 0; // # of nodes
    var nodeList = [];
    var temp = 1;
    while(temp < length) {
        temp *= 2;
        exponent++;
    }
    for(var i = exponent;i>=0;i--) {
        m += Math.pow(2,i);
    }
    m += (2 * (numPlayer - Math.pow(2, exponent)));
    for(var b = m-numPlayer;b>0;b--) {
        nodeList.push(new Node(""))
    }

    for(var c = 0;c<list.length;c++) {
        nodeList.push(new Node(list[c]))
    }
    makeTree(nodeList)
}

var makeTree = function(list) {
    var maxCol;
    var tempArray = []
    for(var i = 0; i < list.length - numPlayer; i++) {
        var temp = list[i];
        temp.left = list[2 * i + 1].name;
        temp.right = list[2 * i + 2].name;
        tempArray.push(temp)
    }

    for(var i = 0; i <tempArray.length;i++)
    {
        var temp = tempArray[i]
        temp.col = Math.floor(Math.log2(i+1));
        maxCol = Math.floor(Math.log2(i+1));
    }
    var currentCol = 0;
    while(currentCol <= maxCol)
    {
        var parentRow = 0;
        for(var i = 0;i < tempArray.length;i++)
        {
            if(tempArray[i].col == currentCol)
            {
                tempArray[i].row = parentRow;
                parentRow = parentRow + 1;
            }
        }
        currentCol = currentCol + 1
    }
    var currentCol = 0;
    while(currentCol <= maxCol)
    {
        var parentValue = 0;
        var pairCounter = 0;
        for(var i = 0;i<tempArray.length;i++)
        {
            if(tempArray[i].col == currentCol)
            {
                if(pairCounter === 0 || pairCounter === 1)
                {
                    tempArray[i].pv = parentValue;
                    pairCounter = pairCounter + 1;
                }
                else
                {
                    pairCounter = 1;
                    parentValue = parentValue + 1;
                    tempArray[i].pv = parentValue;
                }
            }
        }
        currentCol = currentCol + 1;
    }
    makeJSON(tempArray)
}

function makeJSON(list){
    var x = 0;
    for(var i = 0;i<list.length;i++)
    {
        if(list[i].left == "")
        {
            var temp = {
                "key": list[i].col + "-" + list[i].row,
                "parent": (list[i].col - 1) + "-" + list[i].pv,
                "player1": list[i].right,
                "player2": list[i].left,
                "parentNumber": x
            };
        }else{
            var temp = {
                "key": list[i].col + "-" + list[i].row,
                "parent": (list[i].col - 1) + "-" + list[i].pv,
                "player1": list[i].left,
                "player2": list[i].right,
                "parentNumber": x
            };
        }

        dataT.nodeDataArray.push(temp)
        if(x == 0){
            x = 1;
        }else{
            x = 0;
        }
    }
    makeModel(dataT);
}