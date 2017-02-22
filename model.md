# Model to solve climbing/bouldering problems

## Climber model
* 4 limbs
  * 2 arms
  * 2 legs
* 1 centre of gravity
* compression radius
* stretching radius

For simplicity on the initial stage will consider compression and stretching radiuses for the whole climber.

## Climbing game
Climbing game represented by a climbing wall with holds on it. There is a coordinates network on the wall. Climber should reach finish in minimal available amount of movements.

### Initial state
* Given coordinates of all holds
* Given start position
  * 2 coordinates of hand holds with differentiation on left and right hand
  * 2 coordinates of feet holds with differentiation on left and right foot
* Given coordinates of finish hold

### Conditions
* Only one limb can be moved on every step
* Both hands must reach finish hold
* Every hold must be used at least once by any limb

### Move
* Move represented by pair of coordinates: coordinates of position before and after move (chess like)
* On every step of game the model calculates the best possible move (for simplicity let's consider the move to the closest hold)
* For simplicity will move hands first and then legs

# How the model should be improved
* Add different type of hand holds and climber's ability to hold them
* Add different types of flags
* Add heel/toe hooks
* Hands and legs can move in any order
* Compression and stretching radiuses per each limb
* Centre of gravity available movement radius
* The position of the centre of gravity changes stretching/compression radiuses of limbs
* Move record should include optimal coordinates of the centre of gravity
* Weight, height, gender, left/right hander
* Experience and style (very difficult to formalise now)
* Only coordinates of start hand holds should be given and the model should find the best climber start position which includes positions of hands, feet and centre of gravity

_Possible difficulties:_ crossed position of hands, positions like figure 4, bat hangs

# Data which can be collected from practice experiment
* Weight, height, gender, left/right hander of climber
