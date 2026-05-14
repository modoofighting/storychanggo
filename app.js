// NAV scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.background=window.scrollY>50?'rgba(6,6,11,0.95)':'rgba(6,6,11,0.8)';
});

// Mobile menu toggle
document.getElementById('mobile-toggle')?.addEventListener('click',()=>{
  const m=document.getElementById('nav-menu');
  m.style.display=m.style.display==='flex'?'none':'flex';
  m.style.flexDirection='column';m.style.position='absolute';
  m.style.top='60px';m.style.right='24px';m.style.background='#12121c';
  m.style.padding='20px';m.style.borderRadius='12px';m.style.border='1px solid rgba(255,255,255,0.07)';
});

// Intersection Observer for [data-aos]
const obs=new IntersectionObserver((e)=>{
  e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')});
},{threshold:0.1});
document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));

// Counter animation
const counterObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.stat-number').forEach(n=>{
        const t=parseInt(n.dataset.target);
        const d=t>1000?30:60;const inc=Math.ceil(t/d);
        let c=0;
        const timer=setInterval(()=>{c+=inc;if(c>=t){c=t;clearInterval(timer)}n.textContent=c.toLocaleString()},25);
      });
      counterObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
const sb=document.querySelector('.stats-bar');
if(sb)counterObs.observe(sb);

// Demo
const samples=[
  {main:'"{name}"의 진심이 담긴 한 접시. {story} 창원 {area}에서 만나보세요.',tags:['#창원맛집','#경남소상공인','#전통의맛','#지역특산물']},
  {main:'{area}에서 시작된 특별한 이야기. {story} — {name}에서 그 가치를 직접 경험해보세요.',tags:['#창원','#골목상권','#로컬브랜드','#경남여행']},
  {main:'세월이 만든 신뢰, {name}. {story} 창원 {area}의 보물 같은 공간을 찾아주세요.',tags:['#창원소상공인','#지역사랑','#진심으로','#경남맛집']}
];

function generateDemo(){
  const name=document.getElementById('demo-name').value.trim();
  const story=document.getElementById('demo-story').value.trim();
  const area=document.getElementById('demo-area').value.trim()||'창원';
  if(!name||!story){showToast('⚠️ 가게 이름과 이야기를 입력해주세요!');return;}

  const r=document.getElementById('demo-result');
  r.innerHTML='<div class="demo-placeholder"><div class="placeholder-pulse"></div><p>LOCA AI가 분석 중...</p></div>';

  const s=samples[Math.floor(Math.random()*samples.length)];
  const short=story.length>25?story.substring(0,25)+'...':story;
  const gen=s.main.replace(/{name}/g,name).replace(/{story}/g,short).replace(/{area}/g,area);
  const insta=`✨ ${name}\n\n${gen}\n\n${s.tags.join(' ')}\n\n📍 창원 ${area}`;

  setTimeout(()=>{
    r.innerHTML=`<div class="result-block">
      <div class="result-section"><div class="result-label">📝 브랜드 홍보문구</div><div class="result-text">${gen}</div></div>
      <div class="result-section"><div class="result-label">📱 인스타그램 캡션</div><div class="result-text" style="white-space:pre-line;font-size:.85rem">${insta}</div></div>
      <div class="result-section"><div class="result-label">🔖 추천 해시태그</div><div class="result-tags">${s.tags.map(t=>`<span class="result-tag">${t}</span>`).join('')}<span class="result-tag">#${area}</span></div></div>
      <div class="result-tip">💡 실제 서비스에서는 랜딩페이지·영상 스크립트까지 동시 생성됩니다.</div>
    </div>`;
    showToast('✅ 홍보문구 생성 완료!');
  },2000);
}

// Contact form
function submitContact(e){
  e.preventDefault();
  const name=document.getElementById('ct-name').value.trim();
  const phone=document.getElementById('ct-phone').value.trim();
  if(!name||!phone){showToast('⚠️ 이름과 연락처를 입력해주세요!');return;}
  const btn=document.getElementById('submit-btn');
  btn.textContent='신청 완료! ✅';
  btn.style.background='linear-gradient(135deg,#10b981,#059669)';
  btn.disabled=true;
  showToast(`🎉 ${name}님, 베타 신청이 완료되었습니다!`);
}

// Toast
function showToast(msg){
  document.querySelector('.toast')?.remove();
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.body.appendChild(t);setTimeout(()=>t.remove(),3500);
}
