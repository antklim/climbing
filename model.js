(function() {

  // module aliases
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Body = Matter.Body;
  const Bodies = Matter.Bodies;
  const Constraint = Matter.Constraint;
  const MouseConstraint = Matter.MouseConstraint;
  const Events = Matter.Events;
  const Composite = Matter.Composite;

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
      showConvexHulls: true,
			wireframes: false,
			background: '#111'
    }
  });

  // categories
  const defaultCategory = 0x0001;
  const redCategory = 0x0002;
  const greenCategory = 0x0004;
  const blueCategory = 0x0008;

  // colors
  const redColor = '#C44D58';
  const blueColor = '#4ECDC4';


  // scene parts ===============================================================
  // WALL
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
  World.add(world, wall);


  // GROUND
  const ground = Bodies.rectangle(400, 610, 810, 60, {
    collisionFilter: {
      category: defaultCategory
    },
    isStatic: true,
		render: {
      fillStyle: 'transparent',
      lineWidth: 1
    }
  });
  World.add(world, ground);


  // CLIMBER
	const torso = Bodies.circle(600, 400, 10, {
    setMass: 10,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
	});

	const hip = Bodies.circle(600, 500, 30, {
    setMass: 10,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
  });

	const shoulderL = Bodies.circle(580, 400, 10, {
    setMass: 1,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
  });

	const shoulderR = Bodies.circle(620, 400, 10, {
    setMass: 1,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
  });

  const elbowL = Bodies.circle(560, 450, 10, {
    setMass: 1,
    restitution: 0.0001,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
  });

  const elbowR = Bodies.circle(640, 450, 10, {
    setMass: 1,
    restitution: 0.0001,
    render: {
      strokeStyle: blueColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: blueCategory
    }
  });

  const handL = Bodies.circle(540, 500, 10, {
    setMass: 1,
    render: {
      strokeStyle: redColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: redCategory
    }
  });

  const handR = Bodies.circle(660, 500, 10, {
    setMass: 1,
    render: {
      strokeStyle: redColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: redCategory
    }
  });

  const footL = Bodies.circle(580, 600, 10, {
    setMass: 5,
    render: {
      strokeStyle: redColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: redCategory
    }
  });

  const footR = Bodies.circle(620, 600, 10, {
    setMass: 5,
    render: {
      strokeStyle: redColor,
      fillStyle: 'transparent',
      lineWidth: 1,
    },
    collisionFilter: {
      category: redCategory
    }
  });

  const climberBodies = [torso, hip, shoulderL, shoulderR, elbowL, elbowR, handL, handR, footL, footR];

  const armL = Constraint.create({ bodyA: shoulderL, bodyB: elbowL });
  const armR = Constraint.create({ bodyA: shoulderR, bodyB: elbowR });
  const forearmL = Constraint.create({ bodyB: elbowL, bodyA: handL });
  const forearmR = Constraint.create({ bodyB: elbowR, bodyA: handR });
  const spine = Constraint.create({ bodyA: torso, bodyB: hip });
  const trapL = Constraint.create({ bodyA: torso, bodyB: shoulderL });
  const trapR = Constraint.create({ bodyA: torso, bodyB: shoulderR });
  const abL = Constraint.create({ bodyA: hip, bodyB: shoulderL });
  const abR = Constraint.create({ bodyA: hip, bodyB: shoulderR });
  const leg1L = Constraint.create({ bodyA: shoulderL, bodyB: footL, stiffness: 1 });
  const leg2L = Constraint.create({ bodyA: hip, bodyB: footL, stiffness: 1 });
  const leg1R = Constraint.create({ bodyA: shoulderR, bodyB: footR, stiffness: 1 });
  const leg2R = Constraint.create({ bodyA: hip, bodyB: footR, stiffness: 1 });

  const climberConstraints = [armL, armR, forearmL, forearmR, leg1L, leg1R, leg2L, leg2R, spine, trapL, trapR, abL, abR];

  const climber = Composite.create({
    bodies: climberBodies,
    constraints: climberConstraints
  });
  World.add(world, climber);

  const calculateCog = (arrayOfBodies) => {
    const r = arrayOfBodies.reduce((accumulator, body) => {
      accumulator.x += body.position.x * body.mass;
      accumulator.y += body.position.y * body.mass;
      accumulator.m += body.mass;
      return accumulator;
    }, { x: 0, y: 0, m: 0 });

    return {
      x: r.x / r.m,
      y: r.y / r.m
    }
  }

  const cogCoordinates = calculateCog(climberBodies);
  const cogPointer = Bodies.circle(cogCoordinates.x, cogCoordinates.y, 5, {
    isStatic: true,
    collisionFilter: {
      mask: redCategory | greenCategory
    }
  });
  World.add(world, cogPointer);

  const cogAxeX = Bodies.rectangle(cogCoordinates.x, cogCoordinates.y, 50, 1, {
    collisionFilter: {
      mask: redCategory | greenCategory
    },
    isStatic: true
  });
  const cogAxeY = Bodies.rectangle(cogCoordinates.x, cogCoordinates.y, 1, 50, {
    collisionFilter: {
      mask: redCategory | greenCategory
    },
    isStatic: true
  });
  World.add(world, [cogAxeX, cogAxeY]);

  const moveCog = () => {
    const cogCoordinates = calculateCog(climberBodies);
    Body.setPosition(cogPointer, { x: cogCoordinates.x, y: cogCoordinates.y });
    Body.setPosition(cogAxeX, { x: cogCoordinates.x, y: cogCoordinates.y });
    Body.setPosition(cogAxeY, { x: cogCoordinates.x, y: cogCoordinates.y });
  };

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

  Events.on(engine, 'beforeUpdate', (event) => {
    moveCog();
  });
})();
