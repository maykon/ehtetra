#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const ehtetraPath = path.join(mainPath, './ehtetra');

const ehtetra = function (){
    const fileMp3 = `${ehtetraPath}.mp3`;
    const linuxcmd = R.join('', ['paplay ', ehtetraPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', fileMp3]);
    const maccmd = R.join('', ['afplay ', fileMp3]);

    const fileGif = `${ehtetraPath}.gif`;
    const linuxOpencmd = R.join('', ['xdg-open ', fileGif]);
    const windowsOpencmd = R.join('', ['start ', fileGif]);
    const macOpencmd = R.join('', ['open ', fileGif]);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)
    
    R.cond([
      [R.equals('linux'), exec(linuxOpencmd)],
      [R.equals('win32'), exec(windowsOpencmd)],
      [R.equals('darwin'), exec(macOpencmd)],
  ], platform)

    function exec(cmd){
        return exect(cmd, function (error) {
            R.ifElse(
               R.empty,
               () => console.log('🙌😃 Eh Tetraaaaaaaaaaaaa!'),
               (error) => console.error(error),
               error)
        });
    }
}

module.exports = ehtetra;

if (!module.parent) {
    ehtetra();
}
