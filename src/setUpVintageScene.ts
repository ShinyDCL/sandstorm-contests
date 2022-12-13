import * as utils from '@dcl/ecs-scene-utils';
import { scene } from './scene';

export const setupVintageScene = () => {
  scene.vintagescenewalls.GLTFShape.visible = false;

  const box = new Entity();
  const boxShape = new BoxShape();

  boxShape.withCollisions = false;
  boxShape.visible = false;
  boxShape.isPointerBlocker = false;
  box.addComponent(boxShape);
  box.addComponent(
    new Transform({
      position: new Vector3(40, 0, 8),
    })
  );

  const triggerBox = new utils.TriggerBoxShape(
    new Vector3(16, 16, 16),
    new Vector3(0, 0, 0)
  );

  box.addComponent(
    new utils.TriggerComponent(triggerBox, {
      onCameraEnter: () => {
        scene.vintagescenewalls.GLTFShape.visible = true;
      },
      onCameraExit: () => {
        scene.vintagescenewalls.GLTFShape.visible = false;
      },
    })
  );

  engine.addEntity(box);
};
