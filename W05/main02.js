//課題2
function main() {
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 60;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set(0,0,5);
    scene.add(camera);
    

    var pointlight = new THREE.PointLight(0xFFFFFF,2,50,1.0);
    scene.add(pointlight);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices=[//点の座標
	[-1,1,0],//v0
	[-1,-1,0],//v1
	[1,-1,0],//v2
	[1,1,0],//v3
	[-1,1,2],//v4
	[-1,-1,2],//v5
	[1,-1,2],//v6
	[1,1,2]//v7	
    ];
    var faces=[//面を作る時の頂点指定の順番
	[0,2,1],
	[0,3,2],
	[0,1,5],
	[0,5,4],
	[5,6,7],
	[4,5,7],
	[2,3,7],
	[2,7,6],
	[7,3,0],
	[7,0,4],
	[5,1,2],
	[5,2,6]
    ];
    var geometry=new THREE.Geometry();
    var v0=new THREE.Vector3().fromArray(vertices[0]);//頂点0
    var v1=new THREE.Vector3().fromArray(vertices[1]);//頂点1
    var v2=new THREE.Vector3().fromArray(vertices[2]);//頂点2
    var v3=new THREE.Vector3().fromArray(vertices[3]);//頂点3
    var v4=new THREE.Vector3().fromArray(vertices[4]);//頂点4
    var v5=new THREE.Vector3().fromArray(vertices[5]);//頂点5
    var v6=new THREE.Vector3().fromArray(vertices[6]);//頂点6
    var v7=new THREE.Vector3().fromArray(vertices[7]);//頂点7
    var id0=faces[0];
    var id1=faces[1];
    var id2=faces[2];
    var id3=faces[3];
    var id4=faces[4];
    var id5=faces[5];
    var id6=faces[6];
    var id7=faces[7];
    var id8=faces[8];
    var id9=faces[9];
    var id10=faces[10];
    var id11=faces[11];
    var f0=new THREE.Face3(id0[0],id0[1],id0[2]);
    var f1=new THREE.Face3(id1[0],id1[1],id1[2]);
    var f2=new THREE.Face3(id2[0],id2[1],id2[2]);
    var f3=new THREE.Face3(id3[0],id3[1],id3[2]);
    var f4=new THREE.Face3(id4[0],id4[1],id4[2]);
    var f5=new THREE.Face3(id5[0],id5[1],id5[2]);
    var f6=new THREE.Face3(id6[0],id6[1],id6[2]);
    var f7=new THREE.Face3(id7[0],id7[1],id7[2]);
    var f8=new THREE.Face3(id8[0],id8[1],id8[2]);
    var f9=new THREE.Face3(id9[0],id9[1],id9[2]);
    var f10=new THREE.Face3(id10[0],id10[1],id10[2]);
    var f11=new THREE.Face3(id11[0],id11[1],id11[2]);
    geometry.vertices.push(v0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.vertices.push(v4);
    geometry.vertices.push(v5);
    geometry.vertices.push(v6);
    geometry.vertices.push(v7);
    //面を作成
    geometry.faces.push(f0);
    geometry.faces.push(f1);
    geometry.faces.push(f2);
    geometry.faces.push(f3);
    geometry.faces.push(f4);
    geometry.faces.push(f5);
    geometry.faces.push(f6);
    geometry.faces.push(f7);
    geometry.faces.push(f8);
    geometry.faces.push(f9);
    geometry.faces.push(f10);
    geometry.faces.push(f11);
    
    geometry.computeFaceNormals();//面の向き指定
    
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    material.vertexcolors = THREE.VertexColors;
   
    //面の色指定
    geometry.faces[0].color = new THREE.Color(0.0,0.5,0.5);
    geometry.faces[1].color = new THREE.Color(0.1,0.5,0.5);
    geometry.faces[2].color = new THREE.Color(0.2,0.5,0.5);
    geometry.faces[3].color = new THREE.Color(0.3,0.5,0.5);
    geometry.faces[4].color = new THREE.Color(0.4,0.5,0.5);
    geometry.faces[5].color = new THREE.Color(0.5,0.5,0.5);
    geometry.faces[6].color = new THREE.Color(0.6,0.5,0.5);
    geometry.faces[7].color = new THREE.Color(0.7,0.5,0.5);
    geometry.faces[8].color = new THREE.Color(0.8,0.5,0.5);
    geometry.faces[9].color = new THREE.Color(0.9,0.5,0.5);
    geometry.faces[10].color = new THREE.Color(1,0.5,0.5);
    geometry.faces[11].color = new THREE.Color(1.0,0.5,0.5);
    
    var Triangle = new THREE.Mesh( geometry, material );
    scene.add( Triangle );
    
    
//--------------------------------------------------------
    //マウスクリックの処理
    document.addEventListener('mousedown',mouse_down_event);
    function mouse_down_event(event) {
    //画面上の座標をレンダリング範囲内の座標に直す
	var x_win = event.clientX;//ウィンドウ上x座標
	var y_win = event.clientY;//ウィンドウ上y座標

	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;
	
	var x_NDC = 2 * ( x_win - vx ) / vw - 1; //マウスx座標,-1~1に正規化
	var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 ); //マウスy座標,正規化
	
	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );//マウスの位置ベクトル(スクリーン系)
    var p_wld=p_NDC.unproject( camera );//オブジェクトの座標系に対応した位置ベクトルに変換
    
	var origin=camera.position; //origin = カメラの位置
	var direction=p_wld.sub(camera.position).normalize(); //カメラの方向
        
	var raycaster = new THREE.Raycaster( origin,direction);//マウスからの法線ベクトル
	var intersects = raycaster.intersectObject( Triangle );//法線ベクトルがぶつかる先
	//もしぶつかったなら
	if ( intersects.length > 0 )
	   {
	    intersects[0].face.color.setRGB( 0.2, 0.5, 0.7 );//色変更
	    intersects[0].object.geometry.colorsNeedUpdate = true;
       }
    }
        
    loop();
    
    function loop()
    {
        

        requestAnimationFrame( loop )
	Triangle.rotation.x += 0.01;   
        Triangle.rotation.y += 0.005;    
        renderer.render( scene, camera );   
    }
}
