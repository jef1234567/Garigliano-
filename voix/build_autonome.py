"""Assemble garigliano-1944-voix.html : la présentation + la voix enregistrée (data URI mp3).
Usage : python3 voix/build_autonome.py   (depuis la racine du dépôt)"""
import json,base64,os
S=json.load(open('voix/phrases.json'))
aud=[['data:audio/mpeg;base64,'+base64.b64encode(open(f'voix/{i}_{k}.mp3','rb').read()).decode() for k in range(len(st))] for i,st in enumerate(S)]
h=open('garigliano-1944.html',encoding='utf-8').read()
tag='<script>\n\n(function(){'
assert h.count(tag)==1
h=h.replace(tag,'<script>window.AUD='+json.dumps(aud)+';</script>\n'+tag)
open('garigliano-1944-voix.html','w',encoding='utf-8').write(h)
print(os.path.getsize('garigliano-1944-voix.html')//1024,'Ko')
