# OptiBrake (Bicycle CV Braking) — Project Copy (v2)

## Summary

**OptiBrake** is a low-cost bicycle collision-avoidance system: a front camera runs Lucas-Kanade optical flow to detect approaching obstacles; a closed-loop controller runs the brake motor until wheel speed hits zero, then reverses to unspool the cable.

## Motivation

E-bikes and mixed traffic increase collision risk; automotive AEB usually needs LIDAR/ultrasonic and is expensive. We explored monocular vision (optical flow) plus wheel odometry for distance—detecting any obstacle without classifying it—and showed that single-camera, Pi-based braking is feasible in controlled conditions, while documenting limits (e.g., false positives outdoors).

## Contributions

I worked on wheel odometry, closed-loop brake control, and hardware integration. I also helped design and analyze the indoor trials, and debugging the optical flow implementation, and it's integration with our control loop.

## Stack

- **Language:** Python  
- **CV:** OpenCV, Lucas-Kanade optical flow (no neural network)  
- **Hardware:** Raspberry Pi, gpiozero; Sony IMX500 camera; Keyestudio sensor + spoke cards; 12V gear motor (150 RPM), L298N, V-brakes, dual batteries  
- **Method:** Focus of Expansion and time-to-collision with wheel odometry for distance

## Challenge & approach

**Problem:** Single-frame optical-flow thresholds gave okay latency but lots of brief false positives (trees, buildings, bike jitter), especially at low speed and outdoors.  
**Approach:** Debounced wheel ticks (register only if time since last “real” tick exceeds a threshold), 3 ticks/rotation, and a weighted average of the last 9 RPM samples (current ×5) for a stable speed signal. We ran controlled indoor trials at matched speed to validate braking and distance-to-collision, and documented that outdoor robustness would need more compute or extra sensors (e.g., LIDAR).

## Highlights

- **Closed-loop braking** — Wheel speed as process variable; software controller; motor actuates until RPM = 0, then reverses to unspool.  
- **Interrupt-based wheel speed** — Debounced ticks and weighted average of last 9 RPM; no ABS (DC motor + cable can’t do fine PWM).  
- **Optical flow detection** — Lucas-Kanade for any-obstacle proximity; FoE and TTC with odometry for distance.  
- **Indoor validation** — Showed automated brake actuation from single-camera CV on a Pi in controlled trials; documented false-positive and environment limits.

---

*V2 project copy. Original: [bicycle-cv.md](bicycle-cv.md). [View PDF](/assets/pdfs/Bike-brake.pdf) · [aasch2020/Optibrake](https://github.com/aasch2020/Optibrake)*
