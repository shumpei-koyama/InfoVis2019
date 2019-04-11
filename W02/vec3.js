// Constructor
Vec3 = function( x, y, z )
{
this.x = x;
this.y = y;
this.z = z;
}

// Add method
Vec3.prototype.add = function( v )
{
this.x += v.x;
this.y += v.y;
this.z += v.z;
return this;
}
// Sum method
Vec3.prototype.sum = function()
{
return this.x + this.y + this.z;
}

//show vector
function show(v)
{
   window.alert("("+v.x+","+v.y+","+v.z+")\n");
}

//Show minimum num
Vec3.prototype.min = function(){
    var min = this.x;
    if (min>this.y){min = this.y;}
    if (min>this.z){min = this.z;}
    return min;
}


//Show maximum num
Vec3.prototype.max = function(){
    var max = this.x;
    if (max<this.y){max = this.y;}
    if (max<this.z){max = this.z;}
    return max;
}


//Show medium num
Vec3.prototype.mid = function(){
    var mid = this.x;
    if (mid<this.y){mid = this.y;}
    if (mid>this.z){mid = this.z;}
    return mid;
}

      //calc triangle area
 function AreaofTriangle(p,q,r){
    var a=new Vec3(0,0,0); //vector a
    var b=new Vec3(0,0,0); //vector b
    //calc vector a
    a.x=q.x-p.x; a.y=q.y-p.y; a.z=q.z-p.z;
    //calc vector b
    b.x=r.x-p.x; b.y=r.y-p.y; b.z=r.z-p.z;
    //calc gaiseki
    var Sx,Sy,Sz,S;
    Sx=a.y*b.z-a.z*b.y;
    Sy=a.z*b.x-a.x*b.z;
    Sz=a.x*b.y-a.y*b.x;
    //calc S
    S=((Sx**2+Sy**2+Sz**2)**0.5)*0.5;
    return S;
}
