export interface ModelConstructorArgs {
  entity: Entity;
  transform: Transform;
  GLTFShape: GLTFShape;
}

export class Model {
  public entity: Entity;
  public transform: Transform;
  public GLTFShape: GLTFShape;

  constructor({ entity, transform, GLTFShape }: ModelConstructorArgs) {
    this.entity = entity;
    this.transform = transform;
    this.GLTFShape = GLTFShape;
  }
}
