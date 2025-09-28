const synth = new Tone.Synth().toDestination();
const fmSynth = new Tone.FMSynth().toDestination();

let activeNote = null;

const noteMap = {
  [Sign.do]: "C4",
  [Sign.re]: "D4",
  [Sign.mi]: "E4",
  [Sign.fa]: "F4",
  [Sign.sol]: "G4",
  [Sign.la]: "A4",
  [Sign.ti]: "B4",
  [Sign.none]: null
};

const keys = {
  a: 4,
  s: 5
}

const keys2 = {
  q: 4,
  w: 5
}


document.addEventListener("keydown", (e) => {
  if (keys[e.key] && !activeNote) {
    const note = noteMap[currentSign]?.replace('4',keys[e.key]);
    if (note) {}
    synth.triggerAttack(note);
    activeNote = note;
  }
});

document.addEventListener("keyup", (e) => {
  if (keys[e.key] && activeNote) {
    synth.triggerRelease();
    activeNote = null;
  }
});

document.addEventListener("keydown", (e) => {
  if (keys2[e.key] && !activeNote) {
    const note = noteMap[currentSign]?.replace('4',keys2[e.key]);
    if (note) {}
    fmSynth.triggerAttack(note);
    activeNote = note;
  }
});

document.addEventListener("keyup", (e) => {
  if (keys2[e.key] && activeNote) {
    fmSynth.triggerRelease();
    activeNote = null;
  }
});