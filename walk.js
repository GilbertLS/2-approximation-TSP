function Walk(graph, time) {
	this.graph 			= graph;
	this.visitedNodes 	= null;
	this.currentNode 	= null;
	this.first 			= null;
	this.done 			= false;
	this.time 			= time || 100;

	//Run walk
	this.init();
	this.graph.draw();
	this.graph.drawNode(this.currentNode, "#00FF00", 5);
	this.walk();
}

Walk.prototype.init = function() {
	this.visitedNodes 	= [];
	this.currentNode 	= this.graph.getRoot();
	this.first 			= this.currentNode;
	this.done 			= false;

	//Populate node's children array to make walk easier
	this.graph.populateChildrenFromParents();

	//Calculate angle between parent and child
	//Used to pick min node
	for(var i = 0; i < this.graph.nodes.length; i++) {
		var node = this.graph.nodes[i];

		if(node.parent)
			node.angle = getAngle(node.parent, node);
		else
			node.angle = 0;
	}
}

Walk.prototype.walk = function() {
	var that = this;

	//Interval used to slow down algorithm to make rendering slower
	this.interval = setInterval(function() {
		if(!that.done) {
			that.walkInside();
		} else {
			clearInterval(that.interval);
			that.interval = null;
		}
	}, this.time);
}

Walk.prototype.walkInside = function() {
		if(this.visitedNodes.indexOf(this.currentNode) < 0)
				this.visitedNodes.push(this.currentNode);

		if(this.currentNode.children.length > 0) {
			var node = getNodeWithSmallestAngle(this.currentNode.children);
			removeFromArray(this.currentNode.children, node);
			this.currentNode = node;
			this.currentNode.walkParent = this.visitedNodes[this.visitedNodes.length-1];
		} else {
			this.currentNode = this.currentNode.parent;
		}

		if(this.visitedNodes.length == this.graph.nodes.length || this.currentNode == null) {
			this.first.walkParent = this.visitedNodes[this.visitedNodes.length-1];
			this.done = true;
			this.graph.draw();
			return;
		}

		this.graph.draw();
		this.graph.drawNode(this.currentNode, "#00FF00", 5);
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