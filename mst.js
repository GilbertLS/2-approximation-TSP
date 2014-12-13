function MST(graph, time) {
	this.nodes 		= graph.nodes.slice();
	this.graph 		= graph;
	this.interval 	= null;
	this.done 		= false;
	this.time 		= time || 100;

	this.prim();
}

MST.prototype.prim = function() {
	var that = this;

	this.interval = setInterval(function() {
		if(!that.done)
			that.primInside();
		else {
			clearInterval(that.interval);
			that.interval = null;
		}
	}, this.time);
}

MST.prototype.primInside = function() {
	var Q = this.nodes;
	if(Q.length == 0) {
		this.done = true;
		return;
	}
	var u = extractMinNode(Q);
	removeFromArray(Q, u);
	for(var i = 0; i < Q.length; ++i) {
		var v = Q[i];
		var length = getLength(u,v);
		if(v.key == null || v.key > length) {
			v.parent = u;
			v.key = length;
		}
	}
	this.graph.draw();
	this.graph.drawNode(u, "#00FF00", 5);
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