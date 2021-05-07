let back=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];
console.log(`"url('${back[1]}')"`)

document.querySelector('main').style.backgroundImage=`url('${back[0]}')`;


//eff changer
setInterval((arr)=>{
  let img=new Image();
  img.onload=(e)=>{
    document.querySelector('main').style.backgroundImage=`url('${img.src}')`;
  };
  img.src=arr[Math.floor(Math.random()*5)];
},7000,back)


//background-image: url("IMAGE_URL"), linear-gradient(#eb01a5, #d13531);




