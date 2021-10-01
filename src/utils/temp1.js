updateModified = (newObj) => {
  const index = state.modified.findIndex((obj) => obj.id === newObj.id);
  if (index === -1) return [...state.modified, newObj];
  else {
    const newStateModified = [...state.modified];
    newStateModified[index] = newObj;
    return newStateModified;
  }
};

state.currentStep = { ...state.currentStep, fieldName: state.currentStep };

state.modified = updateModified(state.currentStep);
