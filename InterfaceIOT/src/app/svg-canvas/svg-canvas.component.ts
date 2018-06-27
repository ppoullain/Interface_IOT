import { Component, OnInit, Input, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Geometry, Point2D, Segment } from './geometry';
@Component({
  selector: 'app-svg-canvas',
  templateUrl: './svg-canvas.component.html',
  styleUrls: ['./svg-canvas.component.css']
})

export class SvgCanvasComponent implements OnInit {

	private control_points: Point2D[] = [];
	private nb_arc:number;
	private disp_arc:boolean = false;
	private str_cmd:string = "";
  	radius = 2;

  	constructor() { }

	draw(){
		// efface tout		
		d3.select('g').selectAll('circle').remove();
		d3.select('g').selectAll('path').remove();
		d3.select('g').selectAll('line').remove();

		// ajout les point de control
		d3.select('g').selectAll('circle').data(this.control_points).enter()
	  		.append('circle')
	    		.attr('cx', d => d.getX())
	      		.attr('cy', d => d.getY())
	      		.attr('r', 3)
	      		.attr('fill', 'red')

	    // ajout la courbe de bezier
	    let curve = "M " + this.control_points[0].getX() + " " + this.control_points[0].getY() +
	    			 "C " + this.control_points[1].getX() + " " + this.control_points[1].getY() + 
	    			 ", " + this.control_points[2].getX() + " " + this.control_points[2].getY() + 
	    			 ", " + this.control_points[3].getX() + " " + this.control_points[3].getY();

        d3.select('g')
        	.append("path")
            	.attr("d", curve)
            	.attr("stroke", "yellow")
            	.attr("stroke-width", 3)
            	.attr("fill", "none");

        if(this.disp_arc){
        	// ajout des points de la courbe 
	        let curve_points:Point2D[] = this.compute_curve_points(this.control_points, this.nb_arc*2);
			d3.select('g').selectAll('.circle2').data(curve_points).enter()
		  		.append('circle')
		  			.attr('class', 'circle2')
		    		.attr('cx', d => d.getX())
		      		.attr('cy', d => d.getY())
		      		.attr('r', 1)
		      		.attr('fill', 'blue') 
	        // ajout les arc de cercles

	        let radius:number[] = this.compute_all_arc(curve_points, this.nb_arc*2)[0];

	        let arc = "M "+ curve_points[0].getX() + " " + curve_points[0].getY();
	       	for(let i = 0 ; i < this.nb_arc*2 ; i+=2){
	       		arc += "A "+ radius[i] + " " + radius[i] + " 0 0 1 " + curve_points[i+2].getX() + " " + curve_points[i+2].getY()
	       	}
	        d3.select('g')
	        	.append("path")/*.datum(this.control_points)*/
	            	.attr("d", arc)
	            	.attr("stroke", "black")
	            	.attr("stroke-width", 1)
	            	.attr("fill", "none")

	        // ajout des lignes de construction
	        /*
	        let corde:Segment = new Segment(curve_points[0],curve_points[2]);
	        d3.select('g')
	        	.append('line')
	        		.attr('x1', curve_points[0].getX())
	        		.attr('y1', curve_points[0].getY())
	        		.attr('x2', curve_points[2].getX())
	        		.attr('y2', curve_points[2].getY())
	        		.attr("stroke", "black")
	            	.attr("stroke-width", 1)
	        //*/
        }
        
	}
  	ngOnInit() {

	  	this.control_points[0] = new Point2D(50,50);
		this.control_points[1] = new Point2D(150,50);
		this.control_points[2] = new Point2D(150,150);
		this.control_points[3] = new Point2D(50,150);
		this.nb_arc = 1;	  	
		this.draw();

	};
	onChanges(event:any){
	    console.log(event);
	  }
	randomize(){
		this.control_points[0].set(Math.floor(Math.random()*100), Math.floor(Math.random()*100));
		this.control_points[1].set(Math.floor(Math.random()*100) + 100, Math.floor(Math.random()*100));
		this.control_points[2].set(Math.floor(Math.random()*100) + 100, Math.floor(Math.random()*100) + 100);
		this.control_points[3].set(Math.floor(Math.random()*100), Math.floor(Math.random()*100) + 100);
		this.disp_arc = false;
		this.draw();
	}
	/*
	approximate(){
		this.approximation = true;
		this.draw();
	}
	*/
	compute_curve_points(control_points: Point2D[], nb_points:number):Point2D[]{
		let points: Point2D[] = [];
		let t: number[] = [];
		for(let i = 0; i <= nb_points; i++){
			t[i]=i/nb_points;
			let x = control_points[0].getX()*Math.pow( (1-t[i]) , 3) 
					+ 3*control_points[1].getX()*t[i]*Math.pow( (1-t[i]) , 2) 
					+ 3*control_points[2].getX()*Math.pow(t[i], 2)*(1-t[i]) 
					+ control_points[3].getX()*Math.pow(t[i], 3);

			let y = control_points[0].getY()*Math.pow( (1-t[i]) , 3) 
					+ 3*control_points[1].getY()*t[i]*Math.pow( (1-t[i]) , 2) 
					+ 3*control_points[2].getY()*Math.pow(t[i], 2)*(1-t[i]) 
					+ control_points[3].getY()*Math.pow(t[i], 3);

			points[i] = new Point2D(x,y);
		}
		//console.log(points);
		return points;
	}

