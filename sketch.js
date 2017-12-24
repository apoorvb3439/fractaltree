let tree=[];
let leaves=[];
let len;
let level=0;
let timer=0;
function setup() {
	len=windowWidth/9;
	createCanvas(windowWidth,windowHeight);
	let a=createVector(0,0);
	let b=createVector(0,-len);
	tree[0]=new Branch(a,b);

}

function mousePressed(){
	level++;
	for(let i=tree.length-1; i>=0; i--){
		if(!tree[i].finished){
			let lb=tree[i].lbranch();
			let rb=tree[i].rbranch();
			tree.push(lb);
			tree.push(rb);
			if(level>1){
				leaves.push(lb.end);
				leaves.push(rb.end);
			}
		}
		tree[i].finished=true;
	}
}

function drawLeaves(){
	for(let i=0; i<leaves.length; i++){
		noStroke();
		fill(255,192,203,150);
		ellipse(leaves[i].x,leaves[i].y,30,30);
	}
}

function draw() {
	background(250);
	translate(width/2,height);
	for(let i=tree.length-1; i>=0; i--){
		tree[i].show();
		tree[i].jitter();
	}
	drawLeaves();

}

function Branch(begin, end){
	this.beginPos=begin;
	this.endPos=end;
	this.begin=begin;
	this.end=end;
	this.finished=false;
	this.col=color(77,158,58);

	this.lbranch=function(){
		var a=createVector(this.end.x,this.end.y);
		var b=createVector(this.begin.x,this.begin.y);
		a.sub(b);
		a.rotate(PI/6);
		a.mult(0.8);
		a.add(this.end);
		return new Branch(this.end,a);
	}

	this.rbranch=function(){
		var a=createVector(this.end.x,this.end.y);
		var b=createVector(this.begin.x,this.begin.y);
		a.sub(b);
		a.rotate(-PI/4);
		a.mult(0.8);
		a.add(this.end);
		return new Branch(this.end,a);
	}

	this.jitter=function(){
		this.end.x+=random(-1/4,1/4);
		this.end.y+=random(-1/6,1/6);
		if(p5.Vector.dist(this.end,this.endPos)>0.5){
			this.end.x=this.endPos.x;
			this.end.y=this.endPos.y;
		}
	}


	this.show=function(){
		stroke(this.col);
		var d=p5.Vector.dist(this.begin,this.end);
		strokeWeight(map(d,0,height,1,20));
		line(begin.x,begin.y,end.x,end.y);
	}
}
