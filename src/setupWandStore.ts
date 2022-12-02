import { getUserData, UserData } from '@decentraland/Identity';
import { scene } from './scene';
import { InstructionsLabel } from './ui/instructionsLabel';
import { addAnimation } from './utils/addAnimation';
import { attachToAvatar } from './utils/attachToAvatar';
import { detachFromAvatar } from './utils/detachFromAvatar';

export const setupWandStore = (
  canvas: UICanvas,
  texture: Texture,
  input: Input
) => {
  const store = scene.store.entity;
  const wand1 = scene.wand1.entity;
  const wand2 = scene.wand2.entity;
  const wand1Transform = scene.wand1.transform;
  const wand2Transform = scene.wand2.transform;
  let exploded = false;

  // Transform for attaching wand to avatar
  const attachTransform = new Transform({
    position: new Vector3(0.4, -0.7, 0.5),
    rotation: Quaternion.Euler(45, 180, 0),
  });

  // Label with instructions
  const instructionsLabel = new InstructionsLabel(
    canvas,
    texture,
    `Press 'E' to try it out, 'F' to put it down`
  );

  // Get user data
  let userData: UserData | null;
  void executeTask(async () => {
    userData = await getUserData();
  });

  const subscribe = (primary: () => void, secondary: () => void) => {
    input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, primary);
    input.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, secondary);
  };

  const unsubscribe = (primary: () => void, secondary?: () => void) => {
    input.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, primary);
    if (secondary) {
      input.unsubscribe('BUTTON_DOWN', ActionButton.SECONDARY, secondary);
    }
  };

  // Set up animation for store (vase explosion)
  const vaseExplosion = addAnimation('Animation', store);

  // Set up animation for wand (light)
  const light = addAnimation('WandLight1', wand2);

  const onPressE2 = () => {
    light.play();
    unsubscribe(onPressE2);
  };

  const onPressF2 = () => {
    instructionsLabel.hide();
    light.stop();
    wand2.addComponentOrReplace(wand2OnPointerDown);
    unsubscribe(onPressE2, onPressF2);
    detachFromAvatar(wand2, wand2Transform);
  };

  const wand2OnPointerDown = new OnPointerDown(
    () => {
      instructionsLabel.show();
      wand2.removeComponent(OnPointerDown);
      subscribe(onPressE2, onPressF2);
      attachToAvatar(wand2, attachTransform, userData);
    },
    { hoverText: 'Pick up!', button: ActionButton.POINTER }
  );

  const onPressE1 = () => {
    exploded = true;
    vaseExplosion.play();
    unsubscribe(onPressE1);
  };

  const onPressF1 = () => {
    instructionsLabel.hide();
    if (exploded) {
      wand2.addComponentOrReplace(wand2OnPointerDown);
    } else {
      wand1.addComponentOrReplace(wand1OnPointerDown);
    }
    unsubscribe(onPressE1, onPressF1);
    detachFromAvatar(wand1, wand1Transform);
  };

  const wand1OnPointerDown = new OnPointerDown(
    () => {
      instructionsLabel.show();
      wand1.removeComponent(OnPointerDown);
      subscribe(onPressE1, onPressF1);
      attachToAvatar(wand1, attachTransform, userData);
    },
    { hoverText: 'Pick up!', button: ActionButton.POINTER }
  );
  wand1.addComponentOrReplace(wand1OnPointerDown);
};
