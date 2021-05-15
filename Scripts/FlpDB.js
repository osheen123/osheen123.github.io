var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

var flpdb ={
    /*misc*/    
    "p0VcC43OUzo" : {"name" : "HOW TO MAKE HAPPY PROGRESSIVE HOUSE IN 5 MINUTES","flp" : "U2FsdGVkX1/wRVI3QAU12Wc6+1nB1QY4PhpMXPKS+gjtk/bcfvPK9dXtQVpHoL9sNFWZNkXL2VeA5m55jJHeA61K8hKxh9LsSKSG9JKEoqSGkhTeKdUMKlmZ6uTtQlE+FG+4NJLF8JEyf26wLwXckg=="},
    "gLh25POz0Qc" : {"name" : "HOW TO MAKE MELODIC DUBSTEP IN 5 MINUTES","flp" : "U2FsdGVkX1+Bj2uYMh4/ecfL3dbWatdtNH9sYl07O3/Ozlk8Ssv/agOFUX3zNZrcB4pnVPPfiJRdefzZS6cO7dcd20ZUjDQwofUvBy7hN7nCS5Mtpbc53QU/Cbqxp1BUqwHAzUZyONbzicNCPw5ZfA=="},
    "dp07sSzq0qA" : {"name" : "OSHEEN - BINDINGS","flp" : "U2FsdGVkX18L5z9z6iB9RTJfV8baadJDtaxTRAHN8FzlC8cJyTsO2t1YEYyWpS3eF5YMcXBS54LHaFBa3QhWkJJ5CC2PaSZGhaT56UU37Tvq6pPI/9yehy7XvRP/ROQ+"},
    "9BxB_VbtGHc" : {"name":"MAKE PROGRESSIVE HOUSE DROP IN 7 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/3ezywjFTA9ZDQF31bIBinsfscJGHvsh+gQ3yGkjT2W362yX9Vp7g3KR2JnFSSP2otp7KTYVnXzlGbfZCy9+PdcYSdxvCjAJhGhof7FG21WBPwST/JAGwS6TmNTVrzCuuT9hR9JmrZwQ=="},
    "PM4Zbrh4-RM" : {"name":"OSHEEN - BREAK [FREE FLP]","flp":"U2FsdGVkX18sgjZeu0CWvSkHYGwe4zXqI4nutZQV+ihG7z5fsE6Mnyt3VHhoWMXIFJz9vGN7JEJ5TsL+ieSL4wKlbjSDFy5l/uK7LgboZwVp37wjknVVgudeLnFCo7zEhz6cqAluk9IISOAwEpLA1Q=="},
    "PJSx2OmM7gc" : {"name":"MAKE LEGENDARY MUSIC IN 7 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18IyOJF9zX4zE0SfdWEwao1jp76te0zm8dRSJH/V56+bJwmCB27w4HT/p4+AteKXlhj3/YtucYJUKv/yC2UU9E8lRJRAu7vgfcZiyXYVq8FldXelIm9MT43V+8QO4npYcvt7Czpbh89CQ=="},
    "nHCY09dboDM" : {"name":"SUMMER FUTURE BASS IN 7 MINUTES [FL STUDIO]","flp":"U2FsdGVkX19kOSC5/8NyQMhFzai+4CYn4TwSvrZ7ILkGZ2PpJc1XNNEjuk5eIxCJWnTNLUSqf+sTFNP4pTrXzQ47Mb4htTido58EQekK8NDvmMI6BFRGeaXEnL4OplbZCmxFUtCAvY53y5YFXh8O7g=="},
    /*2017*/
    "TyheqXx8zQ8" : {"name":"MAKE A KYGO DROP IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18UZo3Qgy9MLjeyauevkGxw284hG/nMnGEuTb54kfOIrGj4jYvsaOJQ8+mP3cqjOrR9WatPWWaoepArstf0wZy3ag/Xz7OhuiqCAKjTgI1g9W9URFPasZFgnIgjHYFLiHvdChW7xIE7Vg=="},
    "ZOnp_ZIHMxc" : {"name":"MAKE AN AVICII DROP IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX19jeOGS+jXDgdNS2S+Iq5GpiUllyrk19+H9ey9+h0rPyM1Gn9oRY8X/jyGJYzGdm6rkL4dRl/eQtasF3TkNjmGkav8LC1AyLZyDeg/hcv1Vk0IQ8fMUsewU"},
    "h0d6u8u6WwA" : {"name":"MARTIN GARRIX PLUCKS IN 1 MINUTE [FL STUDIO]","flp":"U2FsdGVkX1/zrCogYvoWl7EBQLn68IX4wOQpsACyIpghxGEbNGFrGT434MkW3lf9MXvX4S9uoW1DzV0jBXfG+2MUjmGtMyHDsOy03m6JypEFOWLKmq2uLs8wZpb8M8L6Q8+BLwjWWXg9MISOj7eCiw=="},
    "xDOXgjoZjh8" : {"name":"MAKE A TROPICAL HOUSE TRACK IN 2 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/H9Ovs/xANQQ7CTnDH00DO47gE15sEVw50f50qJTN8R9XROlgpRmFmK/+efrfQ+5ZH3/X7cgPyK7RlpR8Py/dUZmK69aUwH41ZS1RpuurBdzn28Qkt0lfg"},
    "TQQ22FG82BY" : {"name":"MAKE A SAD SONG IN 2 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/4hNn2q+ozHpUv8mDmzSeUOHyUBqR2w6DppRKVf1rVSvRKH+f8h6dCw0qoutuaNTSAwcet4eSYlMrlZRjt9WIR8B6xf/XD4nsbw0+RWlHJMnl8gfSDH47u"},
    "Nu6tTqabWmg" : {"name":"TITANIC THEME (ORCHESTRA) USING REFX NEXUS [FL STUDIO]","flp":"U2FsdGVkX1/ZzGMyI8966JQwqKIrWa0ZYizgNlrvshnlju5F9Fg6Ec1tbXpSiOXjlENwrk2jWmL9X2wOp0rKyznltOOQJ6JWYCN8PF5sq/pCK2k6kU2qu+TApm6PR22X"},
    "cTFr5DCi3sw" : {"name":"MAKE A DANCE TRACK IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/0RD4AIP7CZzu8tDfYGIlKySBRIhrAle/gLA20otqlmNbuQiie3uartrOpTgrsiFmPUxPYPRIsWq/wTn5RrFRcgPb//5Jr1fWjnrN2WEH8BuiF+1CaQKl/"},
    "1QVTeX-PtO8" : {"name":"IN 5 MINUTES - ROCKSTAR - Post Malone (feat. 21 Savage)","flp":"U2FsdGVkX1/HuQxFmiKbAzAbgfff+YOdxy/3kyolIvfD2KRvo2BgSo24WsxISy8gcOuBT/FwAdmM29qjGTbWjdioh5WHk4DJBbcNkIQTvg8saQZNIMUVEdfLK0UImere"},
    "R_j79MGjlNo" : {"name":"MAKE MELBOURNE BOUNCE DROP IN 2 MINUTES [FL STUDIO]","flp":"U2FsdGVkX19A9kiS4EOWpkW2CVhCbyWHEEstXHtumbtsvyELEhy0bdr7V25OxDYePIQbwcOMjH+jB6t2M/9UcUuJUoqQb+3s0ZMfOEFzEcBNpbzSaPMhHw7sdihGP8C9"},
    "XQnb8-fGzwY" : {"name":"MAKE EPIC MUSIC IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1+vB/SvYBfOM1IpHWkIvitXQZY6/CDNDCE6GSskC6r6+4pH/Q0kbXsdRmSdyS4fHfPV/q4dbOFe96Hz6YiYKEXKaqLKUjQzp8pgC9+1rr2VZc96k+F0eRxFB9qMmM1IAqz5jJZ652UlNg=="},
    /*synthSample*/"synthwavesample" : {"name":"Synthwave Sample Pack","flp":"U2FsdGVkX19aokMy6Q2MBrOMYsiJsx+mPcRqizAAd70MzL9PkMpAiO5nL3ERYjr5s45vDBLGD/+HU1uRTUePApuwkrUjvbjMVl84pDLKufxjoUyBNY1AJfgSxLUQ7R+GRE/9HWu4WUy6KS9klPJb8QdEAP5dKRDcdq8d3SlfmzQ="},
    "s7w5DeK3enY" : {"name":"80's RETRO SYNTHWAVE IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18SkrvMT8h1O4pErCExrkCLCX7LEqNsaqkz+4f/NW7AA6GiYt2lCvsz/8RIaG62+SOQDeG2St+El5YsOj1y2JdMjroRmmkkp7Ek2wdcNd0hL3uIk6zdQGS7"},
    "wNT5jls7OTQ" : {"name":"MAKE MELODIC HOUSE DROP IN 2 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18FjyevdfwiQa2WE/Qqk5+TADBueNRFtLwBZ4jaubpANzYuqa58DHtOZZqESlO8Laxk9/9IxHSWM7vh9e5mSLJm+nmF2IK9FKYYXSyThecvgTjd8R8Ihy7x"},
    "olDn17McgG0" : {"name":"MAKE PROGRESSIVE HOUSE IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX195ZXyfU7IAxieaqO6yyxRAsOxPLK1boD7mZBF4FhMBrwrMYHvCGNs20qZzxWms3oR4ohgHk37AEtA1oc1VK82Y0ryY/1DKJOPkKdt+kesWRSR4a9CZtEeW"},
    /*2018*/
    "30HELd_Z8wU" : {"name":"MAKE ALAN WALKER TRACK IN 4 MINUTES - [FL STUDIO]","flp":"U2FsdGVkX1+4Z4ozHpqP/+lVQ/qAaQujhjsrYY668EHhyhXn78bPMw/kCMs3231DYwgCi5XImaiWqZJmo/DxPNSUFGFFB2AKQm2reHp/f7R6UhueAkZalmcLpke2dB3g"},
    "Yc9hhjrT_XI" : {"name":"HOW TO MAKE 'AVICII' STYLE MUSIC IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18pVqRMacbzEWYiTN6wswvhspdVsKoH57OcjP5CMBT+/GGf7+cJ/GDJhdMMh1bXhD7qB9agve2BZYQCZDsZYH6APRr/bTTxAsaS/LmuZe9jEHByzJUL6ZGR"},
    "a_5tPydb58s" : {"name":"MAKE AN ACOUSTIC SONG IN 4 MINUTES [FL STUDIO]","flp":"U2FsdGVkX187V7wy5JIh5ZfJ3XcOk+iZEFia8UM0s3CRqLJweAbHQ3SrOKnUXTAuKrRCz8GYyA9hWrfxxQhrTiXDbRWvquczwvLJLf7XqyR0z3JEsne+s1KlUN46fTUR"},
    "A_V-IDqbJYQ" : {"name":"FUTURE HOUSE DROP IN 3 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1+/IFXbUqll9BJqlsUoq/xUNU81y7Xd52epKOs4O48GLieGlPXHaNu7E4FhNVUm8iowBTxAczpf04q8fegVn521+Xglu40DFesbOFA/5lEr12qMD7IbioP3"},
    "wOroPv_kjyU" : {"name":"MAKE TROPICAL HOUSE IN 5 MINUTES [FL STUDIO 20]","flp":"U2FsdGVkX19Q5UUmYYC+OgD+qLXOPsXoQWOraJUYVnxT8zWDM7WvFY8Tco1RfDvtIq3Qhd+c/vuqchZsNfk6eGNkOdhyDVpDrNuTI6Py8j1e/vZ/Jj8Ext2E/mediDr3"},
    "YInXICwRIsw" : {"name":"MAKE PROGRESSIVE HOUSE IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/HtQkKwoQGTZ2061y/jAvAuiQiXUKAH/W2lsFxFjcroThN3eUY9Absx3lP/NwsV2w7xMBMQnknN62QHAYAGGMcvG9hhjMsRmgdj/9MVPK1BxhZCxkML+Q/"},
    "K-Oa1S_WryI" : {"name":"MAKE DEEP MELODIC HOUSE IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18Qefah+dfqrQuGPZha1MR9J+v8biqViB/bVj2g2FSwVl7vJ72Et1c6r7qzwJkdW52kfsMUjfY6qvGw0NXHxB5Z/zd9SFwNvrMEPrRjp72qt4hQe7/w1gAf"},
    "XPPralkZu0E" : {"name":"OSHEEN - GENIAL","flp":"U2FsdGVkX18EsK7EWM21scTX4In+afUbhySYpv6q0KImDRNoRVlgnGxd0tFbHovJK2PacaBStog4QncolWbaaQEDLlPReoIU2RuxNbeVZnz+TmTOQtq31+hQWjncbnaW"},
    "srfsuhyAaFY" : {"name":"MAKE EDM LIKE KSHMR IN 3 MINUTES - [FL STUDIO]","flp":"U2FsdGVkX18FsnaRynsN9U00VP1g5kQCe7iBvVI247hqRMVCMrhA2MjnaBS6nuFGHMg8I1z0aHCalYS7lT2Pr98a8kHD1y1DFbZmF1MUfAa9MCzjchRkRsARrf5WxYyG"},
    "BSnrjDX_Hb8" : {"name":"MAKE SUMMER MUSIC IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/uWgop/afN8ZVzrkziY9974qWAlldTMSqfdStcs34jPWE9LUrPhUDoZg8f3qaXCQHOmph2TBwMCh4OPkH/93xtMKht8H+LKo4dQuQOIwEQDkYwxagGBUaF"},
    "WmNNOdxWdjg" : {"name":"PROGRESSIVE HOUSE DROP IN 4 MINUTES","flp":"U2FsdGVkX1/nVIO7vcGFj+vD05PD5XP8H3FyksDBTYiomp+FrW089/V2p8BHEUNlCbJmfRsnWPMmazXW+vrVimWhByWatmmq2VaNHOezTrX2kvziUkVG60o+9Zuvm8Vh"},
    /*2019 2020*/   
    "fddZg4Mlq_c" : {"name":"MAKE SUPER HERO MUSIC IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1+E5faJGLV5zvGdnj5yx7gBO37a886ROuiSQ1Fy9EuYW3+XRLWvw761p7KUeMglAS2HhJDraXJQyG+vvUSSsCHsU2WG8nFt/LsoqzlcSuxHM1HdQb/1l9wP"},
    "WitLtGJVyB0" : {"name":"MAKE FUTURE BASS IN 6 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/FyIewv5/FUxXHdVNurWRHMuqc1fIWV15YhmarNFvXCaLJHap1cRTro+g28cX8KNF9lV0gdjMij7y7/XkV9wlo4/nBEHzEFn6Bbcwv6ev37ojTS+fahqBx"},
    "4Ps12kPYCqE" : {"name":"MAKE UPLIFTING MUSIC IN 6 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1+NWsHNxxCAvB4IRCNMtgJf4QGFlwSCMWaFaayjDF/nAIpHQByhPQbTLVjT1ZzLURTzsd/qY2s5yXHsyLo0zI/OLzsz/k42DHabsGf3ihgsUxam4Bu4tPq1"},
    "sWE_BcE527A" : {"name":"MAKE TRACK WITH FLEX IN 10 MINUTES [FL STUDIO]","flp":"U2FsdGVkX18IeVaUCxn4KWjml/4fQA50K6eL2cQ4HGkqjxBe1WAKBNpIPg2CJSU1cXtp4XzXu5Z0GlQ1+S/yeVJdiCwo+4O9zNYIZQ0jXGyO24bB/dD21kzIsAgTXtnS"},
    "pUt9hHiwdyc" : {"name":"TIM (ALBUM) - ALL MELODIES [FL STUDIO]","flp":"U2FsdGVkX1/38/aNvOTE41TwE5aWVLrp4IX2fNYHqWbo0lg4s99D/RQAELri3oEyEJP3+GWyQuTNjlMpM9ckP/VSZH1snvDzEJsqUlmVq+Hh4CnSSlg32+4LDQyH0XaK"},
    "3rljA6-2-Co" : {"name":"PIANO STYLE FUTURE HOUSE DROP IN 5 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1/bVIGVGHNZ8q7W9GLmug6XyoPyxEqbP+PZ4jqsX8dWQefqrO0ydFAQitVItSblbUyAXpDiOawS5lXq9jRCoa32dydRphFM7t23LluyRHncQHg50Y3zzbcL"},    
    "osEXI6M4zTg" : {"name":"HOW TO MAKE ASTRONOMIA (COFFIN MEME SONG)","flp":"U2FsdGVkX18TufI2ZEgXRsgsEH+VCK3lnWTD9vSFUEM+iUyxGmfKKhdSMADeiR0w8OM7XfSmqKcKe/5on2iSF2HH40nJenjrzyPzq9Q0M+R0zrUh6LjgQssFJaMwwOyd"},
    "Rian95RdSpk" : {"name":"HOW TO MAKE A FUTURE BASS DROP","flp":"U2FsdGVkX1/KOyguisWz6huPZNzePJUkGLJc9fkaO8SgMIMlRqpOMOu3zxnb4OnY9vc3GESzYNudIVzCr2QK6/7m1tS7udwxAKhQZBvIRYpNa6hgJUmLXAm/Uk6MKIADxKLHVTEWqaS6D7z67Nlw+w=="},
    "DAIaim4iw3E" : {"name":"HOW TO MAKE A FLUTE SONG","flp":"U2FsdGVkX1+J77gpHRDrlA/wViIOu1+OkeqbF1FO+KCwj8+4r+OfnD9aG38wFL5nltFioFNt4KybIlwIUV7wGAWM8ktcHZpgeWUdwk/3I2NwTMhxpyZO+B3r9zVr+NtieBXdh2cVdycjRAT3DpvW0w=="},
    "w6P4qdJOHoI" : {"name":"HOW TO MELODIC HOUSE WITH XYLOPHONE [FL STUDIO]","flp":"U2FsdGVkX1/qmZyPiXLZq8nRQXNIevnARmWRXQatDarB6ubS2xROP1TCX/bfyXkauPrIN9pNTmefu5byRcXPMdUTJlmQS/j7bvzfdWc2u5assB10D+0Ixn8Zl1dCmu4+D/8+zuVVFRGZw6uJ/nMrTw=="},
    "Jf9rjkZcALc" : {"name":"HOW TO MAKE A WHISTLE SONG","flp":"U2FsdGVkX1+uy1G2V+HO7BxR7dCGgpWNK3GnkU6vdqOZc7NBKgwNHzfFV6pSlnvm4Nnvk1+EfjbwJuwMjZw8wxii9uF3CJANrDnF2PYt8lVAMWhwutd0S3/y1mDs9FnbcfsI+m92pdATLRVeBHplMQ=="},
    "YnEkexdh3L8" : {"name":"HOW TO MAKE VOCAL CHOPS LIKE KYGO","flp":"U2FsdGVkX188Wf/mek4bpaKFIwd0Y7EELEM/30iokP1+iFjbwCkUY6reOT3xnyXJPgeGr7cWSUSknlNpmtJY8uuEoKDTgZkXblhmewKJnXhe0KlOMD3h0HY/4pIVvZQy9KJb77XPPgBQZgIYBQvDqA=="},
    "Av5MkTREHFE" : {"name":"HOW TO MAKE EMOTIONAL GUITAR SONG","flp":"U2FsdGVkX1/Z4Q8sGxKlQych4y29lCgztmQGKM10i1Yf8oTaUGra8zILJFerDUh7U9ALDK70v6O4o9M5UJjkGVdcdX6uO35MjFP34jtN/QS6aswUtA6jjsKAEuiPHLd4xtZMs2DQptgDU4YCM4N5Cg=="},
    "xw72k-IQscI" : {"name":"HOW TO MAKE ROCK SONG IN FL STUDIO","flp":"U2FsdGVkX1/yVbCC7WDUKIumbEOIDhxi8CnvQ+AM30ovFK/H6B97ndzUW7gzFzK8llg+Ucsjvw4IyEjPwcWW8z55GGT47eN9FlytU8+Bhb1BD50PWdl/f2B9IHbmKRv1j7YAKAcYOQsio9R6p0SOjw=="},
    "j3-Zek4RWIs" : {"name":"HOW TO MAKE A CHILL FUTURE BASS TRACK","flp":"U2FsdGVkX18tl6/eswUTxCavbUB+S2xLppI3kNV+e0JAffXioCC0EFo2L8pOrp1CKssPe6e+DAQtlDw4VsQhopsRM9+MTM7+/aFroCkVCvkOmnjGiqaq6BFkrbwc2Z5gaL5X75PhqsP5ir9VaUoNUA=="},
    "U6f700j0804" : {"name":"HOW TO MAKE KAWAII FUTURE BASS","flp":"U2FsdGVkX18BLITtgKmJEXK/nJcF1ovPwVHpV0RwX/zYokQ0K9hl/cVLD+h7RHjDnxbtngd1zey1oBaxPf6gKDtMEzlrf/ejriDOEoE83PXgwlxVEHp+rZyGMjnha6tf9q/oM84DrCFFBkevcLtUZQ=="},
    "Alr19Aya2UQ" : {"name":"MAKE POP/ROCK TRACK IN 12 MINUTES [FL STUDIO]","flp":"U2FsdGVkX1+gv20LaZRoU7CXmsvnD16BlojRlPCZdxaXwIvu/lNnX9ZGX2gSkr54SSTdBCGigyXPhCFN4++tzjqSiiOL9uJPMnry+KDceVRty604o/Se7HUeJpTO+lkX0iSRI2mU5x7tlvzyRLOB4Q=="},
    
    /*2021*/
    "E4dI2OWZn-E" : {"name":"HOW TO MAKE A HIT TIKTOK SONG","flp":"U2FsdGVkX18TKOVSHfjQcsaUkp9o9cmkbZtnSHW4ULUBMQnxL3QViUnp4whC1nrT1G4iLxA21BJ95qwlKaLxEBLl0Tcuhyj4QY3PZvEUIEAc9pX9doKygTSk0AWfB9B/c5CdOmqrfiZnwbE9oO98qg=="},
    "-b_qBSv2aQ0" : {"name":"HOW TO MAKE COUNTRY HOUSE EDM SONG","flp":"U2FsdGVkX1+FssyqGxiFyFdFAaU4nnawQtwEoEP5b7SFHgKgrcS4jZNqkFYaDaszTo21Fno+gUURzXOPbpbA+2xGCikQJeZCl7gz4D7F29qMbRWPfC7GatrjxstI5tYR"},
    "QCUB8uc6BIc" : {"name":"HOW TO MAKE A PUNJABI SONG","flp":"U2FsdGVkX18LcaaE42tcGt0cHH87t6XFNjJrHAHqTEEPzj3cCr7t80WkyzcICHVPdUmGBR3m8oSVCO52RI9ZZGEwGheQ+ZckO1ED+vZTgUJ/2vVSMsoyPI3lxWHdroe/3uWZJ3hQXjJVDS2s9UevDw=="},
    "qKrH2Eo4AVU" : {"name":"HOW TO MAKE A FUTURE BASS SONG","flp":"U2FsdGVkX1/IghsUhXJLc3QNq3UD/e0V61GF65N8QsQUY1qjKnyh/6fHuaqQrJS8kl8XJfh/FNRWccQmf8CkBtkMb6Rv7hjrDZXcRpboQlnE+NSMVLXxGxVrczkCgF1D3BUzMtelpq9aBakC6jIL9g=="},
    
    
    "end" : {"name":"end","flp":"end"}
}

