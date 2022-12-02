export const detachFromAvatar = (entity: Entity, transform: Transform) => {
  const parent = entity.getParent();
  entity.setParent(null);
  entity.addComponentOrReplace(transform);

  if (parent) {
    engine.removeEntity(parent);
  }
};
