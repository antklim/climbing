(function() {
  console.log(MODEL)
  let allBodies = {}

  const bodiesSelector = document.getElementById('model-bodies')
  const bodyLog = document.getElementById('model-body-log')
  const constraintsSelector = document.getElementById('model-constraints')
  const constraintLog = document.getElementById('model-constraint-log')

  const createOption = (value, text) => {
    const opt = document.createElement('option')
    opt.value = value
    opt.innerHTML = text
    return opt
  }

  const loadSelectors = () => {
    bodiesSelector.appendChild(createOption(0, '--- Top Level Bodies'))
    MODEL.world.bodies.forEach((body) => {
      bodiesSelector.appendChild(createOption(body.id, body.label))
      allBodies[body.id] = body
    })

    if (MODEL.world.composites) {
      bodiesSelector.appendChild(createOption(0, '--- Composite Bodies'))
      MODEL.world.composites.forEach((composite) => {
        composite.bodies.forEach((body) => {
          bodiesSelector.appendChild(createOption(body.id, `Composite ${composite.id}: ${body.label}`))
          allBodies[body.id] = body
        })
      })
    }

    if (MODEL.world.constraints) {
      constraintsSelector.appendChild(createOption(0, '--- Constraints'))
      MODEL.world.constraints.forEach((constraint) => constraintsSelector.appendChild(createOption(constraint.id, constraint.label)))
    }
  }

  const getLogFromBody = (bodyId, body) => {
    if (!body) {
      return `Body is not defined for id: ${bodyId}`
    }

    let text = ''
    text += `Id: ${bodyId}`
    text += `\nisStatic: ${body.isStatic}`
    text += `\nisSensor: ${body.isSensor}`

    return text
  }

  const getLogFromConstraint = (constraintId, constraint) => {
    if (!constraint) {
      return `Constraint is not defined for id: ${constraintId}`
    }

    let text = ''
    text += `Id: ${constraintId}`

    return text
  }

  document.addEventListener('DOMContentLoaded', () => loadSelectors())

  bodiesSelector.addEventListener('change', (event) => {
    const bodyId = +event.target.value
    if (+bodyId) {
      const body = allBodies[+bodyId]
      bodyLog.innerHTML = getLogFromBody(bodyId, body)
      console.log(body)
    } else {
      bodyLog.innerHTML = 'Body not selected'
    }
  })

  constraintsSelector.addEventListener('change', (event) => {
    const constraintId = +event.target.value
    if (+constraintId) {
      const constraint = MODEL.world.constraints.find((constraint) => constraint.id === +constraintId)
      constraintLog.innerHTML = getLogFromConstraint(constraintId, constraint)
    } else {
      constraintLog.innerHTML = 'Constraint not selected'
    }
  })
})()
