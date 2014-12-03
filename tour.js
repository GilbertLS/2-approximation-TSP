function Tour(graph, time) {
	this.graph 			= graph;
	this.visitedNodes 	= null;
	this.currentNode 	= null;
	this.first 			= null;
	this.done 			= false;
	this.time 			= time || 100;

	//Run tour
	this.init();
	this.graph.draw();
	this.graph.drawNode(this.currentNode, "#00FF00", 5);
	this.tour();
}

Tour.prototype.init = function() {
	this.visitedNodes 	= [];
	this.currentNode 	= this.graph.getRoot();
	this.first 			= this.currentNode;
	this.done 			= false;

	//Populate node's children array to make tour easier
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

Tour.prototype.tour = function() {
	var that = this;

	//Interval used to slow down algorithm to make rendering slower
	this.interval = setInterval(function() {
		if(!that.done) {
			that.tourInside();
		} else {
			clearInterval(that.interval);
			that.interval = null;
		}
	}, this.time);
}

Tour.prototype.tourInside = function() {
		if(this.visitedNodes.indexOf(this.currentNode) < 0)
				this.visitedNodes.push(this.currentNode);

		if(this.currentNode.children.length > 0) {
			var node = getNodeWithSmallestAngle(this.currentNode.children);
			removeFromArray(this.currentNode.children, node);
			this.currentNode = node;
			this.currentNode.tourParent = this.visitedNodes[this.visitedNodes.length-1];
		} else {
			this.currentNode = this.currentNode.parent;
		}

		if(this.visitedNodes.length == this.graph.nodes.length || this.currentNode == null) {
			this.first.tourParent = this.visitedNodes[this.visitedNodes.length-1];
			this.done = true;
			this.graph.draw();
			return;
		}

		this.graph.draw();
		this.graph.drawNode(this.currentNode, "#00FF00", 5);
}