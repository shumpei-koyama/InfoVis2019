function main()
{
    var volume = new KVS.CreateTornadoData( 64, 128, 64); //竜巻が入る箱のサイズ
    //xyサイズが大きいと流線の最大サイズ大きくなるが描画時間も長くなる
    var screen = new KVS.THREEScreen(); //スクリーン初期生成

    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraud.vert').text,
        fragmentShader: document.getElementById('gouraud.frag').text,

    });


    screen.init( volume );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 0.5, 0.5, 0.7 );
        var box = new KVS.BoundingBox(); //箱を作成
        box.setColor( color ); //箱の色を設定
        box.setWidth( 2 ); //箱の辺のサイズを設定



        var seed_point = volume.objectCenter(); //
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime(500 );//流線の出来上がる進捗っぽいの
        streamline.setIntegrationMethod( KVS.RungeKutta2 ); //微分方程式の近似解の求め方
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 5 ); //ラインの太さ
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        var light = new THREE.PointLight();
        light.position.set( 5, 5, 5 );
        screen.scene.add( light );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });


    }
}
