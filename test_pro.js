var sX = 3;
var sY = 3;

var total = 0;

var imgName = "default.png";

var imgHeight = 300;
var imgWidth = 300;

var gridHeight = 0;
var gridWidth = 0;

function isInt ( i ) {
  return ( i.toString().search( /^-?[0-9]+$/ ) == 0 );
}

function isValidSize () {
  if ( ( imgHeight % sY ) != 0 ) {
    return false;
  }
  
  if ( ( imgWidth % sX ) != 0 ) {
    return false;
  }
  
  return true;
}

function setGridVar () {
  total = sX * sY;
  gridHeight = imgHeight / sY;
  gridWidth = imgWidth / sX;
}

function setX ( num ) {
  sX = num;
}

function setY ( num ) {
  sY = num;
}

var isIE = document.all;
var isNN =! document.all && document.getElementById;
var isN4 = document.layers;

function getById( id ) {
	var elem = null;
	
	if ( document.getElementById ) {
		elem = document.getElementById( id );
	} else if ( document.all ) {
		elem = document.all[id];
	
		if ( !elem ) {
			elem = eval( 'document.all.' + id );
		}
	} else if ( document.layers ) {
		elem = getObjNN4( document, id );
	}
	
	if ( !elem ) {
		elem = document.getElementById( id );
	}                   
	
	return elem;  
}

function reinit () {
  var tmp = null;
  
  tmp = getById( "jumper" );
  tmp.style.background = "";
  
  jumper = -1;
  
  init();
}

function init () {
  var tmp = null;
  var tmpNum = 0;
  
  var spaceX = 0;
  var spaceY = 0;
  
  var tmpGrid = "";
  
  if (
    ( isInt( imgHeight ) && imgHeight > 0 ) &&
    ( isInt( imgWidth ) && imgWidth > 0 ) &&
    ( isInt( sY ) && sY > 0 ) &&
    ( isInt( sX ) && sX > 0 )
  ) {
    if ( !isValidSize() ) {
      alert( "圖片尺寸無法被平均分割!!" );
//    } else {
//      alert( "TEST 99!!" );
    }
//  } else {
//    alert( "TEST 102!!" );
  }
  
  setGridVar();
  
  tmp = getById( "HintBlock" );
  tmp.src = imgName;
  
  tmp = getById( "GridBolck" );
  tmp.innerHTML = "";
  
  for ( i = 0; i < sY; i++ ) {
    tmpGrid += '<div class="innerRow">\n';
    
    for ( j = 0; j < sX; j++ ) {
      tmpNum = i * sX + j;
      
      spaceX = 0 - j * gridWidth;
      spaceY = 0 - i * gridHeight;
      
      tmpGrid += '<span id="place' +
                  tmpNum +
                  '" class="innerBlock" style="height: ' +
                  gridHeight + 'px; width: ' + gridWidth + 'px; background: ' +
                  'url(' + imgName + ') no-repeat scroll ' +
                  spaceX + 'px ' + spaceY + 'px transparent;" onclick="play(' + tmpNum + ');"></span>\n';
    }
    
    tmpGrid += "</div>\n";
  }
  
  tmp.innerHTML = tmpGrid;
  
  tmp = getById( "jumper" );
  tmp.style.height = gridHeight;
  tmp.style.width = gridWidth;
}

var jumper = -1;

