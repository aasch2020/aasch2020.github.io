# Computer Vision Driven Automated Bicycle Braking

**December 2025** | University of California San Diego

## Overview

Implemented Lucas-Kanade optical flow based collision detection and GPIO driver for closed-loop braking control.

GENERATED: **OptiBrake**—low-cost collision avoidance for bicycles using a single front camera. E-bikes and mixed pedestrian/cyclist areas increase collision risk; we applied collision-detecting braking (in spirit similar to cars) with monocular vision instead of LIDAR/ultrasonic for cost. Optical flow gives apparent motion across frames; approaching obstacles produce large flow at edges. We combined Focus of Expansion and time-to-collision with wheel odometry for distance. Team: Alex Asch, Benjamin Scott.

## Technologies

- Computer vision (OpenCV)
- Lucas-Kanade optical flow
- GPIO/hardware control
- Real-time embedded systems
- Python
GENERATED: - Raspberry Pi, Sony IMX500 AI Camera (optical flow only; no NN)
GENERATED: - Keyestudio collision sensor (wheel speed via spoke cards), gpiozero (2.0.1) with interrupt-based tick handling
GENERATED: - 12V gear motor (150 RPM), L298N H-bridge, V-brakes (cable actuation), dual batteries (Pi + motor)
GENERATED: - Focus of Expansion and TTC with odometry; wheel speed calibration for reliability

## Key Accomplishments

- Developed real-time collision detection using optical flow analysis
- Implemented closed-loop control system for automated braking
- Integrated computer vision with hardware GPIO drivers
GENERATED: - Closed loop: process variable = wheel speed, controller = software, actuator = motor, sensor = collision sensor; brake until RPM = 0 then reverse motor to unspool cable.
GENERATED: - Interrupt-based wheel speed: debounced ticks (two timers, 9→3 ticks/rotation), weighted average of last 9 RPM (current 5×) for stable speed metric.
GENERATED: - Demonstrated automated brake actuation from single-camera CV on Raspberry Pi in controlled indoor trials; showed viability and limits (false positives outdoors).

## Motivation and Related Work

GENERATED: E-bikes and commuter cycling increase mixed-use areas and collision odds; we aimed to reduce collisions via automatic braking. Related work: automotive AEB (often LIDAR/ultrasonic); UAV monocular obstacle avoidance (e.g. Farneback dense flow—no distance; MegaDepth CNN—scale/depth issues). We chose optical flow for any-obstacle detection and added wheel odometry for distance. Bicycle mounting is harder than UAV: less stable, low-speed jitter, feature-rich FOV (ground, clutter), causing sensitivity and false positives we tuned for.

## Hardware and Design Choices

GENERATED: **Camera:** AI camera for possible NN; used only for optical flow. **Wheel speed:** collision sensor + spoke cards (better cost/accuracy than IR for us). **Power:** two batteries (12V 1A motor, separate Pi). **Motor:** 150 RPM gear motor (torque vs speed vs draw). **Brakes:** V-brakes (cantilever needed too much force for our motor; disk/hydraulic out of budget).

## Braking Logic and Software

GENERATED: Lucas-Kanade (not NN) chosen because we care about proximity/collision to any obstacle, not object class. Brake actuation: motor on until wheel speed = 0, then reverse for fixed unspool. Debounce: register tick only if time since last “real” tick &gt; threshold; use 3 ticks/rotation and time between registered ticks for RPM. RPM = weighted average of last 9 samples (current ×5). ABS attempted but not feasible: DC motor + cable cannot do rapid PWM feathering; short bicycle stopping distance and sensor timing prevented lock detection in time.

## Challenges

GENERATED: **CV:** Responsiveness vs false positives—single-frame threshold gave latency OK for braking but many brief outliers triggered brakes. Lucas-Kanade uses contrast; busy scenes (trees, buildings) produced distant features and high false positive rate. Low speed unreliable: bike jitter/tilt moved features, more false positives. **Environment:** Outdoor trials had too many high-contrast features (edges, corners), so experiments were indoor, lower speed, controlled. **ABS:** Wheel lock not achievable in normal riding; DC motor + cable not suitable for fine ABS-style control.

## Experimental Results

GENERATED: Trials indoors at controlled speed; repeated runs to match speed (±0.025 m/s). Distance-to-collision at detection (m); threshold 3 m (readings &gt;3 m flagged). Five trials per condition; one 0 m = wall collision. False positive rate was high enough that long outdoor trials were not feasible; results show that indoor, single-camera, Pi-based automatic braking is possible but robustness outdoors would need more compute and/or more sensors (e.g. LIDAR).

## Accomplishments and Next Steps

GENERATED: **Accomplishments:** Interrupt-based handling and closed-loop braking (wheel speed → controller → motor → wheel); CV for collision detection in embedded setting; wood prototyping and mounting without full machining.
GENERATED: **Next steps:** Different brake mechanism (e.g. hydraulic disk + hydraulic control) for more force and finer control; wheel speed encoder for better velocity measurement and possible ABS; human-controlled rear brake with pass-through. CV: RANSAC image stabilization to reduce bike/terrain jitter and false positives; then faster sampling and tuning; consider consecutive-frames model instead of single detection + rolling average.

## Sources

<p>
	<a href="/assets/pdfs/Bike-brake.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</p>

[aasch2020/Optibrake](https://github.com/aasch2020/Optibrake)