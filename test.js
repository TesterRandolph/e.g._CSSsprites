var place = new Array( total );

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
  
  var tmpX = 0;
  var tmpY = 0;
  var spaceX = 0;
  var spaceY = 0;
  
  for ( i = 0; i < total; i++ ) {
    tmp = getById( "place" + i );
    
    tmpX = i % b;
    tmpY = ( i - tmpX ) / b;
    
    spaceX = 0 - tmpX * 100;
    spaceY = 0 - tmpY * 100;
    
    tmp.style.background = "url('default.png') no-repeat scroll " + spaceX + "px " + spaceY + "px transparent";
  }
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
    tmpX = i % b;
    tmpY = ( i - tmpX ) / b;
    
    spaceX = 0 - tmpX * 100;
    spaceY = 0 - tmpY * 100;
    
    tmper.style.background = "url('default.png') no-repeat scroll " + spaceX + "px " + spaceY + "px transparent";
    
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
  
  tmpX = num % b;
  tmpY = ( num - tmpX ) / b;
  
  /* check - up */
  if ( tmpY - 1 >= 0 ) {
    check_num = ( tmpY - 1 ) * b + tmpX;
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
  if ( tmpX + 1 < b ) {
    check_num = tmpY * b + tmpX + 1;
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
  if ( tmpY + 1 < b ) {
    check_num = ( tmpY + 1 ) * b + tmpX;
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
    check_num = tmpY * b + tmpX - 1;
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
