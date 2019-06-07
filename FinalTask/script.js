//初期シードをランダムに決める
function getRandomSeed(x,y,z)
{
    var seedx = (0.3+Math.random()*0.4)*x;
    var seedy = (0.3+Math.random()*0.4)*y;
    var seedz = (0.3+Math.random()*0.4)*z;
    
    return new KVS.Vec3(seedx,seedy,seedz);
}


function main()
{
    
    var volume = new KVS.CreateTornadoData(64,64,64);
    var screen = new KVS.THREEScreen();

    screen.init(volume, {
        width: window.innerWidth * 0.6,
        height: window.innerHeight*0.6,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });
    setup();
    screen.loop();
   
    function setup()
    {
        
        var dep,wid,hei;
        var smin = volume.min_value;
        var smax = volume.max_value;
        var color = new KVS.Vec3( 0.2, 0.7, 0.9 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 4 );

        var seed_point = getRandomSeed(64,64,64);
       
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth(4);
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        var light = new THREE.PointLight();
        light.position.set( 64, 64, 64);
        screen.scene.add( light );
        
        var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraud.vert').text,
        fragmentShader: document.getElementById('gouraud.frag').text,
        });
        screen.scene.add( material );
        
        //スライダの数値反映
         //width
        document.getElementById('width').addEventListener('mousemove', function() {
            var hoge = +document.getElementById('width').value;               document.getElementById('width1').innerHTML = hoge;
            });
         //depth
        document.getElementById('depth').addEventListener('mousemove', function() {
            var hoge = +document.getElementById('depth').value;
            document.getElementById('depth1').innerHTML = hoge;
            });
         //height
        document.getElementById('height').addEventListener('mousemove', function() {
            var hoge = +document.getElementById('height').value;
            document.getElementById('height1').innerHTML = hoge;
            });
         //integrtion
        document.getElementById('integration').addEventListener('mousemove', function() {
            var hoge = +document.getElementById('integration').value;
            document.getElementById('intg1').innerHTML = hoge;
        });
        
        //boxのサイズ変更
        document.getElementById('boxchange-button').addEventListener('click',function(){
            screen.scene.remove( line1 );
            screen.scene.remove( line2 );
            
            wid=+document.getElementById('width').value;
            dep=+document.getElementById('depth').value;
            hei=+document.getElementById('height').value;
            volume = KVS.CreateTornadoData(wid,dep,hei);
            line1 = KVS.ToTHREELine( box.exec( volume ) );
            line2 = KVS.ToTHREELine( streamline.exec( volume ) );
            seed_point = getRandomSeed(wid,dep,hei);
            streamline.setIntegrationStepLength( 0.5 );
            streamline.setIntegrationTime( 500 );
            streamline.setIntegrationMethod( KVS.RungeKutta4 );
            streamline.setIntegrationDirection( KVS.ForwardDirection );
            streamline.setLineWidth(4);
            streamline.setSeedPoint( seed_point );
            screen.scene.add(line1);
            screen.scene.add(line2);
            
        })
        
        
        //integration変更
        document.getElementById('integration-change-button').addEventListener('click',function(){
            screen.scene.remove( line1 );
            screen.scene.remove( line2 );
            var intg = document.getElementById('integration').value;
            streamline.setIntegrationTime( intg );
            //line1 = KVS.ToTHREELine( box.exec( volume ) );
            line2 = KVS.ToTHREELine( streamline.exec( volume ) );
            
            screen.scene.add(line1);
            screen.scene.add(line2);
           
            
        })
        
        
        
        screen.draw();
         window.addEventListener('resize', function() {
screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
});

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
    }
}
