function bmiCheck(){
    var x = document.getElementById("weight").value;
    var y = document.getElementById("height1").value;
    var z = document.getElementById("height2").value;

    z = (y*12)+Number(z);

    y = z*0.0254;

    var r = x/(y*y);
    r*=10;
    r = Math.floor(r)/10;

    if(r<=0 || r>=100 )
        document.getElementById("result").innerHTML = "You are missing any information or, didin't give proper information!!";
    else{

    if(r<18.5)
        document.getElementById("result").innerHTML = "Your BMI is "+r+". You are 'Under Weight'!";
    else if(r<25.0)
        document.getElementById("result").innerHTML = "Your BMI is "+r+". You are in a 'Perfect Weight'!";
    else if(r<30.0)
        document.getElementById("result").innerHTML = "Your BMI is "+r+". You are 'Over Weight'!";
    else if(r<35.0)
        document.getElementById("result").innerHTML = "Your BMI is "+r+". You are in 'Obesity' stage!";
    else
        document.getElementById("result").innerHTML = "Your BMI is "+r+". You are in 'Extremely Obesity' stage!";
    document.getElementById("checkPlan").innerHTML = '<a href="/dietPlan">Click Here</a> to see your Diet Plan!!!';
    }
}


var a = document.querySelectorAll(".dietPlanButton").length;

for(var i=0; i<a; i++)
{
    document.querySelectorAll(".dietPlanButton")[i].addEventListener("click",function(){
        
        if(this.style.backgroundColor == "green")
           {
            this.style.backgroundColor = "red";
            this.innerHTML = "Incompleted";
           }
        else
            {
                this.style.backgroundColor = "green";
                this.innerHTML = "Completed";
            }
    });
}