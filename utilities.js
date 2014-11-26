function getAngle(node1, node2) {
	var angle = Math.atan2(node2.y - node1.y, node2.x - node1.x) * 180 / Math.PI;
	while(angle < 0) {
		angle = 360 + angle;
	}

	return angle;
}

function getLength(node1, node2) {
	var length = 0;
	var xx = node2.x - node1.x;
	var yy = node2.y - node1.y;
	xx = xx * xx;
	yy = yy * yy;
	
	length = Math.sqrt(xx + yy);
	return length;
}

function getNodeWithSmallestAngle(nodes) {
	if(nodes.length < 1)
		return null;
	if(nodes.length == 1)
		return nodes[0];

	var minNode = nodes[0];
	for(var i = 1; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.angle < minNode.angle)
			minNode = node;
	}

	return minNode;
}

function extractMinNode(nodes) {
	var j = -1;
	var min = null;
	for(var i = 0; i < nodes.length; ++i) {
		if(min == null || nodes[i].key < min) {
			j = i;
			min = nodes[i].key;
		}
	}

	return nodes[j];
}

function removeFromArray(array, element) {
	var i = array.indexOf(element);
	
	if(i > -1)
		array.splice(i, 1);
}