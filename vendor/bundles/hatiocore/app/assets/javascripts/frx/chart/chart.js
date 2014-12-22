var xBarData;
var rData;
var lcl = 20;
var cl = 45;
var ucl = 70;
var rowData;

function chartDisplay(receiveData){
	chartClear();
	rowData = receiveData;
	chartClear();
	
	if(!rowData.xbar || !rowData.rbar){
		alert("no Data");
		return;
	}
	
	xBarData = xBarDataGenerate();
	rData = rDataGenerate();
	
	xBarData.legend=[
      	{key : 'Normality', color : "#0000FF"},
      	{key : 'Up and Down 4 Points', color : "#00FF00"}, // 4개의 점의 상승/하락반복
      	{key : 'Continous Up or Down 6 Points', color : "#FFFF00"}, // 6개가 연속으로 상승혹은하락
      	{key : 'Above or Below Centerline 9 Points', color : "#F4A460"}, // 9개가 중심점보다 위또는아래
      	{key : 'Out of UCL/LCL', color : "#FF0000"} // UCL/LCL범위벗어남
      ];
    rData.legend=[
      	{key : 'normality', color : "#0000FF"},
      	{key : 'Out of UCL/LCL', color : "#FF0000"}
    ];
      
	chartRender();
}

function chartClear(){
	$("#x-bar").html('<svg></svg>');
	$("#r").html('<svg></svg>');
}

function chartReady(){
	$("#xBarUsl").val('');
  	$("#xBarLsl").val('');
  	$("#xBarCl").val('');
  	$("#rUsl").val('');
  	$("#rLsl").val('');
  	$("#rCl").val('');
  	
	$("#x-bar").offset({left:0,top:37});
	$('#x-bar').width($(window).width()-2);
	$('#x-bar').height($(window).height()*0.5 - 37);
	
	$("#r").offset({left:0,top:$(window).height()*0.5+8 + 37});
	$('#r').width($(window).width()-2);
	$('#r').height($(window).height()*0.5-10 - 37);
	
	$("#r-Label").offset({left:8,top:$(window).height()*0.5+16});
}

function chartRender(){
	var xBarChart;
	nv.addGraph(function() {
	  xBarChart = nv.models.lineChart().margin({top: 50, right: 30, bottom: 110, left: 70});
	  xBarChart.showLegend(true);
	  xBarChart.x(function(d,i) { return i })
	      
	  xBarChart.xAxis 
	  	  .axisLabel('')
	      .tickFormat(function(d) { 
	      	var xLabel = '';
	      	try{
	      		xLabel = xBarData[3].values[d].x ;
	      	}catch(e){}
	      	return xLabel;
	      });
	  
	  xBarChart.yAxis
	      .axisLabel('')
	      .tickFormat(d3.format(',.2f'));
	
	  d3.select('#x-bar svg')
	      .datum(xBarData)
	    .transition().duration(0)
	      .call(xBarChart);
	
	  //nv.utils.windowResize(xBarChart.update);
	  xBarChart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
	  return xBarChart;
	});
	
	var rChart;
	nv.addGraph(function() {
	  rChart = nv.models.lineChart().margin({top: 50, right: 30, bottom: 110, left: 70 });
	  rChart.showLegend(true);
	  rChart.x(function(d,i) { return i })
	      
	  rChart.xAxis 
	  	  .axisLabel('')
	      .tickFormat(function(d) { 
	      	var xLabel = '';
	      	try{
	      		xLabel = rData[3].values[d].x ;
	      	}catch(e){}
	      	return xLabel;
	      });
	      
	  rChart.yAxis
	      .axisLabel('')
	      .tickFormat(d3.format(',.2f'));
	      
	  d3.select('#r svg')
	      .datum(rData)
	    .transition().duration(0)
	      .call(rChart);
	
	  //nv.utils.windowResize(rChart.update);
	  rChart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
	  return rChart;
	});
}

