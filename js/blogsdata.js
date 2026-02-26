const blogsData = [
{
    label: "Post 01 · Unity learning",
    title: "Rocket Launcher Script and Prefab",
    date: "Feb 2026",
    readingTime: "4 min",
    summary: "A simple rocket launcher missile and launch system coupled in a prefab within Unity.",
    paragraphs: [
        "This week focused on building a modular missile system for my immersive sim, prioritizing a 'mechanical' feel over arcade-style physics.",
        "I developed two C# scripts—Launcher and Missile—that handle the transition from an initial physics impulse to active, self-propelled homing flight.",
        "The system uses a delayed ignition sequence (0.37 seconds) to simulate the engine priming, giving the player visual feedback before the missile accelerates to its top speed of 100f."
    ],
    challenge: "The main hurdle was balancing the rotation speed so the missile feels heavy and mechanical; I solved this using Quaternion.RotateTowards to prevent the projectile from 'snapping' unnaturally to the target.",
    nextStep: "N/A",
    keyLearnings: [
        "Decoupling spawning logic from propulsion makes projectiles easier to debug.",
        "Using Rigidbody.MoveRotation provides smoother physics interpolation than direct Transform manipulation.",
        "Delayed cleanup of GameObjects is essential for allowing particle trails to fade naturally after an impact."
    ]
}
];
