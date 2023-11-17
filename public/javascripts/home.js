document.querySelectorAll('.item-input-checkbox').forEach(el=>{
    el.addEventListener('change',()=>{
        el.closest('form').submit();
    })
})