	compute_one_arc(A:Point2D, B:Point2D, C:Point2D):[number,number]{
		// input : 3 points
		// output : position taille rayon
		// rayon = corde²/(8*fleche) + fleche/2
		console.log("compute one arc : ")
		console.log(A)
		console.log(B)
		console.log(C)
		let ac:Segment = new Segment(A,C);
		let hd:Segment = Geometry.rotation(new Segment(Geometry.middle(ac), C), -Math.PI/2);
		let hb:Segment = new Segment(Geometry.middle(ac), B);
		let alpha = Geometry.angle(hd,hb);
		let x:Segment = new Segment(new Point2D(0,0), new Point2D(100,0));
		let theta = Geometry.angle(x, hd);
		console.log("angle");
		console.log(theta*180/Math.PI)
		// determiner la position du centre c et retourner l'angle AcC
		
		let corde = Geometry.norm(ac);
		let fleche = Geometry.norm(hb)*Math.cos(alpha);
		
		let nrayon = (Math.pow(corde,2) / (8*fleche)) + fleche/2;
		console.log("rayon")
		console.log(nrayon)
		let mid_arc:Point2D = new Point2D(Geometry.middle(ac).getX()+Math.floor(fleche*Math.cos(theta)), Geometry.middle(ac).getY()+Math.floor(fleche*Math.sin(theta)));
		
		let centre:Point2D = new Point2D(mid_arc.getX()-Math.floor(nrayon*Math.cos(theta)), mid_arc.getY()-Math.floor(nrayon*Math.sin(theta)));
		console.log(centre);
		d3.select('g')
	  		.append('circle')
	    		.attr('cx', mid_arc.getX())
	      		.attr('cy', mid_arc.getY())
	      		.attr('r', 1)
	      		.attr('fill', 'green')
	    d3.select('g')
	  		.append('circle')
	    		.attr('cx', centre.getX())
	      		.attr('cy', centre.getY())
	      		.attr('r', 1)
	      		.attr('fill', 'green')

	    let angle:number = Geometry.angle(new Segment(centre,A), new Segment(centre,C));
/*
		let f:Segment = new Segment(Geometry.middle(ac), new Point2D(Geometry.middle(ac).getX()+Math.abs(fleche),Geometry.middle(ac).getY()));
		f=Geometry.rotation(f,Geometry.angle(f,ac)-Math.PI/2);

		d3.select('g')
        	.append('line')
        		.attr('x1', hd.getA().getX())
        		.attr('y1', hd.getA().getY())
        		.attr('x2', hd.getB().getX())
        		.attr('y2', hd.getB().getY())
        		.attr("stroke", "black")
            	.attr("stroke-width", 1)

        d3.select('g')
        	.append('line')
        		.attr('x1', x.getA().getX())
        		.attr('y1', x.getA().getY())
        		.attr('x2', x.getB().getX())
        		.attr('y2', x.getB().getY())
        		.attr("stroke", "black")
            	.attr("stroke-width", 1)
//*
		d3.select('g')
        	.append('line')
        		.attr('x1', hb.getA().getX())
        		.attr('y1', hb.getA().getY())
        		.attr('x2', hb.getB().getX())
        		.attr('y2', hb.getB().getY())
        		.attr("stroke", "black")
            	.attr("stroke-width", 1)
		d3.select('g')
        	.append('line')
        		.attr('x1', f.getA().getX())
        		.attr('y1', f.getA().getY())
        		.attr('x2', f.getB().getX())
        		.attr('y2', f.getB().getY())
        		.attr("stroke", "black")
            	.attr("stroke-width", 1)
		d3.select('g')
        	.append('line')
        		.attr('x1', ac.getA().getX())
        		.attr('y1', ac.getA().getY())
        		.attr('x2', ac.getB().getX())
        		.attr('y2', ac.getB().getY())
        		.attr("stroke", "black")
            	.attr("stroke-width", 1)
//*/
		return [nrayon, angle];
	}
	compute_all_arc(curve_point:Point2D[], nb_arc:number):[number[],number[]]{
		let radius:number[] = [];
		let angles:number[] = [];
		for(let i = 0 ; i < nb_arc-1 ; i+=2){
			[radius[i],angles[i]] = this.compute_one_arc(curve_point[i], curve_point[i+1], curve_point[i+2]);
		}
		return [radius,angles];
	}
	cmd_robot(){
		this.str_cmd = "DOWN|";
		let curve_points:Point2D[] = this.compute_curve_points(this.control_points, this.nb_arc*2);
		let radius:number[] = [];
		let angles:number[] = [];
		[radius,angles] = this.compute_all_arc(curve_points, this.nb_arc*2);
		for(let i = 0 ; i < radius.length ; i+=2){
			this.str_cmd += "T:1:1:"+Math.floor(radius[i])+":"+Math.floor(Math.abs(angles[i])*180/Math.PI)+"|";
		}
		this.str_cmd += "UP"
		console.log(this.str_cmd);
	}
	
  	
}
