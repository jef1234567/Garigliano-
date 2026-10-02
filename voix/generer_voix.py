import json,sherpa_onnx,subprocess,wave,numpy as np,time
d='vits-piper-fr_FR-siwis-medium/'
cfg=sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=d+'fr_FR-siwis-medium.onnx',tokens=d+'tokens.txt',data_dir=d+'espeak-ng-data',length_scale=1.0),num_threads=4),max_num_sentences=1)
tts=sherpa_onnx.OfflineTts(cfg)
S=json.load(open('sent.json'));tot=0;chars=0;t0=time.time()
for i,st in enumerate(S):
  for k,s in enumerate(st):
    a=tts.generate(s['spoken'],sid=0,speed=1.0)
    x=np.array(a.samples,dtype=np.float32);sr=a.sample_rate
    w=wave.open(f'aud/{i}_{k}.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(x,-1,1)*32767).astype('<i2').tobytes());w.close()
    tot+=len(x)/sr;chars+=len(s['text'])
print('sec',tot,'chars',chars,'cps',chars/tot,'elapsed',time.time()-t0)
