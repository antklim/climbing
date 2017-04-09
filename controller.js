(function() {
  let allBodies = {}

  const bodiesSelector = document.getElementById('model-bodies')
  const bodyLog = document.getElementById('model-body-log')
  const constraintsSelector = document.getElementById('model-constraints')
  const constraintLog = document.getElementById('model-constraint-log')
  const checkboxesArea = document.getElementById('model-body-parameters')
  const modelLogRefreshIntervalInput = document.getElementById('model-log-refresh-interval')

  const createOption = (value, text) => {
    const opt = document.createElement('option')
    opt.value = value
    opt.innerHTML = text
    return opt
  }

  const createCheckbox = (id, text) => {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = true
    checkbox.id = id

    const label = document.createElement('label')
    label.htmlFor = id
    label.appendChild(document.createTextNode(text))
    return [checkbox, label]
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

  const loadCheckboxes = () => {
    let [c1, l1] = createCheckbox('id', 'id')
    checkboxesArea.appendChild(c1)
    checkboxesArea.appendChild(l1)
    checkboxesArea.appendChild(document.createElement('br'))

    let [c2, l2] = createCheckbox('isStatic', 'isStatic')
    checkboxesArea.appendChild(c2)
    checkboxesArea.appendChild(l2)
    checkboxesArea.appendChild(document.createElement('br'))

    let [c3, l3] = createCheckbox('isSensor', 'isSensor')
    checkboxesArea.appendChild(c3)
    checkboxesArea.appendChild(l3)
    checkboxesArea.appendChild(document.createElement('br'))

    let [c4, l4] = createCheckbox('position', 'position')
    checkboxesArea.appendChild(c4)
    checkboxesArea.appendChild(l4)
    checkboxesArea.appendChild(document.createElement('br'))
  }

  const getLogFromBody = (bodyId, body) => {
    if (!body) {
      return `Body is not defined for id: ${bodyId}`
    }

    let text = ''
    text += `Id: ${bodyId}`
    text += `\nisStatic: ${body.isStatic}`
    text += `\nisSensor: ${body.isSensor}`
    text += `\nx: ${Math.round(body.position.x)}\ty: ${Math.round(body.position.y)}`

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

  document.addEventListener('DOMContentLoaded', () => {
    loadSelectors()
    loadCheckboxes()
  })

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

 const logRefresh = () => {
   const bodyId = +bodiesSelector.value

   if (!+bodyId) return

   const body = allBodies[+bodyId]
   bodyLog.innerHTML = getLogFromBody(bodyId, body)
 }

  let modelLogRefreshInterval = setInterval(logRefresh, +modelLogRefreshIntervalInput.value)

  modelLogRefreshIntervalInput.addEventListener('change', (event) => {
    const newInterval = +event.target.value
    if (modelLogRefreshInterval) {
      clearInterval(modelLogRefreshInterval)
    }

    modelLogRefreshInterval = setInterval(logRefresh, newInterval)
  })
})()
