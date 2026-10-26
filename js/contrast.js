const PROTOCOLS = {
            arterial: {
                aorta: {
                    name: "CT Aortography",
                    target: "Thoracic & Abdominal Aorta",
                    view: "full",
                    // PRACTICAL ACCURATE TIME AT 4.5 mL/s = ~14.8 seconds for Thoracic Aorta Arch Peak!
                    baseAortaArrival: 14.8,
                    color: "#ff6b00",
                    pathSVG: "M 110 440 L 128 380 L 145 310 Q 180 250, 232 230 L 235 265 C 230 275, 235 295, 242 295 Q 210 280, 182 270 C 158 250, 158 290, 182 305 Q 220 300, 252 290 C 255 258, 245 218, 255 208 C 265 198, 272 218, 260 238 L 260 500",
                    stages: [
                        { timeFactor: 0.0, title: "1. IV Start (Antecubital)", desc: "Bolus leaves injector into arm vein." },
                        { timeFactor: 0.35, title: "2. SVC & Right Heart", desc: "Arrives in SVC and Right Ventricle (~5.2s)." },
                        { timeFactor: 0.68, title: "3. Pulmonary Pass", desc: "Lungs capillary traversal & Left Heart (~10.0s)." },
                        { timeFactor: 1.0, title: "4. Aortic Arch Peak (Trigger)", desc: "Peak HU opacification of Thoracic Aorta (~14.8s)." },
                        { timeFactor: 1.25, title: "5. Abdominal Aorta", desc: "Contrast advances down to iliac bifurcation (~18.5s)." }
                    ]
                },
                ctpa: {
                    name: "CT Pulmonary Angiography (CTPA)",
                    target: "Pulmonary Arteries",
                    view: "chest",
                    baseAortaArrival: 10.5,
                    color: "#06b6d4",
                    pathSVG: "M 110 440 L 128 380 L 145 310 Q 180 250, 232 230 L 235 265 C 230 275, 235 295, 242 295 Q 210 280, 182 270 M 242 295 Q 270 280, 318 270",
                    stages: [
                        { timeFactor: 0.0, title: "1. Injection Start", desc: "Contrast enters antecubital vein." },
                        { timeFactor: 0.4, title: "2. SVC Passage", desc: "Reaches superior vena cava (~4.2s)." },
                        { timeFactor: 0.7, title: "3. Right Ventricle", desc: "Right ventricular outflow tract (~7.3s)." },
                        { timeFactor: 1.0, title: "4. Pulmonary Arteries Peak", desc: "Main & lobar pulmonary artery peak (~10.5s)." }
                    ]
                },
                neuro: {
                    name: "CTA Head & Neck",
                    target: "Carotids & Circle of Willis",
                    view: "head",
                    baseAortaArrival: 16.2,
                    color: "#6366f1",
                    pathSVG: "M 110 440 L 128 380 L 145 310 Q 180 250, 232 230 L 235 265 C 230 275, 235 295, 242 295 Q 270 280, 318 270 C 342 250, 342 290, 318 305 Q 280 300, 252 290 C 255 258, 245 218, 255 208 L 258 212 L 260 110 L 265 68",
                    stages: [
                        { timeFactor: 0.0, title: "1. IV Start", desc: "Injected at peripheral site." },
                        { timeFactor: 0.35, title: "2. Cardiopulmonary Circuit", desc: "Right heart and pulmonary pass (~5.6s)." },
                        { timeFactor: 0.75, title: "3. Common Carotid Arteries", desc: "Cervical carotid opacification (~12.1s)." },
                        { timeFactor: 1.0, title: "4. Circle of Willis Peak", desc: "Intracranial arterial peak phase (~16.2s)." }
                    ]
                },
                abdominal: {
                    name: "CT Abdominal Angiography",
                    target: "Celiac Trunk & SMA",
                    view: "abdomen",
                    baseAortaArrival: 18.0,
                    color: "#10b981",
                    pathSVG: "M 110 440 L 128 380 L 145 310 Q 180 250, 232 230 L 235 265 C 230 275, 235 295, 242 295 Q 210 280, 182 270 Q 220 300, 252 290 C 255 258, 245 218, 255 208 C 265 198, 272 218, 260 358 Q 282 348, 302 362",
                    stages: [
                        { timeFactor: 0.0, title: "1. Arm IV Site", desc: "Bolus initiated." },
                        { timeFactor: 0.4, title: "2. Cardiopulmonary Pass", desc: "Central circulation pass (~7.2s)." },
                        { timeFactor: 0.8, title: "3. Thoracic Aorta", desc: "Descending aorta level (~14.4s)." },
                        { timeFactor: 1.0, title: "4. Celiac & SMA Peak", desc: "Splanchnic arterial peak (~18.0s)." }
                    ]
                }
            },
            venous: {
                cava: {
                    name: "Superior / Inferior Vena Cavography",
                    target: "Caval Veins",
                    view: "chest",
                    baseAortaArrival: 6.0,
                    color: "#38bdf8",
                    pathSVG: "M 110 440 L 128 380 L 145 310 Q 180 250, 232 230 L 235 265 L 240 300 L 240 500",
                    stages: [
                        { timeFactor: 0.0, title: "1. Peripheral Vein", desc: "Injection start." },
                        { timeFactor: 0.5, title: "2. Subclavian Vein", desc: "Upper venous trunk (~3.0s)." },
                        { timeFactor: 1.0, title: "3. SVC Peak Phase", desc: "Superior Vena Cava opacification (~6.0s)." }
                    ]
                }
            }
        };

        let currentCategory = 'arterial';
        let currentProtocolKey = 'aorta';
        let isPlaying = false;
        let animProgress = 0; 
        let animSpeed = 1.0;
        let animationFrameId = null;

        function switchCategory(cat) {
            currentCategory = cat;
            const firstKey = Object.keys(PROTOCOLS[cat])[0];
            
            const btnArterial = document.getElementById('cat-arterial');
            const btnVenous = document.getElementById('cat-venous');
            const catTitle = document.getElementById('protocol-category-title');

            if (cat === 'arterial') {
                btnArterial.className = "flex-1 py-2 px-3 rounded-xl bg-red-600/90 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2";
                btnVenous.className = "flex-1 py-2 px-3 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs hover:text-white transition flex items-center justify-center gap-2";
                catTitle.innerHTML = `<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> Arterial CTA Protocols`;
            } else {
                btnVenous.className = "flex-1 py-2 px-3 rounded-xl bg-blue-600/90 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2";
                btnArterial.className = "flex-1 py-2 px-3 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs hover:text-white transition flex items-center justify-center gap-2";
                catTitle.innerHTML = `<svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg> Venous Phase Protocols`;
            }

            renderProtocolButtons();
            selectProtocol(firstKey);
        }

        function renderProtocolButtons() {
            const container = document.getElementById('pathway-buttons');
            container.innerHTML = '';
            const protos = PROTOCOLS[currentCategory];

            Object.keys(protos).forEach(key => {
                const proto = protos[key];
                const isActive = key === currentProtocolKey;
                const btn = document.createElement('button');
                btn.onclick = () => selectProtocol(key);
                btn.id = `proto-${key}`;
                btn.className = `w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-xs ${isActive ? (currentCategory === 'arterial' ? 'border-orange-500/50 bg-orange-500/10 text-white' : 'border-blue-500/50 bg-blue-500/10 text-white') : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300'}`;
                
                btn.innerHTML = `
                    <div>
                        <div class="font-bold">${proto.name}</div>
                        <div class="text-slate-400 text-[10px]">Target: ${proto.target}</div>
                    </div>
                    <span class="w-2.5 h-2.5 rounded-full shadow-sm" style="background-color: ${proto.color}"></span>
                `;
                container.appendChild(btn);
            });
        }

        // PRACTICAL ACCURATE CALCULATOR FORMULA
        function getComputedTimes() {
            const vol = parseFloat(document.getElementById('inp-vol').value);
            const rate = parseFloat(document.getElementById('inp-rate').value);
            const conc = parseFloat(document.getElementById('inp-conc').value);

            const injectionDuration = vol / rate;
            const proto = PROTOCOLS[currentCategory][currentProtocolKey];
            
            // Flow Rate Correction: 4.5 mL/s is baseline. Higher rate speeds up arrival by ~1.5 - 2s!
            const flowSpeedFactor = 4.5 / rate;
            const practicalArrival = proto.baseAortaArrival * flowSpeedFactor;

            const idr = (conc * rate) / 1000;
            const totalMass = (conc * vol) / 1000;

            return { injectionDuration, practicalArrival, idr, totalMass };
        }

        function updateCalculator() {
            const metrics = getComputedTimes();

            document.getElementById('val-vol').innerText = document.getElementById('inp-vol').value + ' mL';
            document.getElementById('val-rate').innerText = parseFloat(document.getElementById('inp-rate').value).toFixed(1) + ' mL/s';
            document.getElementById('val-conc').innerText = document.getElementById('inp-conc').value + ' mg I/mL';

            document.getElementById('calc-duration').innerText = metrics.injectionDuration.toFixed(1) + ' s';
            document.getElementById('calc-idr').innerText = metrics.idr.toFixed(2) + ' g I/s';
            document.getElementById('calc-mass').innerText = metrics.totalMass.toFixed(1) + ' g I';
            document.getElementById('calc-peaktime').innerText = metrics.practicalArrival.toFixed(1) + ' s';

            renderTimelineUI();
            updateAnimationPosition();
        }

        function selectProtocol(key) {
            currentProtocolKey = key;
            const proto = PROTOCOLS[currentCategory][key];

            document.getElementById('bolusPathTracer').setAttribute('d', proto.pathSVG);
            document.documentElement.style.setProperty('--bolus-color', proto.color);
            document.getElementById('grad-stop-2').setAttribute('stop-color', proto.color);

            renderProtocolButtons();
            setAnatomicalView(proto.view);
            updateCalculator();
            restartAnimation();
        }

        function renderTimelineUI() {
            const proto = PROTOCOLS[currentCategory][currentProtocolKey];
            const metrics = getComputedTimes();
            const container = document.getElementById('timeline-list');
            container.innerHTML = '';

            proto.stages.forEach((stg, idx) => {
                const stageTime = metrics.practicalArrival * stg.timeFactor;
                
                const item = document.createElement('div');
                item.className = `p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${idx === 0 ? 'bg-orange-500/20 border-orange-500/50 text-white shadow-md' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'}`;
                item.id = `timeline-item-${idx}`;
                item.onclick = () => jumpToProgress((stg.timeFactor / 1.25) * 100);

                item.innerHTML = `
                    <div>
                        <div class="font-bold text-xs text-slate-200">${stg.title}</div>
                        <div class="text-[10px] opacity-75 text-slate-400">${stg.desc}</div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs font-extrabold font-mono text-emerald-400">${stageTime.toFixed(1)} s</span>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function setAnatomicalView(view) {
            const svg = document.getElementById('humanBodySvg');
            const title = document.getElementById('view-title');
            const subtitle = document.getElementById('view-subtitle');

            ['full', 'head', 'chest', 'abdomen'].forEach(v => {
                const btn = document.getElementById(`btn-view-${v}`);
                if (btn) btn.className = "px-3 py-1.5 rounded-xl text-slate-300 hover:text-white transition";
            });

            const activeBtn = document.getElementById(`btn-view-${view}`);
            if (activeBtn) activeBtn.className = "px-3 py-1.5 rounded-xl bg-sky-600 text-white font-semibold shadow-md transition";

            if (view === 'head') {
                svg.style.transform = "scale(2.3) translateY(170px)";
                title.innerText = "Head & Neck Region"; subtitle.innerText = "Cerebrovascular Target Zone";
            } else if (view === 'chest') {
                svg.style.transform = "scale(1.9) translateY(75px)";
                title.innerText = "Cardiopulmonary Chest Region"; subtitle.innerText = "Thoracic Aorta & Pulmonary";
            } else if (view === 'abdomen') {
                svg.style.transform = "scale(1.8) translateY(-60px)";
                title.innerText = "Abdomen & Pelvic Region"; subtitle.innerText = "Abdominal Aorta & Splanchnic";
            } else {
                svg.style.transform = "scale(1) translateY(0px)";
                title.innerText = "Full Body Pro-Vascular View"; subtitle.innerText = "Anatomically Accurate Projections";
            }
        }

        function togglePlay() {
            isPlaying = !isPlaying;
            document.getElementById('lbl-play').innerText = isPlaying ? 'Pause' : 'Play';
            if (isPlaying) {
                lastTimestamp = performance.now();
                animationFrameId = requestAnimationFrame(stepAnimation);
            } else if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        }

        function restartAnimation() {
            animProgress = 0;
            updateAnimationPosition();
            if (!isPlaying) togglePlay();
        }

        function jumpToProgress(pct) {
            animProgress = pct;
            updateAnimationPosition();
        }

        function onScrubberInput(val) {
            animProgress = parseFloat(val);
            updateAnimationPosition();
        }

        function setSpeed(spd) {
            animSpeed = spd;
            [0.5, 1.0, 2.0].forEach(s => {
                const btn = document.getElementById(`speed-${s.toString().replace('.', '')}`);
                if (btn) btn.className = s === spd ? "px-2.5 py-1 rounded-xl bg-orange-500 text-white font-bold shadow-md" : "px-2.5 py-1 rounded-xl text-slate-400 hover:text-white";
            });
        }

        let lastTimestamp = 0;
        function stepAnimation(timestamp) {
            if (!isPlaying) return;

            const delta = (timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            animProgress += (delta * 14) * animSpeed;

            if (animProgress >= 100) {
                animProgress = 100;
                isPlaying = false;
                document.getElementById('lbl-play').innerText = 'Play';
            }

            updateAnimationPosition();

            if (isPlaying) {
                animationFrameId = requestAnimationFrame(stepAnimation);
            }
        }

        function updateAnimationPosition() {
            const path = document.getElementById('bolusPathTracer');
            const totalLen = path.getTotalLength();
            if (totalLen === 0) return;

            const currentLen = (animProgress / 100) * totalLen;
            const pt = path.getPointAtLength(currentLen);

            const head = document.getElementById('bolusHeadMarker');
            head.setAttribute('cx', pt.x);
            head.setAttribute('cy', pt.y);

            path.style.strokeDasharray = `${currentLen} ${totalLen}`;
            path.style.strokeDashoffset = '0';

            document.getElementById('anim-scrubber').value = animProgress;

            const metrics = getComputedTimes();
            const currentSeconds = (animProgress / 100) * (metrics.practicalArrival * 1.25);

            document.getElementById('live-time-display').innerText = currentSeconds.toFixed(1) + ' s';
            document.getElementById('stage-progress-pct').innerText = currentSeconds.toFixed(1) + ' s';

            const proto = PROTOCOLS[currentCategory][currentProtocolKey];
            let currentStageIdx = 0;
            
            for (let i = proto.stages.length - 1; i >= 0; i--) {
                if (currentSeconds >= metrics.practicalArrival * proto.stages[i].timeFactor) {
                    currentStageIdx = i;
                    break;
                }
            }

            const activeStage = proto.stages[currentStageIdx];
            document.getElementById('stage-badge').innerText = `Stage ${currentStageIdx + 1} / ${proto.stages.length}`;
            document.getElementById('stage-title').innerText = activeStage.title;
            document.getElementById('stage-desc').innerText = activeStage.desc;

            proto.stages.forEach((stg, idx) => {
                const item = document.getElementById(`timeline-item-${idx}`);
                if (item) {
                    if (idx === currentStageIdx) {
                        item.className = "p-2.5 rounded-xl border bg-orange-500/20 border-orange-500/50 text-white font-bold shadow-md transition-all";
                    } else {
                        item.className = "p-2.5 rounded-xl border bg-slate-900/50 border-slate-800 text-slate-400 transition-all";
                    }
                }
            });
        }

        window.addEventListener('DOMContentLoaded', () => {
            renderProtocolButtons();
            selectProtocol('aorta');
        });