var yt=0;
var ins=0;
var fb=0;
var dcord=0;
var x=""

$(document).ready(function(){ 
    param=location.href.split("?")
    if(param.length>=2){                
        var nn=param[1].split("&")[0]
        x = nn.split("id=")[1]
        if(flpdb[x]===undefined){
            $('#content-container').html('<div class="col-md-4"></div><div class="col-md-4"style="text-align: center;"><b>FLP NOT RELEASED YET, WRITE TO osheen.mix@gmail.com</b></div><div class="col-md-4"></div>')
            $("#loader").hide(); 
        }
        else{
            $("#loader").hide();  
            $("#urlyt").attr("src", "https://i.ytimg.com/vi/"+x+"/hqdefault.jpg");
            $("#textyt").text(flpdb[x]["name"]);
            $("#myform").show()
        }
    }
    else{
        $('#content-container').hide()
    }        
});

$("#youtubeButton").click(function(){
    if(yt==0){
        var win = window.open('https://www.youtube.com/osheen?sub_conformation=1', '_blank');
        win.focus();
        yt=1  
        setTimeout(function(){  
        $("#youtubeText").addClass("strike");
        enable()
        }, 1000);               
    }        
})

$("#facebookButton").click(function(){
    if(fb==0){
        var win = window.open('https://www.facebook.com/osheenmusic/', '_blank');
        win.focus();
        fb=1
        setTimeout(function(){  
        $("#facebookText").addClass("strike");        
        enable()
        }, 1000);
        
    }    
})