function xBarDataGenerate() {
  var ucl = [],
      lcl = [];
      cl = [];
      data = [];

  var xBarRowDatas = rowData.xbar;
  for(var i=0; i<xBarRowDatas.length; i++){
  	if(i==0){
  		$("#xBarUsl").val(xBarRowDatas[i].usl);
  		$("#xBarLsl").val(xBarRowDatas[i].lsl);
  		$("#xBarCl").val(xBarRowDatas[i].cl);
  	}
  	ucl.push({x:i, y:xBarRowDatas[i].usl, ucl:xBarRowDatas[i].usl, lcl:xBarRowDatas[i].lsl, cl:xBarRowDatas[i].cl, pointDisplay:false, id:'ucl' }); 
  	lcl.push({x:i, y:xBarRowDatas[i].lsl, ucl:xBarRowDatas[i].usl, lcl:xBarRowDatas[i].lsl, cl:xBarRowDatas[i].cl, pointDisplay:false, id:'lcl' }); 
  	cl.push( {x:i, y:xBarRowDatas[i].cl, pointDisplay:false, id:'cl' });
  	data.push({rowData:xBarRowDatas[i], x:xBarRowDatas[i].x, y:xBarRowDatas[i].y, cl:xBarRowDatas[i].cl, ucl:xBarRowDatas[i].usl, lcl:xBarRowDatas[i].lsl, 
  				pointDisplay:true, id:'data', pointColor:xBarPointRuleColor(i)});
  	$('#x-bar svg').width(30*i);
  }
  if($('#x-bar svg').width()<$('#x-bar').width()){
  	$('#x-bar svg').width($('#x-bar').width());
  }
  
  var standar = standardDeviation(xBarRowDatas, 0);
  var meanVal = mean(xBarRowDatas);
  var usl = xBarRowDatas[xBarRowDatas.length-1].usl;
  var lsl = xBarRowDatas[xBarRowDatas.length-1].lsl;
  var cp = (usl-lsl)/(6*standar);
  var cpk = (usl-meanVal)/(3*standar);
  $("#xBarCp").val(roundXL(cp, 3));
  $("#xBarCpk").val(roundXL(cpk, 3));

  return [
    {
      area : true,
      values: ucl,
      key: "UCL",
      color: "#ff0000"
    },
    {
      area : true,
      values: lcl,
      key: "LCL",
      color: "#0000ff"
    },
    {
      values: cl,
      key: "CL",
      color: "#000000"
    },
    {
      values: data,
      key: "Data",
      color: "#aaaaaa"
    }
  ];
}

function xBarPointRuleColor(count){
	var xBarRowDatas = rowData.xbar;
	var d = xBarRowDatas[count];
	
	if(d.usl<d.y || d.lsl>d.y){
    	return "#FF0000";
    }
	
	if(count>7){
		var checkCount = 0;
		for(var i=count-8; i<count; i++){
			if(xBarRowDatas[i].y>xBarRowDatas[i].cl){
				checkCount++;
			}else{
				checkCount--;
			}
		}
		if(d.y>d.cl){
			if(checkCount==8){
				return '#F4A460'; //9개가 중심점보다 위인경우 (주황색)
			}
		}else if(d.y<d.cl){
			if(checkCount==-8){
				return '#F4A460'; //9개가 중심점보다 아래인경우 (주황색)
			}
		}
	}
	
	if(count>4){
		var updownCheck = 1; //1이면 상승을 검사하고, -1이면 하락을 검사한다. 0이면 검사를 안한다.
		if(xBarRowDatas[count].y > xBarRowDatas[count-1].y){
			updownCheck = 1;
		}else if(xBarRowDatas[count].y < xBarRowDatas[count-1].y){
			updownCheck = -1;
		}else{
			updownCheck = 0;
		}
		if(updownCheck==1){
			for(var i=0; i<count; i++){
				if(xBarRowDatas[i].y >= xBarRowDatas[i+1].y){
					break;
				}
				if(i==(count-1)){
					return '#FFFF00'; //6개가 위로상승경우 (노란색)
				}
			}
		}else if(updownCheck==-1){
			for(var i=0; i<count; i++){
				if(xBarRowDatas[i].y <= xBarRowDatas[i+1].y){
					break;
				}
				if(i==(count-1)){
					return '#FFFF00'; //6개가 위로하락경우 (노란색)
				}
			}
		}else{
			//검사안함.
		}
		
	}
	
	if(count>2){
		var d = xBarRowDatas[count];
		var c = xBarRowDatas[count-1];
		var b = xBarRowDatas[count-2];
		var a = xBarRowDatas[count-3];
		if(a.y>b.y && b.y<c.y && c.y>d.y){
			return "#00FF00"; //4개의 점의 상승/하락반복한 경우 (초록색)
		}
		
		if(a.y<b.y && b.y>c.y && c.y<d.y){
			return "#00FF00"; //4개의 점의 하락/상승반복한 경우 (초록색)
		}
	}
	return "#0000FF";
}

