import json,base64,re
h=open('page.html',encoding='utf-8').read()
def rep(old,new):
    global h
    assert h.count(old)==1,(h.count(old),old[:60]);h=h.replace(old,new)
S=json.load(open('../sent.json'))
aud=[[ 'data:audio/mpeg;base64,'+base64.b64encode(open(f'/home/user/Garigliano-/voix/elevenlabs/mp3/{i}_{k}.mp3','rb').read()).decode() for k in range(len(st))] for i,st in enumerate(S)]
chars=sum(len(' '.join(st)) for st in S); cps=round(chars/(425.5+14*0.0),1)
print('cps',cps)
rep("const INTRO=1.2,OUTRO=1.6;\n","""const INTRO=1.2,OUTRO=1.6;
/* voix enregistrée (ElevenLabs) : window.AUD = 14 étapes × phrases, data:audio/mpeg ; sinon synthèse du navigateur */
const HAVEAUD=Array.isArray(window.AUD)&&window.AUD.length===NARR.length;
const A=new Audio();A.preload='auto';let audioBad=false;
if(HAVEAUD){cps=%s;document.querySelector('.src').append(' Voix intégrée : générée avec ElevenLabs.');}
"""%cps)
rep("const canSpeak=()=>voiceOn&&!!synth&&vlist.length>0;","const canSpeak=()=>voiceOn&&!audioBad&&(HAVEAUD||(!!synth&&vlist.length>0));")
rep("sel.hidden=!vlist.length||!voiceOn;","sel.hidden=!vlist.length||!voiceOn||HAVEAUD;")
rep("function unlockSpeech(){ /* à appeler dans le geste : iOS n'autorise la voix qu'après une action de l'utilisateur */\n",
"function unlockSpeech(){ /* à appeler dans le geste : iOS n'autorise la voix qu'après une action de l'utilisateur */\n  if(HAVEAUD&&!A._u){A._u=1;try{A.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';const q=A.play();if(q&&q.catch)q.catch(()=>{});}catch(e){}}\n")
rep("  clearTimeout(stepT);\n  if(stepStart){stepRemain","  clearTimeout(stepT);A.pause();A.onended=A.onplaying=A.onerror=null;\n  if(stepStart){stepRemain")
rep("function narrate(from){\n  const tok","""function audioFail(tok){if(tok!==speakTok||audioBad)return;audioBad=true;toast('Le son n’a pas pu démarrer : lecture sans voix. Touchez « Voix » pour réessayer.');stepRemain=null;if(playing)runStep();}
function narrateAudio(from){
  const tok=++speakTok,ss=sentences(NARR[cur]),step=cur;let i=from||0;
  try{if(synth)synth.cancel();}catch(e){}
  const say=()=>{
    if(tok!==speakTok)return;
    if(i>=ss.length){sentIdx=ss.length;stepT=setTimeout(()=>{if(tok===speakTok&&playing)next();},OUTRO*1000/speedF);return;}
    const k=i++;
    A.onplaying=()=>{if(tok!==speakTok)return;A.onplaying=null;sentIdx=k;showSub(ss[k]);hlText(ss[k]);triggerCallouts(k);};
    A.onended=()=>{if(tok!==speakTok)return;say();};
    A.onerror=()=>{if(tok!==speakTok)return;audioFail(tok);};
    A.src=AUD[step][k];A.defaultPlaybackRate=A.playbackRate=speedF;
    const pr=A.play();if(pr&&pr.catch)pr.catch(e=>{if(tok!==speakTok||(e&&e.name==='AbortError'))return;audioFail(tok);});
  };
  stepT=setTimeout(say,from?250:INTRO*1000/speedF);
}
function narrate(from){
  if(HAVEAUD){narrateAudio(from);return;}
  const tok""")
rep("if(on&&!(synth&&vlist.length)){toast('Aucune voix française n’est disponible sur ce poste.');on=false;}",
    "if(on&&!HAVEAUD&&!(synth&&vlist.length)){toast('Aucune voix française n’est disponible sur ce poste.');on=false;}\n  if(on)audioBad=false;")
rep("$('vsel').hidden=!on||!vlist.length;","$('vsel').hidden=!on||!vlist.length||HAVEAUD;")
tag='<script>\n\n(function(){'
assert h.count(tag)==1
h=h.replace(tag,'<script>window.AUD='+json.dumps(aud)+';</script>\n'+tag)
open('page_voix.html','w',encoding='utf-8').write(h)
import os;print(os.path.getsize('page_voix.html')//1024,'Ko')
