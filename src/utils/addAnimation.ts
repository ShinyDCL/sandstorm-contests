export const addAnimation = (
  clipTitle: string,
  entity: Entity
): AnimationState => {
  const animator = new Animator();
  const clip = new AnimationState(clipTitle, { looping: false });

  animator.addClip(clip);
  clip.stop();
  entity.addComponent(animator);

  return clip;
};
