function Graph(ctx, num) {
	this.ctx = ctx;
	this.nodes = [];
	this.edges = [];
	this.createNodes(num);
}

Graph.prototype.createNodes = function(amount) {
	var ctx = this.ctx;
	for(var i = 0; i < amount; ++i) {
		this.nodes.push(new Node(	Math.random() * ctx.canvas.width, 
									Math.random() * ctx.canvas.height));
	}
}

Graph.prototype.testNodes1 = function() {
	this.nodes.push(new Node(100,100));		//a
	this.nodes.push(new Node(100,200));		//b
	this.nodes.push(new Node(50,250));		//c
	this.nodes.push(new Node(200,100));		//d
	this.nodes.push(new Node(250,150));		//e
	this.nodes.push(new Node(200,200));		//f
	this.nodes.push(new Node(300,200));		//g
	this.nodes.push(new Node(150,300));		//h
}

Graph.prototype.clear = function() {
	var ctx = this.ctx;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

Graph.prototype.draw = function() {
	this.clear();
	this.drawEdges();
	this.drawTourEdges("#FF0000", 2);
	this.drawNodes();
}

Graph.prototype.drawFullGraph = function() {
	this.clear();
	for(var i = 0; i < this.nodes.length; i++) {
		for(var j = i + 1; j < this.nodes.length; j++) {
			this.drawEdge(this.nodes[i], this.nodes[j]);
		}
	}
	this.drawNodes();
}

Graph.prototype.drawNodes = function(color) {
	for(var i = 0; i < this.nodes.length; ++i) {
		var node = this.nodes[i];
		this.drawNode(node, color);
	}
}

Graph.prototype.drawNode = function(node, color, size) {
	if(!node)
		return;

	color = color || "#000";
	size  = size || 2
	var ctx = this.ctx;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(node.x, node.y, size, 0, size * Math.PI, false);
	ctx.fill();
}

Graph.prototype.drawEdge = function(node1, node2, color, thickness) {
	color = color || "#000";
	thickness = thickness || 1;
	var ctx = this. ctx;

	if(!node1 || !node2)
		return;

	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.beginPath();
	ctx.moveTo(node1.x, node1.y);
	ctx.lineTo(node2.x, node2.y);
	ctx.stroke();
}

Graph.prototype.drawEdges = function(color, thickness) {
	for(var i = 0; i < this.nodes.length; ++i) {
		var node = this.nodes[i];
		var parent = node.parent;
		if(parent) {
			this.drawEdge(node, parent, color, thickness);
		}
	}
}

Graph.prototype.drawTourEdges = function(color, thickness) {
	for(var i = 0; i < this.nodes.length; ++i) {
		var node = this.nodes[i];
		var parent = node.tourParent;
		if(parent) {
			this.drawEdge(node, parent, color, thickness);
		}
	}
}

Graph.prototype.getRoot = function() {
	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		if(!node.parent)
			return node;
	}

	return null;
}

Graph.prototype.getEdgesLength = function() {
	return 0;
}

//Populate nodes children list for future tour
Graph.prototype.populateChildrenFromParents = function() {
	for(var i = 0; i < this.nodes.length; i++)
		this.nodes[i].children = [];

	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];

		if(node.parent) {
			node.parent.children.push(node);
		}
	}
}

Graph.prototype.again = function() {
	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		node.key = null;
		node.parent = null;
		node.children = [];
		node.angle = 0;
		node.tourParent = null;
	}
}

function Node(x, y) {
	this.x = x;
	this.y = y;
	this.key = null;
	this.parent = null;
	this.children = [];
	this.angle = 0;
	this.tourParent = null;
}

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