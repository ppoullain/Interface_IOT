export class Point2D {
	constructor(private x: number, private y: number) { }
	set(x:number, y:number){
		this.x = x;
		this.y = y;
	}
	getX():number{
		return this.x;
	}
	getY():number{
		return this.y;
	}
}
export class Segment {
	constructor(private A: Point2D, private B: Point2D) { }
	getA():Point2D{
		return this.A;
	}
	getB():Point2D{
		return this.B;
	}
	vectorize():Point2D{
		return new Point2D(this.B.getX()-this.A.getX(), this.B.getY()-this.A.getY());
	}

}
export class Geometry {
	/**
	* Retourne le point milieu d'un segment
	* in: un segment
	* out: point milieu du segment
	*/
	static middle(segment:Segment):Point2D{
		return new Point2D((segment.getA().getX()+segment.getB().getX())/2, (segment.getA().getY()+segment.getB().getY())/2 );
	}
	/**
	* Retourne la norme d'un segment
	* in: un segment
	* out: norme du segment
	*/
	static norm(segment:Segment):number{
		return Math.sqrt(Math.pow(segment.getB().getX()-segment.getA().getX(),2) + Math.pow(segment.getB().getY()-segment.getA().getY(),2));
	}
	/**
	* Calcul le produit scalaire entre deux vecteurs
	* in: deux segments
	* out: produit scalaire
	*/
	static dot_product(segment1:Segment, segment2:Segment):number{
		return (segment1.vectorize().getX()*segment2.vectorize().getX() + segment1.vectorize().getY()*segment2.vectorize().getY()) / (Geometry.norm(segment1) * Geometry.norm(segment2));
	}
	/**
	* Calcul l'angle entre deux vecteurs
	* in: deux segments
	* out: angle (radian)
	*/
	static angle(segment1:Segment, segment2:Segment):number{
		console.log("segment1")
		console.log(segment1);
		console.log("segment2")
		console.log(segment2.vectorize().getY());
		return segment2.vectorize().getY() >=0 ? Math.acos(Geometry.dot_product(segment1, segment2)) : -Math.acos(Geometry.dot_product(segment1, segment2)) ;
	}
	/**
	* Effectue la rotation d'un segment 
	* in: un segment, angle de rotation (radian)
	* out: segment pivoté
	*/
	static rotation(segment:Segment, angle:number):Segment{
		let p:Point2D = new Point2D(segment.vectorize().getX()*Math.cos(angle)-segment.vectorize().getY()*Math.sin(angle), segment.vectorize().getX()*Math.sin(angle)+segment.vectorize().getY()*Math.cos(angle));
		return new Segment(segment.getA(), new Point2D(p.getX()+segment.getA().getX(), p.getY()+segment.getA().getY()));
	}
}