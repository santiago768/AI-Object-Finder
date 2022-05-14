object=[];
status="";

function preload(){

}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for(i=0; i<object.length; i++){
    document.getElementById("status").innerHTML="status detected: "+object.length;
    obj_label=object[i].label;
            obj_confidence=floor(object[i].confidence)*100;
            obj_x=object[i].x;
            obj_y=object[i].y;
            obj_width=object[i].width;
            obj_height=object[i].height;
            fill("red");
            textSize(20);
            text(obj_label+" "+ obj_confidence+"%",obj_x+15,obj_y+15);
            noFill()
            rect(obj_x,obj_y,obj_width,obj_height);
    

        }
      }
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function  modelLoaded(){
    console.log("modeloded")
status=true;
}

function gotResult(e,r){
if (e){
    console.log(e);
}
else{
    console.log(r)
    object=r;
}
}