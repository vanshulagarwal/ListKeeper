let container=document.querySelector('.flash-container');

setTimeout(()=>{
    container.style.marginLeft='25px';
    setTimeout(()=>{
        container.style.marginLeft='0';
        setTimeout(()=>{
            container.style.marginLeft='25px';
            setTimeout(()=>{
                container.style.marginLeft='-250px';
            },100);
        },2000);
    },200);
},100);