$("#instagramButton").click(function(){
    if(ins==0){
        var win = window.open('https://www.instagram.com/osheenkhare/', '_blank');
        win.focus();
        ins=1
        setTimeout(function(){  
        $("#instagramText").addClass("strike");                
        enable()
        }, 1000);                
    }    
})

$("#discordButton").click(function(){
    if(dcord==0){
        var win = window.open('https://www.osheenmusic.com/discord', '_blank');
        win.focus();
        dcord=1
        setTimeout(function(){  
        $("#discordText").addClass("strike");                
        enable()
        }, 1000);                
    }    
})

function enable(){
    if(ins+yt+fb+dcord==4){
        $("#downloadText").text("DOWNLOAD FLP")
        $("#downloadButton").css("background","#000000")
        $("#append1").append('<h6><b>Since all these projects are free downloads, consider supporting me on PAYPAL or PAYTM <span style="color:red">(This is an optional step, you can still download the FLP for free)</span> </b></h6>')
        $("#append2").append('<a href="https://paypal.me/osheenyt"><div style="cursor: pointer;  padding: 10px; background: #0070ba;" class="text"><b>PAYPAL (FOR EVERYONE)</b></div></a><a href="/paytmkaro.html"><div style="cursor: pointer;  background: #00B9F1; padding: 10px;" class="text"><b>PAYTM (FOR INDIA ONLY)</b></div></a>')
    }    
}

$("#downloadButton").click(function(){
    if(ins+yt+fb+dcord==4){
        var my_value= CryptoJS.AES.decrypt(flpdb[x]["flp"], x).toString(CryptoJS.enc.Utf8);
        var win = window.open(my_value, '_blank');
        win.focus();                
    }
    else{
        alert("SOCIAL LINKS FOLLOW PENDING")
    }
})

function timeFunction() {
   setTimeout(function(){  }, 1000);
}