function rDataGenerate() {
  var ucl = [],
      lcl = [];
      cl = [];
      data = [];

  var rRowDatas = rowData.rbar;
  for(var i=0; i<rRowDatas.length; i++){
  	if(i==0){
  		$("#rUsl").val(rRowDatas[i].usl);
  		$("#rLsl").val(rRowDatas[i].lsl);
  		$("#rCl").val(rRowDatas[i].cl);
  	}
  	ucl.push({x:i, y:rRowDatas[i].usl, ucl:rRowDatas[i].usl, lcl:rRowDatas[i].lsl, cl:rRowDatas[i].cl, pointDisplay:false, id:'ucl' }); 
  	lcl.push({x:i, y:rRowDatas[i].lsl, ucl:rRowDatas[i].usl, lcl:rRowDatas[i].lsl, cl:rRowDatas[i].cl, pointDisplay:false, id:'lcl' }); 
  	cl.push( {x:i, y:rRowDatas[i].cl, pointDisplay:false, id:'cl' });
  	data.push({rowData:rRowDatas[i], x:rRowDatas[i].x, y:rRowDatas[i].y, cl:rRowDatas[i].cl, ucl:rRowDatas[i].usl, lcl:rRowDatas[i].lsl, pointDisplay:true, id:'data', pointColor:rPointRuleColor(i)});
  	$('#r svg').width(30*i);
  }
  if($('#r svg').width()<$('#r').width()){
  	$('#r svg').width($('#r').width());
  }

  return [
    {
      area : true,
      values: ucl,
      key: "UCL",
      color: "#ff0000"
    },
    {
      area : true,
      values: lcl,
      key: "LCL",
      color: "#0000ff"
    },
    {
      values: cl,
      key: "cl",
      color: "#000000"
    },
    {
      values: data,
      key: "Data",
      color: "#999999"
    }
  ];
}

function rPointRuleColor(count){
	var rRowDatas = rowData.rbar;
	var d = rRowDatas[count];
	if(d.usl<d.y || d.lsl>d.y){
    	return "#FF0000";
    }
	return "#0000FF";
}

function mean(array){
	var sum = 0;
	for(var i=0; i<array.length; i++){
		sum += array[i].y;
	}
	
	return sum / array.length;
}

//option:1이면 표본의 표준 편차, option:0이면 모집단 전체의 표준 편차
function standardDeviation(array, option){ 
	if (array.length < 2) return '';
	var sum = 0;
	var sd = 0;
	var diff;
	var meanValue = mean(array);
	
	for(var i=0; i<array.length; i++){
		diff = array[i].y - meanValue;
		sum += diff * diff;
	}
	sd = Math.sqrt(sum / (array.length - option));
	
	return sd;
}

function roundXL(n, digits) {
  if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림

  digits = Math.pow(10, digits); // 정수부 반올림
  var t = Math.round(n * digits) / digits;

  return parseFloat(t.toFixed(0));
}