import { UserData } from '@decentraland/Identity';

export const attachToAvatar = (
  entity: Entity,
  transform: Transform,
  userData: UserData | null
) => {
  if (userData?.userId) {
    const parent = new Entity();
    parent.addComponentOrReplace(
      new AttachToAvatar({
        avatarId: userData.userId,
        anchorPointId: AttachToAvatarAnchorPointId.NameTag,
      })
    );
    entity.addComponentOrReplace(transform);
    entity.setParent(parent);
    engine.addEntity(parent);
  }
};