function random ( max, min ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function start () {
  if ( jumper >= 0 && jumper < total ) {
    reinit();
  }
  
  jumper = random( total - 1, 0 );
  
  var tmp = null;
  var tmp_a = null;
  var tmp_b = null;
  
  tmp = getById( "startBtn" );
  tmp.value = "Re-start";
  
  for ( i = 0; i < total; i++ ) {
    tmp_a = getById( "place" + i );
    
    if ( i == jumper ) {
      tmp_b = getById( "jumper" );
      tmp_b.style.background = "";
//      tmp_b.style.background = "url('null.png') no-repeat scroll 0px 0px transparent";
    } else {
      tmp_b = getById( "place" + random( total - 1, 0 ) );
    }
    
    switcher( tmp_a, tmp_b );
  }
}

function switcher ( object_a, object_b ) {
  var s = object_a.style.background;
  object_a.style.background = object_b.style.background;
  object_b.style.background = s;
}

function checker ( show ) {// name ) {
//  var elem = getById( name );
//  alert( "????????:" + elem.style.background );
  var counter = 0;
  var elem = null;
  
  var tmper = getById( "tmper" );
  
  var tmpX = 0;
  var tmpY = 0;
  var spaceX = 0;
  var spaceY = 0;
  
  var tmpStyle = "";
  
  for ( i = 0; i < total; i++ ) {
    tmpX = i % sX;
    tmpY = ( i - tmpX ) / sX;
    
    spaceX = 0 - tmpX * gridWidth;
    spaceY = 0 - tmpY * gridHeight;
    
    tmper.style.background = "url(" + imgName + ") no-repeat scroll " + spaceX + "px " + spaceY + "px transparent";
    
    elem = getById( "place" + i );
    
//    alert( "[" + tmper.style.background + "]/[" + elem.style.background + "]" );
    
    if ( tmper.style.background == elem.style.background ) {
      counter++;
    }
  }
  
  if ( counter == ( total - 1 ) ) {
    alert( "Congratulation:completed!!" );
  } else if ( show ) {
    alert( "Correct:" + counter );
  }
}

function play ( num ) {
  var check_num = 0;
  var elem_tmp = null;
  
  var tmpX = 0;
  var tmpY = 0;
  
  var log = "";
  
  var elem = getById( "place" + num );
  
  if ( elem.style.background == null || elem.style.background == "" ) {
    return;
//    alert( "NULL!!" );
//  } else {
//    alert( elem.style.background );
  }
  
  tmpX = num % sX;
  tmpY = ( num - tmpX ) / sX;
  
  /* check - up */
  if ( tmpY - 1 >= 0 ) {
    check_num = ( tmpY - 1 ) * sX + tmpX;
    elem_tmp = getById( "place" + check_num );
    
    if ( elem_tmp.style.background == null || elem_tmp.style.background == "" ) {
      switcher( elem, elem_tmp );
      log += "null;";
    } else {
      log += "up;";
    }
  } else {
    log += "up-over;";
  }
  
  /* check - right */
  if ( tmpX + 1 < sX ) {
    check_num = tmpY * sX + tmpX + 1;
    elem_tmp = getById( "place" + check_num );
    
    if ( elem_tmp.style.background == null || elem_tmp.style.background == "" ) {
      switcher( elem, elem_tmp );
      log += "null;";
    } else {
      log += "right;";
    }
  } else {
    log += "right-over;";
  }
  
  /* check - down */
  if ( tmpY + 1 < sY ) {
    check_num = ( tmpY + 1 ) * sX + tmpX;
    elem_tmp = getById( "place" + check_num );
    
    if ( elem_tmp.style.background == null || elem_tmp.style.background == "" ) {
      switcher( elem, elem_tmp );
      log += "null;";
    } else {
      log += "down;";
    }
  } else {
    log += "down-over;";
  }
  
  /* check - left */
  if ( tmpX - 1 >= 0 ) {
    check_num = tmpY * sX + tmpX - 1;
    elem_tmp = getById( "place" + check_num );
    
    if ( elem_tmp.style.background == null || elem_tmp.style.background == "" ) {
      switcher( elem, elem_tmp );
      log += "null;";
    } else {
      log += "left;";
    }
  } else {
    log += "left-over;";
  }
  
//  alert( log );
  checker( false );
}

function resize () {
  var str = prompt( "請輸入兩個大於1的整數(用逗號分隔)", "x,y" );
  
  var regex = /^(\d+),(\d+)$/gi;
  
  str = regex.exec( str );
  
  if ( !str ) {
    alert( "輸入錯誤!!" );
    return;
//  } else {
//    alert( "OK!!" );
  }
  
//  alert ( "X:" + str[1] + "/Y:" + str[2] );
  
  setX( str[1] );
  setY( str[2] );
  
  reinit();
}

function switchIMG ( num ) {
  if ( !isInt( num ) || num < 1 || num > 5 ) {
    alert( "Exception(switchIMG)!!" );
    return;
  }
  
  var tmpObj = null;
  
  for ( i = 1; i <= 5; i++ ) {
    tmpObj = getById( "switchImg" + i );
    
    if ( i == num ) {
      tmpObj.checked = true;
    } else {
      tmpObj.checked = false;
    }
  }
  
//  alert( "Switch:" + num );
  switch ( num ) {
    case 2:
      imgHeight = 300;
      imgWidth = 560;
      imgName = "default_560x300.png";
      break;
    case 3:
      imgHeight = 300;
      imgWidth = 600;
      imgName = "default_600x300_1.png";
      break;
    case 4:
      imgHeight = 300;
      imgWidth = 600;
      imgName = "default_600x300_2.png";
      break;
    case 5:
      imgHeight = 480;
      imgWidth = 640;
      imgName = "default_640x480.png";
      break;
    case 1:
    default :
      imgHeight = 300;
      imgWidth = 300;
      imgName = "default.png";
      break;
  }
  
  reinit();
}
