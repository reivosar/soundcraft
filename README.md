# Soundcraft

## Overview
Soundcraft is a web-based application that combines a synthesizer and drum machine using React, TypeScript, and Tone.js. It aims to provide a seamless and interactive experience for music production. The project uses Vite for fast development and TailwindCSS for styling.

## Features
### Synthesizer
- **Oscillators:** Three types with adjustable waveforms, filters, and envelopes.
- **Noise Generator:** Generates white, pink, or brown noise with adjustable volume.
- **Mixer:** Controls the volume of oscillators and noise generator.
- **Waveform Visualizer:** Displays real-time waveforms of the generated sounds.

### Drum Machine
- **Step Sequencer:** 4x8 grid for programming beats.
- **Instruments:** Includes kick, snare, hi-hat, tom, clap, and cymbal.

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/reivosar/soundcraft.git
    cd soundcraft
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the development server:**
    ```bash
    npm run dev
    ```

## Usage
### Synthesizer
1. **Play Note:** Press the "Play Note" button to generate sound from the synthesizer.
2. **Loop:** Toggle the loop button to repeat the note.
3. **Adjust Parameters:** Use the knobs to adjust oscillator types, filter frequencies, and envelope settings.

### Drum Machine
1. **Step Sequencer:** Click on the grid to activate steps.
2. **Play/Stop:** Use the play/stop button to control playback.
3. **Clear:** Press the clear button to reset the sequencer.

## Code Structure
- **src/components/**
  - **SynthesizerScreen.tsx:** Main synthesizer component.
  - **DrumMachineScreen.tsx:** Main drum machine component.
  - **OscillatorSection.tsx:** Controls for each oscillator.
  - **NoiseGenerator.tsx:** Controls for the noise generator.
  - **MixerSection.tsx:** Volume controls for oscillators and noise generator.
  - **WaveformVisualizer.tsx:** Displays the waveform.
  - **StepSequencer.tsx:** Step sequencer for the drum machine.
  - **DrumPad.tsx:** Individual drum pad component.

## Configuration
- **tailwind.config.js:** TailwindCSS configuration.
- **tsconfig.json:** TypeScript configuration.

## Contributions
Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

---

For more details, visit the [Soundcraft GitHub repository](https://github.com/reivosar/soundcraft).
