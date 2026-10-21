// Rebuild the code-designed profile panels: NODE_PATH must include sharp.
const sharp = require('sharp');
const fs = require('fs');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const t=(x,y,s,size=20,c='#A9B3C6',weight=400)=>`<text x="${x}" y="${y}" fill="${c}" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`;
const img=(file,x,y,w,h)=>`<image href="data:image/${file.endsWith('.svg')?'svg+xml':'png'};base64,${fs.readFileSync(file).toString('base64')}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const shell=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><radialGradient id="glow"><stop stop-color="#1261FF" stop-opacity=".32"/><stop offset="1" stop-color="#1261FF" stop-opacity="0"/></radialGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#223651" stop-opacity=".7"/><stop offset="1" stop-color="#0B101B"/></linearGradient></defs><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="22" fill="#090C12" stroke="#283142"/><g font-family="Segoe UI, Arial, sans-serif">${body}</g></svg>`;
async function panel(name,w,h,b){await sharp(Buffer.from(shell(w,h,b))).png().toFile('assets/'+name+'.png');}
(async()=>{
 await panel('pc-showcase',1200,470,
 `<ellipse cx="1000" cy="210" rx="360" ry="300" fill="url(#glow)"/>`+
 t(48,52,'01 / FLAGSHIP PROJECT',14,'#6FA9FF',600)+
 t(45,126,'Bari Plux Tool',59,'#F3F6FC',700)+t(48,166,'Built for the way you play.',25,'#D0D9E8')+
 t(48,218,'PUBG MOBILE  /  WINDOWS  /  EMULATORS',14,'#6FA9FF',600)+
 t(48,273,'Graphics & FPS. Controls & keymaps.',22)+t(48,307,'Optimization. Files. Backups. Community.',22)+
 '<rect x="48" y="352" width="604" height="63" rx="12" fill="#121C2D" stroke="#2E466C"/>'+
 t(68,378,'LATEST ADDITIONS',11,'#6FA9FF',600)+t(68,401,'In-game performance overlay · Installed Files',19,'#EAF1FF')+
 img('assets/brand/bpt.png',790,66,320,320)+t(872,426,'BPT 3 / PC',15,'#9AACC7',600));
 await panel('android-card',590,420,
 '<ellipse cx="500" cy="100" rx="250" ry="230" fill="url(#glow)"/>'+
 t(36,48,'02 / THE NEXT PLATFORM',12,'#7EA8FF',600)+
 '<rect x="421" y="72" width="112" height="180" rx="22" fill="url(#glass)" stroke="#51709C"/><rect x="459" y="81" width="36" height="5" rx="3" fill="#627897"/>'+
 img('assets/brand/bpt.png',439,121,76,76)+
 t(33,119,'BPT',57,'#F3F6FC',700)+t(33,177,'Android.',57,'#F3F6FC',700)+
 t(36,226,'A new platform. One ecosystem.',21,'#CFDAEB')+
 t(36,277,'Gaming tools. Device insight.',20)+t(36,308,'Files, backups & cloud sync.',20)+t(36,339,'PC ↔ mobile connection.',20)+
 '<circle cx="43" cy="385" r="4" fill="#A7BFFF"/>'+t(57,390,'PLANNED / IN DEVELOPMENT',12,'#A7BFFF',600));
 await panel('web-card',590,420,
 '<ellipse cx="480" cy="60" rx="230" ry="230" fill="url(#glow)"/>'+
 t(36,48,'03 / THE DIGITAL HOME',12,'#7EA8FF',600)+
 img('assets/brand/classic.png',393,76,151,113)+
 t(33,119,'Classic soul.',45,'#F3F6FC',700)+t(33,176,'Fresh vision.',45,'#F3F6FC',700)+
 t(36,226,'BariPlux.com',24,'#CFDAEB',600)+
 t(36,277,'The classic look returns.',20)+t(36,308,'Liquid Glass. Faster experiences.',20)+t(36,339,'Projects, content & community.',20)+
 t(36,390,'EXPLORE THE WEBSITE ↗',12,'#A7BFFF',600));
 let b=t(44,49,'04 / THE BIGGER PICTURE',13,'#7EA8FF',600)+t(42,103,'This is only the beginning.',43,'#F3F6FC',700);
 for(const [x,n,h,l] of [[44,'01','EVOLVE BPT','More capabilities. Better experiences.'],[431,'02','CONNECT PLATFORMS','PC and Android, working together.'],[818,'03','BUILD BEYOND','New ideas. Bigger independent projects.']]) b+=`<path d="M${x} 143h338" stroke="#34465F"/>`+t(x,180,n,13,'#6FA9FF',600)+t(x,216,h,20,'#EEF3FC',600)+t(x,250,l,16);
 await panel('future',1200,287,b);
 const socials=[['website','WEBSITE',null,'#87B8FF'],['youtube','YOUTUBE','youtube','#FF6262'],['discord','DISCORD','discord','#A6A4FF'],['telegram','TELEGRAM','telegram','#67C9F5'],['instagram','INSTAGRAM','instagram','#F5A1D3'],['tiktok','TIKTOK','tiktok','#9DF3E3'],['x','X / TWITTER','x','#FFFFFF'],['kofi','KO-FI','kofi','#FFA6B0'],['email','EMAIL',null,'#B8CEFF']];
 for(const [name,label,icon,color] of socials){let iconMarkup='';if(icon){const raw=fs.readFileSync('assets/brand/'+icon+'.svg','utf8'); const d=raw.match(/<path d="([^"]+)"/)[1]; iconMarkup=`<svg x="22" y="19" width="24" height="24" viewBox="0 0 24 24"><path fill="${color}" d="${d}"/></svg>`;}else{iconMarkup=name==='email'?'<path d="M23 23h24v18H23zM23 23l12 10 12-10" fill="none" stroke="'+color+'" stroke-width="2"/>':'<circle cx="35" cy="31" r="12" fill="none" stroke="'+color+'" stroke-width="2"/><path d="M23 31h24M35 19c-7 8-7 16 0 24M35 19c7 8 7 16 0 24" fill="none" stroke="'+color+'"/>';}
 await sharp(Buffer.from(shell(244,64,iconMarkup+t(60,38,label,13,'#E1E8F5',600)))).png().toFile('assets/social/'+name+'.png');}
})();
