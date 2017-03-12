(function() {

  // module aliases
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Body = Matter.Body;
  const Bodies = Matter.Bodies;
  const MouseConstraint = Matter.MouseConstraint;
  const Events = Matter.Events;

  // create an engine
  const engine = Engine.create();
  const world = engine.world;

  // create a renderer
  const render = Render.create({
    element: document.getElementById("canvas-container"),
    engine: engine,
    options: {
      showAxes: true,
      showDebug: true,
      showCollisions: true,
      showPositions: true,
      showConvexHulls: true
    }
  });

  const wallParts = [
    Bodies.rectangle(300, 100, 7, 7), Bodies.rectangle(400, 100, 7, 7), Bodies.rectangle(500, 100, 7, 7),
    Bodies.rectangle(300, 200, 7, 7), Bodies.rectangle(400, 200, 7, 7), Bodies.rectangle(500, 200, 7, 7),
    Bodies.rectangle(300, 300, 7, 7), Bodies.rectangle(400, 300, 7, 7), Bodies.rectangle(500, 300, 7, 7),
    Bodies.rectangle(300, 400, 7, 7), Bodies.rectangle(400, 400, 7, 7), Bodies.rectangle(500, 400, 7, 7),
    Bodies.rectangle(300, 500, 7, 7), Bodies.rectangle(400, 500, 7, 7), Bodies.rectangle(500, 500, 7, 7),
  ]

  const wall = Body.create({
    parts: wallParts,
    isStatic: true
  });

  const climberParts = [
    // hands
    Bodies.circle(150, 475, 5),
    Bodies.circle(210, 475, 5),

    // centre of gravity
    Bodies.circle(180, 525, 9),

    // feet
    Bodies.circle(150, 575, 5),
    Bodies.circle(210, 575, 5),
  ];

  const climber = Body.create({
    parts: climberParts
  });

  const ground = Bodies.rectangle(400, 610, 810, 60, {
    isStatic: true
  });

  const offset = 5;
  World.add(world, [
      Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
      Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
      Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true }),
      Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true })
  ]);

  World.add(world, [wall, climber]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

  // add a mouse controlled constraint
  const mouseConstraint = MouseConstraint.create(engine, {
      element: render.canvas
  });

  World.add(world, mouseConstraint);

  // pass mouse to renderer to enable showMousePosition
  render.mouse = mouseConstraint.mouse;

  let counter = 0;
  const moveClimber = () => {
    console.log(climber);

    let leftSidePosition = 800;
    let topSidePosition = 0;

    for (let i = 0; i < climber.parts.length; i++) {
      const climberPart = climber.parts[i];

      leftSidePosition = (leftSidePosition > climberPart.position.x)
        ? climberPart.position.x
        : leftSidePosition;

      topSidePosition = (topSidePosition > climberPart.position.y)
        ? topSidePosition
        : climberPart.position.y;
    }

    console.log(topSidePosition);
    climber.positionImpulse.x += Math.abs(leftSidePosition - 300);
    climber.positionImpulse.y -= Math.abs(topSidePosition - 500);
  }

  Events.on(engine, 'beforeUpdate', (event) => {
    counter++;

    if (counter === 40) {
      moveClimber();
    }
  });
})();
