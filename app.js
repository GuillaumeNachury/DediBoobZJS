/**
* @author: Guillaume Nachury
* @date: 10/2013
*/
/*

COQUINOU !!!!!!!!!!!!!!!!!!!!!!!


                                     _._._
                                 _.-'  /  ``-._
                                /     |  -._   \.
                               ///   /|-._  \  \ \
                              / //   |._  `\\\  \ \
                             /  //_./   `\_ \\\  | \
                            |   //         \  \\ \  \
                            |  //           \  \  |  \
                            / / | __      __\\ \\ \   \
                            /|  |~~~~    ~~~~\ \-._    \
                           / |  | =O=\    =O= \ \  \_   |
                          / /|  |              \     \  |
                         ||  |  |               \`\.-.  |
                         |\  |  |      o        |  |  \ |
                         | \ |  |      ___      /  |  | |
                        /\ \  \ \\    /___\    /   |  | |
                       / /\||  \ \\           /  /\\  | |
                     ./ / _/ \  \ \`\.     ./' /  /\\_./|
                   _.- `-._   \ |||   ----'  // .- _`--'|
                 ./   ___ _.--''  |       .-'| / -' _ \ |\
                /  .-'   // _.-/| |       '-'+ | - '| |||\
               /  /     // /_./ // `.      /  \\_\\ / \\|\
              |  /      |/-' _./.     -   /.-'_\__// // _\_--
              | |       / .-'  | |       /| / _ || |\  /  //`\
              \ \      /    `\ \ \       \||_-_-\\\\ \|  |/ /
               /     ./|/|  .-'_\ \       \||/ _.\\\ /|  | ||
              .     | //|  /_._    `-._    \| / -\  | /`-\   |\\
              |     | |_ \//   `\ `-.//     \| /_-/||/   \  / /'
              '     \= - |       \.\\/       \\__/ /\.____//
             |       _-.-'\        \_ _       \---/  \___./ \
             |         /  . ' .      `              \   _'  \
             ....++   /   . O        \               \ ' / ||
            ......+++ |    . . '      |               \-' / |
            ......++.+                |            .'. \-'  /
           ....+...+.""               /           . O .|   /
           ....""""".""""            /            `   .|   |
           ....""""+..""""        _.'              ` ' |+..|
           .....""": ."""""" __.-'     .               ++..
           .....""":|+..""""".          `.           ""+.+.
          ......""":|+++.""""".           .     .."""/++...
          ........""|++..""""".            `- """"""/++....
         ........"""|.+..""""".          ..""""""".'+++....
       ..........""""`...""""".         .."""""""/+..++..
        `.........."""`..""""".        ..:::::..-::5. ++..
          ....."..""""""`.::::.       .:::..--:::::::..++."
           .......""""""""`:::. .... __--':::::::::..:...""
           \.......""_"""""`::/...... :::::::::..:::::...""
            \\......-:``----''""""""".:::::..:::::::::...""
              \.... .::::::::""""""""...:::::::::::::::/
                ./  ..:::::::"""""""".:::::F_P::::::::
              ./     .::::::""""""""".:::::::::
             /       ..:::::"""""""..+__..--'
            /         .::"""_/::::..``
            |  /       ."""/:::::.. ++
            \_/./-/---' ::::::: ..:"`._
                          :""" ..::""""\
                            ""..:::"""""\
                              ..::::"""""\
                              ..:::::""""..
                                 :::::"... \
                                  .....     \
                                   \_        \
                                     `-.__/  /
                                          |_/


*/

var cvs = _("#playground");
var ctx = cvs.getContext("2d");

var srcImg = _("#src");
var srcMap = _("#map");

var buffer;
var map;
var textLayer;

var disp_filter;

var txt = "Hello Nico <3";
var c;

var Cfg = function() {
        this.xOffset = 4;
        this.yOffset = 29;
        this.angle=0;
        this.x = 332;
        this.y = 184;
        this.fontSize = 40;
};

function init(){
   setupGUI()
	cvs.width = srcImg.naturalWidth;
	cvs.height = srcImg.naturalHeight;
	
    _("#dedi").addEventListener("keyup", update);
    update();
}

function setupGUI(){
        c = new Cfg();
        var gui = new dat.GUI();
        var c1 =  gui.add(c, 'xOffset', 0, 100);
        var c2 =  gui.add(c, 'yOffset', 0, 100);
        var c3 =  gui.add(c, 'angle', -1, 1);
        var c4 =  gui.add(c, 'x', 0, srcImg.naturalWidth);
        var c5 =  gui.add(c, 'y', 0, srcImg.naturalHeight);
        var c6 =  gui.add(c, 'fontSize', 20, 80);
        
        
        c1.onChange(function(value) {
        update();
        });
        c2.onChange(function(value) {
        update();
        });
        c3.onChange(function(value) {
        update();
        });
        c4.onChange(function(value) {
        update();
        });
        c5.onChange(function(value) {
        update();
        });
        c6.onChange(function(value) {
        update();
        });
    
}

function update(){
    ctx.globalAlpha = 1;
    ctx.drawImage(srcImg, 0,0, srcMap.width, srcMap.height);

	buffer = document.createElement('canvas');
	buffer.width = srcImg.naturalWidth;
	buffer.height = srcImg.naturalHeight;

	var bufferCtx = buffer.getContext('2d');
	bufferCtx.font=c.fontSize+"px JennaSue";
    bufferCtx.fillStyle = '#000';
    
    txt=_('#dedi').value;
	var tw = bufferCtx.measureText(txt).width >> 1;
	var th = bufferCtx.measureText(txt).height >> 1;
	
	bufferCtx.rotate(c.angle);
    bufferCtx.fillText(txt,c.x,c.y);
	

	map = document.createElement('canvas');
	map.width = buffer.width;
	map.height = buffer.height;

	var mapCtx = map.getContext('2d');
	mapCtx.drawImage(srcMap, 0,0, srcMap.width, srcMap.height);

    textLayer = document.createElement('canvas');
	textLayer.width = buffer.width;
	textLayer.height = buffer.height;
    

	disp_filter = new filters.DisplacementMap(buffer, map, textLayer, new filters.Point(), c.xOffset, c.yOffset, filters.ColorChannel.RED, filters.ColorChannel.GREEN);

	disp_filter.draw();
    render();
}

function render(){
    //ctx.globalCompositeOperation = 'luminosity';
    ctx.globalAlpha = 0.3;
    ctx.drawImage(textLayer, 0,0, srcMap.width, srcMap.height);
    
}

function createFinalImage(){
}

window.onload = init;
