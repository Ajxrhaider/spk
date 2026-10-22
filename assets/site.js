'use strict';
document.querySelector('[data-menu]')?.addEventListener('click',function(){const menu=document.querySelector('.school-nav');menu.classList.toggle('opened');this.setAttribute('aria-expanded',String(menu.classList.contains('opened')));});
const slides=[...document.querySelectorAll('.slides .slider-item')];let slide=0;function show(n){slide=n;slides.forEach((el,i)=>el.classList.toggle('active',i===n));document.querySelectorAll('[data-slide]').forEach((el,i)=>el.classList.toggle('selected',i===n));}if(slides.length){setInterval(()=>show((slide+1)%slides.length),6500);document.querySelectorAll('[data-slide]').forEach(el=>el.addEventListener('click',()=>show(Number(el.dataset.slide))));}
document.querySelectorAll('[data-gallery]').forEach(el=>el.addEventListener('click',()=>{
 const items=[...document.querySelectorAll('[data-gallery]')].filter(item=>!item.hidden);let index=items.indexOf(el);
 const modal=document.createElement('div');modal.className='gallery-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','School gallery');
 const img=document.createElement('img'),caption=document.createElement('p'),close=document.createElement('button'),prev=document.createElement('button'),next=document.createElement('button');caption.className='gallery-caption';close.textContent='×';close.setAttribute('aria-label','Close photograph');prev.textContent='Previous';next.textContent='Next';prev.className='gallery-prev';next.className='gallery-next';
 const show=n=>{index=(n+items.length)%items.length;img.src=items[index].dataset.gallery;img.alt=items[index].dataset.title||'School photograph';caption.textContent=img.alt+' · '+(index+1)+' / '+items.length;};
 const dismiss=()=>{modal.remove();document.removeEventListener('keydown',key);el.focus();};
 const key=e=>{if(e.key==='Escape')dismiss();if(e.key==='ArrowRight')show(index+1);if(e.key==='ArrowLeft')show(index-1);if(e.key==='Tab'){const focusable=[close,prev,next];const active=focusable.indexOf(document.activeElement);e.preventDefault();focusable[(active+(e.shiftKey?-1:1)+focusable.length)%focusable.length].focus();}};
 close.onclick=dismiss;prev.onclick=()=>show(index-1);next.onclick=()=>show(index+1);modal.onclick=e=>{if(e.target===modal)dismiss();};modal.append(img,caption,close,prev,next);document.body.append(modal);document.addEventListener('keydown',key);show(index);close.focus();
}));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===btn));document.querySelectorAll('[data-category]').forEach(card=>card.hidden=btn.dataset.filter!=='All'&&card.dataset.category!==btn.dataset.filter);}));
document.querySelectorAll('[data-print]').forEach(el=>el.addEventListener('click',()=>window.print()));

// Reload class enrolments before choosing an individual result.
document.querySelectorAll('.results-filter select[name=class]').forEach(select=>select.addEventListener('change',()=>{const form=select.form;const student=form.querySelector('[name=student]');if(student)student.value='0';form.requestSubmit();}));
