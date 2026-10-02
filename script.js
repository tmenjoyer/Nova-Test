const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const toast=(msg)=>{const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)};
$$("[data-scroll]").forEach(b=>b.addEventListener("click",()=>{$(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"});$("#mobileMenu").classList.remove("open")}));
$("#menuBtn").addEventListener("click",()=>$("#mobileMenu").classList.toggle("open"));
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("novaTheme",document.body.classList.contains("light")?"light":"dark");toast(document.body.classList.contains("light")?"Mode clair activé ☀":"Mode sombre activé ◐")});
if(localStorage.getItem("novaTheme")==="light")document.body.classList.add("light");

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

let counted=false;
const metrics=$("#home");
const metricObs=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;$$("[data-count]").forEach(el=>{let end=+el.dataset.count,start=0;const step=Math.max(1,Math.ceil(end/45));const timer=setInterval(()=>{start+=step;if(start>=end){start=end;clearInterval(timer)}el.textContent=start+"+"},25)})}},{threshold:.4});metricObs.observe(metrics);

$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{ $$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");filterProjects(btn.dataset.filter,$("#projectSearch").value)}));
$("#projectSearch").addEventListener("input",e=>filterProjects($(".filter.active").dataset.filter,e.target.value));
function filterProjects(cat,query){let shown=0;$$(".project-card").forEach(c=>{const okCat=cat==="all"||c.dataset.cat===cat;const okText=c.dataset.title.toLowerCase().includes(query.toLowerCase());c.style.display=okCat&&okText?"":"none";if(okCat&&okText)shown++});$("#emptyState").classList.toggle("show",shown===0)}
const projectData={
aether:["AETHER","AI / SYSTEMS","Aether transforme une intention en direction créative. Prototype conceptuel pensé autour de la génération, de l'itération et de la découverte."],
nexus:["NEXUS","XR / IMMERSIVE","Nexus imagine un espace numérique que l'on ne consulte pas : on l'explore. Chaque élément devient un point de navigation."],
flux:["FLUX","WEB / PRODUCT","Flux réduit la complexité d'une interface à une expérience claire, rapide et expressive."],
orbit:["ORBIT","AI / DATA","Orbit transforme des flux de données en signaux lisibles grâce à une visualisation centrée sur l'humain."]
};
$$(".more").forEach(b=>b.addEventListener("click",()=>{const d=projectData[b.dataset.project];$("#modalContent").innerHTML=`<span class="modal-tag">${d[1]}</span><h2>${d[0]}</h2><p>${d[2]}</p><br><button class="primary" onclick="toast('Projet ajouté à ton espace ✦');document.querySelector('#modal').classList.remove('open')">Ajouter à mon espace ↗</button>`;$("#modal").classList.add("open")}));
$$("[data-close]").forEach(x=>x.addEventListener("click",()=>$("#modal").classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#modal").classList.remove("open");$("#searchOverlay").classList.remove("open")}});

$("#searchOpen").addEventListener("click",()=>$("#searchOverlay").classList.add("open"));
$("#searchClose").addEventListener("click",()=>$("#searchOverlay").classList.remove("open"));
$("#globalSearch").addEventListener("input",e=>{const q=e.target.value.trim();if(q){$("#projectSearch").value=q;filterProjects("all",q)}});
$("#randomIdea").addEventListener("click",()=>{const ideas=["Une ville numérique qui évolue chaque jour.","Un assistant qui transforme une phrase en prototype.","Un musée spatial dont les salles n'existent que la nuit.","Une interface qui apprend la manière dont tu travailles."];toast(ideas[Math.floor(Math.random()*ideas.length)]+" ✦")});
$("#watchBtn").addEventListener("click",()=>{$("#modalContent").innerHTML=`<span class="modal-tag">NOVA / 01:24</span><h2>L'expérience commence.</h2><p>Bienvenue dans le prototype interactif NOVA. Ici, chaque bouton, filtre et mouvement est connecté pour te donner une vraie sensation de produit.</p><br><button class="primary" data-close>Continuer l'exploration ↗</button>`;$("#modal").classList.add("open")});
$("#runCommand").addEventListener("click",()=>{const r=$("#commandResults");r.innerHTML="<span>✓ neural engine synchronized</span><span>✓ visual field generated</span><span>✓ NOVA is ready</span>";toast("Système NOVA exécuté ✓")});
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);if(!f.get("name")||!f.get("email")||!f.get("message"))return;localStorage.setItem("novaLastMessage",JSON.stringify(Object.fromEntries(f)));e.target.reset();toast("Signal reçu. Merci — NOVA est à l'écoute. 🚀")});
$("#topBtn").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
document.addEventListener("mousemove",e=>{const g=$(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
setInterval(()=>{const words=["initializing_nova()","scanning_ideas()","building_future()","creating_experience()"];const el=$("#typedText");el.textContent=words[Math.floor(Date.now()/3000)%words.length]},3000);
