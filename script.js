// CEO360 — Original prototype behavior and demonstration data.
// Formatting only; no intentional functional changes.

const businesses= {
  retail: {
    name:'Kijani Distribution Ltd',sector:'Retail & Distribution',revenue:2480000,margin:15.5,cash:612000,retention:91.6,health:78,units:[['Lagos Distribution',92],['Abuja Wholesale',78],['Accra Trading',106],['Digital Sales',64]]
  },services: {
    name:'Amani Advisory Group',sector:'Professional Services',revenue:940000,margin:24.8,cash:320000,retention:94.2,health:84,units:[['Consulting',104],['Audit',96],['Technology',88],['Training',73]]
  },factory: {
    name:'Ubuntu Manufacturing Co',sector:'Light Manufacturing',revenue:3820000,margin:12.1,cash:490000,retention:87.5,health:71,units:[['Plant A',94],['Plant B',76],['Exports',83],['Contract Production',109]]
  }
};
const initialDecisions=[ {
  id:24,title:'Approve equipment investment',amount:'$42,000',owner:'Operations Director',status:'Pending',detail:'Review payback period, supplier quotes and cash implications before approval.'
}, {
  id:25,title:'Regional expansion proposal',amount:'$120,000',owner:'Strategy Lead',status:'Pending',detail:'Review market size, downside scenario and phased launch milestones.'
}, {
  id:26,title:'Credit policy revision',amount:'Policy',owner:'Finance Director',status:'Approved',detail:'Updated customer credit limits following receivables review.'
}];
const initialTasks=[ {
  id:1,title:'Contact overdue strategic accounts',owner:'Finance',due:'Tomorrow',status:'Open'
}, {
  id:2,title:'Validate inventory reorder thresholds',owner:'Operations',due:'This week',status:'Open'
}, {
  id:3,title:'Review Q4 sales recovery plan',owner:'Sales',due:'Friday',status:'In progress'
}, {
  id:4,title:'Complete board performance pack',owner:'CEO Office',due:'Next week',status:'Done'
}];
let state= {
  page:'overview',tenant:'retail',period:'30',decisions:initialDecisions.map(x=>( {
    ...x
  })),tasks:initialTasks.map(x=>( {
    ...x
  })),log:[],chat:[],scenario: {
    sales:10,cost:5,delay:15
  }
};
const $=s=>document.querySelector(s),money=n=>'$'+Math.round(n).toLocaleString('en-US'),data=()=>businesses[state.tenant],factor=()=>( {
  30:1,90:3,365:12
})[state.period],metric=(label,value,change)=>`<div class="card"><div class="muted tiny">${label}</div><div class="metric">${value}</div><div class="stat ${change.startsWith('+')?'up':'muted'}">${change}</div></div>`,title=(t,sub)=>`<div class="intro"><div><h1>${t}</h1><div class="muted">${sub}</div></div><span class="pill">${data().sector}</span></div>`,card=(h,c)=>`<div class="card"><h3>${h}</h3>${c}</div>`,row=(a,b)=>`<div class="row"><span>${a}</span><strong>${b}</strong></div>`,bar=(label,v)=>`<div style="margin:14px 0"><div style="display:flex;justify-content:space-between"><span>${label}</span><b>${v}%</b></div><div class="bar"><span style="width:${Math.min(100,v)}%"></span></div></div>`;
function chart(vals) {
  let pts=vals.map((v,i)=>`${30+i*64},${170-v*1.25}`).join(' ');
  return `<svg class="chart" viewBox="0 0 450 210" role="img" aria-label="Illustrative revenue trend"><g stroke="#e4eaf1"><path d="M30 30H430M30 80H430M30 130H430M30 180H430"/></g><polyline points="${pts}" fill="none" stroke="#087e7b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><g fill="#087e7b">${vals.map((v,i)=>`<circle cx="${30+i*64}" cy="${170-v*1.25}" r="4"/>`).join('')}</g><g fill="#78879b" font-size="11">${['May','Jun','Jul','Aug','Sep','Oct','Nov'].map((m,i)=>`<text x="${18+i*64}" y="202">${m}</text>`).join('')}</g></svg>`
}
function overview() {
  let d=data(),pending=state.decisions.filter(x=>x.status==='Pending').length,open=state.tasks.filter(x=>x.status!=='Done').length;
  return title('Good afternoon, CEO','Your enterprise at a glance · '+d.name)+`<div class="grid">${metric('Revenue',money(d.revenue*factor()),'+12.4% vs prior period')}${metric('Operating margin',d.margin+'%','+1.2 pp vs prior period')}${metric('Available cash',money(d.cash),'−4.1% vs prior period')}${metric('Business health',d.health+'/100','Composite demo score')}</div><div class="grid2">${card('Revenue performance · illustrative',chart([54,69,63,83,76,102,115]))}${card('CEO Priority Alerts',`<div class="alert"><b>Receivables overdue</b><div class="muted tiny">$148,000 beyond 60 days · Finance</div></div><div class="alert"><b>Inventory below threshold</b><div class="muted tiny">4 critical SKUs · Operations</div></div><div class="alert"><b>Contract renewal approaching</b><div class="muted tiny">21 days remaining · Commercial</div></div>`)}</div><div class="grid2">${card('Business unit performance',d.units.map(u=>bar(u[0],u[1])).join(''))}${card('Executive Action Queue',row('Pending decisions',pending)+row('Open tasks',open)+row('Certified KPI coverage','92%')+`<p><button class="btn" onclick="go('decisions')">Review decisions →</button></p>`)}</div>${card('✦ Executive AI Briefing',`Revenue growth remains positive, but overdue receivables may constrain liquidity. Prioritize collections and review cash exposure before committing additional capital. <button class="btn secondary" onclick="go('advisor')">Ask AI Advisor</button>`)}`
}
function briefing() {
  return title('Morning Briefing','The decisions, signals and follow-ups that matter')+card('Executive summary',`<p><b>Commercial performance:</b> Sales are ahead of the previous reporting period. <b>Liquidity:</b> Collections require attention. <b>Operations:</b> Four items are below reorder threshold.</p><p class="muted tiny">Prepared from fictional demonstration data. Production briefings would show sources, timestamps and confidence.</p>`)+`<div class="grid3">${card('1 · Protect cash','Follow up $148K in overdue receivables.')}${card('2 · Keep delivery on track','Replenish critical inventory items.')}${card('3 · Decide on investment','Review the $42K equipment request.')}</div>`+card('Suggested management rhythm',row('Today','Collections review and priority approvals')+row('This week','Department performance and overdue actions')+row('This month','Board pack, budgets and strategic targets'))
}
function finance() {
  let d=data();
  return title('Finance Cockpit','Liquidity, profitability and working capital')+`<div class="grid">${metric('Revenue',money(d.revenue*factor()),'+12.4%')}${metric('Operating profit',money(d.revenue*factor()*d.margin/100),'+8.2%')}${metric('Available cash',money(d.cash),'Reconciled demo')}${metric('Days sales outstanding','54 days','+7 days')}</div><div class="grid2">${card('Profit and cash trajectory',chart([45,63,70,66,82,91,110]))}${card('Working capital',row('Overdue receivables','$148,000')+row('Payables due in 30 days','$92,000')+row('Inventory value','$375,000')+row('Cash coverage','2.8 months'))}</div>${card('13-week liquidity forecast',`<div class="muted">Forecast low point: <b>$408,000</b> · Illustrative only</div>${chart([100,94,88,92,78,70,74])}<button class="btn" onclick="go('scenario')">Open Scenario Studio →</button>`)}`
}
function sales() {
  let d=data();
  return title('Sales & Customer Intelligence','Pipeline, revenue conversion and retention')+`<div class="grid">${metric('Sales attainment','93%','vs plan')}${metric('Open pipeline',money(d.revenue*.66),'Current')}${metric('Win rate','34.2%','+3.1 pp')}${metric('Customer retention',d.retention+'%','+2.3 pp')}</div><div class="grid2">${card('Sales by business unit',d.units.map(u=>bar(u[0],u[1])).join(''))}${card('Customer signals',row('Active customers','1,284')+row('At-risk accounts','38')+row('Top-10 revenue concentration','41%')+row('Complaints pending','12'))}</div>`
}
function operations() {
  return title('Operations','Productivity, service delivery and bottlenecks')+`<div class="grid">${metric('On-time delivery','93.8%','−1.1 pp')}${metric('Capacity utilization','81%','+4 pp')}${metric('Quality pass rate','97.4%','+0.6 pp')}${metric('Critical exceptions','4','Stock alerts')}</div>${card('Operating performance',bar('Fulfilment SLA',94)+bar('Quality assurance',97)+bar('Capacity plan',81)+bar('Supplier delivery',88))}${card('Active operational exceptions',`<div class="alert">Critical stock below reorder level · Owner: Operations Lead</div><div class="alert">Supplier delivery reliability below 90% · Owner: Procurement</div>`)}`
}
function strategy() {
  return title('Strategy Map','Objectives, initiatives and accountable outcomes')+`<div class="grid3">${card('Grow profitable revenue',bar('Progress',76)+'Owner: Commercial Director')}${card('Improve working capital',bar('Progress',62)+'Owner: Finance Director')}${card('Improve service reliability',bar('Progress',89)+'Owner: Operations Director')}</div>${card('Strategic initiatives',row('Expand into new regional market','In review')+row('Automate executive reporting','On track')+row('Reduce cash collection cycle','At risk')+row('Launch customer retention program','On track'))}`
}
function enterprise() {
  return title('Enterprise Map','Compare subsidiaries, divisions and branches')+`<div class="grid">${data().units.map((u,i)=>metric(u[0],u[1]+'%','Target attainment')).join('')}</div>${card('Performance comparison',data().units.map(u=>bar(u[0],u[1])).join(''))}`
}
function decisions() {
  return title('Decision Centre','Govern approvals and executive commitments')+card('Decision queue',`<table><thead><tr><th>Decision</th><th>Owner</th><th>Value</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.decisions.map(x=>`<tr><td><b>${x.title}</b><div class="muted tiny">${x.detail}</div></td><td>${x.owner}</td><td>${x.amount}</td><td><span class="pill ${x.status==='Rejected'?'red':x.status==='Pending'?'amber':''}">${x.status}</span></td><td>${x.status==='Pending'?`<div class="actions"><button class="btn" onclick="decide(${x.id},'Approved')">Approve</button><button class="btn danger" onclick="decide(${x.id},'Rejected')">Reject</button></div>`:'—'}</td></tr>`).join('')}</tbody></table>`)+card('Recent decision activity',state.log.length?state.log.slice().reverse().map(x=>`<div class="row">${x}</div>`).join(''):'<div class="muted">No actions recorded in this session.</div>')
}
function tasks() {
  return title('Task Centre','Execution, accountability and follow-up')+card('Assigned management actions',`<table><thead><tr><th>Action</th><th>Owner</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>${state.tasks.map(x=>`<tr><td>${x.title}</td><td>${x.owner}</td><td>${x.due}</td><td>${x.status}</td><td>${x.status!=='Done'?`<button class="btn secondary" onclick="complete(${x.id})">Mark done</button>`:'✓'}</td></tr>`).join('')}</tbody></table>`)
}
function scenario() {
  let s=state.scenario,d=data(),base=d.revenue,rev=base*(1+s.sales/100),profit=rev*(d.margin/100)-base*s.cost/100,cash=d.cash-base*s.delay/365*.4;
  return title('Scenario Studio','Explore assumptions before making commitments')+`<div class="grid2">${card('Scenario assumptions',`<div class="field"><label>Sales change: <span id="salesval">${s.sales}%</span></label><input class="range" type="range" min="-30" max="40" value="${s.sales}" onchange="updateScenario('sales',this.value)"></div><div class="field"><label>Cost increase: ${s.cost}%</label><input class="range" type="range" min="-10" max="30" value="${s.cost}" onchange="updateScenario('cost',this.value)"></div><div class="field"><label>Extra collection delay: ${s.delay} days</label><input class="range" type="range" min="0" max="90" value="${s.delay}" onchange="updateScenario('delay',this.value)"></div><p class="muted tiny">Simplified sensitivity model; not a certified financial forecast.</p>`)}${card('Projected outcomes',row('Scenario revenue',money(rev))+row('Scenario operating profit',money(profit))+row('Illustrative available cash',money(cash))+row('Revenue delta',((rev/base-1)*100).toFixed(1)+'%')+`<p class="muted tiny">Cost change applied to baseline revenue; cash effect approximates collection delays. Production model will use actual ledgers and explicit assumptions.</p>`)}</div>`
}
const answers= {
  'cash':'Available cash is '+money(data().cash)+'. The demo shows $148,000 overdue beyond 60 days. Prioritize the highest-value accounts and update the rolling cash forecast. Sources: Finance Cockpit / demo AR aging.','sales':'Sales attainment is 93% of target. The lowest-performing business units should receive a recovery review. Sources: Sales Cockpit / demo targets.','risk':'The three visible risks are overdue receivables, critical inventory shortages and a major contract renewal. Sources: Executive Home / demo alerts.','board':'Draft board summary: revenue is growing, working capital needs attention, and operational service levels are generally stable. Verify all numbers before publication. Sources: Executive Home / demo KPIs.'
};
function advisor() {
  return title('AI Executive Advisor','Evidence-first executive questions · scripted prototype')+card('Ask CEO360',`<div id="chat">${state.chat.map(m=>`<div class="message ${m.role}">${m.text}</div>`).join('')||'<div class="message">Welcome. Select a suggested question below to explore the demo business.</div>'}</div><div class="actions" style="margin:12px 0">${[['cash','How is our cash position?'],['sales','Why are we missing sales targets?'],['risk','What are our top risks?'],['board','Prepare a board summary']].map(a=>`<button class="btn secondary" onclick="ask('${a[0]}')">${a[1]}</button>`).join('')}</div><div class="muted tiny">Scripted, source-labeled examples. This prototype does not call an LLM or retrieve real business records.</div>`)
}
function quality() {
  return title('Data Quality Centre','Trust, freshness and completeness')+`<div class="grid">${metric('Certified metric coverage','92%','17 / 18 pilot KPIs')}${metric('Source completeness','96%','Imported fields')}${metric('Last sync','18 min','Demo clock')}${metric('Open issues','3','Requires review')}</div>${card('Data validation issues',`<div class="alert"><b>Bank account reconciliation</b><div class="muted">One account awaiting matching confirmation.</div></div><div class="alert"><b>Sales source mapping</b><div class="muted">Two transactions missing product category.</div></div><div class="alert"><b>Inventory freshness</b><div class="muted">One branch feed is older than its SLA.</div></div>`)}`
}
function integrations() {
  return title('Integrations Hub','Connected business systems and synchronization health')+card('Source connections',`<table><thead><tr><th>Source</th><th>Type</th><th>Last refresh</th><th>State</th></tr></thead><tbody>${[['Accounting System','Finance','18 min ago','Connected'],['POS / Sales','Commercial','32 min ago','Connected'],['Spreadsheet Import','Operations','Yesterday','Connected'],['Branch Inventory','Inventory','2 days ago','Needs review']].map(x=>`<tr>${x.map((v,i)=>`<td>${i===3?`<span class="pill ${v==='Needs review'?'amber':''}">${v}</span>`:v}</td>`).join('')}</tr>`).join('')}</tbody></table>`)+card('Integration principles','Production integrations will support OAuth where available, scoped credentials, scheduled sync, retries, reconciliation, idempotent ingestion and detailed failure logs. This prototype contains no live connections.')
}
const pages= {
  overview,briefing,finance,sales,operations,strategy,enterprise,decisions,tasks,scenario,advisor,quality,integrations
};
function render() {
  const fn=pages[state.page]||overview;
  $('#view').innerHTML=fn();
  document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===state.page));
  $('#headerTitle').textContent=document.querySelector('.nav.active')?.textContent.trim()||'CEO360'
}
function go(p) {
  state.page=p;
  render();
  window.scrollTo(0,0)
}
function decide(id,status) {
  const x=state.decisions.find(x=>x.id===id);
  if(!x||x.status!=='Pending')return;
  x.status=status;
  state.log.push(`${x.title}: ${status} · Demo session`);
  render()
}
function complete(id) {
  const x=state.tasks.find(x=>x.id===id);
  if(x) {
    x.status='Done';
    state.log.push(`${x.title}: completed · Demo session`)
  }
  render()
}
function updateScenario(k,v) {
  state.scenario[k]=Number(v);
  render()
}
function ask(k) {
  let labels= {
    cash:'How is our cash position?',sales:'Why are we missing sales targets?',risk:'What are our top risks?',board:'Prepare a board summary'
  };
  state.chat.push( {
    role:'user',text:labels[k]
  }, {
    role:'assistant',text:answers[k]
  });
  render()
}
document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
$('#tenant').addEventListener('change',e=> {
  state.tenant=e.target.value;state.chat=[];render()
});
$('#period').addEventListener('change',e=> {
  state.period=e.target.value;render()
});
render();
