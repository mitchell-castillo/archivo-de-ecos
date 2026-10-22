import test from 'node:test';import assert from 'node:assert/strict';import {LEVELS,initial,start,finishPlayback,press,replay,next,expected,parseProgress,encodeProgress} from '../engine.js';
test('six distinct valid original sequences',()=>{assert.equal(LEVELS.length,6);assert.equal(new Set(LEVELS.map(l=>l.sequence.join(','))).size,6);for(const l of LEVELS)assert.ok(l.sequence.every(n=>Number.isInteger(n)&&n>=0&&n<=8));});
for(let i=0;i<6;i++){test(`level ${i+1} can be completed`,()=>{let s=finishPlayback(start(initial(i)));for(const n of expected(i))s=press(s,n);assert.equal(s.phase,'complete');assert.equal(s.mistakes,0);});test(`level ${i+1} wrong answer resets input`,()=>{let s=finishPlayback(start(initial(i)));s=press(s,(expected(i)[0]+1)%9);assert.equal(s.phase,'retry');assert.equal(s.mistakes,1);assert.deepEqual(s.input,[]);s=finishPlayback(start(s));for(const n of expected(i))s=press(s,n);assert.equal(s.phase,'complete');assert.equal(s.mistakes,1);});}
test('advanced signals reverse rather than change source',()=>{assert.deepEqual(expected(3),[2,7,5,0]);assert.deepEqual(LEVELS[3].sequence,[0,5,7,2]);});
test('input locked before and during playback',()=>{for(const s of [initial(),start(initial())])assert.equal(press(s,0),s);});
test('invalid keys ignored',()=>{const s=finishPlayback(start(initial()));for(const n of [-1,9,1.5,NaN,'0'])assert.equal(press(s,n),s);});
test('replay clears partial input and counts replay',()=>{let s=press(finishPlayback(start(initial())),0);s=replay(s);assert.equal(s.phase,'ready');assert.equal(s.replays,1);assert.deepEqual(s.input,[]);});
test('complete ignores extra input/replay',()=>{let s=finishPlayback(start(initial()));for(const n of expected(0))s=press(s,n);assert.equal(press(s,0),s);assert.equal(replay(s),s);assert.equal(next(s).level,1);});
test('final next does not overflow',()=>{let s=finishPlayback(start(initial(5)));for(const n of expected(5))s=press(s,n);assert.equal(next(s),s);});
test('bad level falls back safely',()=>{for(const i of [-1,6,NaN,'2'])assert.equal(initial(i).level,0);});
test('corrupt and foreign progress safe',()=>{for(const raw of [null,'{','null','[]','{"version":2,"completed":[1]}'])assert.deepEqual(parseProgress(raw),[]);});
test('progress sanitizes duplicates and invalid values',()=>assert.deepEqual(parseProgress('{"version":1,"completed":[2,2,0,-1,9,"1",1.5]}'),[0,2]));
test('progress roundtrip',()=>assert.deepEqual(parseProgress(encodeProgress([5,0,2])),[0,2,5]));

test('catalogue compatible completed records',()=>{const x=JSON.parse(encodeProgress([0,3]));assert.equal(x.completed[0].bestMoves,3);assert.equal(x.completed[3].bestMoves,4);assert.deepEqual(parseProgress(JSON.stringify(x)),[0,3]);});
