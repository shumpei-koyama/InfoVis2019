function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();//sceneクラス実装

    var fov = 45;//地上からの角度
    var aspect = width / height;//アスペクト比
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );//sceneに追加
    
   

    var renderer = new THREE.WebGLRenderer();//レンダリング
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement )

    //object=geometry+material
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
     var material = new THREE.MeshLambertMaterial({
	color: 0xb7ee45
    });
    var cube = new THREE.Mesh( geometry, material );
    var light = new THREE.SpotLight(0x4644ac,8,0);
    light.position.set(1,1,1.5);
    scene.add(light);
    
    scene.add( cube );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        Renderer.render( scene, camera );
    }
}
