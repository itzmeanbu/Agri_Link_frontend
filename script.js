const API_URL = window.AGRILINK_API_URL || 'http://localhost:5000';
document.body.innerHTML=document.body.innerHTML.replace(/mandi/gi,'regional');
const toast = document.getElementById('toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
document.getElementById('createLot').addEventListener('click',()=>showToast('Crop lot form is ready — connect your farmer account to continue.'));
document.getElementById('loginBtn').addEventListener('click',()=>location.href='login.html');
const registerLink=document.createElement('a');registerLink.href='register.html';registerLink.textContent='Create account';registerLink.className='secondary';document.querySelector('.nav').append(registerLink);
document.querySelectorAll('.secondary').forEach(button=>button.addEventListener('click',()=>showToast('This marketplace action is available from your dashboard.')));
fetch(`${API_URL}/api/health`).then(response=>response.ok&&showToast('AgriLink services are connected.')).catch(()=>{});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1);if(id&&document.getElementById(id)){event.preventDefault();document.getElementById(id).scrollIntoView({behavior:'smooth'})}}));
const navIds=['market','marketplace','buyers','schemes','equipment','dashboard'];
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1);if(navIds.includes(id)){event.preventDefault();document.body.classList.add('view-mode');document.querySelectorAll('main>section').forEach(section=>section.classList.toggle('active',section.id===id));history.pushState({},'',`#${id}`);window.scrollTo(0,0)}}));
document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();document.body.classList.remove('view-mode');document.querySelectorAll('main>section').forEach(section=>section.classList.remove('active'));history.pushState({},'','#home');window.scrollTo(0,0)});
