//interesting link http://codepen.io/lilgreenland/pen/jrMvaB?editors=1010 has vectors for gravity and velcoity

//To DO:
// twist shoulders - left and right arrows - still weird
//lock biceps - up and down arrows - prevent arms from over lengthening
//limit mouse cnstraint ability to pull whole body when clicling no limbs - there is a range of movment for arml in effect. but also cahnge mouseConstraint.constraint.stiffness?
// apply limits to legs
//left arm can lock to pose but becomes weak when touching a hold - still needs work , will be overridden by toso or hip press
//straighten or length legs with key presses?
//add force vectors - done somewhat for left hand, is it useful?
//correct mention of removing constraints on mouse press - replace with "relax"
//add additional constraint to hold arm up - deltoid. seems to help
//look up mass distribution in human
//make dyno system

//leg bones are stretchy - need to be made firm


(function () {
    // module aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Events = Matter.Events;
    const Composites = Matter.Composites;
    const Composite = Matter.Composite;
    const Common = Matter.Common;
    const Constraint = Matter.Constraint;
    const Body = Matter.Body;
    const Bodies = Matter.Bodies;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    const Vertices = Matter.Vertices;
    const Query = Matter.Query;
    const Vector = Matter.Vector;
    const Pairs = Matter.Pairs;
    const Pair = Matter.Pair;


    // create an engine
    const engine = Engine.create();
    const world = engine.world;

    // create a renderer
    const render = Render.create({
        element: document.getElementById('canvas-container'),
        engine: engine,
        options: {
            showAxes: false,
            showDebug: true,
            showCollisions: true,
            showPositions: true,
            showConvexHulls: true,
            wireframes: false,
            background: '#111'
        }
    });

    const defaultCategory = 0x0001;
    const redCategory = 0x0002;
    const greenCategory = 0x0004;
    const blueCategory = 0x0008;

    const redColor = '#C44D58';
    const greenColor = '#C7F464';
    const blueColor = '#4ECDC4';
    const greyColor = '#708090'

    let bottomBorder = Bodies.rectangle(400, 625, 800, 50, {
        collisionFilter: {
            category: defaultCategory
        },
        isStatic: true,
        render: {
            fillStyle: 'transparent',
            lineWidth: 1
        }
    });
    World.add(world, bottomBorder);


    //add climber
    var torso = Bodies.circle(600, 400, 10, {
        setMass: 1,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1
        },
        collisionFilter: {
            category: blueCategory
        },
    });
    var thoracic = Bodies.circle(600, 430, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory
        },
    });
    var lumbar = Bodies.circle(600, 455, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1
        },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory
        },
    });
    var hip = Bodies.circle(600, 485, 20, {
        setMass: 10,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
        },
    });
    var hipl = Bodies.circle(574, 503, 8, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
    });
    var hipr = Bodies.circle(626, 503, 8, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
    });
    var shoulderl = Bodies.circle(570, 410, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory
        },
    });
    var shoulderr = Bodies.circle(630, 410, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory
        },
    });


    let elbowl = Bodies.circle(565, 450, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        }
    });
    let elbowr = Bodies.circle(635, 450, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        }
    });
    let handl = Bodies.circle(540, 490, 10, {
        setMass: 1,
        isSensor: true,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let handr = Bodies.circle(660, 490, 10, {
        setMass: 1,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory,
        }
    });
    let footl = Bodies.rectangle(575, 610, 15, 15, {
        setMass: 5,
        friction: 2,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let footblockl = Bodies.rectangle(570, 610, 10, 10, {
        setMass: 0.001,
        restitution: 0.0000001,
        friction: 2,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let footblockr = Bodies.rectangle(635, 610, 10, 10, {
        setMass: 0.001,
        restitution: 0.00000001,
        friction: 2,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let kneeblockl = Bodies.circle(585, 550, 1, {
        setMass: 0.01,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let kneeblockr = Bodies.circle(615, 550, 1, {
        setMass: 0.01,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let footr = Bodies.rectangle(625, 610, 15, 15, {
        setMass: 5,
        friction:2,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let kneel = Bodies.circle(565, 553, 10, {
        setMass: 5,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: greenCategory
        }
    });
    let kneer = Bodies.circle(635, 553, 10, {
        setMass: 5,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: greenCategory
        }
    });



    var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
        shoulderr, shoulderl, elbowl, elbowr, handl, handr,
        footl, footr, kneel, kneer, footblockl, footblockr, kneeblockl, kneeblockr];

    //make wrist to detect arm load
    let wrist1l = Bodies.circle(542, 488, 1, { isSensor: true });
    let wrist2l = Constraint.create({ bodyA: handl, bodyB: wrist1l, stiffness: 1.5 });
    World.add(world, wrist1l);
    World.add(world, wrist2l);

    //constraints

    //arms

    let arml = Constraint.create({ bodyA: shoulderl, bodyB: elbowl });
    let armr = Constraint.create({ bodyA: shoulderr, bodyB: elbowr });
    let forearml = Constraint.create({ bodyB: elbowl, bodyA: wrist1l });
    let forearmr = Constraint.create({ bodyB: elbowr, bodyA: handr });
    
    var arms = [arml, armr, forearml, forearmr];

    //core
    let lowertrapl = Constraint.create({ bodyA: shoulderl, bodyB: thoracic });
    let latl = Constraint.create({ bodyA: shoulderl, bodyB: lumbar });
    let upperabl = Constraint.create({ bodyA: shoulderl, bodyB: hip, stiffness: 0.2 });
    let lowerabl = Constraint.create({ bodyA: hipl, bodyB: thoracic, stiffness: 0.2 });
    let obliquel = Constraint.create({ bodyA: hipl, bodyB: lumbar });
    let lowertrapr = Constraint.create({ bodyA: shoulderr, bodyB: thoracic });
    let latr = Constraint.create({ bodyA: shoulderr, bodyB: lumbar });
    let upperabr = Constraint.create({ bodyA: shoulderr, bodyB: hip, stiffness: 0.2 });
    let lowerabr = Constraint.create({ bodyA: hipr, bodyB: thoracic, stiffness: 0.2 });
    let obliquer = Constraint.create({ bodyA: hipr, bodyB: lumbar });
    let spineup = Constraint.create({ bodyA: torso, bodyB: thoracic, stiffness: 1.8 });
    let spinemid = Constraint.create({ bodyA: thoracic, bodyB: lumbar, stiffness: 1.8 });
    let spinelow = Constraint.create({ bodyA: lumbar, bodyB: hip, stiffness: 1.8 });
    let trapmid = Constraint.create({ bodyA: shoulderl, bodyB: shoulderr, stiffness: 1.5 });
    let trapl = Constraint.create({ bodyA: torso, bodyB: shoulderl, stiffness: 1.5 });
    let trapr = Constraint.create({ bodyA: torso, bodyB: shoulderr, stiffness: 1.5});
    let abl = Constraint.create({ bodyB: hipl, bodyA: shoulderl });
    let abr = Constraint.create({ bodyB: hipr, bodyA: shoulderr });
    var core = [trapl, trapr, lowertrapl, lowertrapr, trapmid, latl, latr, upperabl, upperabr,
                lowerabl, lowerabr, obliquel, obliquer, spineup, spinemid, spinelow];

    //legs
    let leg1l = Constraint.create({ bodyA: hipl, bodyB: footl, stiffness: 1 });
    let leg2l = Constraint.create({ bodyA: hip, bodyB: kneel, stiffness: 1 });
    let leg3l = Constraint.create({ bodyA: hip, bodyB: footl, stiffness: 1 });
    let femurl = Constraint.create({ bodyA: hipl, bodyB: kneel, stiffness: 1.5 });
    let tibial = Constraint.create({ bodyA: kneel, bodyB: footl, stiffness: 1.5 });
    let leg1r = Constraint.create({ bodyA: hipr, bodyB: footr, stiffness: 1.5 });
    let leg2r = Constraint.create({ bodyA: hip, bodyB: kneer, stiffness: 1.5 });
    let leg3r = Constraint.create({ bodyA: hip, bodyB: footr, stiffness: 1 });
    let femurr = Constraint.create({ bodyA: hipr, bodyB: kneer, stiffness: 1 });
    let tibiar = Constraint.create({ bodyA: kneer, bodyB: footr, stiffness: 1 });
    let block1l = Constraint.create({ bodyA: footblockl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2l = Constraint.create({ bodyA: footblockl, bodyB: kneel, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3l = Constraint.create({ bodyA: hipl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4l = Constraint.create({ bodyA: kneel, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090' } });
    let block1r = Constraint.create({ bodyA: footblockr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2r = Constraint.create({ bodyA: footblockr, bodyB: kneer, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3r = Constraint.create({ bodyA: hipr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4r = Constraint.create({ bodyA: kneer, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090' } });

    let psoasl = Constraint.create({ bodyA: lumbar, bodyB: kneel, stiffness: 1 });
    let psoasr = Constraint.create({ bodyA: lumbar, bodyB: kneer, stiffness: 1 });

    var blockers = [block1l, block1r, block2l, block2r, block3l, block3r, block4l, block4r];

    var legs = [femurl, femurr, tibial, tibiar];
    var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];

    //hips
    
    let pubisl = Constraint.create({ bodyA: hip, bodyB: hipl, stiffness: 1.5 });
    let pubisr = Constraint.create({ bodyA: hipr, bodyB: hip, stiffness: 1.5 });
    let illiuml = Constraint.create({ bodyA: hipl, bodyB: lumbar, stiffness: 1.5 });
    let illiumr = Constraint.create({ bodyA: hipr, bodyB: lumbar, stiffness: 1.5 });
    let ischium = Constraint.create({ bodyA: hipl, bodyB: hipr, stiffness: 1.5 });
    var hips = [pubisl, pubisr, illiuml, illiumr, ischium];

    var ConstraintrenderBlue = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 3,
            arrayOfConstraints[i].render.strokeStyle = blueColor
        }
    };
    var ConstraintrenderGrey = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 0.5,
            arrayOfConstraints[i].render.strokeStyle = greyColor
        }
    };
    var ConstraintrenderRed = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 1,
            arrayOfConstraints[i].render.strokeStyle = redColor
        }
    };


    ConstraintrenderBlue(arms);
    ConstraintrenderBlue(core);
    ConstraintrenderBlue(legs);
    ConstraintrenderRed(legmuscles);
    ConstraintrenderBlue(hips);
    ConstraintrenderGrey(blockers);


    World.add(world, arms);
    World.add(world, core);
    World.add(world, legs);
    World.add(world, legmuscles);
    World.add(world, hips);
    World.add(world, blockers);


    var addclimber = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };

    addclimber(climber);

    var setairfriction = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.frictionAir = 0.01;
        }
    };
    setairfriction(climber);

    //make arm muscles
    let bicepl = Constraint.create({ bodyA: shoulderl, bodyB: wrist1l, stiffness: 0.1 });
    let bicepr = Constraint.create({ bodyA: shoulderr, bodyB: handr, stiffness: 0.1 });
    let teresl   = Constraint.create({ bodyA: elbowl, bodyB: thoracic, stiffness: 0.5 });
    let teresr = Constraint.create({ bodyA: elbowr, bodyB: thoracic, stiffness: 0.5 });
    let deltoidl = Constraint.create({ bodyB: torso, bodyA: handl, stiffness: 0.5 });
    let deltoidr = Constraint.create({ bodyB: torso, bodyA: handr, stiffness: 0.5 });
    
    let armmuscles = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
    addclimber(armmuscles);
    ConstraintrenderRed(armmuscles);

 
   
    //render center of gravity
    //x coordinate = x1.m1 + x2.m2 ... / m1 + m2 ...
    //y coordinate = y1.m1 + y2.m2 ... / m1 + m2 ...
    //torso, hip, shoulders, elbows , hands, feet
    // each are 10, 10, 1, 1, 0.001, 0.001, 5
    //x coordinate

    //to put x and y data into a single variable:
    //var cogposition = { x: cogpositionx, y: cogpositiony };

    //tocalculate COG:
    var cogpositionx = (
                        (torso.position.x *  torso.mass) + (hip.position.x * 10) +
                        (shoulderr.position.x * 1) + (shoulderl.position.x * 1) +
                        (footl.position.x * 5) + (footr.position.x * 5) +
                        (elbowl.position.x * 1) + (elbowr.position.x * 1) +
                        (handl.position.x * 1) + (handr.position.x * 1)
                        )
                        / (torso.mass + 10 + 1 + 1 + 5 + 5 + 1 + 1 + 1 + 1);
    var cogpositiony = (
                        (torso.position.y * 10) + (hip.position.y * 10) +
                        (shoulderr.position.y * 1) + (shoulderl.position.y * 1) +
                        (footl.position.y * 5) + (footr.position.y * 5) +
                        (elbowl.position.y * 1) + (elbowr.position.y * 1) +
                        (handl.position.y * 1) + (handr.position.y * 1)
                        )
                        / (10 + 10 + 1 + 1 + 5 + 5 + 1 + 1 + 1 + 1);

    var calculatecog = function (arrayOfBodies) {
        var cogpositionx = 0;
        var cogpositiony = 0;
        var allBodiesMass = 0;

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let body = arrayOfBodies[i];
            cogpositionx += body.position.x * body.mass;
            cogpositiony += body.position.y * body.mass;
            allBodiesMass += body.mass;
        }

        if (allBodiesMass === 0) {
            // error here
        }

        var cog = {
            x: cogpositionx / allBodiesMass,
            y: cogpositiony / allBodiesMass
        }
        return cog;
    };

    var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);

    var cog = Bodies.circle(cogCoordinates.x, cogCoordinates.y, 5, { isStatic: true, collisionFilter: { mask: redCategory | greenCategory } });
    World.add(world, cog);

    Events.on(engine, 'beforeUpdate', function (event) {  
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);   
        Body.setPosition(cog, { x: cogCoordinates.x, y: cogCoordinates.y });
    });



    //Holds that arms and legs stick to

    // collider is the red box in the middle
    let collider = Bodies.rectangle(300, 300, 50, 50, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth : 1,
        },
        angle: 10
    });
    
    //second collider- collider1
    // collider is the red box in the middle
    let collider1 = Bodies.rectangle(450, 300, 50, 50, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 0
    });


    //collider- collider2
    let collider2 = Bodies.rectangle(500, 200, 50, 50, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 10
    });


    //collider- collider3
    let collider3 = Bodies.rectangle(600, 200, 50, 50, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 15
    });


    //collider- collider4
    let collider4 = Bodies.rectangle(300, 400, 20, 20, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 15
    });


    let collider5 = Bodies.rectangle(700, 400, 20, 20, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 15
    });
    World.add(world, collider5);
    let collider6 = Bodies.rectangle(200, 500, 20, 20, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 15
    });
    var colliders = [collider, collider1, collider2, collider3, collider4, collider5];

    World.add(world, colliders);



    // events to adjust legs

    //functions to add or remove leg constraints (except for femur and tibia)

    var addmuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };
    var removemuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            Composite.remove(engine.world, list)
        }
    };

    //function to make constraints more flexible
    var relaxmuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 0.05
        }
    };
    //function to make constraints very flexible
    var relaxmusclesloose = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 0.01
        }
    };
    var tensemuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {

            let list = arrayOfBodies[i];
            list.stiffness = 1
        }
    };
  
    var collidercheck = Query.region(colliders, handl.bounds) ; 
                  
    document.addEventListener('keydown', function (event) {
        var colliders = [collider, collider1, collider2, collider3, collider4, collider5];
        if (event.keyCode == 38) {
            //Query.region(colliders, handl.bounds);
            console.log(Query.region(colliders, handl.bounds)) }
    }
    );
 
    //left arm changes tension on hold collision   
    Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;
        var biceps = [bicepl, teresl];
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];

            if (pair.bodyA === handl) {
                if (pair.bodyB === collider) { removemuscles(biceps); bicepl.stiffness = 0.1; teresl.stiffness = 0.1; addmuscles(biceps) }
            }
            if (pair.bodyB === handl) {
                if (pair.bodyA === collider) { removemuscles(biceps); bicepl.stiffness = 0.1; teresl.stiffness = 0.1; addmuscles(biceps) }
            }
            else tensemuscles(biceps)
        }
    });
    //right arm changes tension on hold collision
    Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;
        var biceps = [bicepr, teresr];
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            if (pair.bodyA === handr) {
                if (pair.bodyB === collider) { removemuscles(biceps); bicepr.stiffness = 0.1; teresr.stiffness = 0.1; addmuscles(biceps) }
            }
            if (pair.bodyB === handr) {
                if (pair.bodyA === collider) { removemuscles(biceps); bicepr.stiffness = 0.1; teresr.stiffness = 0.1; addmuscles(biceps) }
            }
            else tensemuscles(biceps)
        }});


    var tensemusclesweak = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 1
        }};

    //limit mouse drag of limbs to their rnge of movement from body?
    var armlrange = Bodies.circle(570, 410, 100, {
        isSensor: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        } ,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible:true
        },
        Mass:-0.0000001
    });
    var armlrangeCon = Constraint.create({ bodyA: armlrange, bodyB: shoulderl, length: 0.000001, stiffness: 2 });
    World.add(world, armlrange);
    World.add(world, armlrangeCon);

    //range for legl
    var leglrange = Bodies.circle(574, 503, 120, {
        isSensor: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: -0.0000001
    });
    var leglrangeCon = Constraint.create({ bodyA: leglrange, bodyB: hipl, length: 0.000001, stiffness: 2 });
    World.add(world, leglrange);
    World.add(world, leglrangeCon);


    // MOUSE EVENTS! events to adjust limbs on mouse clicks
    //on mouse down events
    //default  mouseConstraint.constraint.stiffness = 0.1
    var defaultconstraintstiffness = 0.1

    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {

            //if mouse clicks on FOOTL, then left leg constraints lower stiffness, (on mouse up, constraints are added back in)
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                mouseConstraint.constraint.stiffness = 0.8;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                relaxmusclesloose(legmusclesl);
                if (Matter.Bounds.contains(leglrange.bounds, mouseConstraint.mouse.position) === false) { mouseConstraint.constraint.stiffness = 0.01 }


            }
            //if mouse clicks on FOOTR, then right leg constraints dissapear (on mouse up, constraints are added back in)
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                mouseConstraint.constraint.stiffness = 0.05;

                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                relaxmusclesloose(legmusclesr)
            }
            //if mouse clicks on KNEER, then right leg constraints dissapear, (on mouse up, constrainst sare added back in)
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                mouseConstraint.constraint.stiffness = 1;
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                relaxmuscles(legmusclesr)
            }
            //if mouse clicks on KNEEL, then right leg constraints dissapear, (on mouse up, constrainst sare added back in)
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                mouseConstraint.constraint.stiffness = 1;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                relaxmuscles(legmusclesl)
            }
            //event to adjust legs on hip click
            //if mouse clicks down on HIP, then constraints dissapear,
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                //   mouseConstraint.constraint.stiffness = 0.5;

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];
                relaxmuscles(legmuscles);
                var biceps1 = [bicepl, bicepr, teresl ,teresr];
                relaxmuscles(biceps1);
            }
            //if mouse clicks on HANDL, then left bicep constraints dissapear, (on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == handl) {

                var biceps = [bicepl, teresl, deltoidl];
                relaxmuscles(biceps);
                if (Matter.Bounds.contains(armlrange.bounds, mouseConstraint.mouse.position) === false) {mouseConstraint.constraint.stiffness=0.01}

            }
            //if mouse clicks on HANDR, then right bicep constraints dissapear, (on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                mouseConstraint.constraint.stiffness = 0.05;
                var biceps = [bicepr, teresr, deltoidr];
                relaxmuscles(biceps)
            }
            //if mouse clicks on TORSO, then both bicep constraints dissapear,( on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                mouseConstraint.constraint.stiffness = 1;
                var biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
                relaxmuscles(biceps);
                //relax constraints limiting hip rotation
                var hips = [leg1l, leg1r, lowerabl, lowerabr, psoasl, psoasr];
                relaxmuscles(hips);
            }
        }


        //mouse UP events
        if (mouseConstraint.mouse.button !== 0) {
            //if mouse clicks up on FOOTL,  constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                removemuscles(legmusclesl);
                tensemuscles(legmusclesl);

                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                addmuscles(legmusclesl)
            }
            //if mouse clicks up on FOOTR,  constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                removemuscles(legmusclesr);
                tensemuscles(legmusclesr);
                addmuscles(legmusclesr)
            }
            //if mouse clicks up on KNEER, then right leg constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                removemuscles(legmusclesr);
                tensemuscles(legmusclesr);
                addmuscles(legmusclesr)
            }

            //if mouse clicks on KNEEL, then right leg constraints are added back in    
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                removemuscles(legmusclesl);
                tensemuscles(legmusclesl);
                addmuscles(legmusclesl)
            }
            //if mouse clicks up on HANDL, then left bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == handl) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                var biceps = [bicepl];
                var teres = [teresl, deltoidl];
                removemuscles(biceps);
                removemuscles(teres);
                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
                tensemusclesweak(biceps);
                tensemusclesweak(teres);
                addmuscles(biceps);
                addmuscles(teres);
                mouseConstraint.constraint.stiffness = 0.1;
            }
            //if mouse clicks up on HANDR, then left bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepr];
                var teres = [teresr, deltoidr];
                removemuscles(biceps);
                removemuscles(teres);
                tensemusclesweak(biceps);
                tensemusclesweak(teres);
                addmuscles(biceps);
                addmuscles(teres)
            }
            //if mouse clicks up on TORSO, then both bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepl, bicepr];
                var teres = [teresl, teresr, deltoidl, deltoidr];
                removemuscles(biceps);
                removemuscles(teres);
                tensemusclesweak(biceps);
                tensemusclesweak(teres);
                addmuscles(biceps);
                addmuscles(teres);
                //add constraints limiting hip rotation
                lowerabl.length = Math.sqrt(Math.pow((hipl.position.x - thoracic.position.x), 2) + Math.pow((hipl.position.y - thoracic.position.y), 2));
                lowerabr.length = Math.sqrt(Math.pow((hipr.position.x - thoracic.position.x), 2) + Math.pow((hipr.position.y - thoracic.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));

                var hips = [leg1l, leg1r, lowerabl, lowerabr, psoasl, psoasr];
                removemuscles(hips);
                tensemuscles(hips);
                addmuscles(hips)
            }

            //event to adjust legs on hip click
            //on mouse up, constrainsts are added back in (HIPS)
            //length of constraints recalcualted via pythagoras equation
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];
                removemuscles(legmuscles);
                tensemuscles(legmuscles);
                addmuscles(legmuscles);

                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepl, bicepr];
                var teres = [teresl, teresr, deltoidl, deltoidr];
                removemuscles(biceps);
                removemuscles(teres);
                tensemusclesweak(biceps);
                tensemusclesweak(teres);
                addmuscles(biceps);
                addmuscles(teres);

                // dyno system

                // on right click? mouse can drag body to a position, mouse constraint can stretch beyond this position. 
                //mouse constraint = vector. on mouse up, forece is applied to body?? or translate body???, in opposite direction and magnitude to constraint vector.
                //at maximum velocity? or after a length of time proportional to force/distance? - limbs detatch from holds (no longer static?) ([climber] (all bodies of climber) isStatic: false)
                //arms reach up? (measure constraint lengths in this position and then makethese the presets)

                //if click on hips, console.log(mouseConstraint.length)
                //apply force

                //on mouseup on hips create vector for dyno system (SHIFT)
                const mouseconstraintlength = Math.sqrt(Math.pow((mouseConstraint.body.position.x - mouseConstraint.mouse.position.x), 2) + Math.pow((mouseConstraint.body.position.y - mouseConstraint.mouse.position.y), 2));
                const startPoint = mouseConstraint.mouse.position;
                const endPoint = mouseConstraint.body.position;
                const mouseconstraintvector = {
                    x: (endPoint.x - startPoint.x) * 0.004,
                    y: (endPoint.y - startPoint.y) * 0.004
                };
                const mouseconstraintvectorweak = {
                    x: (endPoint.x - startPoint.x) * 0.0007,
                    y: (endPoint.y - startPoint.y) * 0.0007,
                };
                console.log(mouseConstraint.body.position);
                console.log(mouseConstraint.mouse.position);
                console.log(mouseconstraintlength);
                console.log(mouseconstraintvector);
                console.log(mouseconstraintvectorweak);
              
                document.addEventListener('keydown', function (event) {
                    //on SHIFT key
                    if (event.keyCode == 16) {
                        handl.isStatic = false;
                        handr.isStatic = false;
                        footl.isStatic = false;
                        footr.isStatic = false;
                        Body.applyForce(handl, handl.position, mouseconstraintvectorweak);
                        Body.applyForce(handr, handr.position, mouseconstraintvectorweak);
                        Body.applyForce(footl, footl.position, mouseconstraintvectorweak);
                        Body.applyForce(footr, footr.position, mouseconstraintvectorweak);
                        Body.applyForce(hip, hip.position, mouseconstraintvector);


                    }
                });

            }

        }



    });



    //key press to move shoulder width
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {
            trapmid.length = trapmid.length - 5;
            traps = [trapmid, trapl, trapr];
            removemuscles(traps);
            addmuscles(traps);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 39) {
            trapmid.length = trapmid.length + 5;
            traps = [trapmid];
            removemuscles(traps);
            addmuscles(traps);
        }
    });

    // arm muscles shorten on up press, lengthen on down press
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 40) {
            if (bicepl.length < ((Math.sqrt(Math.pow((shoulderl.position.x - elbowl.position.x), 2) + Math.pow((shoulderl.position.y - elbowl.position.y), 2)))
                +(Math.sqrt(Math.pow((elbowl.position.x - handl.position.x), 2) + Math.pow((elbowl.position.y - handl.position.y), 2)))))
            {bicepl.length = bicepl.length + 5}
            if (bicepr.length < ((Math.sqrt(Math.pow((shoulderr.position.x - elbowr.position.x), 2) + Math.pow((shoulderr.position.y - elbowr.position.y), 2)))
                +(Math.sqrt(Math.pow((elbowr.position.x - handr.position.x), 2) + Math.pow((elbowr.position.y - handr.position.y), 2)))))
            {bicepr.length = bicepr.length + 5};
            
            teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
            teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
            deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
            deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
            biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
            removemuscles(biceps);
            teresl.stiffness = 0.05;
            teresr.stiffness = 0.05;
            deltoidl.stiffness = 0.05;
            deltoidr.stiffness = 0.05;
            addmuscles(biceps);
        }
    });
    // arm muscles shorten on up press, lengthen on down press
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 38) {
            bicepl.length = bicepl.length - 5;
            bicepr.length = bicepr.length - 5;
            biceps = [bicepl, bicepr];
            removemuscles(biceps);
            addmuscles(biceps);
        }
    });



    //Hands stick to holds
    // event to make object no longer static while mouse is clicked
    // add static = false with click
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body.isStatic === true) {
                mouseConstraint.body.isStatic = false;
            }
        }
    });



    Events.on(engine, 'collisionStart', function(event) {
        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];

            if (pair.bodyA === collider) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider) {
                pair.bodyA.isStatic = true;
            }
            if (pair.bodyA === collider1) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider1) {
                pair.bodyA.isStatic = true;
            }
            if(pair.bodyA === collider2) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider2) {
                pair.bodyA.isStatic = true;
            }
            if (pair.bodyA === collider3) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider3) {
                pair.bodyA.isStatic = true;
            }
            if (pair.bodyA === collider4) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider4) {
                pair.bodyA.isStatic = true;
            }
            if (pair.bodyA === collider5) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider5) {
                pair.bodyA.isStatic = true;
            }
            if (pair.bodyA === collider6) {
                pair.bodyB.isStatic = true;
            } else if (pair.bodyB === collider6) {
                pair.bodyA.isStatic = true;
            }
        }
    });


    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    // add a mouse controlled constraint
    const mouseConstraint = MouseConstraint.create(engine, {stiffness: 0.1,
        element: render.canvas
    });

    World.add(world, mouseConstraint);

    // pass mouse to renderer to enable showMousePosition
    render.mouse = mouseConstraint.mouse;


    //Render vectors!!
    //render COG 
    Events.on(render, 'afterRender', function () {
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);
        var mouse = mouseConstraint.mouse,
            context = render.context,
            bodies = Composite.allBodies(engine.world),
            startPoint = { x: cogCoordinates.x, y: 0},
            endPoint = { x: cogCoordinates.x, y: 600 };

        var collisions = Query.ray(bodies, startPoint, endPoint);

        //   Render.startViewTransform(render);

        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);  
        context.lineWidth = 0.5;
        context.stroke();

        //       Render.endViewTransform(render);
    });

    //render vector from hand to shoulder - bicep? add in arm vector /// this is all relative to original position? need to add angle?? 
    //how to make line come from hand?
    Events.on(render, 'afterRender', function () {
        var armstretchedlength = (Math.sqrt(Math.pow((elbowl.position.x - handl.position.x), 2) + Math.pow((elbowl.position.y - handl.position.y), 2)));
        var armstretch = armstretchedlength - forearml.length;
        var wriststretchedlength = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
        var wriststretch = (wriststretchedlength - wrist2l.length);
        //console.log(wriststretch);

        var context = render.context;
        var endPoint = { x: shoulderl.position.x , y: shoulderl.position.y};
        var startPoint = { x: handl.position.x, y: handl.position.y };


        context.beginPath();

        
        context.moveTo((startPoint.x + (startPoint.x - endPoint.x) * 0.5 * wriststretch), (startPoint.y + (startPoint.y - endPoint.y) * 0.5 * wriststretch));
        context.lineTo(startPoint.x, startPoint.y);
        context.lineWidth = 4;
        if (wriststretch > 1) { context.strokeStyle = redColor }
        else { context.strokeStyle = greenColor };
        context.stroke();


    });

    //
    //calculate forces through arms - validate?

    document.addEventListener('keydown', function (event) {
        //on up arrow
        if (event.keyCode == 38) {
            var wriststretchedlength = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
            var wriststretch = (wriststretchedlength - wrist2l.length);
            //console.log(wriststretch);

        }
    });


      
    

   

})();
