import { movePlayerTo } from '@decentraland/RestrictedActions';
import { scene } from './scene';

export const setupLostFountain = () => {
  scene.fountain.entity.addComponentOrReplace(
    new OnPointerDown(
      () => {
        void movePlayerTo({ x: 42, y: 31, z: -48 });
      },
      { hoverText: 'Drink!' }
    )
  );
};
