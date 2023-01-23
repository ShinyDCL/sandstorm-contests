export enum LinkType {
  TWITTER = 'Twitter',
  GITHUB = 'Github',
}

export interface ISceneObject {
  entity: Entity;
  transform: Transform;
  GLTFShape: GLTFShape;
}

export class Link {
  constructor(sceneObject: ISceneObject, link: string, linkType: LinkType) {
    sceneObject.entity.addComponent(
      new OnPointerDown(() => openExternalURL(link), { hoverText: linkType })
    );
  }
}
